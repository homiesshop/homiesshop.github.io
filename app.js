"use strict";

// Website orders require a Supabase project and a completed privacy policy URL.
// Set checkoutMode to "messenger" to use the optional Telegram/WhatsApp checkout.
// Demo products have example prices; confirmed item prices use the approximate
// CNY/EUR rate stated in their localized price notes.
// Update this static USD-per-EUR rate manually.
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
    id: "contrast-panel-trousers",
    name: { en: "Contrast-Panel Flared Trousers", de: "Schlaghose mit Kontrastpaneelen" },
    category: "bottoms",
    categoryLabel: { en: "Bottoms", de: "Hose" },
    priceEur: 77.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL"],
    image: "images/products/contrast-panel-trousers-front.jpg",
    images: [
      "images/products/contrast-panel-trousers-front.jpg",
      "images/products/contrast-panel-trousers-back.jpg",
      "images/products/O1CN01MZKZxJ1QZ0wcNuL3n_!!365081989.jpg",
      "images/products/O1CN01XZ1Lfv1QZ0w1xvm3o_!!365081989.jpg"
    ],
    imageAlt: {
      en: [
        "Front view of the black-and-white contrast-panel trousers",
        "Back view of the black-and-white contrast-panel trousers",
        "Model wearing the black-and-white contrast-panel trousers"
      ],
      de: [
        "Vorderansicht der schwarz-weißen Hose mit Kontrastpaneelen",
        "Rückansicht der schwarz-weißen Hose mit Kontrastpaneelen",
        "Model trägt die schwarz-weiße Hose mit Kontrastpaneelen"
      ]
    },
    description: {
      en: "Black-and-white contrast panels with a flared leg.\n\nSize chart (cm):\nS: length 109 · waist 74 · hip 96 · thigh 59\nM: length 111 · waist 77 · hip 99 · thigh 61\nL: length 113 · waist 80 · hip 102 · thigh 63\nXL: length 115 · waist 83 · hip 105 · thigh 65",
      de: "Schwarz-weiße Kontrastpaneele und ausgestelltes Bein.\n\nGrößentabelle (cm):\nS: Länge 109 · Taille 74 · Hüfte 96 · Oberschenkel 59\nM: Länge 111 · Taille 77 · Hüfte 99 · Oberschenkel 61\nL: Länge 113 · Taille 80 · Hüfte 102 · Oberschenkel 63\nXL: Länge 115 · Taille 83 · Hüfte 105 · Oberschenkel 65"
    }
  },
  {
    id: "distressed-zip-hoodie",
    name: { en: "Distressed Graphic Zip Hoodie", de: "Distressed-Zip-Hoodie mit Schriftprint" },
    category: "tops",
    categoryLabel: { en: "Top · zip hoodie", de: "Oberteil · Zip-Hoodie" },
    priceEur: 61.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL"],
    image: "images/products/distressed-zip-hoodie-front.jpg",
    images: [
      "images/products/distressed-zip-hoodie-front.jpg",
      "images/products/distressed-zip-hoodie-back-new.jpg",
      "images/products/distressed-zip-hoodie-hood-detail-new.jpg",
      "images/products/O1CN01IH3828KnG6F4Swwv_!!3281198393.jpg"
    ],
    imageAlt: {
      en: [
        "Front view of the black distressed zip hoodie with a text graphic",
        "Back view of a black distressed zip hoodie",
        "Close-up of the hood and distressed fabric"
      ],
      de: [
        "Vorderansicht des schwarzen Zip-Hoodies mit Schriftmotiv",
        "Rückansicht eines schwarzen Zip-Hoodies mit Distressed-Details",
        "Detailansicht der Kapuze und des Used-Looks"
      ]
    },
    description: {
      en: "Black zip hoodie with a washed, distressed finish, front pockets and a text graphic.\n\nSize chart (cm):\nS: length 67 · chest 64 · shoulder 64 · sleeve 59\nM: length 69 · chest 66 · shoulder 66 · sleeve 60\nL: length 72 · chest 69 · shoulder 68 · sleeve 61\nXL: length 74 · chest 71 · shoulder 70 · sleeve 62\n\nMeasurements are listed as provided; compare them with a similar garment for fit.",
      de: "Schwarzer Zip-Hoodie mit verwaschenem Used-Look, Fronttaschen und Schriftmotiv.\n\nGrößentabelle (cm):\nS: Länge 67 · Brust 64 · Schulter 64 · Ärmel 59\nM: Länge 69 · Brust 66 · Schulter 66 · Ärmel 60\nL: Länge 72 · Brust 69 · Schulter 68 · Ärmel 61\nXL: Länge 74 · Brust 71 · Schulter 70 · Ärmel 62\n\nDie Maße sind wie angegeben übernommen; vergleiche sie für die Passform mit einem ähnlichen Kleidungsstück."
    }
  },
  {
    id: "graphic-long-sleeve",
    name: { en: "Graphic Long-Sleeve Tee", de: "Langarmshirt mit Schriftprint" },
    category: "tops",
    categoryLabel: { en: "Top · long sleeve", de: "Oberteil · Langarm" },
    priceEur: 46.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL"],
    image: "images/products/graphic-long-sleeve-front.jpg",
    images: [
      "images/products/graphic-long-sleeve-front.jpg",
      "images/products/graphic-long-sleeve-back.jpg",
      "images/products/O1CN01Kb9NN11NMEyeFA2Yr_!!1701471555.jpg",
      "images/products/O1CN01nlgL2G1NMEydJhzgu_!!1701471555.jpg"
    ],
    imageAlt: {
      en: [
        "Front view of a cream long-sleeve tee with a text graphic",
        "Back view of the cream long-sleeve tee"
      ],
      de: [
        "Vorderansicht eines cremefarbenen Langarmshirts mit Schriftmotiv",
        "Rückansicht des cremefarbenen Langarmshirts"
      ]
    },
    description: {
      en: "Cream long-sleeve tee with a relaxed shape and a bold text graphic. Available in sizes S–XL.",
      de: "Cremefarbenes Langarmshirt mit lockerer Passform und markantem Schriftmotiv. Erhältlich in den Größen S–XL."
    }
  },
  {
    id: "grey-graphic-zip-hoodie",
    name: { en: "Grey Graphic Zip Hoodie", de: "Grauer Zip-Hoodie mit Print" },
    category: "tops",
    categoryLabel: { en: "Top · zip hoodie", de: "Oberteil · Zip-Hoodie" },
    priceEur: 91.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "images/products/grey-graphic-zip-hoodie-front.jpg",
    images: [
      "images/products/grey-graphic-zip-hoodie-front.jpg",
      "images/products/grey-graphic-zip-hoodie-back.jpg",
      "images/products/O1CN01Lovxeq5CE1K4Swwv_!!3281198393.jpg",
      "images/products/O1CN01PdTjpi2Bs3KU3NA4e_!!3281198393.jpg",
      "images/products/O1CN01uObNre2Bs3KUsaXPo_!!3281198393.jpg"
    ],
    imageAlt: {
      en: [
        "Front view of a grey zip hoodie with a red graphic",
        "Back view of the grey zip hoodie"
      ],
      de: [
        "Vorderansicht eines grauen Zip-Hoodies mit rotem Motiv",
        "Rückansicht des grauen Zip-Hoodies"
      ]
    },
    description: {
      en: "Grey zip hoodie with a red graphic and a relaxed silhouette.\n\nSize chart (cm):\nS: length 68 · chest 65 · shoulder 67 · sleeve 54\nM: length 70 · chest 67 · shoulder 69 · sleeve 55\nL: length 72 · chest 69 · shoulder 71 · sleeve 56\nXL: length 74 · chest 71 · shoulder 73 · sleeve 57\nXXL: length 76 · chest 73 · shoulder 75 · sleeve 58\n\nMeasurements are listed as provided; compare them with a similar garment for fit.",
      de: "Grauer Zip-Hoodie mit rotem Motiv und lockerer Silhouette.\n\nGrößentabelle (cm):\nS: Länge 68 · Brust 65 · Schulter 67 · Ärmel 54\nM: Länge 70 · Brust 67 · Schulter 69 · Ärmel 55\nL: Länge 72 · Brust 69 · Schulter 71 · Ärmel 56\nXL: Länge 74 · Brust 71 · Schulter 73 · Ärmel 57\nXXL: Länge 76 · Brust 73 · Schulter 75 · Ärmel 58\n\nDie Maße sind wie angegeben übernommen; vergleiche sie für die Passform mit einem ähnlichen Kleidungsstück."
    }
  },
  {
    id: "black-diagonal-zip-jacket",
    name: { en: "Black Diagonal-Zip Jacket", de: "Schwarze Jacke mit Diagonalreißverschluss" },
    category: "outerwear",
    categoryLabel: { en: "Outerwear · jacket", de: "Jacke · Outerwear" },
    priceEur: 65.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL"],
    image: "images/products/black-diagonal-zip-jacket-corrected.png",
    images: [
      "images/products/black-diagonal-zip-jacket-corrected.png",
      "images/products/black-diagonal-zip-jacket-detail.jpg",
      "images/products/O1CN016LbrC11QZ0wbmY7ZL_!!365081989.jpg",
      "images/products/O1CN0181jEt21QZ0wbmZvnR_!!365081989.jpg",
      "images/products/O1CN01hH2YmC1QZ0w1uZOhG_!!365081989.jpg"
    ],
    imageAlt: {
      en: [
        "Black jacket with a diagonal zipper, laid flat",
        "Close-up of the black jacket's zipper and collar"
      ],
      de: [
        "Schwarze Jacke mit diagonalem Reißverschluss, flach ausgelegt",
        "Detailansicht des Reißverschlusses und Kragens"
      ]
    },
    description: {
      en: "Black cropped jacket with a collar, zip pockets and an angled front zipper. Available in sizes S–XL.",
      de: "Schwarze kurze Jacke mit Kragen, Reißverschlusstaschen und schrägem Frontreißverschluss. Erhältlich in den Größen S–XL."
    }
  },
  {
    id: "black-contrast-hood-jacket",
    name: { en: "Black Contrast-Hood Jacket", de: "Schwarze Jacke mit Kontrastkapuze" },
    category: "outerwear",
    categoryLabel: { en: "Outerwear · jacket", de: "Jacke · Outerwear" },
    priceEur: 80.99,
    priceNote: {
      en: "Approximate item price at 1 EUR ≈ ¥7.4972; shipping is not included.",
      de: "Ungefährer Artikelpreis bei 1 EUR ≈ ¥7,4972; Versandkosten sind nicht enthalten."
    },
    badge: { en: "New arrival", de: "Neu" },
    isDemo: false,
    sizes: ["S", "M", "L", "XL"],
    image: "images/products/black-contrast-hood-jacket-front.jpg",
    images: [
      "images/products/black-contrast-hood-jacket-front.jpg",
      "images/products/black-contrast-hood-jacket-detail.jpg",
      "images/products/O1CN01MZKZxJ1QZ0wcNuL3n_!!365081989.jpg",
      "images/products/O1CN01hH2YmC1QZ0w1uZOhG_!!365081989.jpg",
      "images/products/O1CN01zpq4HS1QZ0w3c4yGt_!!365081989.jpg"
    ],
    imageAlt: {
      en: [
        "Black jacket with a light contrasting hood",
        "Close-up of the contrasting hood and front closure"
      ],
      de: [
        "Schwarze Jacke mit heller Kontrastkapuze",
        "Detailansicht der Kontrastkapuze und des Frontverschlusses"
      ]
    },
    description: {
      en: "Black jacket with a light contrasting hood and zip pockets.\n\nSize chart (cm):\nS: length 53 · chest 78 · waist 66 · sleeve 60\nM: length 54 · chest 82 · waist 70 · sleeve 61\nL: length 55 · chest 86 · waist 74 · sleeve 62\nXL: length 56 · chest 90 · waist 78 · sleeve 63\n\nMeasurements are listed as provided; compare them with a similar garment for fit.",
      de: "Schwarze Jacke mit heller Kontrastkapuze und Reißverschlusstaschen.\n\nGrößentabelle (cm):\nS: Länge 53 · Brust 78 · Taille 66 · Ärmel 60\nM: Länge 54 · Brust 82 · Taille 70 · Ärmel 61\nL: Länge 55 · Brust 86 · Taille 74 · Ärmel 62\nXL: Länge 56 · Brust 90 · Taille 78 · Ärmel 63\n\nDie Maße sind wie angegeben übernommen; vergleiche sie für die Passform mit einem ähnlichen Kleidungsstück."
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
    demoBanner: "Collection preview · online orders are currently unavailable",
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
    heroMetaOrder: "Orders are not open yet",
    catalogEyebrow: "Selected by hand",
    catalogTitle: "New finds",
    catalogNote: "Sample pieces and selected new arrivals.<br>Online orders are currently unavailable.",
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
    service2Title: "Ordering is closed",
    service2Copy: "Online order requests are not being accepted yet. Check back after the shop is ready.",
    service3Title: "Before launch",
    service3Copy: "Delivery and payment terms will be published before ordering opens.",
    contactQuestion: "Browsing the collection?",
    contactLink: "Explore the collection",
    footerTagline: "Vintage with a past. Style is yours.",
    footerCopyright: "© 2026 · Homiesshop",
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
    demoBanner: "Kollektion · Online-Bestellungen sind derzeit nicht möglich",
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
    heroMetaOrder: "Bestellungen sind noch geschlossen",
    catalogEyebrow: "Handverlesen",
    catalogTitle: "Neue Fundstücke",
    catalogNote: "Beispielartikel und ausgewählte Neuheiten.<br>Online-Bestellungen sind derzeit nicht möglich.",
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
    service2Title: "Bestellannahme geschlossen",
    service2Copy: "Online-Bestellanfragen werden noch nicht angenommen. Schau wieder vorbei, sobald der Shop bereit ist.",
    service3Title: "Vor dem Start",
    service3Copy: "Versand- und Zahlungsbedingungen werden vor Öffnung der Bestellungen veröffentlicht.",
    contactQuestion: "Möchtest du die Kollektion ansehen?",
    contactLink: "Kollektion entdecken",
    footerTagline: "Vintage mit Geschichte. Dein Stil.",
    footerCopyright: "© 2026 · Homiesshop",
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
  },
  ru: {
    documentTitle: "Homiesshop — Винтаж с историей",
    metaDescription: "Homiesshop — архивные силуэты, винтажные фактуры и одежда с характером.",
    demoBanner: "Превью коллекции · онлайн-заказы временно недоступны",
    navCatalog: "Коллекция",
    navAbout: "О нас",
    navDelivery: "Заказ",
    cart: "Корзина",
    languageLabel: "Язык",
    currencyLabel: "Валюта",
    heroEyebrow: "Вечные вещи · коллекция 01",
    heroTitle: "Каждая вещь<br>имеет <em>прошлое.</em>",
    heroCopy: "Архивные силуэты, найденные текстуры и одежда, которая станет частью вашей истории.",
    heroButton: "Посмотреть коллекцию",
    heroMetaCollection: "Выборка 01 / 2026",
    heroMetaOrder: "Заказы пока закрыты",
    catalogEyebrow: "Подобрано вручную",
    catalogTitle: "Новые находки",
    catalogNote: "Пробные вещи и выбранные новинки.<br>Онлайн-заказы временно недоступны.",
    categoryAll: "Все",
    categoryOuterwear: "Верхняя одежда",
    categoryTops: "Топы",
    categoryBottoms: "Низ",
    categoryShoes: "Обувь",
    searchLabel: "Поиск товаров",
    searchPlaceholder: "Найти вещь",
    sortLabel: "Сортировать товары",
    sortFeatured: "Сначала рекомендуемые",
    sortPriceAsc: "Цена: по возрастанию",
    sortPriceDesc: "Цена: по убыванию",
    emptySearch: "Ничего не найдено. Попробуйте другой запрос или фильтр.",
    results: (count) => `${count} ${count === 1 ? "вещь" : count < 5 ? "вещи" : "вещей"} найдено`,
    storyEyebrow: "Больше, чем одежда",
    storyTitle: "Найди то, что подходит именно тебе.<br><em>Носи по-своему.</em>",
    storyCopy: "Нам нравятся вещи с характером: выцветший хлопок, свободная посадка и детали, которые становятся заметнее со временем.",
    storyCaption: "Найдено. Пересобрано. Твоё.",
    service1Title: "Выбери вещь",
    service1Copy: "Добавь понравившуюся в корзину и выбери размер.",
    service2Title: "Приём заказов закрыт",
    service2Copy: "Онлайн-запросы на заказ пока не принимаются. Загляните позже, когда магазин будет готов.",
    service3Title: "До запуска",
    service3Copy: "Условия доставки и оплаты будут опубликованы до открытия заказов.",
    contactQuestion: "Смотрите коллекцию?",
    contactLink: "Посмотреть коллекцию",
    footerTagline: "Винтаж с прошлым. Стиль — ваш.",
    footerCopyright: "© 2026 · Homiesshop",
    chooseSize: "Выберите размер",
    addToCart: "В корзину",
    demoProductDisclaimer: "Демо-товар: наличие и детали являются примерными.",
    cartEyebrow: "Ваши находки",
    cartEmpty: "Здесь пока пусто.",
    findPiece: "Найти вещь",
    estimatedTotal: "Примерная сумма",
    cartPaymentNote: "Оплата и доставка согласовываются отдельно после подтверждения заказа.",
    checkoutButton: "Продолжить оформление",
    checkoutEyebrow: "Остался один шаг",
    checkoutTitle: "Оформить заказ",
    checkoutIntro: "Укажите контакты и адрес доставки. Мы проверим запрос и подтвердим заказ вручную. Оплата здесь не принимается.",
    messengerCheckoutIntro: "Проверьте заказ и выберите мессенджер. Доступность, доставка и оплата подтверждаются продавцом в чате.",
    namePrompt: "Полное имя",
    optional: "(необязательно)",
    namePlaceholder: "Имя",
    emailLabel: "Электронная почта",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Телефон",
    phonePlaceholder: "+7 999 123 4567",
    contactRequiredHint: "Укажите хотя бы адрес электронной почты или номер телефона.",
    addressLabel: "Адрес доставки",
    addressPlaceholder: "Улица, дом, индекс, город, страна",
    orderNoteLabel: "Комментарий к заказу",
    orderNotePlaceholder: "Необязательно",
    privacyConsent: "Я согласен, что мои данные могут быть отправлены в Homiesshop через Supabase для обработки этого заказа.",
    privacyNotice: "Имя, контакты, адрес доставки и информация о заказе передаются в базу данных заказов Homiesshop, расположенную на Supabase, и используются для обработки запроса. Оплата здесь не производится.",
    privacyPolicyLink: "Прочитать политику конфиденциальности",
    privacyPolicyMissing: "Продавец должен опубликовать актуальную политику конфиденциальности перед открытием заказов.",
    submitOrder: "Отправить запрос",
    formNotConfigured: "Онлайн-заказы ещё не настроены. Продавец должен настроить Supabase и опубликовать политику конфиденциальности. Заказ не отправлен.",
    formSubmitPending: "Отправляем запрос…",
    formSubmitSuccess: "Ваш запрос отправлен. Продавец проверит его и свяжется с вами для подтверждения заказа.",
    formSubmitFailed: "Не удалось отправить запрос. Ничего не подтверждено; попробуйте позже или свяжитесь с продавцом.",
    formContactValidation: "Укажите хотя бы корректный email или номер телефона.",
    formMissingFields: "Заполните обязательные поля и подтвердите согласие на обработку данных.",
    messengerModeNote: "Выбран режим оформления через мессенджер.",
    sizeLine: "Размер:",
    remove: "Удалить",
    quantity: "Количество",
    decreaseQuantity: "Уменьшить количество",
    increaseQuantity: "Увеличить количество",
    checkoutGreeting: "Здравствуйте! Я хотел бы узнать о заказе из Homiesshop:",
    estimatedOrderTotal: "Примерная сумма:",
    customerName: "Меня зовут:",
    orderQuestion: "Пожалуйста, подтвердите наличие, доставку и оплату.",
    writeTo: "Написать в",
    notConfigured: "не настроено",
    checkoutConfigured: "Ваше сообщение откроется в выбранном мессенджере. Заказ считается подтверждённым только после ответа продавца.",
    checkoutNotConfigured: "Мессенджер ещё не настроен или контактные данные невалидны. Проверьте config.js; инструкция есть в README.",
    toastChooseSize: "Сначала выберите размер.",
    toastAdded: "Добавлено в корзину.",
    toastCartSave: "Корзина будет доступна только до закрытия этой страницы.",
    close: "Закрыть"
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
let selectedImageIndex = 0;
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

let language = readPreference(LANGUAGE_KEY, ["en", "de", "ru"], "ru");
let currency = readPreference(CURRENCY_KEY, ["EUR", "USD"], "EUR");

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("Could not save store preferences.", error);
  }
}

