// 20 Pure Fashion Items (Exactly 4 items in each of the 5 categories: Women, Men, Footwear, Perfume, Beauty)
export const FASHION_CATALOG = [
  // ─── WOMEN (4 Items) ───
  {
    id: "w-1",
    name: "Silk Slip Maxi Dress",
    category: "Women",
    price: 125000,
    oldPrice: 180000,
    rating: 5.0,
    reviewsCount: 78,
    badge: "EDITORIAL",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Champagne Gold", hex: "#eedcb3" },
      { name: "Emerald Glaze", hex: "#1f4a38" },
      { name: "Ruby Sunset", hex: "#8a1c2a" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Fluid bias-cut evening gown crafted from lustrous 22-momme pure mulberry silk. Cascades naturally over the body with a delicate cowl neckline and adjustable straps.",
    composition: "100% Grade 6A Mulberry Silk",
  },
  {
    id: "w-2",
    name: "Tailored Linen Blazer",
    category: "Women",
    price: 110000,
    oldPrice: 160000,
    rating: 4.9,
    reviewsCount: 64,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Natural Oat", hex: "#dfd7ca" },
      { name: "Midnight Navy", hex: "#1a253a" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Bespoke single-breasted blazer woven from breathable Normandy flax linen. Features horn button closure, notched lapels, and silky cupro interior lining.",
    composition: "100% Normandy Linen",
  },
  {
    id: "w-3",
    name: "Pleated Chiffon Floral Gown",
    category: "Women",
    price: 98000,
    oldPrice: 145000,
    rating: 4.8,
    reviewsCount: 52,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Pastel Blossom", hex: "#f4ccd5" },
      { name: "Sage Floral", hex: "#b4c3b2" },
    ],
    sizes: ["S", "M", "L"],
    description:
      "Sunburst pleated chiffon silhouette with tiered ruffled hemline and cinched smocked waistline. Lightweight, ethereal drape perfect for luxury soirees and garden events.",
    composition: "100% Silk Chiffon with Silk Georgette Lining",
  },
  {
    id: "w-4",
    name: "Cashmere Knit Wrap Cardigan",
    category: "Women",
    price: 95000,
    oldPrice: 140000,
    rating: 5.0,
    reviewsCount: 142,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Oatmeal Heather", hex: "#d8cca3" },
      { name: "Charcoal Slate", hex: "#3b3c3d" },
      { name: "Dusty Rose", hex: "#cfa6a9" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Spun from 100% Grade-A Mongolian cashmere. Features a relaxed kimono-style draped wrap front, ribbed cuffs, and a self-tie sash for cozy luxury layering.",
    composition: "100% Grade-A Mongolian Cashmere",
  },

  // ─── MEN (4 Items) ───
  {
    id: "m-1",
    name: "Minimalist Trench Coat",
    category: "Men",
    price: 165000,
    oldPrice: 240000,
    rating: 4.9,
    reviewsCount: 52,
    badge: "SIGNATURE",
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Classic Khaki", hex: "#c2b280" },
      { name: "Carbon Black", hex: "#1b1b1b" },
    ],
    sizes: ["M", "L", "XL"],
    description:
      "Storm-resistant twill gabardine overcoat featuring raglan sleeve construction, horn buttons, deep storm flap, and a detachable waist belt for structured tailoring.",
    composition: "Water-Repellent Cotton-Nylon Gabardine",
  },
  {
    id: "m-2",
    name: "Essential Hoodie",
    category: "Men",
    price: 48000,
    oldPrice: 70000,
    rating: 4.9,
    reviewsCount: 96,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Sand Warm Beige", hex: "#d8c5b0" },
      { name: "Washed Olive", hex: "#5a6b5c" },
      { name: "Charcoal Heather", hex: "#2f3542" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Cut from heavyweight 480 GSM French terry organic cotton. Designed with dropped shoulders, double-stitched kangaroo pocket, and rib-knit cuffs for effortless layering.",
    composition: "100% Organic Ring-Spun Combed Cotton",
  },
  {
    id: "m-3",
    name: "Tailored Slim Wool Suit",
    category: "Men",
    price: 220000,
    oldPrice: 320000,
    rating: 5.0,
    reviewsCount: 44,
    badge: "BESPOKE",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Charcoal Prince of Wales", hex: "#3a3a3c" },
      { name: "Deep Navy Blue", hex: "#16233b" },
    ],
    sizes: ["38R", "40R", "42R", "44R"],
    description:
      "Two-piece bespoke suit woven from Super 130s Australian Merino wool. Half-canvas inner architecture with pick-stitched lapels and flat-front tailored trousers.",
    composition: "100% Super 130s Merino Wool",
  },
  {
    id: "m-4",
    name: "Bespoke Cotton Oxford Shirt",
    category: "Men",
    price: 36000,
    oldPrice: 52000,
    rating: 4.8,
    reviewsCount: 71,
    badge: "ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Crisp Oxford White", hex: "#ffffff" },
      { name: "Sky Blue Bengal Stripe", hex: "#cbe3f7" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Tailored button-down collared shirt woven from two-ply 100s long-staple Egyptian Giza cotton. Natural mother-of-pearl buttons with curved barrel cuffs.",
    composition: "100% Egyptian Giza Cotton",
  },

  // ─── FOOTWEAR (4 Items) ───
  {
    id: "f-1",
    name: "Classic Court Sneakers",
    category: "Footwear",
    price: 68000,
    oldPrice: 95000,
    rating: 4.8,
    reviewsCount: 88,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Pure Chalk White", hex: "#ffffff" },
      { name: "Vintage Gum Sole", hex: "#f1eee6" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    description:
      "Minimalist court sneakers constructed with smooth calf leather, memory-foam anatomical footbed, and vulcanized recycled rubber outsole. Understated luxury for daily wear.",
    composition: "Full Grain Leather Upper, Natural Rubber Outsole",
  },
  {
    id: "f-2",
    name: "Italian Calfskin Penny Loafers",
    category: "Footwear",
    price: 92000,
    oldPrice: 135000,
    rating: 4.9,
    reviewsCount: 65,
    badge: "HANDMADE",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Espresso Brown", hex: "#3e2723" },
      { name: "Burgundy Polished", hex: "#5d1020" },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description:
      "Hand-burnished Italian calfskin loafers built on a traditional Goodyear-welted leather sole. Finished with hand-stitched apron detailing and soft leather lining.",
    composition: "100% Hand-Burnished Italian Calfskin",
  },
  {
    id: "f-3",
    name: "Stiletto Pointed Leather Pumps",
    category: "Footwear",
    price: 85000,
    oldPrice: 125000,
    rating: 5.0,
    reviewsCount: 82,
    badge: "HIGH FASHION",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Patent Crimson Red", hex: "#990000" },
      { name: "Nude Blush Leather", hex: "#d9b3a1" },
      { name: "Glossy Onyx Black", hex: "#111111" },
    ],
    sizes: ["37", "38", "39", "40", "41"],
    description:
      "Sculptural 90mm pointed pumps crafted with mirror-sheen patent calfskin. Padded insole arch support with signature lacquered soles for gala and red-carpet elegance.",
    composition: "Patent Calfskin Upper with Leather Sole",
  },
  {
    id: "f-4",
    name: "Strappy Minimalist Heeled Mules",
    category: "Footwear",
    price: 72000,
    oldPrice: 105000,
    rating: 4.8,
    reviewsCount: 47,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Metallic Gold", hex: "#d4af37" },
      { name: "Cream White Nappa", hex: "#fcf8f0" },
    ],
    sizes: ["37", "38", "39", "40", "41"],
    description:
      "Contemporary square-toe mules with delicate asymmetric leather cording straps and a 65mm kitten heel for effortless all-day comfort.",
    composition: "Supple Nappa Leather",
  },

  // ─── PERFUME (4 Items) ───
  {
    id: "p-1",
    name: "Eau de Parfum Luxe",
    category: "Perfume",
    price: 38000,
    oldPrice: 55000,
    rating: 4.9,
    reviewsCount: 114,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "50ml Flacon", hex: "#e0d0b0" }],
    sizes: ["50ml", "100ml"],
    description:
      "An olfactory journey opening with sun-drenched Italian bergamot and pink pepper, blooming into a heart of damask rose, settled on a sensual bed of cedarwood and amber resin.",
    composition: "Eau de Parfum 20% Fragrance Concentration",
  },
  {
    id: "p-2",
    name: "Velvet Oud & Amber Extrait",
    category: "Perfume",
    price: 52000,
    oldPrice: 75000,
    rating: 5.0,
    reviewsCount: 89,
    badge: "NICHE",
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "100ml Crystal Flacon", hex: "#4a2c11" }],
    sizes: ["100ml"],
    description:
      "Opulent oriental fragrance combining Cambodian dark agarwood, smoky birch, Madagascar vanilla bean, and golden saffron. Unsurpassed 24-hour sillage and longevity.",
    composition: "Pure Extrait de Parfum 30% Concentration",
  },
  {
    id: "p-3",
    name: "Neroli & Bergamot Blossom",
    category: "Perfume",
    price: 42000,
    oldPrice: 62000,
    rating: 4.8,
    reviewsCount: 61,
    badge: "FRESH",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "100ml Mist Flacon", hex: "#cde3c1" }],
    sizes: ["100ml"],
    description:
      "Sparkling Mediterranean citrus infused with bitter orange leaf, neroli petals, and sea salt breeze. Crisp, uplifting, and timelessly sophisticated for warm days.",
    composition: "Eau de Parfum with Natural Essential Oils",
  },
  {
    id: "p-4",
    name: "Vanilla Noir & Musk Elixir",
    category: "Perfume",
    price: 46000,
    oldPrice: 68000,
    rating: 4.9,
    reviewsCount: 75,
    badge: "GOURMAND",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "75ml Heavy Glass", hex: "#1c1815" }],
    sizes: ["75ml"],
    description:
      "Decadent warm vanilla laced with tonka bean, white musk, and a whisper of caramelized praline. Seductive and cozy with an alluring scent trail.",
    composition: "Long-Lasting Perfume Oil Blend",
  },

  // ─── BEAUTY & HAIR (Creams & Female Hairs) (4 Items) ───
  {
    id: "b-1",
    name: "Raw Virgin Bone Straight Wig",
    category: "Beauty & Hair",
    price: 135000,
    oldPrice: 210000,
    rating: 5.0,
    reviewsCount: 168,
    badge: "VIRGIN HAIR",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Natural Jet Black (#1B)", hex: "#111111" },
      { name: "Chocolate Brown", hex: "#2f1e16" },
    ],
    sizes: ["24 Inches", "28 Inches", "30 Inches"],
    description:
      "100% Unprocessed Raw Human Hair double drawn bone straight unit. Glueless 13x4 HD Swiss lace frontal with pre-plucked baby hairs. Completely tangle-free and heat-resistant to 450°F.",
    composition: "100% Raw Donor Virgin Human Hair",
  },
  {
    id: "b-2",
    name: "Deep Wavy HD Lace Frontal Wig",
    category: "Beauty & Hair",
    price: 145000,
    oldPrice: 220000,
    rating: 4.9,
    reviewsCount: 132,
    badge: "VIRGIN HAIR",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [
      { name: "Natural Black Lustre", hex: "#151515" },
      { name: "Auburn Copper Brown", hex: "#632715" },
    ],
    sizes: ["26 Inches", "28 Inches", "32 Inches"],
    description:
      "Full density 250% Brazilian deep curl unit. Bouncy, defined waves that retain texture after wash. Breathable adjustable wig cap with security silicone straps.",
    composition: "100% Human Hair Brazilian Curls",
  },
  {
    id: "b-3",
    name: "Botanical Radiance Glow Face Cream",
    category: "Beauty & Hair",
    price: 24000,
    oldPrice: 35000,
    rating: 4.9,
    reviewsCount: 94,
    badge: "SKINCARE",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "50ml Airless Jar", hex: "#faebd7" }],
    sizes: ["50ml"],
    description:
      "Velvety day & night restorative cream infused with Niacinamide 5%, Hyaluronic Acid complex, and organic Rosehip oil. Deeply hydrates, evens skin tone, and restores plump barrier radiance.",
    composition: "Niacinamide, Hyaluronic Acid, Squalane, Peptides",
  },
  {
    id: "b-4",
    name: "Whipped Shea Butter Body Soufflé",
    category: "Beauty & Hair",
    price: 18000,
    oldPrice: 28000,
    rating: 4.8,
    reviewsCount: 79,
    badge: "BODY CREAM",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    ],
    colors: [{ name: "250g Glass Tub", hex: "#fff8dc" }],
    sizes: ["250g"],
    description:
      "Ultra-nourishing whipped African raw shea butter infused with pure cold-pressed argan oil, golden jojoba, and warm vanilla essence. Melts instantly into skin for 48-hour moisture lock.",
    composition: "100% Unrefined Raw Shea Butter, Cold-Pressed Argan Oil",
  },
];

