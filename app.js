"use strict";

// Website orders require a Supabase project and a completed privacy policy URL.
// Set checkoutMode to "messenger" to use the optional Telegram/WhatsApp checkout.
// Prices below are illustrative EUR amounts; update this static USD-per-EUR rate manually.
const STORE_CONFIG = window.HOMIESSHOP_CONFIG || {};

const PRODUCTS = [
  {
    id: "field-jacket",
    name: { en: "Field Jacket No. 04", de: "Field-Jacke Nr. 04" },
    category: "outerwear",
    categoryLabel: { en: "Outerwear", de: "Jacken" },
    priceEur: 89,
    badge: { en: "Archival silhouette", de: "Archiv-Silhouette" },
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "A relaxed jacket with utility details and a softly worn texture. Product details are illustrative.",
      de: "Eine lässige Jacke mit Utility-Details und weich verwaschener Textur. Die Produktangaben sind beispielhaft."
    }
  },
  {
    id: "washed-tee",
    name: { en: "Washed Cotton T-Shirt", de: "T-Shirt aus gewaschener Baumwolle" },
    category: "tops",
    categoryLabel: { en: "Top · cotton", de: "Oberteil · Baumwolle" },
    priceEur: 32,
    badge: { en: "Cotton", de: "Baumwolle" },
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "An everyday cotton tee with a relaxed fit and a quietly faded tone.",
      de: "Ein lässiges Baumwollshirt für jeden Tag mit entspannter Passform und sanft verwaschener Farbe."
    }
  },
  {
    id: "utility-trousers",
    name: { en: "Utility Trousers 2001", de: "Utility-Hose 2001" },
    category: "bottoms",
    categoryLabel: { en: "Bottoms · straight fit", de: "Hose · gerader Schnitt" },
    priceEur: 64,
    badge: { en: "New find", de: "Neuer Fund" },
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "Straight-leg trousers with practical pockets and a little extra room. Fit details are illustrative.",
      de: "Gerade geschnittene Hose mit praktischen Taschen und etwas mehr Bewegungsfreiheit. Die Passform ist beispielhaft."
    }
  },
  {
    id: "track-jacket",
    name: { en: "Track Club Windbreaker", de: "Track-Club-Windjacke" },
    category: "outerwear",
    categoryLabel: { en: "Outerwear", de: "Jacken" },
    priceEur: 72,
    badge: { en: "Collection 01", de: "Kollektion 01" },
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "A lightweight layer with a retro sports feel. Images and descriptions are examples.",
      de: "Eine leichte Schicht mit sportlichem Retro-Charakter. Bilder und Beschreibungen dienen als Beispiel."
    }
  },
  {
    id: "knit-polo",
    name: { en: "Soft Knit Polo", de: "Soft-Knit-Poloshirt" },
    category: "tops",
    categoryLabel: { en: "Top · knitwear", de: "Oberteil · Strick" },
    priceEur: 46,
    badge: { en: "Soft knit", de: "Weicher Strick" },
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "A knit polo with a vintage mood and understated finishing. This is a demo product.",
      de: "Ein Poloshirt aus Strick mit Vintage-Charakter und schlichten Details. Dies ist ein Demo-Produkt."
    }
  },
  {
    id: "denim-overshirt",
    name: { en: "90s Denim Overshirt", de: "Denim-Overshirt im 90er-Stil" },
    category: "outerwear",
    categoryLabel: { en: "Outerwear", de: "Jacken" },
    priceEur: 78,
    badge: { en: "Denim", de: "Denim" },
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "A roomy denim shirt that works just as well as a light jacket. Example assortment item.",
      de: "Ein lockeres Jeanshemd, das sich auch als leichte Jacke tragen lässt. Beispiel aus dem Sortiment."
    }
  },
  {
    id: "retro-runner",
    name: { en: "Retro Runner Sneakers", de: "Retro-Runner-Sneaker" },
    category: "shoes",
    categoryLabel: { en: "Shoes", de: "Schuhe" },
    priceEur: 95,
    badge: { en: "Retro shape", de: "Retro-Form" },
    sizes: ["39", "40", "41", "42", "43"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "Sneakers inspired by running styles from the nineties. Sizes and availability are examples.",
      de: "Sneaker im Stil von Laufschuhen aus den Neunzigern. Größen und Verfügbarkeit sind beispielhaft."
    }
  },
  {
    id: "work-shirt",
    name: { en: "Workwear Shirt", de: "Workwear-Hemd" },
    category: "tops",
    categoryLabel: { en: "Top · cotton", de: "Oberteil · Baumwolle" },
    priceEur: 51,
    badge: { en: "Workwear classic", de: "Workwear-Klassiker" },
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=82",
    description: {
      en: "A relaxed cotton shirt with considered workwear details. Product image and description are examples.",
      de: "Ein locker geschnittenes Baumwollhemd mit durchdachten Workwear-Details. Bild und Beschreibung sind beispielhaft."
    }
  }
];