function text(key) {
  const bundle = TEXT[language] || TEXT.en;
  return bundle[key] ?? TEXT.en[key];
}

function formatMoney(priceEur) {
  const amount = currency === "USD" ? priceEur * Number(STORE_CONFIG.usdPerEur) : priceEur;
  const locale = language === "de" ? "de-DE" : language === "ru" ? "ru-RU" : "en-US";
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
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] ?? value.en ?? value.de ?? Object.values(value)[0] ?? "";
}

function localizedImageAlt(product, index = 0) {
  return product.imageAlt?.[language]?.[index] || product.imageAlt?.en?.[index] || localized(product.name);
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
  document.querySelector(".main-nav").setAttribute("aria-label", language === "de" ? "Hauptnavigation" : language === "ru" ? "Главная навигация" : "Main navigation");
  document.querySelector("#category-filters").setAttribute("aria-label", language === "de" ? "Nach Kategorie filtern" : language === "ru" ? "Фильтр по категориям" : "Filter by category");
  document.querySelector("#cart-trigger").setAttribute("aria-label", language === "de" ? "Warenkorb öffnen" : language === "ru" ? "Открыть корзину" : "Open cart");
  languageSelect.setAttribute("aria-label", text("languageLabel"));
  currencySelect.setAttribute("aria-label", text("currencyLabel"));
  document.querySelectorAll(".dialog-close").forEach((button) => button.setAttribute("aria-label", text("close")));
  document.querySelector(".wordmark").setAttribute("aria-label", language === "de" ? "Homiesshop — Startseite" : language === "ru" ? "Homiesshop — главная" : "Homiesshop — home");
  document.querySelector(".hero-image").setAttribute("aria-label", language === "de" ? "Vintage-inspiriertes Outfit" : language === "ru" ? "Винтажный образ" : "Vintage-inspired outfit");
  document.querySelector("#sort-products").setAttribute("aria-label", text("sortLabel"));
  document.querySelector("#product-search").setAttribute("aria-label", text("searchLabel"));
  document.querySelector("#delivery").setAttribute("aria-label", language === "de" ? "So funktioniert die Bestellung" : language === "ru" ? "Как оформить заказ" : "How ordering works");
  languageSelect.value = language;
  currencySelect.value = currency;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase(language === "de" ? "de" : language === "ru" ? "ru" : "en");
  document.querySelector("#all-count").textContent = String(PRODUCTS.length).padStart(2, "0");
  const products = PRODUCTS
    .filter((product) => activeCategory === "all" || product.category === activeCategory)
    .filter((product) => `${localized(product.name)} ${localized(product.categoryLabel)} ${localized(product.description)}`.toLocaleLowerCase().includes(query))
    .sort((first, second) => {
      if (sortSelect.value === "price-asc") return first.priceEur - second.priceEur;
      if (sortSelect.value === "price-desc") return second.priceEur - first.priceEur;
      return PRODUCTS.indexOf(first) - PRODUCTS.indexOf(second);
    });

  productGrid.innerHTML = products.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <div class="product-image" role="img" aria-label="${localizedImageAlt(product, product.images ? product.images.indexOf(product.image) : 0)}" style="background-image: url('${product.image}')"></div>
        <span class="product-badge">${localized(product.badge)}</span>
        <button class="button button-light product-quick-add" type="button" data-product="${product.id}">${text("chooseSize")} <span aria-hidden="true">↗</span></button>
      </div>
      <div class="product-info">
        <div><h3>${localized(product.name)}</h3><span class="product-category">${localized(product.categoryLabel)}</span></div>
        <p class="product-price${product.priceNote ? " is-approximate" : ""}">${formatMoney(product.priceEur)}${product.priceNote ? `<span class="visually-hidden">${language === "de" ? " ungefährer Preis" : " approximate price"}</span>` : ""}</p>
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
  if (!preserveSize) selectedImageIndex = 0;
  renderProductGallery();
  document.querySelector("#product-dialog-category").textContent = localized(selectedProduct.categoryLabel);
  document.querySelector("#product-dialog-title").textContent = localized(selectedProduct.name);
  document.querySelector("#product-dialog-price").textContent = formatMoney(selectedProduct.priceEur);
  const priceNote = document.querySelector("#product-price-note");
  priceNote.textContent = selectedProduct.priceNote ? localized(selectedProduct.priceNote) : "";
  priceNote.hidden = !selectedProduct.priceNote;
  document.querySelector(".demo-disclaimer").hidden = selectedProduct.isDemo === false;
  document.querySelector("#product-dialog-description").textContent = localized(selectedProduct.description);
  document.querySelector("#size-list").innerHTML = selectedProduct.sizes.map((size) => `
    <label class="size-option">
      <input type="radio" name="product-size" value="${size}" ${size === selectedSize ? "checked" : ""}>
      <span>${size}</span>
    </label>
  `).join("");
  if (!productDialog.open) openDialog(productDialog);
}

