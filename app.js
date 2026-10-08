"use strict";

// Add your public contact details before publishing. Leave a channel empty to keep it disabled.
const STORE_CONFIG = {
  telegram: "",
  whatsapp: ""
};

const PRODUCTS = [
  {
    id: "field-jacket",
    name: "Куртка Field No. 04",
    category: "outerwear",
    categoryLabel: "Верхняя одежда",
    price: 8900,
    badge: "Архивный силуэт",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=82",
    description: "Свободная куртка с утилитарными деталями и мягкой потёртой фактурой. Все параметры в каталоге — примеры."
  },
  {
    id: "washed-tee",
    name: "Футболка Washed Cotton",
    category: "tops",
    categoryLabel: "Верх · хлопок",
    price: 3200,
    badge: "Хлопок",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=82",
    description: "Базовая футболка с расслабленной посадкой. Мягкий хлопок и спокойный оттенок для каждого дня."
  },
  {
    id: "utility-trousers",
    name: "Брюки Utility 2001",
    category: "bottoms",
    categoryLabel: "Низ · прямой крой",
    price: 6400,
    badge: "Новая находка",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=82",
    description: "Прямые брюки с карманами и лёгким объёмом. Параметры посадки — демонстрационные."
  },
  {
    id: "track-jacket",
    name: "Ветровка Track Club",
    category: "outerwear",
    categoryLabel: "Верхняя одежда",
    price: 7200,
    badge: "Выпуск 01",
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=82",
    description: "Лёгкий верхний слой с ретро-спортивным настроением. Образ и описание показаны для примера."
  },
  {
    id: "knit-polo",
    name: "Поло Soft Knit",
    category: "tops",
    categoryLabel: "Верх · трикотаж",
    price: 4600,
    badge: "Мягкий трикотаж",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=82",
    description: "Трикотажное поло с винтажным настроением и лаконичной отделкой. Демо-карточка товара."
  },
  {
    id: "denim-overshirt",
    name: "Деним Overshirt 90s",
    category: "outerwear",
    categoryLabel: "Верхняя одежда",
    price: 7800,
    badge: "Деним",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=82",
    description: "Свободная джинсовая рубашка, которую можно носить как лёгкую куртку. Пример ассортимента."
  },
  {
    id: "retro-runner",
    name: "Кроссовки Retro Runner",
    category: "shoes",
    categoryLabel: "Обувь",
    price: 9500,
    badge: "Ретро-форма",
    sizes: ["39", "40", "41", "42", "43"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82",
    description: "Кроссовки в духе беговых моделей девяностых. Размерный ряд и наличие — демонстрационные."
  },
  {
    id: "work-shirt",
    name: "Рубашка Workwear",
    category: "tops",
    categoryLabel: "Верх · хлопок",
    price: 5100,
    badge: "Рабочая классика",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=82",
    description: "Хлопковая рубашка свободного кроя с рабочими деталями. Описание и фото — образец."
  }
];

const money = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 });
const productGrid = document.querySelector("#product-grid");
const categoryFilters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#product-search");
const sortSelect = document.querySelector("#sort-products");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const productDialog = document.querySelector("#product-dialog");
const cartDialog = document.querySelector("#cart-dialog");
const checkoutDialog = document.querySelector("#checkout-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartFooter = document.querySelector("#cart-footer");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
let activeCategory = "all";
let selectedProduct = null;
let selectedSize = "";
let toastTimer;

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("arhiv-cart") || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((item) =>
      item &&
      PRODUCTS.some((product) => product.id === item.id && product.sizes.includes(item.size)) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  } catch (error) {
    console.error("Не удалось загрузить корзину из браузера.", error);
    return [];
  }
}

let cart = readCart();