const TEXT = {
  en: {
    documentTitle: "Homiesshop — Vintage with a past",
    metaDescription: "Homiesshop — archival silhouettes, vintage textures, and clothes with character.",
    demoBanner: "Demo store · products, photos and prices are examples",
    navCatalog: "Collection",
    navAbout: "Our story",
    navDelivery: "Ordering",
    cart: "Cart",
    languageLabel: "Language",
    currencyLabel: "Currency",
    heroEyebrow: "Timeless pieces · collection 01",
    heroTitle: "Every piece<br>has a <em>past.</em>",
    heroCopy: "Archival silhouettes, found textures, and clothes ready to become part of your story.",
    heroButton: "Explore the collection",
    heroMetaCollection: "Selection 01 / 2026",
    heroMetaOrder: "Online ordering",
    catalogEyebrow: "Selected by hand",
    catalogTitle: "New finds",
    catalogNote: "A small demo selection.<br>Replace products before launch.",
    categoryAll: "All",
    categoryOuterwear: "Outerwear",
    categoryTops: "Tops",
    categoryBottoms: "Bottoms",
    categoryShoes: "Shoes",
    searchLabel: "Search products",
    searchPlaceholder: "Find a piece",
    sortLabel: "Sort products",
    sortFeatured: "Featured first",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",
    emptySearch: "No pieces found. Try a different search or filter.",
    results: (count) => `${count} ${count === 1 ? "piece" : "pieces"} found`,
    storyEyebrow: "More than clothes",
    storyTitle: "Find what feels right.<br><em>Wear it your way.</em>",
    storyCopy: "We love pieces with character: faded cotton, an effortless fit, and details you notice over time. This is a space for those finds.",
    storyCaption: "Found. Reimagined. Yours.",
    service1Title: "Choose your piece",
    service1Copy: "Add your favourite to the cart and choose a size.",
    service2Title: "Message us",
    service2Copy: "Send an order request. We’ll review availability and get back to you to confirm.",
    service3Title: "Confirm the details",
    service3Copy: "Availability, delivery and payment are agreed in chat before purchase.",
    contactQuestion: "Need help finding the right piece?",
    contactLink: "Send an order request",
    footerTagline: "Vintage with a past. Style is yours.",
    footerCopyright: "© 2026 · Demo store",
    chooseSize: "Choose a size",
    addToCart: "Add to cart",
    demoProductDisclaimer: "Demo item: availability and details are illustrative.",
    cartEyebrow: "Your finds",
    cartEmpty: "Nothing here just yet.",
    findPiece: "Find your piece",
    estimatedTotal: "Estimated total",
    cartPaymentNote: "Payment and delivery are arranged separately after we confirm your order.",
    checkoutButton: "Continue to checkout",
    checkoutEyebrow: "One last step",
    checkoutTitle: "Place your order",
    checkoutIntro: "Enter your contact details and delivery address. We’ll review your request and confirm the order manually. No payment is taken here.",
    messengerCheckoutIntro: "Review your order and choose a messenger. Availability, delivery and payment are confirmed by the seller in chat.",
    namePrompt: "Full name",
    optional: "(optional)",
    namePlaceholder: "Name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone number",
    phonePlaceholder: "+1 555 123 4567",
    contactRequiredHint: "Please provide at least an email address or phone number.",
    addressLabel: "Delivery address",
    addressPlaceholder: "Street, number, postal code, city, country",
    orderNoteLabel: "Order note",
    orderNotePlaceholder: "Optional",
    privacyConsent: "I agree that my details may be sent to Homiesshop via Supabase to handle this order request.",
    privacyNotice: "Your name, contact details, delivery address and order are sent to the Homiesshop order database hosted by Supabase and used to process this request. No payment is collected here.",
    privacyPolicyLink: "Read the privacy policy",
    privacyPolicyMissing: "The seller must publish a completed privacy policy before enabling orders.",
    submitOrder: "Send order request",
    formNotConfigured: "Website orders are not set up yet. The seller must configure Supabase and publish a completed privacy policy. No order has been sent.",
    formSubmitPending: "Sending your order request…",
    formSubmitSuccess: "Your request was sent. The seller will review it and contact you to confirm the order.",
    formSubmitFailed: "We couldn’t send your request. Nothing was confirmed; please try again later or contact the seller.",
    formContactValidation: "Enter at least one valid email address or phone number.",
    formMissingFields: "Please complete the required fields and agree to the privacy notice.",
    messengerModeNote: "Messenger checkout is selected in the store configuration.",
    sizeLine: "Size:",
    remove: "Remove",
    quantity: "Quantity",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    checkoutGreeting: "Hello! I’d like to ask about an order from Homiesshop:",
    estimatedOrderTotal: "Estimated total:",
    customerName: "My name:",
    orderQuestion: "Could you please confirm availability, delivery and payment?",
    writeTo: "Message us on",
    notConfigured: "not set up",
    checkoutConfigured: "Your message will open in the selected messenger. The order is confirmed only after the seller replies.",
    checkoutNotConfigured: "No messenger is set up yet, or the contact details are invalid. Check config.js; see README for setup.",
    toastChooseSize: "Choose a size before adding this piece.",
    toastAdded: "Added to your cart.",
    toastCartSave: "Your cart will only be available until you close this page.",
    close: "Close"
  },
  de: {
    documentTitle: "Homiesshop — Vintage mit Geschichte",
    metaDescription: "Homiesshop — Archiv-Silhouetten, Vintage-Texturen und Kleidung mit Charakter.",
    demoBanner: "Demo-Shop · Produkte, Bilder und Preise sind Beispiele",
    navCatalog: "Kollektion",
    navAbout: "Über uns",
    navDelivery: "Bestellung",
    cart: "Warenkorb",
    languageLabel: "Sprache",
    currencyLabel: "Währung",
    heroEyebrow: "Zeitlose Stücke · Kollektion 01",
    heroTitle: "Jedes Stück<br>hat eine <em>Geschichte.</em>",
    heroCopy: "Archiv-Silhouetten, besondere Texturen und Kleidung, die Teil deiner Geschichte wird.",
    heroButton: "Kollektion entdecken",
    heroMetaCollection: "Auswahl 01 / 2026",
    heroMetaOrder: "Online bestellen",
    catalogEyebrow: "Handverlesen",
    catalogTitle: "Neue Fundstücke",
    catalogNote: "Eine kleine Demo-Auswahl.<br>Vor dem Start Produkte ersetzen.",
    categoryAll: "Alle",
    categoryOuterwear: "Jacken",
    categoryTops: "Oberteile",
    categoryBottoms: "Hosen",
    categoryShoes: "Schuhe",
    searchLabel: "Produkte suchen",
    searchPlaceholder: "Stück suchen",
    sortLabel: "Produkte sortieren",
    sortFeatured: "Empfohlene zuerst",
    sortPriceAsc: "Preis: aufsteigend",
    sortPriceDesc: "Preis: absteigend",
    emptySearch: "Keine Stücke gefunden. Ändere die Suche oder den Filter.",
    results: (count) => `${count} ${count === 1 ? "Fundstück" : "Fundstücke"} gefunden`,
    storyEyebrow: "Mehr als Kleidung",
    storyTitle: "Finde, was zu dir passt.<br><em>Trag es auf deine Art.</em>",
    storyCopy: "Wir lieben Stücke mit Charakter: verwaschene Baumwolle, eine entspannte Passform und Details, die man erst mit der Zeit entdeckt. Ein Ort für genau solche Fundstücke.",
    storyCaption: "Gefunden. Neu gedacht. Deins.",
    service1Title: "Stück auswählen",
    service1Copy: "Lege deinen Favoriten in den Warenkorb und wähle eine Größe.",
    service2Title: "Schreib uns",
    service2Copy: "Sende eine Bestellanfrage. Wir prüfen die Verfügbarkeit und melden uns zur Bestätigung.",
    service3Title: "Details abstimmen",
    service3Copy: "Verfügbarkeit, Versand und Zahlung stimmen wir vor dem Kauf im Chat ab.",
    contactQuestion: "Brauchst du Hilfe bei der Auswahl?",
    contactLink: "Bestellanfrage senden",
    footerTagline: "Vintage mit Geschichte. Dein Stil.",
    footerCopyright: "© 2026 · Demo-Shop",
    chooseSize: "Größe auswählen",
    addToCart: "In den Warenkorb",
    demoProductDisclaimer: "Demo-Produkt: Verfügbarkeit und Angaben sind beispielhaft.",
    cartEyebrow: "Deine Fundstücke",
    cartEmpty: "Hier ist es noch leer.",
    findPiece: "Fundstück entdecken",
    estimatedTotal: "Voraussichtliche Summe",
    cartPaymentNote: "Zahlung und Versand vereinbaren wir nach der Bestätigung deiner Bestellung.",
    checkoutButton: "Weiter zur Bestellung",
    checkoutEyebrow: "Nur noch ein Schritt",
    checkoutTitle: "Bestellung aufgeben",
    checkoutIntro: "Gib deine Kontaktdaten und Lieferadresse ein. Wir prüfen deine Anfrage und bestätigen die Bestellung persönlich. Hier erfolgt keine Zahlung.",
    messengerCheckoutIntro: "Prüfe deine Auswahl und wähle einen Messenger. Verfügbarkeit, Versand und Zahlung bestätigt der Verkäufer im Chat.",
    namePrompt: "Vollständiger Name",
    optional: "(optional)",
    namePlaceholder: "Name",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "du@beispiel.de",
    phoneLabel: "Telefonnummer",
    phonePlaceholder: "+49 30 123456",
    contactRequiredHint: "Bitte gib mindestens eine E-Mail-Adresse oder Telefonnummer an.",
    addressLabel: "Lieferadresse",
    addressPlaceholder: "Straße, Hausnummer, Postleitzahl, Ort, Land",
    orderNoteLabel: "Nachricht zur Bestellung",
    orderNotePlaceholder: "Optional",
    privacyConsent: "Ich stimme zu, dass meine Angaben zur Bearbeitung dieser Bestellanfrage über Supabase an Homiesshop übermittelt werden.",
    privacyNotice: "Name, Kontaktdaten, Lieferadresse und Bestellung werden an die von Supabase gehostete Homiesshop-Bestelldatenbank übermittelt und zur Bearbeitung der Anfrage verwendet. Hier erfolgt keine Zahlung.",
    privacyPolicyLink: "Datenschutzhinweise lesen",
    privacyPolicyMissing: "Der Verkäufer muss vor der Freischaltung eine vollständige Datenschutzerklärung veröffentlichen.",
    submitOrder: "Bestellanfrage senden",
    formNotConfigured: "Online-Bestellungen sind noch nicht eingerichtet. Der Verkäufer muss Supabase konfigurieren und eine vollständige Datenschutzerklärung veröffentlichen. Es wurde keine Anfrage gesendet.",
    formSubmitPending: "Bestellanfrage wird gesendet …",
    formSubmitSuccess: "Deine Anfrage wurde gesendet. Der Verkäufer prüft sie und meldet sich zur Bestätigung.",
    formSubmitFailed: "Deine Anfrage konnte nicht gesendet werden. Es wurde nichts bestätigt. Bitte versuche es später erneut oder kontaktiere den Verkäufer.",
    formContactValidation: "Gib mindestens eine gültige E-Mail-Adresse oder Telefonnummer an.",
    formMissingFields: "Bitte fülle alle Pflichtfelder aus und bestätige den Datenschutzhinweis.",
    messengerModeNote: "Der Messenger-Checkout ist in der Shop-Konfiguration ausgewählt.",
    sizeLine: "Größe:",
    remove: "Entfernen",
    quantity: "Menge",
    decreaseQuantity: "Menge verringern",
    increaseQuantity: "Menge erhöhen",
    checkoutGreeting: "Hallo! Ich möchte eine Bestellung bei Homiesshop anfragen:",
    estimatedOrderTotal: "Voraussichtliche Summe:",
    customerName: "Mein Name:",
    orderQuestion: "Könnt ihr bitte Verfügbarkeit, Versand und Zahlung bestätigen?",
    writeTo: "Auf",
    notConfigured: "nicht eingerichtet",
    checkoutConfigured: "Deine Nachricht wird im ausgewählten Messenger geöffnet. Die Bestellung gilt erst nach der Antwort des Verkäufers als bestätigt.",
    checkoutNotConfigured: "Noch kein Messenger eingerichtet oder die Kontaktdaten sind ungültig. Prüfe STORE_CONFIG in app.js; die Anleitung steht in der README.",
    toastChooseSize: "Wähle zuerst eine Größe aus.",
    toastAdded: "In den Warenkorb gelegt.",
    toastCartSave: "Der Warenkorb bleibt nur bis zum Schließen dieser Seite verfügbar.",
    close: "Schließen"
  }
};

