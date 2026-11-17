import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";
import { CATEGORIES } from "../data/mobilexData";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const categoryCards = [
    {
      id: "smartphones",
      name: "Smartphones",
      displayName: "Smartphones & 5G Flagships",
      badge: "48+ Certified Models",
      desc: "Latest Apple iPhone 15 Pro, Samsung Galaxy S24 Ultra, Google Pixel AI, and OnePlus flagships with official factory-sealed warranties and 5G connectivity.",
      subcategories: [
        "iPhone 15 Pro Max",
        "Galaxy S24 Ultra",
        "Google Pixel 8 Pro",
        "OnePlus 12 5G",
        "Xiaomi 14 Ultra",
      ],
      image: CATEGORIES[0].image,
      highlight: "From ₦420,000",
    },
    {
      id: "laptops",
      name: "Laptops & MacBooks",
      displayName: "Pro Laptops & Workstations",
      badge: "32+ Pro Configurations",
      desc: "High-performance Apple MacBooks with M3 silicon, Dell XPS InfinityEdge, and HP Spectre workstations built for software engineers, designers, and business leaders.",
      subcategories: [
        "MacBook Pro M3 Max",
        "MacBook Air M2",
        "Dell XPS 15 OLED",
        "HP Spectre x360",
        "Lenovo ThinkPad X1",
      ],
      image: CATEGORIES[1].image,
      highlight: "From ₦850,000",
    },
    {
      id: "earpods",
      name: "Earpods & Audio",
      displayName: "Wireless Earpods & Studio Audio",
      badge: "24+ Studio Models",
      desc: "Active noise-cancelling wireless earbuds, high-resolution audiophile studio headphones, and portable waterproof bluetooth party speakers.",
      subcategories: [
        "AirPods Pro 2",
        "Sony WH-1000XM5",
        "Galaxy Buds2 Pro",
        "JBL Charge 5",
        "Bose QuietComfort",
      ],
      image: CATEGORIES[2].image,
      highlight: "From ₦65,000",
    },
    {
      id: "powerbanks",
      name: "Powerbanks & Charging",
      displayName: "Heavy-Duty Powerbanks & Charging",
      badge: "18+ Fast Charging Packs",
      desc: "20,000mAh to 60,000mAh high-capacity PD power banks and 140W GaN fast chargers engineered for reliable continuous productivity in Nigeria.",
      subcategories: [
        "Anker 737 140W GaN",
        "Xiaomi 30,000mAh 65W",
        "Oraimo HyperCharge",
        "Romoss 40,000mAh",
      ],
      image: CATEGORIES[3].image,
      highlight: "From ₦35,000",
    },
    {
      id: "smartwatches",
      name: "Smartwatches",
      displayName: "Smartwatches & Health Wearables",
      badge: "20+ AMOLED Wearables",
      desc: "Advanced AMOLED health trackers with ECG, blood pressure monitoring, cellular calling, and aerospace titanium durability.",
      subcategories: [
        "Apple Watch Ultra 2",
        "Series 9 Cellular",
        "Galaxy Watch6 Classic",
        "Garmin GPS Solar",
      ],
      image: CATEGORIES[4].image,
      highlight: "From ₦120,000",
    },
  ];

  return (
    <PageTransition>
      <SEO
        title="All Categories & Departments | MobileX Nigeria"
        description="Explore MobileX's five flagship tech categories: Smartphones, Pro Laptops, Audio, Heavy-Duty Powerbanks, and Smartwatches."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb Navigation */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-3.5 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link
              to="/demos/tech-gadgets"
              className="hover:text-[#FF6B00] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Categories</span>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 select-none text-left">
          {/* Header Area */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest mb-3">
              <Layers size={13} />
              <span>SHOP BY DEPARTMENT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 uppercase tracking-tight leading-tight">
              All Tech Categories
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2.5 leading-relaxed">
              Explore our certified flagship hardware departments. All devices
              feature official manufacturer warranty, express nationwide
              delivery, and guaranteed genuine serial verification.
            </p>

            {/* Quick Filter / Jump Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-5">
              {categoryCards.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    navigate(
                      `/demos/tech-gadgets/products?category=${encodeURIComponent(
                        cat.name
                      )}`
                    )
                  }
                  className="px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-[#FF6B00] hover:text-white text-gray-700 text-xs font-bold transition-all cursor-pointer border border-transparent hover:border-[#FF6B00]"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Redesigned Large Visual Showcase Cards (No Gadget Icons, High Visibility Images) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {categoryCards.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className="group rounded-3xl border border-gray-100 bg-white p-4 sm:p-6 hover:border-orange-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Pure, Clean Category Image with Zero Text Overlay */}
                  <div
                    onClick={() =>
                      navigate(
                        `/demos/tech-gadgets/products?category=${encodeURIComponent(
                          cat.name
                        )}`
                      )
                    }
                    className="relative w-full h-56 sm:h-68 lg:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-[#edf1f5] to-[#e4e9f0] mb-4 cursor-pointer flex items-center justify-center p-2 shadow-inner"
                  >
                    <img
                      src={cat.image}
                      alt={cat.displayName}
                      className="w-full h-full object-cover rounded-xl transform group-hover:scale-106 transition-transform duration-700"
                    />
                  </div>

                  {/* Badge & Starting Price Row */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="bg-black text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded">
                      {cat.badge}
                    </span>
                    <span className="text-[#FF6B00] font-extrabold text-xs">
                      {cat.highlight}
                    </span>
                  </div>

                  {/* Category Title */}
                  <h2
                    onClick={() =>
                      navigate(
                        `/demos/tech-gadgets/products?category=${encodeURIComponent(
                          cat.name
                        )}`
                      )
                    }
                    className="text-xl sm:text-2xl font-black text-gray-950 group-hover:text-[#FF6B00] transition-colors mb-2 cursor-pointer leading-snug"
                  >
                    {cat.displayName}
                  </h2>

                  {/* Editorial Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {/* Subcategories / Popular Models Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-100"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/demos/tech-gadgets/products?category=${encodeURIComponent(
                        cat.name
                      )}`
                    )
                  }
                  className="w-full py-3.5 px-6 rounded-xl bg-gray-950 group-hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Browse All {cat.name}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}
