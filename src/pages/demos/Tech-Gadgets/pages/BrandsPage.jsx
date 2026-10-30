import { Link, useNavigate } from "react-router-dom";
import { Award, CheckCircle2, ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { SiGoogle, SiXiaomi, SiSamsung, SiOneplus } from "react-icons/si";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function BrandsPage() {
  const navigate = useNavigate();

  const brands = [
    {
      name: "Apple",
      brandKey: "Apple",
      logo: <FaApple size={36} className="text-gray-950" />,
      tagline: "iPhone 15 Pro, MacBook Pro M3, Apple Watch Ultra 2, AirPods Pro",
      warranty: "1-Year Official Apple Care Warranty Guaranteed",
      badge: "Authorized Stock",
      description: "Direct sealed units with clean factory serials and genuine Apple warranty across all devices.",
    },
    {
      name: "Samsung",
      brandKey: "Samsung",
      logo: <SiSamsung size={48} className="text-[#034EA2]" />,
      tagline: "Galaxy S24 Ultra, Galaxy Z Fold5, Watch6 Classic, Galaxy Buds2 Pro",
      warranty: "24-Month Official Samsung West Africa Warranty",
      badge: "Premier Partner",
      description: "Experience the full suite of Galaxy AI and pro camera tech with official Nigerian distributor backing.",
    },
    {
      name: "OnePlus",
      brandKey: "OnePlus",
      logo: (
        <div className="flex items-center gap-2 text-black font-black text-2xl">
          <SiOneplus size={28} className="text-[#EB0029]" />
          <span>ONEPLUS</span>
        </div>
      ),
      tagline: "OnePlus 12, OnePlus 12R 5G, Buds Pro 2",
      warranty: "12-Month Manufacturer Hardware Warranty",
      badge: "Speed Flagship",
      description: "Flagship gaming, 100W SUPERVOOC charging, and silky-smooth OxygenOS built for speed enthusiasts.",
    },
    {
      name: "Xiaomi",
      brandKey: "Xiaomi",
      logo: (
        <div className="w-10 h-10 rounded-xl bg-[#FF6900] text-white font-black text-lg flex items-center justify-center">
          mi
        </div>
      ),
      tagline: "Xiaomi 14 Ultra Leica, Redmi Series, Fast Charging Powerbanks",
      warranty: "12-Month Official Xiaomi Nigeria Warranty",
      badge: "Smart Ecosystem",
      description: "Leica co-engineered cinema photography and heavy-duty portable powerbanks made for durability.",
    },
    {
      name: "Google",
      brandKey: "Google",
      logo: (
        <div className="flex items-center gap-2 font-bold text-gray-800 text-2xl">
          <SiGoogle size={24} className="text-[#4285F4]" />
          <span>Google</span>
        </div>
      ),
      tagline: "Pixel 8 Pro, Pixel Fold, Pixel Buds Pro",
      warranty: "Factory Unlocked Global Models with Clean IMEI",
      badge: "Pure Google AI",
      description: "Google's smartest hardware powered by Tensor G3 with Magic Eraser and seamless Android experience.",
    },
    {
      name: "Sony",
      brandKey: "Sony",
      logo: (
        <span className="font-serif font-black tracking-widest text-gray-950 text-2xl">
          SONY
        </span>
      ),
      tagline: "WH-1000XM5 Noise Canceling, WF-1000XM5, PlayStation Gear",
      warranty: "12-Month Official Sony Electronics Warranty",
      badge: "Acoustic Leader",
      description: "The gold standard in industry-leading active noise cancellation, studio headphones, and gaming gear.",
    },
  ];

  return (
    <PageTransition>
      <SEO
        title="Featured Tech Brands | MobileX Nigeria"
        description="Shop certified brand deals from Apple, Samsung, OnePlus, Xiaomi, Google, and Sony with official warranty."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Brands</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none text-left">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest mb-3">
              <Award size={14} />
              <span>OFFICIAL BRAND DISTRIBUTORS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight leading-tight">
              Featured Global Brands
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              Every device on MobileX is sourced directly through certified manufacturer supply channels, ensuring 100% factory-sealed authenticity and full warranty protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((b) => (
              <div
                key={b.name}
                className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 flex items-center">
                      {b.logo}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase bg-orange-50 text-[#FF6B00] px-3 py-1 rounded-full border border-orange-100">
                      {b.badge}
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-gray-950 mb-1">
                    {b.name} Official Stock
                  </h2>

                  <p className="text-xs text-gray-500 font-medium mb-3">
                    {b.tagline}
                  </p>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {b.description}
                  </p>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800 font-bold mb-6">
                    <CheckCircle2 size={15} className="text-[#0E8453] shrink-0" />
                    <span>{b.warranty}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/demos/tech-gadgets/products?brand=${encodeURIComponent(b.brandKey)}`)}
                  className="w-full py-3 px-4 rounded-xl bg-gray-50 group-hover:bg-[#FF6B00] text-gray-800 group-hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore {b.name} Products</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