const LANGUAGE_KEY = "homiesshop-language";
const CURRENCY_KEY = "homiesshop-currency";
const CART_KEY = "arhiv-cart";
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
const languageSelect = document.querySelector("#language-select");
const currencySelect = document.querySelector("#currency-select");
const checkoutForm = document.querySelector("#checkout-form");
const formStatus = document.querySelector("#form-status");
const backendUrl = typeof STORE_CONFIG.supabaseUrl === "string" ? STORE_CONFIG.supabaseUrl.trim() : "";
const backendKey = typeof STORE_CONFIG.supabaseAnonKey === "string" ? STORE_CONFIG.supabaseAnonKey.trim() : "";
const backendUrlIsValid = (() => {
  try {
    const url = new URL(backendUrl);
    return url.protocol === "https:" &&
      url.hostname.endsWith(".supabase.co") &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.pathname === "/";
  } catch {
    return false;
  }
})();
const supabaseClient = backendUrlIsValid && backendKey && window.supabase?.createClient
  ? window.supabase.createClient(backendUrl, backendKey)
  : null;
const validPrivacyPolicyUrl = getPrivacyPolicyUrl();
let activeCategory = "all";
let selectedProduct = null;
let selectedSize = "";
let toastTimer;
let orderSubmitting = false;
let formStatusKey = "";
let formStatusState = "";

