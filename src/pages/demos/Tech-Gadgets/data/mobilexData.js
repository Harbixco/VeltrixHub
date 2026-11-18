// MobileX Store Data - Nigerian Tech Hub Edition
// Genuine tech assets and verified direct images

export const formatNaira = (val) => {
  if (typeof val !== "number") return val;
  return `₦${Math.round(val).toLocaleString()}`;
};

// 5 Hero Carousel Slides (Smartphones, Pro Laptops, Wireless Audio, Powerbanks, Smartwatches)
export const HERO_SLIDES = [
  {
    id: "slide-setup",
    category: "Phones & Laptops",
    tag: "FLAGSHIP COMBINATION",
    titlePrimary: "Pro Laptops & Phones.",
    titleSecondary: "Next-Gen Synergy.",
    subtitle:
      "Experience seamless connectivity between your high-performance laptop and flagship smartphone across Lagos, Abuja & nationwide.",
    badgeSmall: "FLAGSHIP",
    badgeHighlight: "2026",
    badgeFoot: "EDITION",
    ctaText: "SHOP NOW",
    image: "/demos/gadgets/hero-setup-1.jpg",
    alt: "Pro Laptop and Phones Workstation",
  },
  {
    id: "slide-laptops",
    category: "Pro Laptops",
    tag: "NEW ARRIVAL",
    titlePrimary: "Pro Laptops & Work.",
    titleSecondary: "Built For Creators.",
    subtitle:
      "Lightning-fast Apple M3 and Intel Core processors, all-day battery life, and vivid retina displays ready for heavy software development, design, and business.",
    badgeSmall: "SAVE UP TO",
    badgeHighlight: "₦150K",
    badgeFoot: "TODAY",
    ctaText: "SHOP NOW",
    image: "/demos/gadgets/gadget-2.jpg",
    alt: "Pro Laptops and Workstations",
  },
  {
    id: "slide-phones",
    category: "Smartphones",
    tag: "NEW ARRIVAL",
    titlePrimary: "Latest Smartphones.",
    titleSecondary: "Ultimate Performance.",
    subtitle:
      "Experience next-level speed, stunning aerospace-grade titanium design, and ultra-fast 5G connectivity across Lagos, Abuja & nationwide.",
    badgeSmall: "UP TO",
    badgeHighlight: "25%",
    badgeFoot: "OFF",
    ctaText: "SHOP NOW",
    image: "/demos/gadgets/phone-4.jpg",
    alt: "Flagship 5G Smartphones",
  },
  {
    id: "slide-setup-2",
    category: "Tech Workspace",
    tag: "PRO PERFORMANCE",
    titlePrimary: "Complete Desk Setup.",
    titleSecondary: "Work Without Limits.",
    subtitle:
      "Ergonomic dual-device workflows with high-speed Thunderbolt docks, dual 4K monitors, and whisper-quiet mechanical keyboards.",
    badgeSmall: "BEST",
    badgeHighlight: "DEAL",
    badgeFoot: "LIMITED",
    ctaText: "SHOP NOW",
    image: "/demos/gadgets/gadget-1.jpg",
    alt: "Laptop and Smartphone Setup",
  },
  {
    id: "slide-phones-pro",
    category: "Smartphones",
    tag: "EXCLUSIVE",
    titlePrimary: "Flagship Mobile Tech.",
    titleSecondary: "Studio Grade Cameras.",
    subtitle:
      "Periscope zoom lenses, 200MP sensors, and all-day battery power built for creators on the move.",
    badgeSmall: "SAVE",
    badgeHighlight: "20%",
    badgeFoot: "OFF",
    ctaText: "SHOP NOW",
    image: "/demos/gadgets/phone-1.jpg",
    alt: "Flagship Mobile Devices",
  },
];

