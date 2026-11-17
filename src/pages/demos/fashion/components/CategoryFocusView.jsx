import {
  ChevronLeft,
  Sparkles,
  Eye,
  Star,
  ShoppingCart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CATEGORY_DETAILS } from "../data/categories";
import { FASHION_CATALOG } from "../data/catalog";
import {
  WHATSAPP_NUMBER,
  formatNaira,
  generateSingleProductWhatsAppUrl,
} from "../utils/helpers";

export default function CategoryFocusView({
  activeCategoryPage,
  setActiveCategoryPage,
  setActiveNav,
  setSelectedFilterCategory,
  openModal,
  addToCart,
  setActivePolicyModal,
  setExpandedFaq,
}) {
  const categoryInfo = CATEGORY_DETAILS[activeCategoryPage];

  const categoryProducts = FASHION_CATALOG.filter(
    (item) => item.category.toLowerCase() === activeCategoryPage?.toLowerCase()
  );

  return (
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
            {categoryInfo?.title || activeCategoryPage}
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
          src={categoryInfo?.bannerImage}
          alt={categoryInfo?.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081d16] via-[#081d16]/90 to-transparent" />
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16392d]/90 backdrop-blur-xs border border-[#235342] text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
            <Sparkles size={13} className="text-[#f06428]" />
            {categoryInfo?.badgeText}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            {categoryInfo?.title}
          </h1>

          <p className="text-xs sm:text-sm font-bold text-[#f06428] tracking-widest uppercase">
            {categoryInfo?.tagline}
          </p>

          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl">
            {categoryInfo?.description}
          </p>

          {/* Fabric & Craftsmanship Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categoryInfo?.fabricHighlights?.map((f) => (
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
          { label: "Classic Senator", key: "Classic Senator" },
          { label: "Embroidered Kaftans", key: "Embroidered Kaftans" },
          { label: "Color-Block Tunics", key: "Color-Block Tunics" },
          { label: "Mandarin Suits", key: "Mandarin Suits" },
          { label: "Short-Sleeve Casual", key: "Short-Sleeve Casual" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveCategoryPage(tab.key);
              setActiveNav(tab.key);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategoryPage === tab.key
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
            {categoryProducts.length} Exclusive Styles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => {
            const discountPct = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            );
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#f1e6da] overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-300 transition-all flex flex-col justify-between group"
              >
                {/* Pure, Clean Image with Zero Text Overlay */}
                <div
                  onClick={() => openModal(product)}
                  className="relative w-full h-72 sm:h-80 bg-[#faf6f1] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-106 transition-transform duration-700"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-[#081d16] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="text-gray-400 font-normal">
                          ({product.reviewsCount})
                        </span>
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
                        href={generateSingleProductWhatsAppUrl({
                          product,
                          city: "Lekki, Lagos",
                        })}
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

      {/* Value Strip */}
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
            if (setExpandedFaq) setExpandedFaq(0);
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
  );
}

