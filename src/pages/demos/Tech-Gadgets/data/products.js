// Voltix Tech Catalog strictly matching the template image
export const PRODUCTS = [
  // 1. NovaBook Pro 14" ($899.00, 128 reviews)
  {
    id: "p-novabook-14",
    name: 'NovaBook Pro 14"',
    category: "Laptops",
    price: 899.0,
    rating: 5.0,
    reviewsCount: 128,
    isTrending: true,
    image: "/demos/gadgets/gadget-16.jpg",
    gallery: [
      "/demos/gadgets/gadget-16.jpg",
      "/demos/gadgets/gadget-32.jpg",
      "/demos/gadgets/gadget-39.jpg",
    ],
    colors: [
      { name: "Space Gray", hex: "#4B4846" },
      { name: "Midnight Blue", hex: "#1D2A44" },
      { name: "Silver Frost", hex: "#E1E1E6" },
    ],
    storage: ["512GB SSD", "1TB SSD", "2TB SSD"],
    description:
      "Ultra-thin aerospace aluminum body powered by next-gen silicon. 14.2-inch 120Hz Liquid Retina display with peak brightness, studio microphones, and up to 22 hours of battery life.",
    specs: {
      Processor: "Next-Gen Silicon",
      Display: "14.2\" Liquid Retina 120Hz",
      RAM: "16GB Unified Memory",
      Battery: "Up to 22 hours",
    },
  },

  // 2. Pulse Buds Pro ($129.00, 96 reviews)
  {
    id: "p-pulse-buds",
    name: "Pulse Buds Pro",
    category: "Audio",
    price: 129.0,
    rating: 5.0,
    reviewsCount: 96,
    isTrending: true,
    image: "/demos/gadgets/gadget-17.jpg",
    gallery: [
      "/demos/gadgets/gadget-17.jpg",
      "/demos/gadgets/gadget-33.jpg",
      "/demos/gadgets/gadget-40.jpg",
    ],
    colors: [
      { name: "Matte Carbon", hex: "#151515" },
      { name: "Chalk White", hex: "#F3F4F6" },
      { name: "Electric Blue", hex: "#0066FF" },
    ],
    storage: ["Standard"],
    description:
      "True wireless in-ear earbuds with Active Noise Cancellation. 11mm dynamic titanium drivers deliver deep bass and sparkling treble with Qi wireless charging case.",
    specs: {
      NoiseCancelling: "Adaptive Hybrid ANC",
      BatteryLife: "8h Earbuds + 28h Case",
      WaterResistance: "IPX5 Sweat & Water",
    },
  },

  // 3. Vista X Smartphone ($699.00, 210 reviews)
  {
    id: "p-vista-x",
    name: "Vista X Smartphone",
    category: "Smartphones",
    price: 699.0,
    rating: 5.0,
    reviewsCount: 210,
    isTrending: true,
    image: "/demos/gadgets/gadget-18.jpg",
    gallery: [
      "/demos/gadgets/gadget-18.jpg",
      "/demos/gadgets/gadget-34.jpg",
      "/demos/gadgets/gadget-41.jpg",
    ],
    colors: [
      { name: "Titanium Deep Blue", hex: "#1A2E40" },
      { name: "Natural Titanium", hex: "#9E9E9E" },
      { name: "Obsidian Black", hex: "#18181B" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    description:
      "Flagship smartphone engineered with titanium borders. Features a 6.7\" 120Hz LTPO AMOLED panel, 200MP sensor array with optical telephoto, and fast charging.",
    specs: {
      Chipset: "Octa-Core 4nm",
      Screen: '6.7" 120Hz LTPO AMOLED',
      Camera: "200MP Main + Ultrawide + Telephoto",
    },
  },

  // 4. TrackFit Elite ($199.00, 74 reviews)
  {
    id: "p-trackfit-elite",
    name: "TrackFit Elite",
    category: "Wearables",
    price: 199.0,
    rating: 4.8,
    reviewsCount: 74,
    isTrending: true,
    image: "/demos/gadgets/gadget-19.jpg",
    gallery: [
      "/demos/gadgets/gadget-19.jpg",
      "/demos/gadgets/gadget-35.jpg",
      "/demos/gadgets/gadget-42.jpg",
    ],
    colors: [
      { name: "Stealth Black", hex: "#1c1917" },
      { name: "Brushed Steel", hex: "#a8a29e" },
    ],
    storage: ["44mm", "48mm"],
    description:
      "Rugged luxury smartwatch crafted for endurance athletes and everyday health monitoring. Features real-time ECG, blood oxygen tracking, GPS, and up to 14 days battery.",
    specs: {
      Display: "1.43\" Sapphire AMOLED",
      Health: "ECG, SpO2, Heart Rate",
      Battery: "Up to 14 days",
    },
  },

  // 5. PlayMax Controller ($69.00, 58 reviews)
  {
    id: "p-playmax-controller",
    name: "PlayMax Controller",
    category: "Gaming",
    price: 69.0,
    rating: 4.8,
    reviewsCount: 58,
    isTrending: true,
    image: "/demos/gadgets/gadget-20.jpg",
    gallery: [
      "/demos/gadgets/gadget-20.jpg",
      "/demos/gadgets/gadget-36.jpg",
      "/demos/gadgets/gadget-43.jpg",
    ],
    colors: [
      { name: "Midnight Black", hex: "#111827" },
      { name: "Glacier White", hex: "#F9FAFB" },
    ],
    storage: ["Standard"],
    description:
      "Next-generation precision wireless gamepad with dual actuators for dynamic tactile vibrations, adaptive triggers, and motion sensors.",
    specs: {
      Haptics: "Dual Motor Variable Rumble",
      Connectivity: "Wireless & USB-C",
      Battery: "Up to 16h",
    },
  },

  // 6. HomeCam 360 ($89.00, 112 reviews)
  {
    id: "p-homecam-360",
    name: "HomeCam 360",
    category: "Smart Home",
    price: 89.0,
    rating: 5.0,
    reviewsCount: 112,
    isTrending: true,
    image: "/demos/gadgets/gadget-21.jpg",
    gallery: [
      "/demos/gadgets/gadget-21.jpg",
      "/demos/gadgets/gadget-37.jpg",
      "/demos/gadgets/gadget-44.jpg",
    ],
    colors: [{ name: "Arctic White", hex: "#ffffff" }],
    storage: ["Standard"],
    description:
      "Intelligent home security camera with motorized 360° pan and 110° tilt. Crystal-clear 2K HDR resolution, AI tracking, and two-way voice communication.",
    specs: {
      Resolution: "2K Ultra HD",
      FieldOfView: "360° Horizontal Pan",
      Audio: "Two-Way Talk",
    },
  },
];