// 5 Main Categories for "Shop By Category" (5 items for spacious 5-column layout)
export const CATEGORIES = [
  {
    id: "smartphones",
    name: "Smartphones",
    count: "48+ Models",
    image: "/demos/gadgets/phone-1.jpg",
  },
  {
    id: "laptops",
    name: "Laptops & MacBooks",
    count: "32+ Models",
    image: "/demos/gadgets/gadget-7.jpg",
  },
  {
    id: "earpods",
    name: "Earpods & Audio",
    count: "24+ Models",
    image: "/demos/gadgets/gadget-8.jpg",
  },
  {
    id: "powerbanks",
    name: "Powerbanks & Charging",
    count: "18+ Models",
    image: "/demos/gadgets/gadget-9.jpg",
  },
  {
    id: "smartwatches",
    name: "Smartwatches",
    count: "20+ Models",
    image: "/demos/gadgets/gadget-10.jpg",
  },
];

// Top Brand Deals
export const TOP_BRANDS_DEALS = [
  {
    brand: "Apple",
    logoText: "Apple",
    phoneName: "iPhone 15 Pro Max",
    image: "/demos/gadgets/phone-1.jpg",
  },
  {
    brand: "Samsung",
    logoText: "SAMSUNG",
    phoneName: "Galaxy S24 Ultra",
    image: "/demos/gadgets/phone-4.jpg",
  },
  {
    brand: "OnePlus",
    logoText: "ONEPLUS",
    phoneName: "OnePlus 12",
    image: "/demos/gadgets/phone-7.jpg",
  },
  {
    brand: "Xiaomi",
    logoText: "Xiaomi",
    phoneName: "Xiaomi 14 Ultra",
    image: "/demos/gadgets/phone-10.jpg",
  },
  {
    brand: "Google",
    logoText: "Google",
    phoneName: "Pixel 8 Pro",
    image: "/demos/gadgets/phone-13.jpg",
  },
];

