import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Tag,
  ArrowRight,
  Heart,
  ShoppingCart,
  Check,
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Clock,
  Eye,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  Flame,
  FileText,
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
  Trash2,
  Home,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";

// WhatsApp concierge contact
const WHATSAPP_NUMBER = "2348087098270";

// Helper for currency formatting in Nigerian Naira (₦)
const formatNaira = (val) => `₦${Math.round(val).toLocaleString()}`;

// 5 Pure Fashion Categories (Changed Home & Living -> Perfume, Electronics -> Footwear)
const CATEGORIES = [
  {
    id: "women",
    name: "Women",
    itemCount: "240+ Styles",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
    linkText: "Shop Now →",
  },
  {
    id: "men",
    name: "Men",
    itemCount: "185+ Styles",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
    linkText: "Shop Now →",
  },
  {
    id: "footwear",
    name: "Footwear",
    itemCount: "140+ Pairs",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
    linkText: "Shop Now →",
  },
  {
    id: "perfume",
    name: "Perfume",
    itemCount: "110+ Scents",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
    linkText: "Shop Now →",
  },
  {
    id: "beauty",
    name: "Beauty & Hair",
    itemCount: "95+ Products",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
    linkText: "Shop Now →",
  },
];

// Detailed Category Metadata for dedicated category focus pages
const CATEGORY_DETAILS = {
  Women: {
    id: "women",
    key: "Women",
    title: "Women's Ready-to-Wear & Couture",
    tagline: "ELEGANT SILHOUETTES & BESPOKE TAILORING",
    description:
      "Explore 22-momme pure mulberry silk slips, tailored Normandy flax linen blazers, sunburst pleated chiffon gowns, and Grade-A Mongolian cashmere knitwear crafted for effortless presence.",
    bannerImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
    badgeText: "PREMIUM COUTURE EDIT",
    stats: "240+ Handpicked Styles",
    fabricHighlights: [
      "Grade 6A Mulberry Silk",
      "100% Normandy Flax Linen",
      "Grade-A Mongolian Cashmere",
    ],
  },
  Men: {
    id: "men",
    key: "Men",
    title: "Men's Sartorial & Modern Casual",
    tagline: "PRECISION TAILORING & NOBLE FABRICS",
    description:
      "Storm-resistant gabardine trench overcoats, Super 130s Australian Merino wool bespoke suits, heavyweight 480 GSM French terry hoodies, and two-ply Egyptian Giza cotton Oxford shirts.",
    bannerImage:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1400&q=80",
    badgeText: "SAVILE ROW STANDARDS",
    stats: "185+ Masterpiece Cuts",
    fabricHighlights: [
      "Super 130s Merino Wool",
      "480 GSM Organic French Terry",
      "100s Two-Ply Egyptian Giza Cotton",
    ],
  },
  Footwear: {
    id: "footwear",
    key: "Footwear",
    title: "Artisan Footwear & Handcrafted Leather Shoes",
    tagline: "HAND-BURNISHED ITALIAN CALFSKIN CRAFTSMANSHIP",
    description:
      "Goodyear-welted burnished Italian calfskin penny loafers, minimalist court sneakers with vulcanized natural rubber, mirror-patent stiletto pumps, and supple nappa leather square-toe mules.",
    bannerImage:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=80",
    badgeText: "FLORENTINE LEATHERWORK",
    stats: "140+ Handcrafted Pairs",
    fabricHighlights: [
      "Hand-Burnished Calfskin",
      "Goodyear-Welted Soles",
      "Padded Memory Foam Insoles",
    ],
  },
  Perfume: {
    id: "perfume",
    key: "Perfume",
    title: "Haute Parfumerie & Niche Extraits",
    tagline: "24-HOUR SILLAGE & RARE NOBLE BOTANICALS",
    description:
      "Intoxicating 30% concentration extraits and eaux de parfum blending wild Cambodian dark agarwood, bitter Mediterranean neroli blossoms, damask roses, and Madagascar vanilla bean.",
    bannerImage:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
    badgeText: "FRENCH GRASSE EXTRAITS",
    stats: "110+ Niche Scents",
    fabricHighlights: [
      "30% Pure Extrait Concentration",
      "Natural Essential Oils",
      "Hand-Blown Crystal Flacons",
    ],
  },
  Beauty: {
    id: "beauty",
    key: "Beauty",
    title: "Virgin Hair Wigs & Radiant Creams",
    tagline: "100% UNPROCESSED RAW HAIR & BOTANICAL GLOW",
    description:
      "Double-drawn bone straight & deep wavy wigs with invisible melted HD Swiss lace, deeply hydrating 5% Niacinamide restorative face creams, and whipped African raw shea butter body soufflés.",
    bannerImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
    badgeText: "VIRGIN HAIR & BOTANICALS",
    stats: "95+ Products",
    fabricHighlights: [
      "100% Donor Virgin Human Hair",
      "Melted HD Swiss Lace",
      "Raw Shea & Rosehip Oil",
    ],
  },
};

// Comprehensive FAQs for the FAQ Customer Care page
const FAQ_ITEMS = [
  {
    q: "How do I place an order on ShopEase?",
    a: "Ordering is seamless! You can either add items to your wardrobe cart and click 'Checkout' to pay securely via our Paystack gateway (Card, Bank Transfer, USSD), or click 'Order on WhatsApp' on any product to chat directly with our Lagos styling concierge for instant confirmation.",
  },
  {
    q: "How fast is delivery within Lagos and across Nigeria?",
    a: "Orders in Lagos placed before 2:00 PM arrive same-day or within 24 hours via our dedicated dispatch fleet. Deliveries to all other 35 states in Nigeria arrive within 2 to 4 business days via GIG Logistics or DHL Express with end-to-end SMS and WhatsApp tracking.",
  },
  {
    q: "Are the hair wigs made of 100% human raw virgin hair?",
    a: "Yes, absolutely. All our bone straight and deep wavy units are crafted from 100% unprocessed single-donor raw virgin human hair with double-drawn density from weft to tip. They feature ultra-thin, invisible melted HD Swiss lace, can be bleached to 613 blonde, styled up to 450°F, and last over 3 years with proper care.",
  },
  {
    q: "What payment methods are supported on ShopEase?",
    a: "We support all Nigerian bank debit and credit cards (Mastercard, Visa, Verve), instant direct bank transfers, and USSD via our PCI-DSS Level 1 certified Paystack gateway. When ordering through our WhatsApp concierge, you can also make direct transfers to our verified corporate bank account.",
  },
  {
    q: "How do I ensure I select my correct shoe or clothing size?",
    a: "Every product card displays standard UK/European sizes alongside item specifications. If you are unsure between sizes, tap 'Order on WhatsApp' and our stylist will guide you on exact body measurements before dispatch.",
  },
  {
    q: "Can I return or exchange an item if it doesn't fit?",
    a: "Yes! We offer a 30-day hassle-free return and exchange policy. Garments and shoes must be unworn with original tags attached. For human hair wigs, the HD lace must remain uncut and unaltered. Exchanges in Lagos include complimentary return pickup.",
  },
];

