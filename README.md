# Homiesshop

Responsive static storefront with English/German language selection, EUR/USD display, a dark theme, a searchable catalog, size selection and a browser-saved cart. The order-request flow is implemented but remains disabled until the seller completes the required setup and policies. The shop owner signs into a separate dashboard to review and approve or reject requests. This website does not take payment.

## Supabase order backend setup

GitHub Pages serves static files only. Orders and admin authentication require your Supabase project at `https://ievhdpradeetrsxcnokv.supabase.co`. The repository includes a starter schema in `supabase/setup.sql`; the project URL is prefilled in `config.js`, but the public key and privacy-policy URL remain blank. The database also has an independent order-intake switch that defaults to off, so publishing the public key for dashboard testing does not enable anonymous order inserts.

1. Create a Supabase account/project using the **Free** plan at [supabase.com/dashboard](https://supabase.com/dashboard). Choose the project region appropriate to your business and customers. Free-plan quotas and availability can change; free does not mean unlimited or guaranteed uptime.
2. Open **SQL Editor → New query**, paste and run the full contents of [`supabase/setup.sql`](supabase/setup.sql). It creates the orders and admin allowlist tables, enables row-level security, defaults public order intake to **off**, and reserves reading/reviewing orders for allowlisted authenticated users. If you already ran an earlier version of the setup before this off-by-default switch was added, also run [`supabase/disable-order-intake.sql`](supabase/disable-order-intake.sql) now. The public role cannot read or delete customer orders.
3. In Supabase, open **Authentication → Users → Add user** and create the owner’s login. Use the owner’s own account; do not share its password. Copy that user’s UUID and run the final allowlist insert in the SQL Editor, replacing the placeholder:

   ```sql
   insert into public.admin_users (user_id)
   values ('YOUR_AUTH_USER_UUID');
   ```

   Never add a customer or an untrusted user to `admin_users`. To remove admin access, delete that UUID from `public.admin_users` in the SQL Editor.
4. Open **Project Settings → API** (or **Connect**) and copy the public **anon / publishable key** for the project URL already in `config.js`. Put it in the empty `supabaseAnonKey` field and, after finishing the privacy policy, set `privacyPolicyUrl`:

   ```js
   supabaseUrl: "https://ievhdpradeetrsxcnokv.supabase.co",
   supabaseAnonKey: "YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY",
   privacyPolicyUrl: "https://homiesshop.github.io/privacy.html",
   ```

   The anon/publishable key is designed for browser use and is visible to site visitors when checkout is enabled. Do not send it in chat. **Never put a `service_role`/secret key, database password, Auth password, or private token in `config.js` or any browser file.** With RLS enabled and the supplied policies applied, the public key cannot read the order table. The key remains blank in this repository until you configure it.
5. Complete `privacy.html`: replace every bracketed legal placeholder with accurate seller identity/contact details, lawful basis, retention period and customer-rights information. Review the provider’s data location, retention, subprocessors and international-transfer terms. The page is intentionally marked as a draft; do not accept real personal data until it has been completed and reviewed for the laws that apply to the seller and their customers. Update `privacyPolicyUrl` if the completed policy is hosted elsewhere on this same site.
6. In Supabase, open **Authentication → URL Configuration** and set the Site URL to `https://homiesshop.github.io`. Add `https://homiesshop.github.io/**` to the allowed redirect URLs. The static admin page is `https://homiesshop.github.io/admin.html`.
7. After setup, make the public `config.js` settings available to the deployed static site and publish the completed `privacy.html` on `main`. GitHub Pages branch deployment serves repository-root files, so a local-only config file does not appear on the live site. The anon/publishable key is public by design, but it is intentionally not committed here. Never publish a service-role key. No build command is required.
8. Before launching, complete the privacy and seller/business details, delivery and preorder terms, import/VAT/customs disclosures, and returns information. Only then enable the public form by running `update public.order_settings set accepting_orders = true where singleton is true;` in the Supabase SQL Editor. Until then, use fictional data only. To test the admin review flow without opening public order intake, add a clearly fake row through the Supabase SQL Editor (owner SQL access bypasses RLS):

   ```sql
   insert into public.orders (
     customer_name, email, delivery_address, items, total, currency, locale,
     privacy_consent, privacy_notice_version
   ) values (
     'TEST ONLY - fictitious order', 'test@example.invalid',
     '1 Example Street, Test City, 00000',
     '[{"product_id":"test-item","name":"Test item (not for sale)","size":"M","quantity":1,"unit_price":1,"line_total":1}]'::jsonb,
     1, 'EUR', 'en', true, 'test-only'
   );
   ```

   Then sign in to `/admin.html` with the allowlisted owner account and test **Approve order** and **Reject order** on separate fake rows. Delete test rows in the Supabase SQL Editor when finished. Never ask friends to enter real personal data or make a payment during testing; explain the site is a demo and get their consent before a test.

### Checkout and access model

- The database order-intake setting defaults to off. Once the owner deliberately enables it after completing launch requirements, public visitors can submit only new `pending` orders. Database row-level security (RLS) denies anonymous reads, updates and deletes.
- Only a Supabase Auth user whose UUID is listed in `admin_users` can read orders. That user can change a pending order to `approved` or `rejected`; reviewed time and reviewer UUID are recorded.
- Contact data is personal information. The checkout explains that the name, email and/or phone number, delivery address and order go to the Supabase-hosted database; a required consent checkbox is included. Complete the privacy policy before enabling the form.
- Database access is controlled in Supabase, not by hiding `admin.html`. Anyone may open the sign-in page, but only the allowlisted account can read or review orders. The browser contains only the public anon/publishable key; the service-role key is never used.
- Most catalog entries are demo products with illustrative prices. The contrast-panel flared trousers listing is a made-to-order preview priced at €79 for the item only; delivery and import charges are excluded, and no delivery time is promised. USD conversion uses the static rate `usdPerEur: 1.08` in `config.js`; it is not a live quote. Update the exchange rate manually.
- Supabase Free has usage, storage and service limits and may change its plan terms. Public order forms can attract spam; monitor submissions and enable an appropriate CAPTCHA/rate-limit strategy if needed. Do not describe the setup as unlimited.

### Optional messenger checkout

To use the older Telegram/WhatsApp flow instead, set `checkoutMode: "messenger"` in `config.js` and fill the public `telegram` username and/or `whatsapp` international phone number. The order form remains the default mode. Messenger orders are not stored in the dashboard.

## Free GitHub Pages hosting

The live site repository is [`homiesshop/homiesshop.github.io`](https://github.com/homiesshop/homiesshop.github.io). Enable **Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save** if it is not already enabled. The URL is [https://homiesshop.github.io/](https://homiesshop.github.io/). Hosting is free for this public repository, subject to GitHub Pages terms and limits.

## Local preview

Open `index.html` in a modern browser or serve the repository root with a static server, for example:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`.
