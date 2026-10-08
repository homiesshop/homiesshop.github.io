# Homiesshop — демо-магазин одежды

Responsive static vintage-clothing storefront with manually selectable English/German and EUR/USD, a darker visual theme, searchable/filterable product catalog, size selection, a browser-saved cart, and order messages for Telegram or WhatsApp. No payment is taken on the site; availability, delivery and payment are agreed with the seller in chat.

## Перед публикацией

The catalog is illustrative: products, photos, sizes, descriptions and EUR prices are examples, not real inventory or offers. Replace them with your real items in `app.js`. Order contacts are not configured yet. Set the public contact details and conversion rate in `STORE_CONFIG`:

```js
const STORE_CONFIG = {
  telegram: "your_public_username", // username, 5–32 characters, optional @
  whatsapp: "79991234567",          // international number, 8–15 digits, no +, spaces or brackets
  usdPerEur: 1.08                   // demo static rate: USD received for 1 EUR
};
```

Enter at least one contact and replace `PRODUCTS` with current inventory and prices in EUR. USD display amounts are calculated using the manually configured `usdPerEur` rate; the demo rate is not live and must be updated manually. Neither sample prices nor the sample conversion rate represent current market prices or an exchange quote. Review availability and delivery terms; do not publish unverified stock or shipping claims. Unconfigured messenger channels stay disabled. Customers can open a prepared message in their chosen messenger; the order is only confirmed after the seller replies.

Visitors can choose English/German and EUR/USD independently. Both selections persist in their browser across reloads. Product prices are stored in EUR and converted for display only; there is no live currency API.

## Бесплатная публикация на GitHub Pages

Сайт не требует сборки, сервера, базы данных или платных сервисов.

1. Репозиторий сайта: [`homiesshop/homiesshop.github.io`](https://github.com/homiesshop/homiesshop.github.io). Файлы сайта лежат в корне ветки `main`.
2. Чтобы включить или проверить публикацию, откройте **Settings → Pages** в репозитории.
3. В разделе **Build and deployment** выберите **Deploy from a branch**, ветку `main` и папку `/ (root)`, затем нажмите **Save**.
4. Дождитесь завершения сборки. Адрес магазина: **https://homiesshop.github.io/**. Проверяйте результат по ссылке, показанной GitHub в настройках Pages.

Publishing through Pages is free for public repositories on GitHub Free.

Before public launch, replace the demo catalog, conversion rate and contacts. The cart and language/currency choices are saved in each visitor's browser and are not sent to a server. An order is sent only after the customer opens and submits the message in their messenger.

## Локальный просмотр

Open `index.html` in a modern browser or run a small static server from the project root, for example:

```sh
python -m http.server 8000
```

Затем откройте `http://localhost:8000`.
