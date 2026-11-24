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
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    alt: "Flagship Mobile Devices",
  },
];

// 5 Main Categories for "Shop By Category" (5 items for spacious 5-column layout)
export const CATEGORIES = [
  {
    "id": "smartphones",
    "name": "Smartphones",
    "count": "48+ Models",
    "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "laptops",
    "name": "Laptops & MacBooks",
    "count": "32+ Models",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "earpods",
    "name": "Earpods & Audio",
    "count": "24+ Models",
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "powerbanks",
    "name": "Powerbanks & Charging",
    "count": "18+ Models",
    "image": "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "smartwatches",
    "name": "Smartwatches",
    "count": "20+ Models",
    "image": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
  }
];

export const TOP_BRANDS_DEALS = [
  {
    brand: "Apple",
    logoText: "Apple",
    phoneName: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    brand: "Samsung",
    logoText: "SAMSUNG",
    phoneName: "Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
  },
  {
    brand: "OnePlus",
    logoText: "ONEPLUS",
    phoneName: "OnePlus 12",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    brand: "Xiaomi",
    logoText: "Xiaomi",
    phoneName: "Xiaomi 14 Ultra",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
  {
    brand: "Google",
    logoText: "Google",
    phoneName: "Pixel 8 Pro",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
  },
];

// 16 Popular Products (4 rows x 4 columns) with large images and Nigerian pricing
export const POPULAR_PRODUCTS = [
  {
    "id": "p-s24-ultra-5g",
    "name": "Samsung Galaxy S24 Ultra 5G (Konga Official)",
    "brand": "Samsung",
    "category": "Smartphones",
    "price": 1750000,
    "originalPrice": 2100000,
    "priceLabel": "From \u20a61,750,000",
    "discountBadge": "Save 16%",
    "rating": 5.0,
    "reviewsCount": 194,
    "stockCount": 5,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Titanium Armor Frame & Corning Gorilla Armor",
    "battery": "5000 mAh (45W Fast Charging)",
    "processor": "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)",
    "description": "Konga Verified Stock: 12GB RAM, 512GB ROM, integrated S Pen, Galaxy AI Live Translate, Circle to Search, and pro-grade 200MP Quad Telephoto Camera with 1-Year Official Samsung Nigeria Warranty.",
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
    "id": "p-iphone-15-pro-max",
    "name": "Apple iPhone 15 Pro Max (256GB)",
    "brand": "Apple",
    "category": "Smartphones",
    "price": 1450000,
    "originalPrice": 1750000,
    "priceLabel": "From \u20a61,450,000",
    "discountBadge": "Save 17%",
    "rating": 5.0,
    "reviewsCount": 218,
    "stockCount": 6,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Grade 5 Titanium & Ceramic Shield",
    "battery": "4422 mAh (Up to 29 hrs video)",
    "processor": "Apple A17 Pro (3nm TSMC)",
    "description": "Aerospace-grade titanium design, A17 Pro chip, Action button, USB-C 3 with 10Gbps transfer speed, and 5x optical telephoto lens.",
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
    "id": "p-oneplus-12-5g",
    "name": "OnePlus 12 5G (16GB RAM + 512GB)",
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
    "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Aluminum Frame & 3D Curved Emerald Glass",
    "battery": "5400 mAh (100W SUPERVOOC Charge)",
    "processor": "Qualcomm Snapdragon 8 Gen 3",
    "description": "Extreme flagship power featuring 4th Gen Hasselblad Camera, 2K 120Hz ProXDR display, and 100W fast charging hitting 100% in 26 minutes.",
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
    "name": "Xiaomi 14 Ultra Leica Pro (16GB/512GB)",
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
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
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
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
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
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
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
    "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80"
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
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
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
      }
    ],
    "sizes": [
      "256GB SSD",
      "512GB SSD"
    ]
  },
  {
    "id": "p-airpods-pro-2",
    "name": "Apple AirPods Pro 2 (USB-C MagSafe)",
    "brand": "Apple",
    "category": "Audio",
    "price": 320000,
    "originalPrice": 385000,
    "priceLabel": "From \u20a6320,000",
    "discountBadge": "Save 17%",
    "rating": 5.0,
    "reviewsCount": 280,
    "stockCount": 12,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Gloss White Case with Lanyard Loop",
    "battery": "Up to 30 hours total with Case",
    "processor": "Apple H2 Headphone Chip",
    "description": "Konga Verified: 2x more Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio with dynamic head tracking, and USB-C MagSafe charging case.",
    "colors": [
      {
        "name": "Gloss White",
        "hex": "#F8F9FA"
      }
    ],
    "sizes": [
      "Standard Case"
    ]
  },
  {
    "id": "p-sony-wh-1000xm5",
    "name": "Sony WH-1000XM5 Wireless ANC",
    "brand": "Sony",
    "category": "Audio",
    "price": 460000,
    "originalPrice": 540000,
    "priceLabel": "From \u20a6460,000",
    "discountBadge": "Save 15%",
    "rating": 5.0,
    "reviewsCount": 165,
    "stockCount": 7,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Soft Fit Leather & Stepless Slider",
    "battery": "30-Hour Playtime with Fast Charge",
    "processor": "Dual HD Noise Cancelling Processor QN1",
    "description": "Industry-leading noise cancellation with 8 microphones, 30-hour battery, Speak-to-Chat, and Hi-Res Wireless LDAC audio streaming.",
    "colors": [
      {
        "name": "Silver Platinum",
        "hex": "#E5E5E5"
      },
      {
        "name": "Midnight Black",
        "hex": "#1A1A1A"
      }
    ],
    "sizes": [
      "Over-Ear Studio"
    ]
  },
  {
    "id": "p-anker-737",
    "name": "Anker 737 Power Bank (PowerCore 24K)",
    "brand": "Anker",
    "category": "Powerbanks",
    "price": 165000,
    "originalPrice": 205000,
    "priceLabel": "From \u20a6165,000",
    "discountBadge": "Save 20%",
    "rating": 5.0,
    "reviewsCount": 142,
    "stockCount": 8,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Fire-Proof Polycarbonate & Aluminum Core",
    "battery": "24,000 mAh (140W Two-Way Fast Charge)",
    "processor": "ActiveShield 2.0 Temperature Monitoring",
    "description": "Ultra-powerful 140W fast charging via Power Delivery 3.1, smart digital color display showing output wattage and recharge time, and massive 24,000mAh capacity.",
    "colors": [
      {
        "name": "Space Gray",
        "hex": "#3A3D42"
      }
    ],
    "sizes": [
      "24,000mAh 140W"
    ]
  },
  {
    "id": "p-xiaomi-powerbank-30k",
    "name": "Xiaomi 30,000mAh 65W Fast Powerbank",
    "brand": "Xiaomi",
    "category": "Powerbanks",
    "price": 75000,
    "originalPrice": 95000,
    "priceLabel": "From \u20a675,000",
    "discountBadge": "Save 21%",
    "rating": 5.0,
    "reviewsCount": 188,
    "stockCount": 15,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609592424369-1c9f80a42702?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Matte Anti-Scratch PC+ABS Alloy",
    "battery": "30,000 mAh (65W Type-C Max Output)",
    "processor": "9-Layer Circuit Safety Chip",
    "description": "High-capacity power station that charges laptops, phones, and Wi-Fi modems simultaneously. Charges an iPhone 15 up to 6 times on a single charge.",
    "colors": [
      {
        "name": "Matte White",
        "hex": "#F4F4F6"
      },
      {
        "name": "Obsidian Black",
        "hex": "#1D1E20"
      }
    ],
    "sizes": [
      "30,000mAh 65W"
    ]
  },
  {
    "id": "p-apple-watch-ultra-2",
    "name": "Apple Watch Ultra 2 GPS + Cellular",
    "brand": "Apple",
    "category": "Smartwatches",
    "price": 1150000,
    "originalPrice": 1350000,
    "priceLabel": "From \u20a61,150,000",
    "discountBadge": "Save 15%",
    "rating": 5.0,
    "reviewsCount": 96,
    "stockCount": 4,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "49mm Aerospace Titanium Case & Sapphire Glass",
    "battery": "Up to 72 hours in Low Power Mode",
    "processor": "Apple S9 SiP with Double Tap Gesture",
    "description": "Konga Verified: Brightest 3000-nit display, precision dual-frequency GPS, depth gauge to 40 meters, ECG heart tracking, and customizable Action button.",
    "colors": [
      {
        "name": "Natural Titanium",
        "hex": "#D1D5DB"
      }
    ],
    "sizes": [
      "49mm Case"
    ]
  },
  {
    "id": "p-galaxy-watch-6-classic",
    "name": "Samsung Galaxy Watch6 Classic (47mm)",
    "brand": "Samsung",
    "category": "Smartwatches",
    "price": 380000,
    "originalPrice": 450000,
    "priceLabel": "From \u20a6380,000",
    "discountBadge": "Save 16%",
    "rating": 5.0,
    "reviewsCount": 84,
    "stockCount": 6,
    "inStock": true,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Stainless Steel & Rotating Physical Bezel",
    "battery": "425 mAh (Fast Wireless Charging)",
    "processor": "Exynos W930 Dual-Core (5nm)",
    "description": "Iconic rotating physical bezel, Super AMOLED Sapphire Crystal display, advanced sleep coaching, BIA body composition analysis, and ECG tracking.",
    "colors": [
      {
        "name": "Classic Black",
        "hex": "#1E2022"
      },
      {
        "name": "Silver",
        "hex": "#E3E4E6"
      }
    ],
    "sizes": [
      "47mm LTE"
    ]
  },
  {
    "id": "p-pixel-8-pro",
    "name": "Google Pixel 8 Pro AI Flagship",
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
    "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Polished Aluminum & Matte Glass Back",
    "battery": "5050 mAh (30W Fast Charging)",
    "processor": "Google Tensor G3 & Titan M2",
    "description": "Engineered with Google AI, Super Actua display, Best Take camera magic, Audio Magic Eraser, and 7 full years of Android OS upgrades.",
    "colors": [
      {
        "name": "Bay Blue",
        "hex": "#8EA6C4"
      },
      {
        "name": "Obsidian Black",
        "hex": "#1B1D1F"
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
    "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    "material": "Armor Aluminum & Zero-Gap Flex Hinge",
    "battery": "4400 mAh (25W Fast Charge)",
    "processor": "Snapdragon 8 Gen 2 for Galaxy",
    "description": "Massive 7.6-inch Dynamic AMOLED 2X folding display, PC-like multi-tasking, S Pen compatibility, and zero-gap Flex Hinge.",
    "colors": [
      {
        "name": "Icy Blue",
        "hex": "#A2B6C6"
      },
      {
        "name": "Phantom Black",
        "hex": "#1E2022"
      }
    ],
    "sizes": [
      "256GB",
      "512GB"
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