function renderProductGallery() {
  const images = selectedProduct.images || [selectedProduct.image];
  selectedImageIndex = Math.min(selectedImageIndex, images.length - 1);
  const mainImage = document.querySelector("#product-dialog-image");
  mainImage.style.backgroundImage = `url('${images[selectedImageIndex]}')`;
  mainImage.setAttribute("aria-label", localizedImageAlt(selectedProduct, selectedImageIndex));

  const thumbnails = document.querySelector("#product-thumbnails");
  thumbnails.replaceChildren();
  thumbnails.hidden = images.length < 2;
  thumbnails.setAttribute("aria-label", language === "de" ? "Produktfotos" : "Product photos");
  images.forEach((image, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "product-thumbnail";
    button.dataset.photoIndex = String(index);
    button.style.backgroundImage = `url('${image}')`;
    button.setAttribute("aria-label", localizedImageAlt(selectedProduct, index));
    button.setAttribute("aria-pressed", String(index === selectedImageIndex));
    button.classList.toggle("is-active", index === selectedImageIndex);
    thumbnails.append(button);
  });
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
        <div class="cart-line-image" role="img" aria-label="${localizedImageAlt(product, product.images ? product.images.indexOf(product.image) : 0)}" style="background-image: url('${product.image}')"></div>
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

document.querySelector("#product-thumbnails").addEventListener("click", (event) => {
  const button = event.target.closest("[data-photo-index]");
  if (!button || !selectedProduct) return;
  selectedImageIndex = Number(button.dataset.photoIndex);
  renderProductGallery();
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