// Policy & Customer Care Data for FAQs, Shipping Policy, Returns & Refunds, Terms & Conditions, Privacy Policy
const POLICY_DATA = {
  faqs: {
    key: "faqs",
    title: "Frequently Asked Questions",
    badge: "CUSTOMER SUPPORT",
    subtitle: "Quick answers to help you shop luxury fashion with total confidence.",
  },
  shipping: {
    key: "shipping",
    title: "Shipping & Delivery Policy",
    badge: "NATIONWIDE LOGISTICS",
    subtitle: "Fast, tracked, and insured delivery to your doorstep across Nigeria.",
    highlights: [
      {
        title: "Lagos Same-Day & 24hr",
        desc: "Orders placed by 2:00 PM in Lagos arrive same-day or within 24 hours via our private dispatch fleet.",
      },
      {
        title: "Nationwide (36 States)",
        desc: "Delivery across Abuja, Port Harcourt, Ibadan, Kano, and other states takes 2 to 4 business days via GIG Logistics or DHL Express.",
      },
      {
        title: "Complimentary Free Shipping",
        desc: "Enjoy 100% free nationwide express delivery on all orders exceeding ₦100,000.",
      },
      {
        title: "Discreet Luxury Packaging",
        desc: "Every garment, wig, and shoe is packed in custom branded magnetic gift boxes with tamper-evident seals.",
      },
    ],
    sections: [
      {
        heading: "1. Dispatch Schedule & Order Cut-Off Times",
        body: "All orders confirmed and paid before 2:00 PM (Monday to Saturday) are dispatched the same day from our Victoria Island, Lagos fulfillment hub. Orders placed after 2:00 PM or on Sundays are dispatched the next business morning.",
      },
      {
        heading: "2. Real-Time Tracking & Notifications",
        body: "Once your package is assigned to a courier, you will receive an instant SMS and WhatsApp dispatch alert containing your real-time tracking link and rider contact details.",
      },
      {
        heading: "3. Inspection & Delivery Acceptance",
        body: "Upon delivery, you or your authorized representative may inspect the outer luxury seal. If you notice any external transit damage, please contact our concierge immediately at +234 808 709 8270.",
      },
    ],
  },
  returns: {
    key: "returns",
    title: "Returns & Refunds Policy",
    badge: "30-DAY ASSURANCE",
    subtitle: "Peace of mind with simple, transparent 30-day returns and exchanges.",
    highlights: [
      {
        title: "30-Day Window",
        desc: "Return or exchange any unworn fashion item within 30 calendar days of delivery.",
      },
      {
        title: "Complimentary Lagos Pickup",
        desc: "We arrange free doorstep pickup for exchanges anywhere within Lagos state.",
      },
      {
        title: "100% Full Refunds",
        desc: "Approved refunds are credited directly to your Nigerian bank account within 24 hours of inspection.",
      },
      {
        title: "Virgin Hair Guarantee",
        desc: "Human hair wigs can be exchanged provided the HD Swiss lace remains uncut and unaltered.",
      },
    ],
    sections: [
      {
        heading: "1. Eligibility Guidelines",
        body: "Items must be returned in their original, unwashed, and unworn condition with all luxury brand tags and garment bags intact. Footwear must be tried on carpeted surfaces to prevent sole scuffing. For health and hygiene standards, cosmetics and perfumes must have their cellophane seal unopened.",
      },
      {
        heading: "2. How to Initiate a Return or Exchange",
        body: "Simply send a message to our WhatsApp Concierge (+234 808 709 8270) or email support@shopease.com with your order reference and photos of the item. Our team will generate a prepaid return pickup authorization within 2 business hours.",
      },
      {
        heading: "3. Refund Processing Time",
        body: "Once our Lagos quality control team inspects the item (typically within 24 hours of arrival), your refund will be processed immediately via direct bank transfer or store credit based on your preference.",
      },
    ],
  },
  terms: {
    key: "terms",
    title: "Terms & Conditions",
    badge: "SERVICE AGREEMENT",
    subtitle: "Our commitment to authenticity, pricing transparency, and client protections.",
    highlights: [
      {
        title: "100% Authenticity",
        desc: "Every garment, shoe, extrait, and raw virgin hair unit is guaranteed 100% original.",
      },
      {
        title: "Price Integrity",
        desc: "All prices are listed in Nigerian Naira (₦) with zero hidden fees or surprise charges at checkout.",
      },
      {
        title: "PCI-DSS Security",
        desc: "Payments are processed securely through Paystack with 256-bit bank-level SSL encryption.",
      },
      {
        title: "VIP Concierge Support",
        desc: "Direct access to our dedicated styling and customer support team 7 days a week.",
      },
    ],
    sections: [
      {
        heading: "1. Product Authenticity & Quality Standards",
        body: "ShopEase operates with the highest standards of luxury curation. All fabrics (pure mulberry silk, cashmere, Egyptian cotton, French terry), leathers (hand-burnished Italian calfskin), and raw donor virgin hair are rigorously inspected before being cataloged.",
      },
      {
        heading: "2. Order Acceptance & Pricing",
        body: "Prices displayed on the website are valid at the time of purchase. In the rare event of a system typographical error, ShopEase reserves the right to contact the client to confirm or cancel the order with a full immediate refund.",
      },
      {
        heading: "3. Intellectual Property",
        body: "All imagery, product photography, editorial styling, and brand assets on ShopEase are proprietary and protected by copyright laws. Unauthorized reproduction is strictly prohibited.",
      },
    ],
  },
  privacy: {
    key: "privacy",
    title: "Privacy Policy",
    badge: "DATA PROTECTION",
    subtitle: "How we collect, protect, and respect your personal information under NDPR guidelines.",
    highlights: [
      {
        title: "NDPR & GDPR Compliant",
        desc: "We adhere strictly to Nigeria Data Protection Regulation standards.",
      },
      {
        title: "Zero Third-Party Selling",
        desc: "We never sell, rent, or trade your personal information with external advertisers.",
      },
      {
        title: "Encrypted Data Storage",
        desc: "Your addresses and order history are protected with industry-standard 256-bit SSL encryption.",
      },
      {
        title: "Complete Control",
        desc: "You may request full export or deletion of your personal data at any time.",
      },
    ],
    sections: [
      {
        heading: "1. Information We Collect",
        body: "When you browse our collections or place an order, we collect essential details such as your name, delivery address, phone number, and email. We do NOT store your bank card numbers or CVV; all payment transactions are handled directly through Paystack's certified PCI-DSS Level 1 servers.",
      },
      {
        heading: "2. How We Use Your Data",
        body: "Your information is used solely to fulfill your orders, provide dispatch tracking updates, offer personalized wardrobe recommendations, and communicate important customer service notices.",
      },
      {
        heading: "3. Cookies & Preferences",
        body: "We use essential cookies to keep items in your wardrobe cart and save your wishlist preferences across browser sessions. You can configure your browser to disable non-essential cookies at any time.",
      },
    ],
  },
};


// Carousel Hero Slides (High contrast colors: Pure white + Coral orange on dark green)
const HERO_SLIDES = [
  {
    badge: "LIMITED TIME ONLY",
    titleLine1: "Shop More,",
    titleLine2: "Save More!",
    subtitle:
      "Discover luxury ready-to-wear dresses, bespoke suits, artisan leather footwear, and niche perfumery.",
    image: "/shopease-hero.jpg",
    discountBadge: "50%",
    discountLabel: "UP TO",
    ctaText: "EXPLORE COLLECTION",
    ctaLink: "#new-arrivals",
    socialProof: "12,000+ Curated Shoppers",
  },
  {
    badge: "NEW FOOTWEAR & LEATHER EDIT",
    titleLine1: "Step Into",
    titleLine2: "Pure Luxury!",
    subtitle:
      "Handcrafted Italian calfskin loafers, minimalist court sneakers, and designer stiletto heels built for presence.",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    discountBadge: "35%",
    discountLabel: "SAVE",
    ctaText: "SHOP FOOTWEAR",
    ctaLink: "#new-arrivals",
    socialProof: "8,500+ Footwear Lovers",
  },
  {
    badge: "LUXE VIRGIN HAIR & BEAUTY CREAMS",
    titleLine1: "Elegance &",
    titleLine2: "Radiant Glow!",
    subtitle:
      "100% Raw Virgin Human Hair bone straight wigs, deeply hydrating botanical glow creams, and French perfumes.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    discountBadge: "40%",
    discountLabel: "SPECIAL",
    ctaText: "EXPLORE BEAUTY",
    ctaLink: "#new-arrivals",
    socialProof: "15,000+ Glowing Clients",
  },
];

// Fashion Deal of the Day (100% Fashion: Raw Virgin Bone Straight Hair Wig)
const DEAL_OF_THE_DAY = {
  id: "deal-bone-straight-wig",
  name: "Bone Straight Raw Virgin Hair Wig",
  subtitle: "Double Drawn 13x4 HD Transparent Lace (28 Inches)",
  price: 135000,
  oldPrice: 270000,
  stockLeft: 14,
  rating: 5.0,
  reviewsCount: 218,
  image:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80",
  ],
  colors: [
    { name: "Natural Jet Black (#1B)", hex: "#111111" },
    { name: "Rich Dark Chocolate (#2)", hex: "#2f1e16" },
    { name: "Honey Blonde Highlights", hex: "#bfa36d" },
  ],
  sizes: ["26 Inches", "28 Inches", "30 Inches"],
  description:
    "100% Unprocessed Vietnamese Raw Donor Human Hair. Full double-drawn thickness from weft to tip with invisible melted HD Swiss lace. Pre-plucked hairline with bleached knots, tangle-free, and lasts over 3 years with proper care.",
  composition: "100% Raw Virgin Donor Human Hair",
};