function readPreference(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch (error) {
    console.error("Could not read store preferences.", error);
    return fallback;
  }
}

let language = readPreference(LANGUAGE_KEY, ["en", "de"], "en");
let currency = readPreference(CURRENCY_KEY, ["EUR", "USD"], "EUR");

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Could not save store preferences.", error);
  }
}

function text(key) {
  return TEXT[language][key];
}

function formatMoney(priceEur) {
  const amount = currency === "USD" ? priceEur * Number(STORE_CONFIG.usdPerEur) : priceEur;
  const locale = language === "de" ? "de-DE" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
}

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((item) =>
      item &&
      PRODUCTS.some((product) => product.id === item.id && product.sizes.includes(item.size)) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  } catch (error) {
    console.error("Could not load the cart from this browser.", error);
    return [];
  }
}

let cart = readCart();

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Could not save the cart in this browser.", error);
    showToast(text("toastCartSave"));
  }
}

function getProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function localized(value) {
  return value[language];
}

function renderStaticText() {
  document.documentElement.lang = language;
  document.title = text("documentTitle");
  document.querySelector('meta[name="description"]').content = text("metaDescription");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = text(key);
    if (value !== undefined) {
      if (key === "heroTitle" || key === "storyTitle" || key === "catalogNote") element.innerHTML = value;
      else element.textContent = value;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = text(element.dataset.i18nPlaceholder);
  });
  document.querySelector(".main-nav").setAttribute("aria-label", language === "de" ? "Hauptnavigation" : "Main navigation");
  document.querySelector("#category-filters").setAttribute("aria-label", language === "de" ? "Nach Kategorie filtern" : "Filter by category");
  document.querySelector("#cart-trigger").setAttribute("aria-label", language === "de" ? "Warenkorb öffnen" : "Open cart");
  languageSelect.setAttribute("aria-label", text("languageLabel"));
  currencySelect.setAttribute("aria-label", text("currencyLabel"));
  document.querySelectorAll(".dialog-close").forEach((button) => button.setAttribute("aria-label", text("close")));
  document.querySelector(".wordmark").setAttribute("aria-label", language === "de" ? "Homiesshop — Startseite" : "Homiesshop — home");
  document.querySelector(".hero-image").setAttribute("aria-label", language === "de" ? "Vintage-inspiriertes Outfit" : "Vintage-inspired outfit");
  document.querySelector("#sort-products").setAttribute("aria-label", text("sortLabel"));
  document.querySelector("#product-search").setAttribute("aria-label", text("searchLabel"));
  document.querySelector("#delivery").setAttribute("aria-label", language === "de" ? "So funktioniert die Bestellung" : "How ordering works");
  languageSelect.value = language;
  currencySelect.value = currency;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase(language === "de" ? "de" : "en");
  document.querySelector("#all-count").textContent = String(PRODUCTS.length).padStart(2, "0");
  const products = PRODUCTS
    .filter((product) => activeCategory === "all" || product.category === activeCategory)
    .filter((product) => `${product.name.en} ${product.name.de} ${product.categoryLabel.en} ${product.categoryLabel.de}`.toLocaleLowerCase().includes(query))
    .sort((first, second) => {
      if (sortSelect.value === "price-asc") return first.priceEur - second.priceEur;
      if (sortSelect.value === "price-desc") return second.priceEur - first.priceEur;
      return PRODUCTS.indexOf(first) - PRODUCTS.indexOf(second);
    });

  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <div class="product-image" role="img" aria-label="${localized(product.name)}" style="background-image: url('${product.image}')"></div>
        <span class="product-badge">${localized(product.badge)}</span>
        <button class="button button-light product-quick-add" type="button" data-product="${product.id}">${text("chooseSize")} <span aria-hidden="true">↗</span></button>
      </div>
      <div class="product-info">
        <div><h3>${localized(product.name)}</h3><span class="product-category">${localized(product.categoryLabel)}</span></div>
        <p class="product-price">${formatMoney(product.priceEur)}</p>
      </div>
    </article>
  `).join("");

  resultsCount.textContent = text("results")(products.length);
  emptyState.hidden = products.length > 0;
}

function openProduct(productId, preserveSize = false) {
  selectedProduct = getProduct(productId);
  if (!selectedProduct) return;
  if (!preserveSize || !selectedProduct.sizes.includes(selectedSize)) selectedSize = selectedProduct.sizes[0];
  document.querySelector("#product-dialog-image").style.backgroundImage = `url('${selectedProduct.image}')`;
  document.querySelector("#product-dialog-category").textContent = localized(selectedProduct.categoryLabel);
  document.querySelector("#product-dialog-title").textContent = localized(selectedProduct.name);
  document.querySelector("#product-dialog-price").textContent = formatMoney(selectedProduct.priceEur);
  document.querySelector("#product-dialog-description").textContent = localized(selectedProduct.description);
  document.querySelector("#size-list").innerHTML = selectedProduct.sizes.map((size) => `
    <label class="size-option">
      <input type="radio" name="product-size" value="${size}" ${size === selectedSize ? "checked" : ""}>
      <span>${size}</span>
    </label>
  `).join("");
  if (!productDialog.open) openDialog(productDialog);
}

function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalEur = cart.reduce((sum, item) => sum + getProduct(item.id).priceEur * item.quantity, 0);
  cartCount.textContent = String(quantity);
  document.querySelector("#cart-title-count").textContent = `(${quantity})`;
  cartItems.innerHTML = cart.map((item) => {
    const product = getProduct(item.id);
    return `
      <article class="cart-line">
        <div class="cart-line-image" role="img" aria-label="${localized(product.name)}" style="background-image: url('${product.image}')"></div>
        <div class="cart-line-details">
          <h3>${localized(product.name)}</h3>
          <p>${text("sizeLine")} ${item.size}</p>
          <div class="quantity-control" aria-label="${text("quantity")}">
            <button type="button" data-cart-action="decrease" data-product="${item.id}" data-size="${item.size}" aria-label="${text("decreaseQuantity")}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-product="${item.id}" data-size="${item.size}" aria-label="${text("increaseQuantity")}">+</button>
          </div>
        </div>
        <div class="cart-line-end">
          <span class="cart-line-price">${formatMoney(product.priceEur * item.quantity)}</span>
          <button class="remove-item" type="button" data-cart-action="remove" data-product="${item.id}" data-size="${item.size}">${text("remove")}</button>
        </div>
      </article>
    `;
  }).join("");
  document.querySelector("#cart-total").textContent = formatMoney(totalEur);
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
  const name = document.querySelector("#messenger-name").value.trim();
  const lines = cart.map((item) => {
    const product = getProduct(item.id);
    return `• ${localized(product.name)} — ${text("sizeLine")} ${item.size} × ${item.quantity} — ${formatMoney(product.priceEur * item.quantity)}`;
  });
  const totalEur = cart.reduce((sum, item) => sum + getProduct(item.id).priceEur * item.quantity, 0);
  return [
    text("checkoutGreeting"),
    ...lines,
    `${text("estimatedOrderTotal")} ${formatMoney(totalEur)}`,
    name ? `${text("customerName")} ${name}` : "",
    text("orderQuestion")
  ].filter(Boolean).join("\n");
}

function renderCheckout() {
  const summary = cart.map((item) => {
    const product = getProduct(item.id);
    return `${localized(product.name)} · ${item.size} · ${item.quantity} ${language === "de" ? "Stk." : item.quantity === 1 ? "pc." : "pcs."} · ${formatMoney(product.priceEur * item.quantity)}`;
  });
  document.querySelector("#checkout-summary").textContent = summary.join("\n");

  const messengerMode = STORE_CONFIG.checkoutMode === "messenger";
  const formCheckout = document.querySelector("#form-checkout");
  const messengerCheckout = document.querySelector("#messenger-checkout");
  formCheckout.hidden = messengerMode;
  messengerCheckout.hidden = !messengerMode;
  document.querySelector("#checkout-intro").textContent = text(messengerMode ? "messengerCheckoutIntro" : "checkoutIntro");

  const formIsReady = Boolean(supabaseClient && validPrivacyPolicyUrl);
  const submitButton = document.querySelector("#submit-order");
  submitButton.disabled = !formIsReady || cart.length === 0 || orderSubmitting;
  document.querySelector("#privacy-policy-link").hidden = !validPrivacyPolicyUrl;
  document.querySelector("#privacy-policy-link").href = validPrivacyPolicyUrl || "privacy.html";
  document.querySelector("#privacy-policy-missing").hidden = Boolean(validPrivacyPolicyUrl);
  if (orderSubmitting) {
    setFormStatus(text("formSubmitPending"), "pending", "formSubmitPending");
  } else if (formStatusKey) {
    setFormStatus(text(formStatusKey), formStatusState, formStatusKey);
  } else if (!messengerMode && !formIsReady) {
    setFormStatus(text("formNotConfigured"), "warning", "formNotConfigured");
  } else {
    formStatus.textContent = "";
    formStatus.className = "form-status";
  }

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
    ? `<a class="button messenger-link" href="${channel.url}" target="_blank" rel="noopener noreferrer">${text("writeTo")} ${channel.label} <span aria-hidden="true">↗</span></a>`
    : `<span class="button messenger-link is-disabled" aria-disabled="true">${channel.label} · ${text("notConfigured")}</span>`
  ).join("");

  const notice = document.querySelector("#configuration-notice");
  notice.hidden = !messengerMode;
  notice.textContent = channels.some((channel) => channel.configured)
    ? text("checkoutConfigured")
    : text("checkoutNotConfigured");

}

function getPrivacyPolicyUrl() {
  const configuredUrl = typeof STORE_CONFIG.privacyPolicyUrl === "string" ? STORE_CONFIG.privacyPolicyUrl.trim() : "";
  if (!configuredUrl) return "";
  try {
    const url = new URL(configuredUrl, window.location.href);
    return url.protocol === "https:" && url.origin === window.location.origin ? url.href : "";
  } catch (error) {
    console.error("The configured privacy policy URL is invalid.", error);
    return "";
  }
}

function setFormStatus(message, state, key = "") {
  formStatus.textContent = message;
  formStatus.className = `form-status is-${state}`;
  formStatusKey = key;
  formStatusState = state;
}

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (orderSubmitting || STORE_CONFIG.checkoutMode === "messenger" || !supabaseClient || cart.length === 0 || !validPrivacyPolicyUrl) {
    setFormStatus(text("formNotConfigured"), "warning", "formNotConfigured");
    return;
  }
  if (!checkoutForm.reportValidity()) {
    setFormStatus(text("formMissingFields"), "error", "formMissingFields");
    return;
  }
  const email = document.querySelector("#customer-email").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  if (!email && !phone || phone && phone.replace(/\D/g, "").length < 5) {
    setFormStatus(text("formContactValidation"), "error", "formContactValidation");
    (phone && phone.replace(/\D/g, "").length < 5
      ? document.querySelector("#customer-phone")
      : document.querySelector("#customer-email")).focus();
    return;
  }

  const submitButton = document.querySelector("#submit-order");
  orderSubmitting = true;
  submitButton.disabled = true;
  setFormStatus(text("formSubmitPending"), "pending", "formSubmitPending");
  try {
    const items = cart.map((item) => {
      const product = getProduct(item.id);
      const unitPrice = currency === "USD" ? product.priceEur * Number(STORE_CONFIG.usdPerEur) : product.priceEur;
      const lineTotal = unitPrice * item.quantity;
      return {
        product_id: product.id,
        name: localized(product.name),
        size: item.size,
        quantity: item.quantity,
        unit_price: Number(unitPrice.toFixed(2)),
        line_total: Number(lineTotal.toFixed(2))
      };
    });
    const total = Number(items.reduce((sum, item) => sum + item.line_total, 0).toFixed(2));
    const { error } = await supabaseClient.from("orders").insert({
      customer_name: document.querySelector("#customer-name").value.trim(),
      email: email || null,
      phone: phone || null,
      delivery_address: document.querySelector("#delivery-address").value.trim(),
      order_note: document.querySelector("#order-note").value.trim() || null,
      items,
      total,
      currency,
      locale: language,
      privacy_consent: true,
      privacy_notice_version: "2026-10-08-v1"
    });
    if (error) throw error;
    setFormStatus(text("formSubmitSuccess"), "success", "formSubmitSuccess");
    cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
  } catch (error) {
    console.error("Order form submission failed.", error);
    setFormStatus(text("formSubmitFailed"), "error", "formSubmitFailed");
  } finally {
    orderSubmitting = false;
    submitButton.disabled = !supabaseClient || !validPrivacyPolicyUrl || cart.length === 0;
  }
});

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
languageSelect.addEventListener("change", () => {
  language = languageSelect.value;
  savePreference(LANGUAGE_KEY, language);
  renderStaticText();
  renderProducts();
  renderCart();
  if (productDialog.open && selectedProduct) openProduct(selectedProduct.id, true);
  if (checkoutDialog.open) renderCheckout();
});
currencySelect.addEventListener("change", () => {
  currency = currencySelect.value;
  savePreference(CURRENCY_KEY, currency);
  renderProducts();
  renderCart();
  if (productDialog.open && selectedProduct) openProduct(selectedProduct.id, true);
  if (checkoutDialog.open) renderCheckout();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (button) openProduct(button.dataset.product);
});

document.querySelector("#size-list").addEventListener("change", (event) => {
  if (event.target.matches('input[name="product-size"]')) selectedSize = event.target.value;
});

document.querySelector("#add-to-cart").addEventListener("click", () => {
  if (!selectedProduct || !selectedSize) {
    showToast(text("toastChooseSize"));
    return;
  }
  updateCart(selectedProduct.id, selectedSize, "add");
  productDialog.close();
  showToast(text("toastAdded"));
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

document.querySelector("#messenger-name").addEventListener("input", () => {
  if (checkoutDialog.open && STORE_CONFIG.checkoutMode === "messenger") renderCheckout();
});

document.querySelector(".cart-empty .text-button").addEventListener("click", () => {
  cartDialog.close();
  document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
});

renderStaticText();
renderProducts();
renderCart();
