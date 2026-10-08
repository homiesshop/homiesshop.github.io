-- Homiesshop order store: run this entire script in Supabase SQL Editor.
-- Add only the UUID of the owner/admin's Supabase Auth user to admin_users.
-- No service-role key is needed in the browser.

create or replace function public.valid_order_items(items jsonb, order_total numeric)
returns boolean
language plpgsql
immutable
set search_path = pg_catalog
as $$
declare
  item jsonb;
  item_quantity integer;
  item_unit_price numeric;
  item_line_total numeric;
  items_total numeric := 0;
begin
  if pg_catalog.jsonb_typeof(items) is distinct from 'array' then
    return false;
  end if;
  if pg_catalog.jsonb_array_length(items) not between 1 and 30
     or pg_catalog.pg_column_size(items) > 12000 then
    return false;
  end if;

  for item in select value from pg_catalog.jsonb_array_elements(items) as entry(value)
  loop
    if pg_catalog.jsonb_typeof(item) is distinct from 'object'
       or pg_catalog.jsonb_typeof(item -> 'product_id') is distinct from 'string'
       or pg_catalog.length(item ->> 'product_id') not between 1 and 80
       or pg_catalog.jsonb_typeof(item -> 'name') is distinct from 'string'
       or pg_catalog.length(item ->> 'name') not between 1 and 160
       or pg_catalog.jsonb_typeof(item -> 'size') is distinct from 'string'
       or pg_catalog.length(item ->> 'size') not between 1 and 20
       or pg_catalog.jsonb_typeof(item -> 'quantity') is distinct from 'number'
       or (item ->> 'quantity') !~ '^[1-9][0-9]?$'
       or pg_catalog.jsonb_typeof(item -> 'unit_price') is distinct from 'number'
       or (item ->> 'unit_price') !~ '^[0-9]+(\.[0-9]{1,2})?$'
       or pg_catalog.jsonb_typeof(item -> 'line_total') is distinct from 'number'
       or (item ->> 'line_total') !~ '^[0-9]+(\.[0-9]{1,2})?$' then
      return false;
    end if;

    item_quantity := (item ->> 'quantity')::integer;
    item_unit_price := (item ->> 'unit_price')::numeric;
    item_line_total := (item ->> 'line_total')::numeric;
    if item_quantity > 20 or item_unit_price > 1000000
       or item_line_total <> pg_catalog.round(item_unit_price * item_quantity, 2) then
      return false;
    end if;
    items_total := items_total + item_line_total;
  end loop;

  return order_total >= 0 and items_total = order_total;
end;
$$;

revoke all on function public.valid_order_items(jsonb, numeric) from public;
grant execute on function public.valid_order_items(jsonb, numeric) to anon, authenticated;

create table if not exists public.order_settings (
  singleton boolean primary key default true check (singleton is true),
  accepting_orders boolean not null default false
);

insert into public.order_settings (singleton, accepting_orders)
values (true, false)
on conflict (singleton) do nothing;

alter table public.order_settings enable row level security;
revoke all on table public.order_settings from anon, authenticated;

create or replace function public.order_intake_is_enabled()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select coalesce(
    (select accepting_orders from public.order_settings where singleton is true),
    false
  );
$$;

revoke all on function public.order_intake_is_enabled() from public;
grant execute on function public.order_intake_is_enabled() to anon, authenticated;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null check (length(btrim(customer_name)) between 1 and 100),
  email text check (email is null or (length(email) <= 254 and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')),
  phone text check (
    phone is null
    or (
      length(phone) between 5 and 40
      and length(regexp_replace(phone, '[^0-9]', '', 'g')) >= 5
    )
  ),
  delivery_address text not null check (length(btrim(delivery_address)) between 5 and 500),
  order_note text check (order_note is null or length(order_note) <= 500),
  items jsonb not null,
  total numeric(12, 2) not null check (total >= 0),
  currency text not null check (currency in ('EUR', 'USD')),
  locale text not null check (locale in ('en', 'de')),
  privacy_consent boolean not null check (privacy_consent = true),
  privacy_notice_version text not null check (length(privacy_notice_version) between 1 and 40),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  constraint order_has_contact check (
    nullif(btrim(email), '') is not null or nullif(btrim(phone), '') is not null
  ),
  constraint order_items_match_total check (public.valid_order_items(items, total))
);

alter table public.admin_users enable row level security;
alter table public.orders enable row level security;
create index if not exists orders_created_at_desc_idx on public.orders (created_at desc);

revoke all on table public.admin_users from anon, authenticated;
revoke all on table public.orders from anon, authenticated;

grant select on table public.admin_users to authenticated;
grant insert (
  customer_name,
  email,
  phone,
  delivery_address,
  order_note,
  items,
  total,
  currency,
  locale,
  privacy_consent,
  privacy_notice_version,
  status
) on table public.orders to anon, authenticated;
grant select on table public.orders to authenticated;
grant update (status, reviewed_at, reviewed_by) on table public.orders to authenticated;

drop policy if exists "admin reads own allowlist entry" on public.admin_users;
create policy "admin reads own allowlist entry"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "public submits pending order" on public.orders;
create policy "public submits pending order"
  on public.orders for insert to anon, authenticated
  with check (
    status = 'pending'
    and (select public.order_intake_is_enabled())
    and privacy_consent is true
    and (email is null or nullif(btrim(email), '') is not null)
    and (phone is null or nullif(btrim(phone), '') is not null)
  );

drop policy if exists "allowlisted admin reads orders" on public.orders;
create policy "allowlisted admin reads orders"
  on public.orders for select to authenticated
  using (
    exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

drop policy if exists "allowlisted admin reviews pending orders" on public.orders;
create policy "allowlisted admin reviews pending orders"
  on public.orders for update to authenticated
  using (
    status = 'pending'
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  )
  with check (
    status in ('approved', 'rejected')
    and reviewed_by = (select auth.uid())
    and reviewed_at is not null
    and exists (
      select 1 from public.admin_users
      where admin_users.user_id = (select auth.uid())
    )
  );

-- After creating the owner's Auth user, add its UUID here in the SQL Editor:
-- insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID');