// 20 Pure Fashion Items (Exactly 4 items in each of the 5 categories: Women, Men, Footwear, Perfume, Beauty)
const FASHION_CATALOG = [
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

export default function GadgetsDemoPage() {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState("Deals");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dedicated Category Page view state (null = Home full store, "Women" | "Men" | "Footwear" | "Perfume" | "Beauty")
  const [activeCategoryPage, setActiveCategoryPage] = useState(null);

  // Customer Care & Policy Modal state (null | "faqs" | "shipping" | "returns" | "terms" | "privacy")
  const [activePolicyModal, setActivePolicyModal] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Hero Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto rotate carousel every 6 seconds on both desktop and mobile
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Cart state
  const [cart, setCart] = useState([
    {
      ...DEAL_OF_THE_DAY,
      quantity: 1,
      selectedColor: DEAL_OF_THE_DAY.colors[0],
      selectedSize: DEAL_OF_THE_DAY.sizes[0],
      cartItemId: "deal-bone-straight-wig-default",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState({ "w-1": true, "b-1": true, "f-3": true });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Live Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Card color selection overrides
  const [selectedCardColor, setSelectedCardColor] = useState({});

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return FASHION_CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Wishlist items list
  const wishlistItems = useMemo(() => {
    return FASHION_CATALOG.filter((item) => wishlist[item.id]);
  }, [wishlist]);

  // Product Quick View modal with multi-image gallery
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalColor, setModalColor] = useState(null);
  const [modalSize, setModalSize] = useState(null);
  const [modalQty, setModalQty] = useState(1);

  // Email Newsletter state
  const [emailInput, setEmailInput] = useState("");

  // Paystack demo checkout modal
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [paystackStep, setPaystackStep] = useState("customer");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "Amina Bello",
    email: "amina.bello@lagosfashion.ng",
    phone: "08031234567",
    address: "Plot 12 Victoria Island",
    city: "Lagos",
  });
  const [mockTrxRef, setMockTrxRef] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Open modal with item and reset image index
  const openModal = (product) => {
    setActiveModalProduct(product);
    setActiveImageIndex(0);
    setModalColor(product.colors ? product.colors[0] : null);
    setModalSize(product.sizes ? product.sizes[0] : null);
    setModalQty(1);
  };

  // Live countdown timer matching screenshot (08 HRS : 12 MINS : 45 SEC : 30 MSEC)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    mins: 12,
    secs: 45,
    msecs: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, mins, secs, msecs } = prev;
        if (msecs > 0) {
          msecs -= 1;
        } else {
          msecs = 99;
          if (secs > 0) {
            secs -= 1;
          } else {
            secs = 59;
            if (mins > 0) {
              mins -= 1;
            } else {
              mins = 59;
              if (hours > 0) {
                hours -= 1;
              } else {
                hours = 12;
              }
            }
          }
        }
        return { hours, mins, secs, msecs };
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Pagination & items per page (6 items per page: 2 balanced rows of 3)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by category with exact match (Men contains men's clothes only)
  const displayedProducts = useMemo(() => {
    if (selectedFilterCategory === "All") return FASHION_CATALOG;
    return FASHION_CATALOG.filter((item) => {
      if (selectedFilterCategory === "Beauty") {
        return item.category === "Beauty & Hair" || item.category === "Beauty";
      }
      return item.category.toLowerCase() === selectedFilterCategory.toLowerCase();
    });
  }, [selectedFilterCategory]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(displayedProducts.length / ITEMS_PER_PAGE));

  // 3 Paginated products for current view
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [displayedProducts, currentPage]);

  const handleSelectCategory = (catKey) => {
    setSelectedFilterCategory(catKey);
    setCurrentPage(1);
  };

  // Active gallery images for currently open modal
  const currentModalImages = useMemo(() => {
    if (!activeModalProduct) return [];
    if (activeModalProduct.gallery && activeModalProduct.gallery.length > 0) {
      return activeModalProduct.gallery;
    }
    return [activeModalProduct.image];
  }, [activeModalProduct]);

  // Cart operations
  const addToCart = (product, color = null, size = null, qty = 1) => {
    const chosenColor = color || (product.colors ? product.colors[0] : null);
    const chosenSize = size || (product.sizes ? product.sizes[0] : "Standard");
    const cartItemId = `${product.id}-${chosenColor?.name || "def"}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
            quantity: qty,
            cartItemId,
          },
        ];
      }
    });

    showToast(`Added ${qty}x ${product.name} to wardrobe cart!`);
  };

  const updateCartQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = !prev[id];
      showToast(next ? "Saved to your wishlist ❤️" : "Removed from wishlist");
      return { ...prev, [id]: next };
    });
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const freeShippingThreshold = 100000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast("🎉 Welcome to the ShopEase VIP Club! 10% coupon emailed.");
      setEmailInput("");
    }
  };

  const handleOpenPaystack = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setPaystackStep("customer");
    setIsPaystackOpen(true);
  };

  const handlePaystackPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const randomRef = `trx_se_${Math.floor(100000000 + Math.random() * 900000000)}`;
      setMockTrxRef(randomRef);
      setPaystackStep("success");
    }, 2000);
  };

  const generateWhatsAppCheckoutUrl = () => {
    const lines = [
      `✨ *NEW SHOPEASE FASHION & BEAUTY ORDER*`,
      `---------------------------------------`,
    ];

    if (customerInfo.fullName && customerInfo.fullName.trim()) {
      lines.push(
        `*Customer Details:*`,
        `• Name: ${customerInfo.fullName}`,
        `• Phone: ${customerInfo.phone || "Not provided"}`,
        `• Delivery: ${customerInfo.address ? `${customerInfo.address}, ${customerInfo.city}` : "To be confirmed"}`,
        ``
      );
    } else {
      lines.push(`*Customer:* Direct Website Shopper`, ``);
    }

    lines.push(`*Curated Order Items:*`);

    cart.forEach((item, idx) => {
      const colorText = item.selectedColor ? ` / ${item.selectedColor.name}` : "";
      const sizeText = item.selectedSize ? ` / Size: ${item.selectedSize}` : "";
      lines.push(`${idx + 1}. *${item.name}*${colorText}${sizeText}`);
      lines.push(
        `   Qty: ${item.quantity} × ${formatNaira(item.price)} = ${formatNaira(
          item.price * item.quantity
        )}`
      );
    });

    lines.push(`---------------------------------------`);
    lines.push(`💵 *Subtotal:* ${formatNaira(cartSubtotal)}`);
    lines.push(
      `🚚 *Delivery:* ${
        amountToFreeShipping === 0
          ? "FREE Complimentary Express Delivery"
          : "₦4,500 Standard Nationwide Delivery"
      }`
    );
    lines.push(``);
    lines.push(`Hello! I want to finalize this order. Please confirm availability and send payment / account details. Thank you!`);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <PageTransition>
      <SEO
        title="ShopEase – Shop Smart, Live Better | Luxury Fashion, Footwear, Hair & Perfumes"
        description="Shop More, Save More! Discover luxury fashion clothes, designer footwear, virgin human hair wigs, French perfumes, and botanical skincare creams at ShopEase."
      />

      <div className="bg-[#fcf8f4] text-[#1a1a1a] min-h-screen font-body antialiased selection:bg-[#e85d04] selection:text-white pb-20 sm:pb-0">
        {/* ─── 1. TOP ANNOUNCEMENT BAR ─── */}
        <div className="bg-[#081d16] text-[#e2e8f0] py-2 px-4 text-xs font-medium border-b border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* Left */}
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-[#f06428]" />
              <span className="font-bold tracking-wider text-white">FREE SHIPPING</span>
              <span className="text-[#94a3b8]">On orders over ₦100,000</span>
            </div>

            {/* Center */}
            <div className="flex items-center gap-2">
              <Tag size={13} className="text-[#f06428]" />
              <span className="font-bold tracking-wider text-white">EXTRA 10% OFF</span>
              <span className="text-[#94a3b8]">On prepaid orders</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-[11px] text-white font-mono">
                VIP Fashion Concierge
              </span>
            </div>
          </div>
        </div>

        {/* ─── 2. MAIN NAVBAR / HIGH PROFILE FASHION HEADER ─── */}
        {/* ─── 2. MAIN NAVBAR / HIGH PROFILE FASHION HEADER ─── */}
        <header className="bg-white/95 backdrop-blur-md border-b border-[#f1e9df] sticky top-0 z-40 shadow-xs transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo - Compact & Elegant */}
            <button
              onClick={() => {
                setActiveCategoryPage(null);
                setActiveNav("New In");
                setSelectedFilterCategory("All");
                setCurrentPage(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group text-left shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#e85d04] to-[#f06428] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <ShoppingBag size={15} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base sm:text-lg tracking-tight text-[#111827] leading-none">
                  ShopEase
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-medium text-[#e85d04] tracking-tight mt-0.5 leading-none whitespace-nowrap">
                  Shop Smart, Live Better
                </span>
              </div>
            </button>

            {/* Nav Links: Each leads to dedicated focused category page, single-line nowrap */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6 text-xs lg:text-[13px] font-semibold text-[#374151] shrink-0">
              {[
                { label: "New In", key: null },
                { label: "Women", key: "Women" },
                { label: "Men", key: "Men" },
                { label: "Footwear", key: "Footwear" },
                { label: "Perfume", key: "Perfume" },
                { label: "Beauty & Hair", key: "Beauty" },
              ].map((item) => {
                const isCurNav =
                  item.key === "Deals"
                    ? activeNav === "Deals"
                    : item.key === null
                      ? activeCategoryPage === null && activeNav !== "Deals"
                      : activeCategoryPage === item.key;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.key === "Deals") {
                        setActiveCategoryPage(null);
                        setActiveNav("Deals");
                        setTimeout(() => {
                          document.getElementById("deal-of-the-day")?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
                      } else if (item.key === null) {
                        setActiveCategoryPage(null);
                        setActiveNav("New In");
                        setSelectedFilterCategory("All");
                        setCurrentPage(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        setActiveCategoryPage(item.key);
                        setActiveNav(item.label);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        showToast(`Welcome to the ${item.label} Collection`);
                      }
                    }}
                    className={`whitespace-nowrap transition-all py-1 px-0.5 hover:text-[#e85d04] relative tracking-normal ${
                      isCurNav ? "text-[#e85d04] font-bold" : ""
                    }`}
                  >
                    {item.label}
                    {isCurNav && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e85d04] rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Live Search Input */}
            <div className="relative hidden xl:block w-40 2xl:w-56 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 rounded-full bg-[#faf6f1] border border-[#f1e6da] text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e85d04] focus:bg-white transition-all shadow-2xs"
                />
                <Search size={13} className="absolute left-2.5 text-gray-400 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 text-gray-400 hover:text-gray-700 p-0.5"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>

              {/* Desktop Search Dropdown Results */}
              {searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#f1e6da] overflow-hidden z-50 max-h-80 overflow-y-auto">
                  <div className="p-2.5 bg-[#fcf8f4] border-b border-[#f1e6da] text-[10px] font-black uppercase tracking-wider text-gray-500 flex justify-between items-center">
                    <span>Found {searchResults.length} piece{searchResults.length === 1 ? "" : "s"}</span>
                    <button onClick={() => setSearchQuery("")} className="hover:text-gray-900">Close</button>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No luxury pieces found for "{searchQuery}".
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {searchResults.slice(0, 6).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            openModal(item);
                            setSearchQuery("");
                          }}
                          className="p-2.5 flex items-center gap-3 hover:bg-[#faf6f1] cursor-pointer transition-colors text-left"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                            <span className="text-[10px] text-[#e85d04] font-semibold">{item.category}</span>
                          </div>
                          <span className="text-xs font-black text-gray-900 shrink-0 font-mono">
                            {formatNaira(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions: Search + Wishlist + Cart + Shop Now + Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Mobile & Tablet Search Toggle Trigger */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="xl:hidden p-1.5 sm:p-2 rounded-xl text-gray-700 hover:text-[#e85d04] hover:bg-orange-50 transition-colors"
                title="Search luxury fashion"
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist Trigger (Both Mobile & Desktop) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-xl text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center"
                title="View Saved Wishlist"
                aria-label="View wishlist"
              >
                <Heart
                  size={18}
                  className={wishlistItems.length > 0 ? "text-red-500 fill-red-500" : ""}
                />
                {wishlistItems.length > 0 && (
                  <motion.span
                    key={wishlistItems.length}
                    initial={{ scale: 0.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart Drawer Trigger */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-gray-800 hover:text-[#e85d04] hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all group"
                title="View Wardrobe Cart"
              >
                <div className="relative">
                  <ShoppingCart size={18} className="group-hover:scale-105 transition-transform" />
                  {totalCartCount > 0 && (
                    <motion.span
                      key={totalCartCount}
                      initial={{ scale: 0.3 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1.5 -right-1.5 bg-[#e85d04] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs"
                    >
                      {totalCartCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold text-xs font-mono text-gray-900">
                  {formatNaira(cartSubtotal)}
                </span>
              </motion.button>

              {/* SHOP NOW Button - Desktop */}
              <button
                onClick={() => {
                  setActiveCategoryPage(null);
                  setSelectedFilterCategory("All");
                  setTimeout(() => {
                    document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                className="hidden xl:inline-flex bg-[#e85d04] hover:bg-[#d94e02] text-white text-[11px] font-black px-3.5 py-2 rounded-xl tracking-wider uppercase shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 shrink-0"
              >
                SHOP NOW
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-xl text-gray-800 hover:text-[#e85d04] hover:bg-orange-50 border border-[#f1e6da] transition-colors flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Collapsible Search Strip */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden border-t border-[#f1e6da] bg-[#fcf8f4] px-4 py-3 overflow-hidden"
              >
                <div className="relative flex items-center">
                  <Search size={15} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search dresses, suits, footwear, wigs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-9 pr-9 py-2 rounded-xl bg-white border border-[#f1e6da] text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#e85d04]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Mobile Search Live Results */}
                {searchQuery.trim() && (
                  <div className="mt-2.5 bg-white rounded-xl border border-[#f1e6da] shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                    <div className="p-2 bg-[#fcf8f4] border-b border-[#f1e6da] text-[10px] font-bold text-gray-500 flex justify-between items-center">
                      <span>Found {searchResults.length} piece{searchResults.length === 1 ? "" : "s"}</span>
                      <button onClick={() => setIsSearchOpen(false)} className="text-[#e85d04]">Done</button>
                    </div>
                    {searchResults.length === 0 ? (
                      <div className="p-3 text-center text-xs text-gray-400">
                        No pieces found for "{searchQuery}".
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {searchResults.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              openModal(item);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="p-2.5 flex items-center gap-3 hover:bg-[#faf6f1] active:bg-orange-50 text-left"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                              <span className="text-[10px] text-[#e85d04]">{item.category}</span>
                            </div>
                            <span className="text-xs font-black text-gray-900 shrink-0 font-mono">
                              {formatNaira(item.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ─── MOBILE HAMBURGER NAVIGATION DRAWER ─── */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.28 }}
                className="fixed inset-y-0 left-0 w-[84%] max-w-xs bg-white shadow-2xl flex flex-col z-10 text-left border-r border-[#f1e6da]"
              >
                {/* Header */}
                <div className="p-4 border-b border-[#f1e6da] flex items-center justify-between bg-[#fcf8f4]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#e85d04] to-[#f06428] flex items-center justify-center text-white shadow-sm">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <span className="font-black text-lg text-gray-900 block leading-none">
                        ShopEase
                      </span>
                      <span className="text-[9px] font-bold text-[#e85d04] tracking-wider uppercase">
                        Luxury Fashion
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 px-3 block mb-2">
                      COLLECTIONS
                    </span>
                    {[
                      { label: "New In (Home)", key: null, badge: "Featured" },
                      { label: "Women Collection", key: "Women", badge: "240+ Styles" },
                      { label: "Men Collection", key: "Men", badge: "185+ Styles" },
                      { label: "Footwear Collection", key: "Footwear", badge: "140+ Pairs" },
                      { label: "Perfume Collection", key: "Perfume", badge: "110+ Scents" },
                      { label: "Beauty & Hair", key: "Beauty", badge: "95+ Units" },
                      { label: "Deal of the Day", key: "Deals", badge: "50% OFF" },
                    ].map((item) => {
                      const isCur =
                        item.key === "Deals"
                          ? activeNav === "Deals"
                          : item.key === null
                            ? activeCategoryPage === null && activeNav !== "Deals"
                            : activeCategoryPage === item.key;
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            if (item.key === "Deals") {
                              setActiveCategoryPage(null);
                              setActiveNav("Deals");
                              setTimeout(() => {
                                document.getElementById("deal-of-the-day")?.scrollIntoView({ behavior: "smooth" });
                              }, 100);
                            } else if (item.key === null) {
                              setActiveCategoryPage(null);
                              setActiveNav("New In");
                              setSelectedFilterCategory("All");
                              setCurrentPage(1);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            } else {
                              setActiveCategoryPage(item.key);
                              setActiveNav(item.label);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              showToast(`Viewing ${item.label}`);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${isCur
                            ? "bg-[#081d16] text-white shadow-xs"
                            : "text-gray-700 hover:bg-[#faf6f1] hover:text-[#e85d04]"
                            }`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isCur
                              ? "bg-[#e85d04] text-white"
                              : "bg-gray-100 text-gray-500"
                              }`}
                          >
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}

                    {/* Wishlist Quick Trigger inside Drawer */}
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsWishlistOpen(true);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-700 hover:bg-[#faf6f1] transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Heart size={16} className="text-red-500 fill-red-500" />
                          <span>Saved Wishlist</span>
                        </span>
                        <span className="text-[10px] bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-bold">
                          {wishlistItems.length} items
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer info */}
                <div className="p-3.5 bg-[#fcf8f4] border-t border-[#f1e6da] text-[11px] text-gray-500 text-center font-medium">
                  Plot 12 Victoria Island, Lagos
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── CONDITIONAL: DEDICATED CATEGORY FOCUS PAGE OR HOME STOREFRONT ─── */}
        {activeCategoryPage ? (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Category Navigation Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#f1e6da] rounded-2xl px-5 py-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                <button
                  onClick={() => {
                    setActiveCategoryPage(null);
                    setActiveNav("New In");
                    setSelectedFilterCategory("All");
                  }}
                  className="hover:text-[#e85d04] transition-colors"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-gray-400">Collections</span>
                <span>/</span>
                <span className="text-[#e85d04] font-bold">
                  {CATEGORY_DETAILS[activeCategoryPage]?.title || activeCategoryPage}
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveCategoryPage(null);
                  setActiveNav("New In");
                  setSelectedFilterCategory("All");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#e85d04] transition-colors"
              >
                <ChevronLeft size={16} />
                <span>Back to All Collections</span>
              </button>
            </div>

            {/* Category Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0c261e] text-white p-7 sm:p-12 border border-[#235342]/40">
              <img
                src={CATEGORY_DETAILS[activeCategoryPage]?.bannerImage}
                alt={CATEGORY_DETAILS[activeCategoryPage]?.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#081d16] via-[#081d16]/90 to-transparent" />
              <div className="relative z-10 max-w-2xl space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16392d]/90 backdrop-blur-xs border border-[#235342] text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
                  <Sparkles size={13} className="text-[#f06428]" />
                  {CATEGORY_DETAILS[activeCategoryPage]?.badgeText}
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                  {CATEGORY_DETAILS[activeCategoryPage]?.title}
                </h1>

                <p className="text-xs sm:text-sm font-bold text-[#f06428] tracking-widest uppercase">
                  {CATEGORY_DETAILS[activeCategoryPage]?.tagline}
                </p>

                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {CATEGORY_DETAILS[activeCategoryPage]?.description}
                </p>

                {/* Fabric & Craftsmanship Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {CATEGORY_DETAILS[activeCategoryPage]?.fabricHighlights?.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-gray-200"
                    >
                      ✦ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Category Switcher Tabs */}
            <div className="bg-white border border-[#f1e6da] rounded-2xl p-2.5 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              {[
                { label: "Women Collection", key: "Women" },
                { label: "Men Collection", key: "Men" },
                { label: "Footwear Collection", key: "Footwear" },
                { label: "Perfume Collection", key: "Perfume" },
                { label: "Beauty & Hair", key: "Beauty" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveCategoryPage(tab.key);
                    setActiveNav(tab.key === "Beauty" ? "Beauty & Hair" : tab.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeCategoryPage === tab.key
                    ? "bg-[#081d16] text-white shadow-md shadow-emerald-950/20 scale-102"
                    : "text-gray-600 hover:text-gray-900 hover:bg-[#faf6f1]"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Category Product Catalog Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#e85d04] tracking-widest uppercase">
                    VERIFIED PIECES
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Curated {activeCategoryPage} Edit
                  </h2>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-white border border-[#f1e6da] px-3 py-1.5 rounded-full">
                  {
                    FASHION_CATALOG.filter((item) =>
                      activeCategoryPage === "Beauty"
                        ? item.category === "Beauty & Hair" || item.category === "Beauty"
                        : item.category.toLowerCase() === activeCategoryPage.toLowerCase()
                    ).length
                  }{" "}
                  Exclusive Styles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FASHION_CATALOG.filter((item) =>
                  activeCategoryPage === "Beauty"
                    ? item.category === "Beauty & Hair" || item.category === "Beauty"
                    : item.category.toLowerCase() === activeCategoryPage.toLowerCase()
                ).map((product) => {
                  const discountPct = Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) * 100
                  );
                  const isWish = !!wishlist[product.id];
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-[#f1e6da] overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between group"
                    >
                      {/* Image & Badges */}
                      <div className="relative w-full h-64 sm:h-72 bg-[#faf6f1] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700"
                        />
                        <span className="absolute top-3 left-3 bg-[#081d16] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {product.badge}
                        </span>
                        <span className="absolute top-3 right-3 bg-[#e85d04] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                          -{discountPct}%
                        </span>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-red-500 shadow-sm transition-colors"
                        >
                          <Heart
                            size={16}
                            className={isWish ? "text-red-500 fill-red-500" : ""}
                          />
                        </button>
                        <button
                          onClick={() => openModal(product)}
                          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] font-bold flex items-center gap-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye size={13} />
                          <span>3 Photos</span>
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star size={12} fill="currentColor" />
                            <span>{product.rating}</span>
                            <span className="text-gray-400 font-normal">
                              ({product.reviewsCount})
                            </span>
                          </div>
                          <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-gray-100 space-y-3">
                          <div className="flex items-baseline gap-2">
                            <span className="font-black text-base text-[#e85d04]">
                              {formatNaira(product.price)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {formatNaira(product.oldPrice)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => addToCart(product)}
                              className="py-2.5 px-3 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <ShoppingCart size={14} />
                              <span>Add</span>
                            </button>
                            <a
                              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                `Hello ShopEase Stylist! I want to order the *${product.name}* (${formatNaira(product.price)}). Please confirm availability!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <FaWhatsapp size={14} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Styling Concierge Callout */}
            <div className="bg-[#fcf6ef] border border-[#f1e5d6] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider">
                  <FaWhatsapp size={13} />
                  VIP Fashion Concierge
                </div>
                <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">
                  Need Personal Styling Advice for {activeCategoryPage}?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-lg">
                  Our Lagos private stylists are available 7 days a week to assist with exact measurements, color matching, and bespoke tailoring requests.
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hello ShopEase Stylist! I would love some styling advice regarding the ${activeCategoryPage} collection.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all whitespace-nowrap flex items-center gap-2"
              >
                <FaWhatsapp size={16} />
                <span>Chat with Stylist</span>
              </a>
            </div>

            {/* Value Strip - Hidden on mobile view, retained for bigger screens */}
            <div className="hidden md:grid bg-[#fcf7f2] border border-[#f1e6da] rounded-2xl p-5 sm:p-6 grid-cols-2 md:grid-cols-4 gap-6 shadow-xs">
              <div
                onClick={() => setActivePolicyModal("shipping")}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                  <Truck size={19} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                    Free Shipping
                  </h4>
                  <p className="text-[11px] text-gray-500">On orders over ₦100,000</p>
                </div>
              </div>

              <div
                onClick={() => setActivePolicyModal("returns")}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                  <RotateCcw size={19} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                    Easy Returns
                  </h4>
                  <p className="text-[11px] text-gray-500">30-day returns</p>
                </div>
              </div>

              <div
                onClick={() => setActivePolicyModal("terms")}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                    Premium Quality
                  </h4>
                  <p className="text-[11px] text-gray-500">100% original products</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setActivePolicyModal("faqs");
                  setExpandedFaq(0);
                }}
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                  <Headphones size={19} />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                    24/7 Support
                  </h4>
                  <p className="text-[11px] text-gray-500">We're here to help</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* ─── 3. HERO BANNER: LUXURY FASHION HERO (Mobile Background + Desktop Carousel) ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              {/* ─── MOBILE HERO (< lg): Interactive Luxury Fashion Carousel ─── */}
              <div
                onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchStartX === null) return;
                  const touchEndX = e.changedTouches[0].clientX;
                  const diff = touchStartX - touchEndX;
                  if (diff > 45) {
                    // swipe left -> next slide
                    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
                  } else if (diff < -45) {
                    // swipe right -> prev slide
                    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : HERO_SLIDES.length - 1));
                  }
                  setTouchStartX(null);
                }}
                className="lg:hidden relative rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 text-white border border-[#235342]/40 bg-[#081d16]"
              >
                {/* Background Image: Dynamic Carousel Slide Image with Smooth Fade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, scale: 1.0 }}
                    animate={{ opacity: 1, scale: 1.06 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.6 },
                      scale: { duration: 6, ease: "easeOut" },
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.titleLine1}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dark green gradient contrast overlay ensuring 100% legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#081d16]/80 via-[#081d16]/88 to-[#081d16]/85 backdrop-blur-[0.5px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Mobile Texts Centered Vertically with Equal Space Top & Bottom */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10 space-y-4 text-left my-auto"
                  >
                    {/* Badge & Discount Tag */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16392d]/90 backdrop-blur-md border border-[#235342] text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {activeSlide.badge}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e85d04] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {activeSlide.discountLabel} {activeSlide.discountBadge} OFF
                      </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3.5xl sm:text-4xl font-black tracking-tight leading-[1.08] text-white">
                      <span className="text-white drop-shadow-md">{activeSlide.titleLine1}</span> <br />
                      <span className="text-[#f06428] drop-shadow-md">{activeSlide.titleLine2}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-200 text-xs sm:text-sm font-normal leading-relaxed max-w-sm drop-shadow-xs">
                      {activeSlide.subtitle}
                    </p>

                    {/* 3 Value Bullets */}
                    <div className="space-y-2 text-xs text-gray-200 font-medium pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                          <Check size={12} />
                        </div>
                        <span>Best Prices Guaranteed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                          <Lock size={11} />
                        </div>
                        <span>Secure Payments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                          <Truck size={12} />
                        </div>
                        <span>Fast Delivery Worldwide</span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <a
                        href={activeSlide.ctaLink}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all text-center"
                      >
                        <span>{activeSlide.ctaText}</span>
                        <ArrowRight size={14} />
                      </a>
                      <a
                        href="#deal-of-the-day"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/25 transition-colors text-center"
                      >
                        <span>Deal of the Day</span>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Subtle ambient 2px progress bar indicating slide progression */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-[#e85d04]"
                  />
                </div>
              </div>

              {/* ─── DESKTOP HERO (>= lg): Interactive 2-Column Luxury Carousel ─── */}
              <div className="hidden lg:block relative rounded-3xl bg-[#0c261e] text-white overflow-hidden shadow-2xl p-10 lg:p-14">
                {/* Ambient lighting accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#e85d04]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Carousel Slide Animation Container */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-row items-center justify-between gap-10 relative z-10"
                  >
                    {/* Left Content */}
                    <div className="flex-1 space-y-6 max-w-xl text-left">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16392d]/90 backdrop-blur-xs border border-[#235342] text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {activeSlide.badge}
                      </div>

                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                        <span className="text-white drop-shadow-sm">{activeSlide.titleLine1}</span> <br />
                        <span className="text-[#f06428] drop-shadow-sm">{activeSlide.titleLine2}</span>
                      </h1>

                      <p className="text-gray-200 text-base font-normal leading-relaxed max-w-md">
                        {activeSlide.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-gray-200 font-medium pt-1">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                            <Check size={12} />
                          </div>
                          <span>Best Prices Guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                            <Lock size={11} />
                          </div>
                          <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                            <Truck size={12} />
                          </div>
                          <span>Fast Delivery Worldwide</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <a
                          href={activeSlide.ctaLink}
                          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
                        >
                          <span>{activeSlide.ctaText}</span>
                          <ArrowRight size={15} />
                        </a>
                        <a
                          href="#deal-of-the-day"
                          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-colors"
                        >
                          <span>Deal of the Day</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Visual Box */}
                    <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        className="absolute top-2 right-4 sm:top-4 sm:right-6 z-20 w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#f06428] to-[#e85d04] text-white flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white/20 transform rotate-6 transition-all"
                      >
                        <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none">
                          {activeSlide.discountLabel}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">
                          {activeSlide.discountBadge}
                        </span>
                        <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase leading-none">
                          OFF
                        </span>
                      </motion.div>

                      <div className="absolute -bottom-3 left-4 z-20 bg-white/95 backdrop-blur-md text-gray-900 border border-white/20 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                            alt="Customer"
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                            alt="Customer"
                          />
                          <img
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                            alt="Customer"
                          />
                        </div>
                        <div className="text-[11px] font-bold text-gray-800 leading-tight">
                          {activeSlide.socialProof}
                        </div>
                      </div>

                      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-[#081a14] border border-white/10 group">
                        <img
                          src={activeSlide.image}
                          alt={activeSlide.titleLine1}
                          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Desktop Carousel Controls */}
                <div className="relative z-20 mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) =>
                          prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
                        )
                      }
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
                      }
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="text-xs text-gray-300 font-mono ml-2">
                      0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all ${currentSlideIndex === idx
                          ? "w-8 bg-[#e85d04]"
                          : "w-2 bg-white/30 hover:bg-white/60"
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 4. VALUE PROPOSITIONS STRIP (Hidden on mobile view, retained for bigger screens) ─── */}
            <section className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="bg-[#fcf7f2] border border-[#f1e6da] rounded-2xl p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xs">
                {/* Free Shipping */}
                <div
                  onClick={() => setActivePolicyModal("shipping")}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                    <Truck size={19} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                      Free Shipping
                    </h4>
                    <p className="text-[11px] text-gray-500">On orders over ₦100,000</p>
                  </div>
                </div>

                {/* Easy Returns */}
                <div
                  onClick={() => setActivePolicyModal("returns")}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                    <RotateCcw size={19} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                      Easy Returns
                    </h4>
                    <p className="text-[11px] text-gray-500">30-day returns</p>
                  </div>
                </div>

                {/* Premium Quality */}
                <div
                  onClick={() => setActivePolicyModal("terms")}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                    <ShieldCheck size={19} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                      Premium Quality
                    </h4>
                    <p className="text-[11px] text-gray-500">100% original products</p>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div
                  onClick={() => {
                    setActivePolicyModal("faqs");
                    setExpandedFaq(0);
                  }}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
                    <Headphones size={19} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
                      24/7 Support
                    </h4>
                    <p className="text-[11px] text-gray-500">We're here to help</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 5. SHOP BY CATEGORY (Women, Men, Footwear, Perfume, Beauty & Hair) ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
                <div>
                  <span className="text-[#e85d04] text-xs font-bold tracking-widest uppercase">
                    CURATED COLLECTIONS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                    Shop By Category
                  </h2>
                </div>
                <p className="text-xs text-gray-500 max-w-sm text-left sm:text-right mt-1 sm:mt-0">
                  Browse clothes, designer footwears, niche perfumes, creams, and virgin human hair wigs.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {CATEGORIES.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -6 }}
                    onClick={() => {
                      const catKey = cat.name === "Beauty & Hair" ? "Beauty" : cat.name;
                      setActiveCategoryPage(catKey);
                      setActiveNav(cat.name);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      showToast(`Viewing ${cat.name} Collection`);
                    }}
                    className="group bg-white rounded-2xl border border-[#f1e6da] p-3 overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:border-[#e85d04]/40 transition-all flex flex-col justify-between"
                  >
                    {/* Photo with Overlay Badge */}
                    <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#faf6f1] mb-3">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-2 right-2 text-[10px] bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full font-bold text-gray-700 shadow-xs">
                        {cat.itemCount}
                      </span>
                    </div>

                    {/* Info & Link */}
                    <div className="text-center pb-1">
                      <h3 className="font-extrabold text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors mb-0.5">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-bold text-[#e85d04] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {cat.linkText}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ─── 6. DEAL OF THE DAY (100% Pure Luxury Fashion: Raw Virgin Hair Wig) ─── */}
            <section id="deal-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="bg-[#fcf6ef] border border-[#f1e5d6] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                {/* Left Description */}
                <div className="flex-1 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[#e85d04] text-xs font-black tracking-widest uppercase">
                    <Flame size={14} className="text-[#e85d04]" />
                    DEAL OF THE DAY
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                    Grab It Before <br />
                    It's Gone!
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm font-medium max-w-md">
                    Hurry! Limited stock available. Over 218 fashion clients have claimed theirs this week.
                  </p>

                  {/* Live Urgency Countdown Timer */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={13} className="text-[#e85d04]" />
                      Offer Ends In:
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-black">
                      <div className="bg-[#081d16] text-white px-2.5 py-1 rounded-lg shadow-xs">
                        {String(timeLeft.hours).padStart(2, "0")}h
                      </div>
                      <span className="text-gray-400 font-bold">:</span>
                      <div className="bg-[#081d16] text-white px-2.5 py-1 rounded-lg shadow-xs">
                        {String(timeLeft.mins).padStart(2, "0")}m
                      </div>
                      <span className="text-gray-400 font-bold">:</span>
                      <motion.div
                        key={timeLeft.secs}
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#e85d04] text-white px-2.5 py-1 rounded-lg shadow-xs"
                      >
                        {String(timeLeft.secs).padStart(2, "0")}s
                      </motion.div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => addToCart(DEAL_OF_THE_DAY)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>SHOP THE DEAL</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => openModal(DEAL_OF_THE_DAY)}
                      className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white border border-[#f1e5d6] text-gray-700 hover:text-gray-900 text-xs font-bold shadow-xs hover:bg-gray-50 transition-colors"
                    >
                      <Eye size={14} />
                      <span>Inspect All Angles</span>
                    </button>
                  </div>
                </div>

                {/* Right Product Card with Countdown */}
                <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-2xl border border-[#f1e6da] p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6">
                  {/* Product Image */}
                  <div
                    onClick={() => openModal(DEAL_OF_THE_DAY)}
                    className="w-full h-64 sm:h-auto sm:w-52 md:w-60 lg:w-64 min-h-[240px] sm:min-h-[280px] rounded-xl bg-[#faf6f1] p-2 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group relative"
                  >
                    <img
                      src={DEAL_OF_THE_DAY.image}
                      alt={DEAL_OF_THE_DAY.name}
                      className="w-full h-full object-cover object-center rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details & Timer */}
                  <div className="flex-1 min-w-0 text-left space-y-2">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star size={13} fill="currentColor" />
                      <span>{DEAL_OF_THE_DAY.rating}</span>
                      <span className="text-gray-400 font-normal">({DEAL_OF_THE_DAY.reviewsCount} reviews)</span>
                    </div>

                    <h3
                      onClick={() => openModal(DEAL_OF_THE_DAY)}
                      className="font-extrabold text-base text-gray-900 hover:text-[#e85d04] cursor-pointer transition-colors"
                    >
                      {DEAL_OF_THE_DAY.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {DEAL_OF_THE_DAY.subtitle}
                    </p>

                    {/* Pricing in Naira */}
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-2xl font-black text-[#e85d04]">
                        {formatNaira(DEAL_OF_THE_DAY.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatNaira(DEAL_OF_THE_DAY.oldPrice)}
                      </span>
                      <span className="text-[10px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                        Save 50%
                      </span>
                    </div>

                    {/* Stock Left */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-[#e85d04]">
                        <span>Only {DEAL_OF_THE_DAY.stockLeft} wigs left!</span>
                        <span className="text-gray-400 font-normal">Selling fast</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-orange-400 to-[#e85d04] h-full rounded-full w-2/5 relative overflow-hidden">
                          <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="grid grid-cols-4 gap-1.5 pt-2 text-center">
                      <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                        <div className="font-mono font-black text-xs text-gray-900">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold">HRS</div>
                      </div>
                      <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                        <div className="font-mono font-black text-xs text-gray-900">
                          {String(timeLeft.mins).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold">MINS</div>
                      </div>
                      <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                        <div className="font-mono font-black text-xs text-gray-900">
                          {String(timeLeft.secs).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold">SEC</div>
                      </div>
                      <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                        <div className="font-mono font-black text-xs text-[#e85d04]">
                          {String(timeLeft.msecs).padStart(2, "0")}
                        </div>
                        <div className="text-[9px] text-gray-400 font-semibold">MSEC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 7. NEW ARRIVALS: MINIMUM 4 ITEMS PER CATEGORY ─── */}
            <section id="new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-[#e85d04] text-xs font-bold tracking-widest uppercase">
                    JUST DROPPED
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
                    New Arrivals
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {[
                    { label: "All", key: "All" },
                    { label: "Women", key: "Women" },
                    { label: "Men", key: "Men" },
                    { label: "Footwear", key: "Footwear" },
                    { label: "Perfume", key: "Perfume" },
                    { label: "Beauty & Hair", key: "Beauty" },
                  ].map((pill) => (
                    <button
                      key={pill.key}
                      onClick={() => handleSelectCategory(pill.key)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedFilterCategory === pill.key
                        ? "bg-[#081d16] text-white shadow-xs"
                        : "bg-white border border-[#f1e6da] text-gray-600 hover:border-gray-400"
                        }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      handleSelectCategory("All");
                      showToast("Showing all 20 curated fashion pieces");
                    }}
                    className="text-xs font-bold text-[#e85d04] hover:underline flex items-center gap-1 ml-2"
                  >
                    <span>View All (20)</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Cards Grid: 2 columns on mobile, 3 columns on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
                {paginatedProducts.map((prod, idx) => {
                  const activeColor = selectedCardColor[prod.id] || (prod.colors ? prod.colors[0] : null);
                  return (
                    <motion.div
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.35, delay: (idx % 6) * 0.06 }}
                      whileHover={{ y: -5 }}
                      className="group bg-white rounded-2xl border border-[#f1e6da] p-2.5 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#e85d04]/30 transition-all duration-300 relative"
                    >
                      {/* Top: Badge & Heart */}
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black tracking-wider bg-[#081d16] text-white">
                          {prod.badge}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.25 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleWishlist(prod.id)}
                          className="p-1 sm:p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Save to Wishlist"
                        >
                          <Heart
                            size={15}
                            className={wishlist[prod.id] ? "fill-red-500 text-red-500" : ""}
                          />
                        </motion.button>
                      </div>

                      {/* Image Showcase with Angle 2 Hover Swap on Desktop */}
                      <div
                        onClick={() => openModal(prod)}
                        className="relative w-full h-52 sm:h-68 md:h-72 rounded-xl bg-[#faf6f1] flex items-center justify-center cursor-pointer overflow-hidden mb-2 sm:mb-3"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80";
                          }}
                          className={`w-full h-full object-cover object-center transition-all duration-700 ${
                            prod.gallery && prod.gallery[1]
                              ? "group-hover:opacity-0 group-hover:scale-105"
                              : "group-hover:scale-108"
                          }`}
                        />
                        {prod.gallery && prod.gallery[1] && (
                          <img
                            src={prod.gallery[1]}
                            alt={`${prod.name} angle 2`}
                            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                          />
                        )}
                        {/* Quick View Hover Pill on Desktop */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center backdrop-blur-2xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-gray-900 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <Eye size={13} />
                            View 3 Angles
                          </span>
                        </div>
                        {/* Mobile Angle Badge */}
                        <span className="absolute bottom-1.5 left-1.5 sm:hidden text-[9px] font-bold bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md text-gray-700 shadow-2xs">
                          3 Angles
                        </span>
                      </div>

                      {/* Product Meta */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500">
                          <span className="uppercase tracking-wider font-semibold text-[#e85d04]">
                            {prod.category}
                          </span>
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star size={11} fill="currentColor" />
                            {prod.rating}
                          </span>
                        </div>

                        <h3
                          onClick={() => openModal(prod)}
                          className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] cursor-pointer transition-colors line-clamp-1"
                          title={prod.name}
                        >
                          {prod.name}
                        </h3>

                        {/* Interactive Color Swatch Dots */}
                        {prod.colors && (
                          <div className="flex items-center gap-1.5 pt-0.5 sm:pt-1">
                            {prod.colors.map((c) => {
                              const isSelected = activeColor?.name === c.name;
                              return (
                                <button
                                  key={c.name}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCardColor((prev) => ({ ...prev, [prod.id]: c }));
                                    showToast(`Selected ${c.name} for ${prod.name}`);
                                  }}
                                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all ${
                                    isSelected
                                      ? "ring-2 ring-[#e85d04] scale-110 shadow-xs"
                                      : "border-black/20 hover:scale-105"
                                  }`}
                                  style={{ backgroundColor: c.hex }}
                                  title={c.name}
                                />
                              );
                            })}
                          </div>
                        )}

                        {/* Pricing and Action in Naira */}
                        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-gray-100 mt-1.5 sm:mt-2">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
                            <span className="font-black text-xs sm:text-base text-gray-900">
                              {formatNaira(prod.price)}
                            </span>
                            {prod.oldPrice && (
                              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                {formatNaira(prod.oldPrice)}
                              </span>
                            )}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.88 }}
                            onClick={() => addToCart(prod, activeColor)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#f1e6da] bg-white hover:bg-[#e85d04] text-gray-800 hover:text-white flex items-center justify-center shadow-xs transition-colors shrink-0"
                            title="Add to cart"
                          >
                            <ShoppingCart size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Luxury Interactive Pagination (Paginate 3 items per page) */}
              {totalPages > 1 && (
                <div className="mt-10 pt-6 border-t border-[#f1e6da] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-500 font-medium">
                    Showing <strong className="text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> to{" "}
                    <strong className="text-gray-900">
                      {Math.min(currentPage * ITEMS_PER_PAGE, displayedProducts.length)}
                    </strong>{" "}
                    of <strong className="text-gray-900">{displayedProducts.length}</strong> pieces
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.max(1, p - 1));
                        document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all ${currentPage === 1
                        ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-white text-gray-700 border-[#f1e6da] hover:border-[#e85d04] hover:text-[#e85d04] shadow-xs"
                        }`}
                    >
                      <ChevronLeft size={14} />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                            ? "bg-[#081d16] text-white shadow-xs scale-105"
                            : "bg-white text-gray-600 border border-[#f1e6da] hover:border-gray-400"
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                        document.getElementById("new-arrivals")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all ${currentPage === totalPages
                        ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-white text-gray-700 border-[#f1e6da] hover:border-[#e85d04] hover:text-[#e85d04] shadow-xs"
                        }`}
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {/* ─── 8. NEWSLETTER STRIP: DARK FOREST GREEN ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-[#0c261e] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Heading */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-13 h-13 rounded-2xl bg-[#e85d04] text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <Tag size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-xl text-white tracking-tight">
                  Get Exclusive Offers & Updates
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                  Sign up now and get 10% OFF on your first order!
                </p>
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 relative z-10">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e85d04] shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </section>

        {/* ─── 9. FOOTER ─── */}
        <footer className="bg-[#fcf8f4] border-t border-[#f1e6da] pt-14 pb-4 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              {/* Col 1: Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#e85d04] flex items-center justify-center text-white shadow-sm">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <span className="font-black text-xl text-gray-900 block leading-none">
                      ShopEase
                    </span>
                    <span className="text-[10px] text-[#e85d04] font-semibold tracking-wide">
                      Shop Smart, Live Better
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  Your one-stop destination for quality clothes, footwears, perfumes, creams, and virgin human hair wigs.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-2.5 pt-1 text-gray-600">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
                  >
                    <FaFacebookF size={13} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
                  >
                    <FaInstagram size={13} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
                  >
                    <FaTwitter size={13} />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
                  >
                    <FaPinterestP size={13} />
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp Stylist Concierge"
                    className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-2xs transition-colors"
                  >
                    <FaWhatsapp size={14} />
                  </a>
                </div>
              </div>

              {/* Col 2: QUICK LINKS (Hidden on mobile view, retained for bigger screens) */}
              <div className="hidden md:block">
                <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
                  QUICK LINKS
                </h4>
                <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                  {["Women", "Men", "Footwear", "Perfume", "Beauty & Hair"].map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => {
                          const catKey = link === "Beauty & Hair" ? "Beauty" : link;
                          setActiveCategoryPage(catKey);
                          setActiveNav(link);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          showToast(`Viewing ${link} Collection`);
                        }}
                        className="hover:text-[#e85d04] transition-colors text-left"
                      >
                        {link} Collection
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: CUSTOMER CARE */}
              <div>
                <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
                  CUSTOMER CARE
                </h4>
                <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                  {[
                    { label: "FAQs", key: "faqs" },
                    { label: "Shipping Policy", key: "shipping" },
                    { label: "Returns & Refunds", key: "returns" },
                    { label: "Terms & Conditions", key: "terms" },
                    { label: "Privacy Policy", key: "privacy" },
                  ].map((link) => (
                    <li key={link.key}>
                      <button
                        onClick={() => {
                          setActivePolicyModal(link.key);
                          if (link.key === "faqs") setExpandedFaq(0);
                        }}
                        className="hover:text-[#e85d04] transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: CONTACT US */}
              <div>
                <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
                  CONTACT US
                </h4>
                <ul className="space-y-3 text-xs text-gray-500">
                  <li className="flex items-center gap-2.5">
                    <Mail size={14} className="text-[#e85d04] shrink-0" />
                    <span>support@shopease.com</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone size={14} className="text-[#e85d04] shrink-0" />
                    <span>+234 808 709 8270</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-[#e85d04] shrink-0 mt-0.5" />
                    <span>Plot 12 Victoria Island, Lagos, Nigeria</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar: Dynamic Current Year & Clean */}
          <div className="bg-[#081d16] text-[#94a3b8] py-4 px-4 text-[11px] text-center border-t border-black/20">
            <p className="font-medium text-white/90">
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>
          </div>
        </footer>

        {/* ─── WISHLIST SLIDE-OVER DRAWER ─── */}
        <AnimatePresence>
          {isWishlistOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsWishlistOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 text-left"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcf8f4]">
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="text-red-500 fill-red-500" />
                    <h3 className="font-extrabold text-base text-gray-900">Your Saved Wishlist</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                      {wishlistItems.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {wishlistItems.length === 0 ? (
                    <div className="py-20 text-center space-y-3 text-gray-400">
                      <Heart size={48} className="mx-auto text-gray-300" />
                      <p className="text-sm font-medium">Your wishlist is currently empty.</p>
                      <button
                        onClick={() => setIsWishlistOpen(false)}
                        className="px-5 py-2.5 rounded-xl bg-[#e85d04] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                      >
                        Explore Collections
                      </button>
                    </div>
                  ) : (
                    wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#faf6f1] rounded-2xl border border-[#f1e6da] flex items-center justify-between gap-3 shadow-2xs hover:border-orange-300 transition-colors"
                      >
                        <div
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openModal(item);
                          }}
                          className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover bg-white shrink-0 border border-black/5"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-[#e85d04] uppercase tracking-wider block">
                              {item.category}
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-xs font-black text-gray-900 font-mono">
                                {formatNaira(item.price)}
                              </span>
                              {item.oldPrice && (
                                <span className="text-[10px] text-gray-400 line-through">
                                  {formatNaira(item.oldPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              addToCart(item);
                              showToast(`Added ${item.name} to wardrobe cart!`);
                            }}
                            className="p-2 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white shadow-xs transition-colors flex items-center gap-1 text-[11px] font-bold"
                            title="Move to cart"
                          >
                            <ShoppingCart size={13} />
                            <span className="hidden sm:inline">Add</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer of Wishlist Drawer */}
                {wishlistItems.length > 0 && (
                  <div className="p-4 bg-[#fcf8f4] border-t border-[#f1e6da] space-y-2">
                    <button
                      onClick={() => {
                        wishlistItems.forEach((item) => addToCart(item));
                        showToast(`Added all ${wishlistItems.length} items to wardrobe cart!`);
                        setIsWishlistOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-[#081d16] hover:bg-[#16392d] text-white text-xs font-black uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} />
                      <span>Move All to Wardrobe Cart</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── CART SLIDE-OVER DRAWER ─── */}
        <AnimatePresence>
          {isCartOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 text-left"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcf8f4]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={20} className="text-[#e85d04]" />
                    <h3 className="font-extrabold text-base text-gray-900">Your Wardrobe Cart</h3>
                    <span className="text-xs bg-[#e85d04] text-white px-2 py-0.5 rounded-full font-bold">
                      {totalCartCount}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="bg-orange-50/60 border-b border-orange-100/80 px-4 py-2.5 text-xs">
                  {amountToFreeShipping > 0 ? (
                    <div className="space-y-1">
                      <div className="text-gray-700">
                        Add <strong className="text-[#e85d04]">{formatNaira(amountToFreeShipping)}</strong> more for <strong>FREE Nationwide Express Delivery</strong>!
                      </div>
                      <div className="w-full bg-orange-200/50 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#e85d04] h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              100,
                              (cartSubtotal / freeShippingThreshold) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      <span>Unlocked! Free Nationwide Express Delivery</span>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center space-y-3 text-gray-400">
                      <ShoppingBag size={48} className="mx-auto text-gray-300" />
                      <p className="text-sm font-medium">Your wardrobe cart is currently empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="px-5 py-2.5 rounded-xl bg-[#e85d04] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                      >
                        Explore Collection
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="p-3.5 rounded-2xl border border-gray-100 bg-[#fdfbf9] flex items-center gap-3.5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-xs text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            {item.selectedColor ? item.selectedColor.name : ""}
                            {item.selectedSize ? ` • ${item.selectedSize}` : ""}
                          </div>
                          <div className="font-black text-xs text-[#e85d04] mt-1">
                            {formatNaira(item.price)}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                          <button
                            onClick={() => updateCartQty(item.cartItemId, item.quantity - 1)}
                            className="text-xs font-bold text-gray-500 hover:text-gray-900 px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-gray-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.cartItemId, item.quantity + 1)}
                            className="text-xs font-bold text-gray-500 hover:text-gray-900 px-1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Checkout Footer */}
                {cart.length > 0 && (
                  <div className="p-4 border-t border-gray-100 bg-[#fcf8f4] space-y-3">
                    <div className="flex justify-between text-sm font-black text-gray-900">
                      <span>Subtotal:</span>
                      <span className="text-[#e85d04] text-base">
                        {formatNaira(cartSubtotal)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleOpenPaystack}
                        className="w-full py-3.5 rounded-xl bg-[#081d16] hover:bg-[#0c261e] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <CreditCard size={16} />
                        Pay with Card / Paystack ({formatNaira(cartSubtotal)})
                      </button>

                      <a
                        href={generateWhatsAppCheckoutUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <FaWhatsapp size={17} />
                        <span>Order via WhatsApp (1-Click)</span>
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── PRODUCT MODAL: MULTI-IMAGE STOCK GALLERY VIEW ─── */}
        <AnimatePresence>
          {activeModalProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalProduct(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white rounded-3xl w-full max-w-3xl overflow-hidden z-10 shadow-2xl p-6 sm:p-8 text-left max-h-[92vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors z-20"
                >
                  <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* LEFT: Multi-Image Stock Gallery */}
                  <div className="space-y-3">
                    {/* Main Stage with Carousel Nav */}
                    <div className="relative w-full h-72 sm:h-92 rounded-2xl bg-[#faf6f1] p-4 flex items-center justify-center overflow-hidden border border-[#f1e6da] group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImageIndex}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          src={currentModalImages[activeImageIndex] || activeModalProduct.image}
                          alt={`${activeModalProduct.name} - view ${activeImageIndex + 1}`}
                          onError={(e) => {
                            e.currentTarget.src =
                              activeModalProduct.image ||
                              "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {currentModalImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) =>
                                prev > 0 ? prev - 1 : currentModalImages.length - 1
                              );
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                            aria-label="Previous angle"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) =>
                                prev < currentModalImages.length - 1 ? prev + 1 : 0
                              );
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                            aria-label="Next angle"
                          >
                            <ChevronRight size={16} />
                          </button>

                          {/* Image Index Counter */}
                          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                            {activeImageIndex + 1} / {currentModalImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails Row: Exactly 3 views for every item */}
                    {currentModalImages.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {currentModalImages.map((thumbUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf6f1] border-2 transition-all p-1.5 shrink-0 ${activeImageIndex === idx
                              ? "border-[#e85d04] ring-2 ring-[#e85d04]/30 scale-102 opacity-100"
                              : "border-[#f1e6da] hover:border-gray-400 opacity-70 hover:opacity-100"
                              }`}
                          >
                            <img
                              src={thumbUrl}
                              alt={`View ${idx + 1}`}
                              onError={(e) => {
                                e.currentTarget.src =
                                  activeModalProduct.image ||
                                  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80";
                              }}
                              className="w-full h-full object-contain"
                            />
                            <span className="absolute bottom-1 right-1 text-[8px] font-bold bg-black/60 text-white px-1 rounded">
                              0{idx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* RIGHT: Stock Details & Options */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#e85d04] font-bold uppercase tracking-wider">
                        <span>{activeModalProduct.category}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          In Stock ({activeModalProduct.stockLeft || 12} available)
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                        {activeModalProduct.name}
                      </h3>

                      {/* Pricing in Naira */}
                      <div className="flex items-baseline gap-2.5 mt-2">
                        <span className="text-2xl sm:text-3xl font-black text-[#e85d04]">
                          {formatNaira(activeModalProduct.price)}
                        </span>
                        {activeModalProduct.oldPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatNaira(activeModalProduct.oldPrice)}
                          </span>
                        )}
                        {activeModalProduct.oldPrice && (
                          <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            Save {Math.round(((activeModalProduct.oldPrice - activeModalProduct.price) / activeModalProduct.oldPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 leading-relaxed mt-3">
                        {activeModalProduct.description}
                      </p>

                      {/* Composition */}
                      {activeModalProduct.composition && (
                        <div className="mt-2 text-[11px] text-gray-500 font-medium">
                          <strong>Material:</strong> {activeModalProduct.composition}
                        </div>
                      )}

                      {/* Color Options */}
                      {activeModalProduct.colors && (
                        <div className="pt-3 border-t border-gray-100 mt-3">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Color: <strong className="text-gray-900">{modalColor?.name}</strong>
                          </label>
                          <div className="flex items-center gap-2">
                            {activeModalProduct.colors.map((c) => (
                              <button
                                key={c.name}
                                onClick={() => setModalColor(c)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${modalColor?.name === c.name
                                  ? "ring-2 ring-[#e85d04] scale-110"
                                  : "border-gray-300"
                                  }`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Size Options */}
                      {activeModalProduct.sizes && (
                        <div className="pt-3">
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Size: <strong className="text-gray-900">{modalSize}</strong>
                          </label>
                          <div className="flex items-center gap-2 flex-wrap">
                            {activeModalProduct.sizes.map((s) => (
                              <button
                                key={s}
                                onClick={() => setModalSize(s)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${modalSize === s
                                  ? "bg-[#081d16] text-white border-[#081d16]"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                                  }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Symmetrical & Sized Action Buttons */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          addToCart(activeModalProduct, modalColor, modalSize, modalQty);
                          setActiveModalProduct(null);
                        }}
                        className="w-full py-3.5 px-3 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                      >
                        <ShoppingCart size={16} className="shrink-0" />
                        <span className="truncate">Add to Wardrobe</span>
                      </button>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hello ShopEase! 🛍️\n\nI want to order:\n• *${activeModalProduct.name}*\n• Color: ${modalColor?.name || "Standard"}\n• Size: ${modalSize || "Standard"}\n• Price: ${formatNaira(activeModalProduct.price)}\n\nPlease confirm availability!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
                      >
                        <FaWhatsapp size={16} className="shrink-0" />
                        <span className="truncate">Order on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── SECURE CHECKOUT FLOW MODAL ─── */}
        <AnimatePresence>
          {isPaystackOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isProcessingPayment && setIsPaystackOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden z-10 shadow-2xl text-left"
              >
                {/* Header */}
                <div className="bg-[#081d16] text-white p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#e85d04] flex items-center justify-center font-black text-xs text-white">
                      S
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                        ShopEase Fashion Studio
                      </div>
                      <div className="text-xs font-bold text-white">
                        Total Amount: {formatNaira(cartSubtotal)}
                      </div>
                    </div>
                  </div>
                  {!isProcessingPayment && (
                    <button
                      onClick={() => setIsPaystackOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {paystackStep === "customer" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPaystackStep("payment");
                    }}
                    className="p-5 sm:p-6 space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.fullName}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.address}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, address: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                    >
                      Proceed to Secure Payment ({formatNaira(cartSubtotal)})
                    </button>
                  </form>
                ) : paystackStep === "payment" ? (
                  <div className="p-6 space-y-4">
                    <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Test Debit Card:</span>
                        <span className="font-mono font-bold text-gray-900">4084 •••• •••• 0841</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Security:</span>
                        <span className="text-emerald-600 font-bold">256-Bit SSL Encrypted</span>
                      </div>
                    </div>

                    <button
                      disabled={isProcessingPayment}
                      onClick={handlePaystackPayment}
                      className="w-full py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing with Bank...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} />
                          <span>Complete Order ({formatNaira(cartSubtotal)})</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                      <Check size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900">Order Placed Successfully!</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Thank you {customerInfo.fullName}, your reference is{" "}
                        <strong className="font-mono text-gray-900">{mockTrxRef}</strong>.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsPaystackOpen(false);
                        setCart([]);
                        showToast("Demo checkout completed successfully!");
                      }}
                      className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Done & Return to Store
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── CUSTOMER CARE & POLICIES MODAL (FAQs, Shipping, Returns, Terms, Privacy) ─── */}
        <AnimatePresence>
          {activePolicyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePolicyModal(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-10 shadow-2xl flex flex-col text-left border border-[#f1e6da]"
              >
                {/* Modal Header */}
                <div className="bg-[#081d16] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#235342]">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16392d] text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
                      <HelpCircle size={12} className="text-[#f06428]" />
                      {POLICY_DATA[activePolicyModal]?.badge || "CUSTOMER ASSISTANCE"}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {POLICY_DATA[activePolicyModal]?.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActivePolicyModal(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Tab Navigation Bar */}
                <div className="bg-[#faf6f1] border-b border-[#f1e6da] px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-2.5">
                  {[
                    { key: "faqs", label: "FAQs" },
                    { key: "shipping", label: "Shipping Policy" },
                    { key: "returns", label: "Returns & Refunds" },
                    { key: "terms", label: "Terms & Conditions" },
                    { key: "privacy", label: "Privacy Policy" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActivePolicyModal(tab.key);
                        if (tab.key === "faqs") setExpandedFaq(0);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activePolicyModal === tab.key
                        ? "bg-[#081d16] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Modal Body Content */}
                <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
                  {/* Subtitle / intro */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {POLICY_DATA[activePolicyModal]?.subtitle}
                  </p>

                  {/* Highlight Cards if available */}
                  {POLICY_DATA[activePolicyModal]?.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {POLICY_DATA[activePolicyModal].highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-2xl bg-[#fdfbf9] border border-[#f1e6da] space-y-1"
                        >
                          <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e85d04]" />
                            {h.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed">
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* FAQs Accordion */}
                  {activePolicyModal === "faqs" && (
                    <div className="space-y-3 pt-2">
                      {FAQ_ITEMS.map((faq, idx) => {
                        const isOpen = expandedFaq === idx;
                        return (
                          <div
                            key={idx}
                            className="rounded-2xl border border-[#f1e6da] overflow-hidden bg-white shadow-2xs"
                          >
                            <button
                              onClick={() => setExpandedFaq(isOpen ? null : idx)}
                              className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-[#faf6f1] transition-colors"
                            >
                              <span className="font-extrabold text-xs sm:text-sm text-gray-900">
                                {faq.q}
                              </span>
                              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-600">
                                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </div>
                            </button>
                            {isOpen && (
                              <div className="p-4 pt-1 bg-[#fdfbf9] border-t border-[#f1e6da] text-xs sm:text-sm text-gray-600 leading-relaxed">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Policy Detailed Sections */}
                  {POLICY_DATA[activePolicyModal]?.sections && (
                    <div className="space-y-4 pt-2">
                      {POLICY_DATA[activePolicyModal].sections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="p-4.5 rounded-2xl bg-[#faf6f1] border border-[#f1e6da] space-y-1.5 text-left"
                        >
                          <h4 className="font-extrabold text-xs sm:text-sm text-gray-900">
                            {sec.heading}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {sec.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Modal Footer with Support Action */}
                <div className="bg-[#fcf8f4] border-t border-[#f1e6da] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck size={16} className="text-[#e85d04]" />
                    <span>Official ShopEase Client Assurance & Protection</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Hello ShopEase Support! I have a question regarding your ${POLICY_DATA[activePolicyModal]?.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <FaWhatsapp size={14} />
                      <span>WhatsApp Stylist</span>
                    </a>
                    <button
                      onClick={() => setActivePolicyModal(null)}
                      className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ─── MOBILE STICKY BOTTOM NAVIGATION BAR (Luxury App Experience) ─── */}
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#f1e6da] shadow-[0_-4px_25px_rgba(8,29,22,0.08)] px-2 py-2 flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => {
              setActiveCategoryPage(null);
              setSelectedFilterCategory("All");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              !activeCategoryPage
                ? "text-[#e85d04] font-black"
                : "text-gray-500 hover:text-gray-900 font-medium"
            }`}
          >
            <Home size={19} />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          {/* Shop */}
          <button
            onClick={() => {
              const el = document.getElementById("new-arrivals");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 800, behavior: "smooth" });
              }
            }}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
          >
            <ShoppingBag size={19} />
            <span className="text-[10px] tracking-tight">Shop</span>
          </button>

          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
          >
            <Search size={19} />
            <span className="text-[10px] tracking-tight">Search</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
          >
            <div className="relative">
              <Heart
                size={19}
                className={
                  Object.values(wishlist).filter(Boolean).length > 0
                    ? "text-red-500 fill-red-500"
                    : ""
                }
              />
              {Object.values(wishlist).filter(Boolean).length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                  {Object.values(wishlist).filter(Boolean).length}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Wishlist</span>
          </button>

          {/* Bag / Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center gap-0.5 py-0.5 px-3 rounded-xl text-[#081d16] font-bold transition-all"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#081d16] text-white flex items-center justify-center shadow-md">
                <ShoppingCart size={15} />
              </div>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e85d04] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight text-[#081d16]">Bag</span>
          </button>
        </div>

        {/* ─── TOAST NOTIFICATION ─── */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#081d16] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[#235342]"
            >
              <CheckCircle2 size={16} className="text-[#f06428] shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