function saveCart() {
  try {
    localStorage.setItem("arhiv-cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Не удалось сохранить корзину в браузере.", error);
    showToast("Корзина останется доступна только до закрытия страницы.");
  }
}

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  document.querySelector("#all-count").textContent = String(PRODUCTS.length).padStart(2, "0");
  const products = PRODUCTS
    .filter((product) => activeCategory === "all" || product.category === activeCategory)
    .filter((product) => `${product.name} ${product.categoryLabel}`.toLocaleLowerCase("ru").includes(query))
    .sort((first, second) => {
      if (sortSelect.value === "price-asc") return first.price - second.price;
      if (sortSelect.value === "price-desc") return second.price - first.price;
      return PRODUCTS.indexOf(first) - PRODUCTS.indexOf(second);
    });

  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <div class="product-image" role="img" aria-label="${product.name}" style="background-image: url('${product.image}')"></div>
        <span class="product-badge">${product.badge}</span>
        <button class="button button-light product-quick-add" type="button" data-product="${product.id}">Выбрать размер <span aria-hidden="true">↗</span></button>
      </div>
      <div class="product-info">
        <div><h3>${product.name}</h3><span class="product-category">${product.categoryLabel}</span></div>
        <p class="product-price">${money.format(product.price)}</p>
      </div>
    </article>
  `).join("");

  resultsCount.textContent = `Показано ${products.length} ${pluralize(products.length, ["позиция", "позиции", "позиций"])}`;
  emptyState.hidden = products.length > 0;
}

function pluralize(number, forms) {
  const lastTwo = number % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return forms[2];
  const last = number % 10;
  if (last === 1) return forms[0];
  if (last >= 2 && last <= 4) return forms[1];
  return forms[2];
}

function openProduct(productId) {
  selectedProduct = getProduct(productId);
  if (!selectedProduct) return;
  selectedSize = "";
  document.querySelector("#product-dialog-image").style.backgroundImage = `url('${selectedProduct.image}')`;
  document.querySelector("#product-dialog-category").textContent = selectedProduct.categoryLabel;
  document.querySelector("#product-dialog-title").textContent = selectedProduct.name;
  document.querySelector("#product-dialog-price").textContent = money.format(selectedProduct.price);
  document.querySelector("#product-dialog-description").textContent = selectedProduct.description;
  document.querySelector("#size-list").innerHTML = selectedProduct.sizes.map((size, index) => `
    <label class="size-option">
      <input type="radio" name="product-size" value="${size}" ${index === 0 ? "checked" : ""}>
      <span>${size}</span>
    </label>
  `).join("");
  selectedSize = selectedProduct.sizes[0];
  openDialog(productDialog);
}

function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
  cartCount.textContent = String(quantity);
  document.querySelector("#cart-title-count").textContent = `(${quantity})`;
  cartItems.innerHTML = cart.map((item) => {
    const product = getProduct(item.id);
    return `
      <article class="cart-line">
        <div class="cart-line-image" role="img" aria-label="${product.name}" style="background-image: url('${product.image}')"></div>
        <div class="cart-line-details">
          <h3>${product.name}</h3>
          <p>Размер: ${item.size}</p>
          <div class="quantity-control" aria-label="Количество">
            <button type="button" data-cart-action="decrease" data-product="${item.id}" data-size="${item.size}" aria-label="Уменьшить количество">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-product="${item.id}" data-size="${item.size}" aria-label="Увеличить количество">+</button>
          </div>
        </div>
        <div class="cart-line-end">
          <span class="cart-line-price">${money.format(product.price * item.quantity)}</span>
          <button class="remove-item" type="button" data-cart-action="remove" data-product="${item.id}" data-size="${item.size}">Убрать</button>
        </div>
      </article>
    `;
  }).join("");
  document.querySelector("#cart-total").textContent = money.format(total);
  cartEmpty.classList.toggle("is-visible", cart.length === 0);
  cartFooter.hidden = cart.length === 0;
}

function updateCart(productId, size, action) {
  const item = cart.find((entry) => entry.id === productId && entry.size === size);
  if (action === "remove" && item) {
    cart = cart.filter((entry) => entry !== item);
  } else if (action === "increase" && item) {
    item.quantity += 1;
  } else if (action === "decrease" && item) {
    item.quantity -= 1;
    if (item.quantity < 1) cart = cart.filter((entry) => entry !== item);
  } else if (action === "add") {
    if (item) item.quantity += 1;
    else cart.push({ id: productId, size, quantity: 1 });
  }
  saveCart();
  renderCart();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function setDialogBodyState() {
  document.body.classList.toggle("dialog-open", Boolean(document.querySelector("dialog[open]")));
}

function openDialog(dialog) {
  dialog.showModal();
  setDialogBodyState();
}

function buildOrderMessage() {
  const name = document.querySelector("#customer-name").value.trim();
  const lines = cart.map((item) => {
    const product = getProduct(item.id);
    return `• ${product.name} — ${item.size} × ${item.quantity} — ${money.format(product.price * item.quantity)}`;
  });
  const total = cart.reduce((sum, item) => sum + getProduct(item.id).price * item.quantity, 0);
  return [
    "Здравствуйте! Хочу уточнить заказ из магазина Homiesshop:",
    ...lines,
    `Ориентировочная сумма: ${money.format(total)}`,
    name ? `Меня зовут: ${name}` : "",
    "Подскажите, пожалуйста, по наличию, доставке и оплате."
  ].filter(Boolean).join("\n");
}

function renderCheckout() {
  const summary = cart.map((item) => {
    const product = getProduct(item.id);
    return `${product.name} · ${item.size} · ${item.quantity} шт.`;
  });
  document.querySelector("#checkout-summary").textContent = summary.join("\n");

  const telegramHandle = STORE_CONFIG.telegram.trim().replace(/^@/, "");
  const whatsappNumber = STORE_CONFIG.whatsapp.replace(/\D/g, "");
  const telegramConfigured = /^[A-Za-z0-9_]{5,32}$/.test(telegramHandle);
  const whatsappConfigured = /^\d{8,15}$/.test(whatsappNumber);
  const channels = [
    {
      label: "Telegram",
      configured: telegramConfigured,
      url: telegramConfigured ? `https://t.me/${encodeURIComponent(telegramHandle)}?text=${encodeURIComponent(buildOrderMessage())}` : ""
    },
    {
      label: "WhatsApp",
      configured: whatsappConfigured,
      url: whatsappConfigured ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildOrderMessage())}` : ""
    }
  ];
  const actions = document.querySelector("#messenger-actions");
  actions.innerHTML = channels.map((channel) => channel.configured
    ? `<a class="button messenger-link" href="${channel.url}" target="_blank" rel="noopener noreferrer">Написать в ${channel.label} <span aria-hidden="true">↗</span></a>`
    : `<span class="button messenger-link is-disabled" aria-disabled="true">${channel.label} · не настроен</span>`
  ).join("");

  const notice = document.querySelector("#configuration-notice");
  notice.textContent = channels.some((channel) => channel.configured)
    ? "Сообщение откроется в выбранном мессенджере. Заказ станет подтверждённым только после ответа продавца."
    : "Мессенджер пока не подключён или контакт указан неверно. Проверьте STORE_CONFIG в app.js — инструкция есть в README.";
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  categoryFilters.querySelectorAll(".filter-button").forEach((filter) => {
    const isActive = filter === button;
    filter.classList.toggle("is-active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openProduct(button.dataset.product);
});

document.querySelector("#size-list").addEventListener("change", (event) => {
  if (event.target.matches('input[name="product-size"]')) selectedSize = event.target.value;
});

document.querySelector("#add-to-cart").addEventListener("click", () => {
  if (!selectedProduct || !selectedSize) {
    showToast("Выбери размер, чтобы добавить вещь.");
    return;
  }
  updateCart(selectedProduct.id, selectedSize, "add");
  productDialog.close();
  showToast("Добавлено в корзину.");
});

document.querySelector("#cart-trigger").addEventListener("click", () => openDialog(cartDialog));
document.querySelector("#checkout-trigger").addEventListener("click", () => {
  renderCheckout();
  openDialog(checkoutDialog);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (button) updateCart(button.dataset.product, button.dataset.size, button.dataset.cartAction);
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector(`#${button.dataset.close}`).close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", setDialogBodyState);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelector("#customer-name").addEventListener("input", () => {
  if (checkoutDialog.open) renderCheckout();
});

document.querySelector(".cart-empty .text-button").addEventListener("click", () => {
  cartDialog.close();
  document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
});

renderProducts();
renderCart();
