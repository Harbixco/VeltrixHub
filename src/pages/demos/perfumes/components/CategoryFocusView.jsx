import {
  ChevronLeft,
  Sparkles,
  Eye,
  Star,
  ShoppingCart,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CATEGORY_DETAILS } from "../data/categories";
import { PERFUMES_CATALOG } from "../data/catalog";
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
}) {
  const categoryInfo = CATEGORY_DETAILS[activeCategoryPage];

  const categoryProducts = PERFUMES_CATALOG.filter(
    (item) => item.category.toLowerCase() === activeCategoryPage?.toLowerCase()
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 select-none">
      {/* Category Navigation Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#EFE1DD] rounded-2xl px-5 py-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8E7574]">
          <button
            onClick={() => {
              setActiveCategoryPage(null);
              setActiveNav("All Scents");
              setSelectedFilterCategory("All");
            }}
            className="hover:text-[#8A4852] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#8E7574]">Fragrance Families</span>
          <span>/</span>
          <span className="text-[#8A4852] font-bold">
            {categoryInfo?.title || activeCategoryPage}
          </span>
        </div>

        <button
          onClick={() => {
            setActiveCategoryPage(null);
            setActiveNav("All Scents");
            setSelectedFilterCategory("All");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D5C5B] hover:text-[#8A4852] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back to All Fragrances</span>
        </button>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#5A2931] via-[#6E3A42] to-[#451C22] text-white p-7 sm:p-12 border border-[#8A4852]/40">
        <img
          src={categoryInfo?.bannerImage}
          alt={categoryInfo?.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#451C22] via-[#5A2931]/95 to-transparent" />
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#451C22]/90 backdrop-blur-xs border border-[#8A4852]/40 text-[#ECA5AC] text-[11px] font-bold tracking-widest uppercase shadow-xs">
            <Sparkles size={13} className="text-[#ECA5AC]" />
            {categoryInfo?.badgeText}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight text-[#FFF5F3]">
            {categoryInfo?.title}
          </h1>

          <p className="text-xs sm:text-sm font-bold text-[#ECA5AC] tracking-widest uppercase">
            {categoryInfo?.tagline}
          </p>

          <p className="text-[#EBD2D0] text-xs sm:text-sm leading-relaxed max-w-xl">
            {categoryInfo?.description}
          </p>

          {/* Scent Highlights */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categoryInfo?.highlights?.map((h) => (
              <span
                key={h}
                className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[#FFF5F3]"
              >
                ✦ {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Category Switcher Tabs */}
      <div className="bg-white border border-[#EFE1DD] rounded-2xl p-2.5 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        {[
          { label: "Oud & Oriental", key: "Oud & Oriental" },
          { label: "Gourmand & Vanilla", key: "Gourmand & Vanilla" },
          { label: "Floral & Botanical", key: "Floral & Botanical" },
          { label: "Fresh & Woody", key: "Fresh & Woody Aquatic" },
          { label: "Attar & Pure Oils", key: "Attar & Pure Oils" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveCategoryPage(tab.key);
              setActiveNav(tab.label);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategoryPage === tab.key
                ? "bg-[#8A4852] text-white shadow-md shadow-[#8A4852]/20 scale-102 border border-[#8A4852]"
                : "text-[#6D5C5B] hover:text-[#231819] hover:bg-[#FAF1F0]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Product Catalog Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs font-bold text-[#9C5B66] tracking-widest uppercase">
              CERTIFIED EXTRAITS
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#231819] tracking-tight">
              Curated {activeCategoryPage} Edit
            </h2>
          </div>
          <span className="text-xs font-bold text-[#6D5C5B] bg-white border border-[#EFE1DD] px-3.5 py-1.5 rounded-full shadow-2xs">
            {categoryProducts.length} Rare Masterpieces
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
                className="bg-white rounded-3xl border border-[#EFE1DD] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#8A4852]/40 transition-all flex flex-col justify-between group text-left"
              >
                {/* Image & Badges */}
                <div className="relative w-full h-64 sm:h-72 bg-[#FAF1F0] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-[#5A2931] text-[#FFF5F3] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#8A4852]/40">
                    {product.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-[#8A4852] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                    -{discountPct}%
                  </span>

                  <button
                    onClick={() => openModal(product)}
                    className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#231819] font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye size={13} />
                      <span>Inspect Notes</span>
                    </span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-[#9C5B66] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#8A4852] font-bold text-[11px]">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span className="text-[#8E7574]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => openModal(product)}
                      className="font-serif font-black text-sm text-[#231819] group-hover:text-[#8A4852] cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-[#6D5C5B] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#EFE1DD] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono font-black text-base text-[#8A4852]">
                          {formatNaira(product.price)}
                        </span>
                        <span className="text-xs text-[#8E7574] line-through font-mono">
                          {formatNaira(product.oldPrice)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#8A4852] bg-[#FAF1F0] px-2 py-0.5 rounded-md border border-[#EFE1DD]">
                        {product.sillage}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="py-2.5 px-3 rounded-xl bg-[#8A4852] hover:bg-[#773D46] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <ShoppingCart size={14} />
                        <span>Add</span>
                      </button>
                      <a
                        href={generateSingleProductWhatsAppUrl({
                          product,
                          city: "Victoria Island, Lagos",
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
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

      {/* Scent Master Consultation Strip */}
      <div className="bg-[#FAF1F0] border border-[#EFE1DD] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
        <div className="space-y-1.5 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#9C5B66] block">
            NEED BESPOKE OLFACTORY ADVICE?
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-[#231819] tracking-tight">
            Consult Our In-House Master Parfumeur
          </h3>
          <p className="text-xs text-[#6D5C5B] leading-relaxed">
            Unsure which scent complements your natural skin chemistry or an upcoming black-tie gala? Send a message to receive personalized recommendations from certified noses.
          </p>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hello AuraScents! 👋 I am browsing your ${activeCategoryPage} collection and would love personalized advice picking the right scent.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer shrink-0"
        >
          <FaWhatsapp size={16} />
          <span>Chat with Scent Stylist</span>
        </a>
      </div>

      {/* Return to All Categories Banner */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => {
            setActiveCategoryPage(null);
            setActiveNav("All Scents");
            setSelectedFilterCategory("All");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#EFE1DD] text-xs font-bold text-[#231819] hover:text-[#8A4852] hover:border-[#8A4852] transition-all shadow-xs cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Return to Full AuraScents Showroom</span>
        </button>
      </div>
    </section>
  );
}
