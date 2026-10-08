-- Run this once if supabase/setup.sql was already applied before this safety
-- gate was added. Public order inserts remain disabled until explicitly enabled.

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