// 16 Popular Products (4 rows x 4 columns) with large images and Nigerian pricing
export const POPULAR_PRODUCTS = [
  {
    "id": "p-iphone-15-pro-max",
    "name": "Apple iPhone 15 Pro Max",
    "brand": "Apple",
    "category": "Smartphones",
    "price": 1450000,
    "originalPrice": 1750000,
    "priceLabel": "From \u20a61,450,000",
    "discountBadge": "Save 17%",
    "rating": 5.0,
    "reviewsCount": 184,
    "stockCount": 6,
    "inStock": true,
    "image": "/demos/gadgets/phone-1.jpg",
    "gallery": [
      "/demos/gadgets/phone-1.jpg",
      "/demos/gadgets/phone-2.jpg",
      "/demos/gadgets/phone-3.jpg"
    ],
    "material": "Grade 5 Titanium & Ceramic Shield",
    "battery": "4422 mAh (Up to 29 hrs video)",
    "processor": "Apple A17 Pro (3nm)",
    "description": "Forged in premium Grade 5 titanium, featuring the groundbreaking A17 Pro chip, customizable Action button, and 5x optical telephoto lens.",
    "colors": [
      {
        "name": "Natural Titanium",
        "hex": "#C8B89C"
      },
      {
        "name": "Black Titanium",
        "hex": "#2C2F33"
      },
      {
        "name": "Blue Titanium",
        "hex": "#2B3545"
      },
      {
        "name": "White Titanium",
        "hex": "#F5F5F7"
      }
    ],
    "sizes": [
      "256GB",
      "512GB",
      "1TB"
    ]
  },
  {
    "id": "p-s24-ultra-5g",
    "name": "Samsung Galaxy S24 Ultra 5G",
    "brand": "Samsung",
    "category": "Smartphones",
    "price": 1750000,
    "originalPrice": 2100000,
    "priceLabel": "From \u20a61,750,000",
    "discountBadge": "Save 16%",
    "rating": 5.0,
    "reviewsCount": 142,
    "stockCount": 5,
    "inStock": true,
    "image": "/demos/gadgets/phone-4.jpg",
    "gallery": [
      "/demos/gadgets/phone-4.jpg",
      "/demos/gadgets/phone-5.jpg",
      "/demos/gadgets/phone-6.jpg"
    ],
    "material": "Titanium Frame & Corning Gorilla Armor",
    "battery": "5000 mAh (45W Fast Charging)",
    "processor": "Snapdragon 8 Gen 3 for Galaxy",
    "description": "Galaxy AI powerhouse with integrated S Pen, Live Call Translation, Circle to Search, and pro-grade 200MP Quad Telephoto Camera.",
    "colors": [
      {
        "name": "Titanium Gray",
        "hex": "#7E7F83"
      },
      {
        "name": "Titanium Black",
        "hex": "#232426"
      },
      {
        "name": "Titanium Violet",
        "hex": "#524B66"
      },
      {
        "name": "Titanium Yellow",
        "hex": "#D9C99A"
      }
    ],
    "sizes": [
      "256GB",
      "512GB",
      "1TB"
    ]
  },
  {
    "id": "p-oneplus-12-5g",
    "name": "OnePlus 12 5G Flagship",
    "brand": "OnePlus",
    "category": "Smartphones",
    "price": 890000,
    "originalPrice": 1050000,
    "priceLabel": "From \u20a6890,000",
    "discountBadge": "Save 15%",
    "rating": 5.0,
    "reviewsCount": 98,
    "stockCount": 8,
    "inStock": true,
    "image": "/demos/gadgets/phone-7.jpg",
    "gallery": [
      "/demos/gadgets/phone-7.jpg",
      "/demos/gadgets/phone-8.jpg",
      "/demos/gadgets/phone-9.jpg"
    ],
    "material": "Aluminum Frame & 3D Curved Emerald Glass",
    "battery": "5400 mAh (100W SUPERVOOC Charge)",
    "processor": "Qualcomm Snapdragon 8 Gen 3",
    "description": "Extreme flagship power featuring 4th Gen Hasselblad Camera, 2K 120Hz ProXDR display, and 100W charging hitting 100% in 26 minutes.",
    "colors": [
      {
        "name": "Flowy Emerald",
        "hex": "#3E5C4E"
      },
      {
        "name": "Silky Black",
        "hex": "#1F2022"
      }
    ],
    "sizes": [
      "256GB",
      "512GB"
    ]
  },
  {
    "id": "p-xiaomi-14-ultra",
    "name": "Xiaomi 14 Ultra Leica Pro",
    "brand": "Xiaomi",
    "category": "Smartphones",
    "price": 1250000,
    "originalPrice": 1500000,
    "priceLabel": "From \u20a61,250,000",
    "discountBadge": "Save 16%",
    "rating": 5.0,
    "reviewsCount": 110,
    "stockCount": 4,
    "inStock": true,
    "image": "/demos/gadgets/phone-10.jpg",
    "gallery": [
      "/demos/gadgets/phone-10.jpg",
      "/demos/gadgets/phone-11.jpg",
      "/demos/gadgets/phone-12.jpg"
    ],
    "material": "Xiaomi Shield Glass & Nano-Tech Vegan Leather",
    "battery": "5000 mAh (90W HyperCharge)",
    "processor": "Snapdragon 8 Gen 3 Mobile Platform",
    "description": "Leica Quad Camera with 1-inch LYT-900 sensor and stepless mechanical aperture for true cinematic mobile photography.",
    "colors": [
      {
        "name": "Leica Black",
        "hex": "#1A1A1A"
      },
      {
        "name": "Leica White",
        "hex": "#F3F3F3"
      }
    ],
    "sizes": [
      "512GB",
      "1TB"
    ]
  },
  {
    "id": "p-pixel-8-pro",
    "name": "Google Pixel 8 Pro AI",
    "brand": "Google",
    "category": "Smartphones",
    "price": 980000,
    "originalPrice": 1200000,
    "priceLabel": "From \u20a6980,000",
    "discountBadge": "Save 18%",
    "rating": 5.0,
    "reviewsCount": 88,
    "stockCount": 7,
    "inStock": true,
    "image": "/demos/gadgets/phone-13.jpg",
    "gallery": [
      "/demos/gadgets/phone-13.jpg",
      "/demos/gadgets/phone-14.jpg",
      "/demos/gadgets/phone-15.jpg"
    ],
    "material": "Polished Aluminum & Matte Glass Back",
    "battery": "5050 mAh (30W Fast Charging)",
    "processor": "Google Tensor G3 & Titan M2",
    "description": "Engineered with Google AI, Super Actua display, Best Take camera magic, and 7 full years of Android OS and security upgrades.",
    "colors": [
      {
        "name": "Bay Blue",
        "hex": "#8EA6C4"
      },
      {
        "name": "Obsidian Black",
        "hex": "#1B1D1F"
      },
      {
        "name": "Porcelain",
        "hex": "#EDEAE1"
      }
    ],
    "sizes": [
      "128GB",
      "256GB",
      "512GB"
    ]
  },
  {
    "id": "p-iphone-15-plus",
    "name": "Apple iPhone 15 Plus",
    "brand": "Apple",
    "category": "Smartphones",
    "price": 1050000,
    "originalPrice": 1250000,
    "priceLabel": "From \u20a61,050,000",
    "discountBadge": "Save 16%",
    "rating": 5.0,
    "reviewsCount": 164,
    "stockCount": 9,
    "inStock": true,
    "image": "/demos/gadgets/phone-16.jpg",
    "gallery": [
      "/demos/gadgets/phone-16.jpg",
      "/demos/gadgets/phone-17.jpg",
      "/demos/gadgets/phone-18.jpg"
    ],
    "material": "Color-Infused Glass & Aerospace Aluminum",
    "battery": "4383 mAh (Up to 26 hrs video)",
    "processor": "Apple A16 Bionic (4nm)",
    "description": "Dynamic Island, 48MP Main Camera with 2x Telephoto, USB-C universal connector, and extraordinary all-day battery life.",
    "colors": [
      {
        "name": "Black",
        "hex": "#2D2E30"
      },
      {
        "name": "Blue",
        "hex": "#D4E1E8"
      },
      {
        "name": "Green",
        "hex": "#D7E3D8"
      },
      {
        "name": "Pink",
        "hex": "#EFE0DD"
      }
    ],
    "sizes": [
      "128GB",
      "256GB"
    ]
  },
  {
    "id": "p-galaxy-z-fold-5",
    "name": "Samsung Galaxy Z Fold 5 5G",
    "brand": "Samsung",
    "category": "Smartphones",
    "price": 1950000,
    "originalPrice": 2350000,
    "priceLabel": "From \u20a61,950,000",
    "discountBadge": "Save 17%",
    "rating": 5.0,
    "reviewsCount": 76,
    "stockCount": 3,
    "inStock": true,
    "image": "/demos/gadgets/phone-19.jpg",
    "gallery": [
      "/demos/gadgets/phone-19.jpg",
      "/demos/gadgets/phone-20.jpg",
      "/demos/gadgets/phone-21.jpg"
    ],
    "material": "Armor Aluminum & Flex Hinge",
    "battery": "4400 mAh (25W Fast Charge)",
    "processor": "Snapdragon 8 Gen 2 for Galaxy",
    "description": "Massive 7.6-inch Dynamic AMOLED 2X folding display, multi-window multitasking, S Pen support, and zero-gap Flex Hinge.",
    "colors": [
      {
        "name": "Icy Blue",
        "hex": "#A2B6C6"
      },
      {
        "name": "Phantom Black",
        "hex": "#1E2022"
      },
      {
        "name": "Cream",
        "hex": "#EFEADB"
      }
    ],
    "sizes": [
      "256GB",
      "512GB",
      "1TB"
    ]
  },
  {
    "id": "p-nothing-phone-2",
    "name": "Nothing Phone (2) Glyph Edition",
    "brand": "Nothing",
    "category": "Smartphones",
    "price": 680000,
    "originalPrice": 790000,
    "priceLabel": "From \u20a6680,000",
    "discountBadge": "Save 14%",
    "rating": 5.0,
    "reviewsCount": 94,
    "stockCount": 11,
    "inStock": true,
    "image": "/demos/gadgets/phone-22.jpg",
    "gallery": [
      "/demos/gadgets/phone-22.jpg",
      "/demos/gadgets/phone-23.jpg",
      "/demos/gadgets/phone-24.jpg"
    ],
    "material": "Transparent Glass & Recycled Aluminum",
    "battery": "4700 mAh (45W Fast Charge)",
    "processor": "Snapdragon 8+ Gen 1",
    "description": "Iconic Glyph Interface with individual LED segment notifications, Nothing OS 2.5, and dual 50MP Sony studio sensors.",
    "colors": [
      {
        "name": "Dark Gray",
        "hex": "#292B2D"
      },
      {
        "name": "White",
        "hex": "#F1F2F4"
      }
    ],
    "sizes": [
      "128GB",
      "256GB"
    ]
  },
  {
    "id": "p-macbook-pro-16-m3",
    "name": "Apple MacBook Pro 16\" M3 Max",
    "brand": "Apple",
    "category": "Laptops",
    "price": 3850000,
    "originalPrice": 4400000,
    "priceLabel": "From \u20a63,850,000",
    "discountBadge": "Save 13%",
    "rating": 5.0,
    "reviewsCount": 215,
    "stockCount": 4,
    "inStock": true,
    "image": "/demos/gadgets/gadget-7.jpg",
    "gallery": [
      "/demos/gadgets/gadget-7.jpg",
      "/demos/gadgets/gadget-1.jpg",
      "/demos/gadgets/gadget-2.jpg"
    ],
    "material": "100% Recycled Aluminum Enclosure",
    "battery": "100Wh (Up to 22 hrs battery)",
    "processor": "Apple M3 Max (16-core CPU, 40-core GPU)",
    "description": "Liquid Retina XDR display with 1600 nits peak brightness, hardware-accelerated ray tracing, 48GB unified memory, and 22-hour battery endurance.",
    "colors": [
      {
        "name": "Space Black",
        "hex": "#1F2124"
      },
      {
        "name": "Silver",
        "hex": "#E3E4E6"
      }
    ],
    "sizes": [
      "512GB SSD",
      "1TB SSD",
      "2TB SSD"
    ]
  },
  {
    "id": "p-dell-xps-15",
    "name": "Dell XPS 15 OLED InfinityEdge",
    "brand": "Dell",
    "category": "Laptops",
    "price": 2450000,
    "originalPrice": 2850000,
    "priceLabel": "From \u20a62,450,000",
    "discountBadge": "Save 14%",
    "rating": 5.0,
    "reviewsCount": 138,
    "stockCount": 5,
    "inStock": true,
    "image": "/demos/gadgets/gadget-2.jpg",
    "gallery": [
      "/demos/gadgets/gadget-2.jpg",
      "/demos/gadgets/gadget-21.jpg",
      "/demos/gadgets/gadget-29.jpg"
    ],
    "material": "CNC Machined Aluminum & Carbon Fiber",
    "battery": "86Wh (Up to 13 hrs)",
    "processor": "Intel Core i9-13900H (14-core)",
    "description": "3.5K OLED touch display with 100% DCI-P3 color accuracy, NVIDIA RTX 4070 GPU, and aerospace carbon-fiber palm rest.",
    "colors": [
      {
        "name": "Platinum Silver",
        "hex": "#D1D5DB"
      }
    ],
    "sizes": [
      "1TB NVMe",
      "2TB NVMe"
    ]
  },
  {
    "id": "p-hp-spectre-x360",
    "name": "HP Spectre x360 2-in-1 Touch",
    "brand": "HP",
    "category": "Laptops",
    "price": 1850000,
    "originalPrice": 2150000,
    "priceLabel": "From \u20a61,850,000",
    "discountBadge": "Save 14%",
    "rating": 5.0,
    "reviewsCount": 92,
    "stockCount": 6,
    "inStock": true,
    "image": "/demos/gadgets/gadget-21.jpg",
    "gallery": [
      "/demos/gadgets/gadget-21.jpg",
      "/demos/gadgets/gadget-35.jpg",
      "/demos/gadgets/gadget-46.jpg"
    ],
    "material": "Gem-Cut Aluminum Chassis",
    "battery": "68Wh (Up to 16 hrs)",
    "processor": "Intel Core Ultra 7 155H (AI Boost)",
    "description": "Convertible 360-degree OLED touch screen with MPP 2.0 tilt pen, Intel AI NPU cores, and Quad Bang & Olufsen spatial speakers.",
    "colors": [
      {
        "name": "Nightfall Black",
        "hex": "#1E2024"
      },
      {
        "name": "Nocturne Blue",
        "hex": "#273142"
      }
    ],
    "sizes": [
      "512GB SSD",
      "1TB SSD"
    ]
  },
  {
    "id": "p-lenovo-thinkpad-x1",
    "name": "Lenovo ThinkPad X1 Carbon Gen 12",
    "brand": "Lenovo",
    "category": "Laptops",
    "price": 2200000,
    "originalPrice": 2600000,
    "priceLabel": "From \u20a62,200,000",
    "discountBadge": "Save 15%",
    "rating": 5.0,
    "reviewsCount": 115,
    "stockCount": 4,
    "inStock": true,
    "image": "/demos/gadgets/gadget-29.jpg",
    "gallery": [
      "/demos/gadgets/gadget-29.jpg",
      "/demos/gadgets/gadget-48.jpg",
      "/demos/gadgets/gadget-50.jpg"
    ],
    "material": "Carbon Fiber & Magnesium Hybrid",
    "battery": "57Wh (Rapid Charge to 80% in 60m)",
    "processor": "Intel Core Ultra 7 165U vPro",
    "description": "Legendary MIL-STD 810H business durability, tactile ergonomic keyboard, 2.8K 120Hz OLED display, and enterprise hardware security.",
    "colors": [
      {
        "name": "Deep Black",
        "hex": "#111214"
      }
    ],
    "sizes": [
      "512GB NVMe",
      "1TB NVMe"
    ]
  },
  {
    "id": "p-asus-rog-zephyrus",
    "name": "ASUS ROG Zephyrus G16 OLED",
    "brand": "ASUS",
    "category": "Laptops",
    "price": 2950000,
    "originalPrice": 3450000,
    "priceLabel": "From \u20a62,950,000",
    "discountBadge": "Save 14%",
    "rating": 5.0,
    "reviewsCount": 140,
    "stockCount": 5,
    "inStock": true,
    "image": "/demos/gadgets/gadget-35.jpg",
    "gallery": [
      "/demos/gadgets/gadget-35.jpg",
      "/demos/gadgets/gadget-52.jpg",
      "/demos/gadgets/gadget-53.jpg"
    ],
    "material": "CNC Aluminum with Slash Lighting",
    "battery": "90Wh (100W Type-C Charge)",
    "processor": "Intel Core Ultra 9 185H & RTX 4080",
    "description": "Ultra-thin gaming masterpiece featuring 2.5K 240Hz ROG Nebula OLED, vapor chamber cooling, and Slash Lighting lid array.",
    "colors": [
      {
        "name": "Eclipse Gray",
        "hex": "#2B2D31"
      },
      {
        "name": "Platinum White",
        "hex": "#ECEFF2"
      }
    ],
    "sizes": [
      "1TB SSD",
      "2TB SSD"
    ]
  },
  {
    "id": "p-macbook-air-15-m3",
    "name": "Apple MacBook Air 15\" M3",
    "brand": "Apple",
    "category": "Laptops",
    "price": 1950000,
    "originalPrice": 2250000,
    "priceLabel": "From \u20a61,950,000",
    "discountBadge": "Save 13%",
    "rating": 5.0,
    "reviewsCount": 240,
    "stockCount": 8,
    "inStock": true,
    "image": "/demos/gadgets/gadget-46.jpg",
    "gallery": [
      "/demos/gadgets/gadget-46.jpg",
      "/demos/gadgets/gadget-54.jpg",
      "/demos/gadgets/gadget-55.jpg"
    ],
    "material": "Unibody Recycled Aluminum",
    "battery": "66.5Wh (Up to 18 hrs battery)",
    "processor": "Apple M3 (8-core CPU, 10-core GPU)",
    "description": "Impossibly thin 11.5mm unibody design with a spacious 15.3-inch Liquid Retina display, MagSafe 3 charging, and silent fanless performance.",
    "colors": [
      {
        "name": "Midnight",
        "hex": "#1E2530"
      },
      {
        "name": "Starlight",
        "hex": "#E8E2D7"
      },
      {
        "name": "Space Gray",
        "hex": "#7D7E80"
      },
      {
        "name": "Silver",
        "hex": "#E3E4E5"
      }
    ],
    "sizes": [
      "256GB SSD",
      "512GB SSD"
    ]
  },
  {
    "id": "p-surface-laptop-studio-2",
    "name": "Microsoft Surface Laptop Studio 2",
    "brand": "Microsoft",
    "category": "Laptops",
    "price": 2800000,
    "originalPrice": 3200000,
    "priceLabel": "From \u20a62,800,000",
    "discountBadge": "Save 13%",
    "rating": 5.0,
    "reviewsCount": 65,
    "stockCount": 3,
    "inStock": true,
    "image": "/demos/gadgets/gadget-48.jpg",
    "gallery": [
      "/demos/gadgets/gadget-48.jpg",
      "/demos/gadgets/gadget-56.jpg",
      "/demos/gadgets/gadget-57.jpg"
    ],
    "material": "Anodized Aluminum & Dynamic Woven Hinge",
    "battery": "80Wh (Up to 18 hrs)",
    "processor": "Intel Core i7-13700H & RTX 4060",
    "description": "Dynamic woven hinge transforms from pro laptop to angled drafting canvas to portable studio tablet with PixelSense Flow 120Hz touch.",
    "colors": [
      {
        "name": "Platinum",
        "hex": "#D8DBDF"
      }
    ],
    "sizes": [
      "512GB SSD",
      "1TB SSD"
    ]
  },
  {
    "id": "p-razer-blade-16",
    "name": "Razer Blade 16 Dual-Mode Mini-LED",
    "brand": "Razer",
    "category": "Laptops",
    "price": 3600000,
    "originalPrice": 4100000,
    "priceLabel": "From \u20a63,600,000",
    "discountBadge": "Save 12%",
    "rating": 5.0,
    "reviewsCount": 82,
    "stockCount": 2,
    "inStock": true,
    "image": "/demos/gadgets/gadget-1.jpg",
    "gallery": [
      "/demos/gadgets/gadget-1.jpg",
      "/demos/gadgets/gadget-58.jpg",
      "/demos/gadgets/gadget-59.jpg"
    ],
    "material": "T6 CNC Anodized Aluminum with Anti-Fingerprint",
    "battery": "95.2Wh (280W GaN Charger)",
    "processor": "Intel Core i9-14900HX & RTX 4090",
    "description": "World first Dual-Mode Mini-LED display: switch between ultra-sharp 4K 120Hz for creators and hyper-fast FHD+ 240Hz for competitive gaming.",
    "colors": [
      {
        "name": "Classic Matte Black",
        "hex": "#141517"
      }
    ],
    "sizes": [
      "1TB NVMe",
      "2TB NVMe"
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "trusted",
    title: "Trusted by Thousands",
    description: "50,000+ happy tech buyers across Lagos, Abuja, Port Harcourt & nationwide.",
    icon: "users",
  },
  {
    id: "prices",
    title: "Best Prices Guaranteed",
    description: "Direct wholesale rates on genuine phones, laptops, and original accessories.",
    icon: "price",
  },
  {
    id: "support",
    title: "Expert Tech Support",
    description: "Instant advice & after-sales support via WhatsApp & phone call anytime.",
    icon: "support",
  },
  {
    id: "warranty",
    title: "1-Year Warranty & Genuine",
    description: "100% brand new, factory sealed gadgets with manufacturer warranty guarantee.",
    icon: "shield",
  },
];
