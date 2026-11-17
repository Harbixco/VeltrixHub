import { motion } from "framer-motion";
import {
  Eye,
  Star,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira, WHATSAPP_NUMBER, generateSingleProductWhatsAppUrl } from "../utils/helpers";

export default function ProductCatalog({
  paginatedProducts,
  displayedProducts,
  selectedFilterCategory,
  handleSelectCategory,
  selectedCardColor,
  setSelectedCardColor,
  openModal,
  addToCart,
  currentPage,
  setCurrentPage,
  totalPages,
  ITEMS_PER_PAGE,
  showToast,
}) {
  return (
    <section id="new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Curated Clothing Designs
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { label: "All Garments", key: "All" },
            { label: "Classic Senator", key: "Classic Senator" },
            { label: "Embroidered Kaftans", key: "Embroidered Kaftans" },
            { label: "Color-Block Tunics", key: "Color-Block Tunics" },
            { label: "Mandarin Suits", key: "Mandarin Suits" },
            { label: "Short-Sleeve Casual", key: "Short-Sleeve Casual" },
          ].map((pill) => (
            <button
              key={pill.key}
              onClick={() => handleSelectCategory(pill.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedFilterCategory === pill.key
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
              if (showToast) showToast("Showing all 25 luxury clothing designs");
            }}
            className="text-xs font-bold text-[#e85d04] hover:underline flex items-center gap-1 ml-2"
          >
            <span>View All (25)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Cards Grid: Strictly 1 column on mobile (Single Clothe per row), 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
        {paginatedProducts.map((prod, idx) => {
          const activeColor =
            selectedCardColor[prod.id] || (prod.colors ? prod.colors[0] : null);
          const discountPct = prod.oldPrice
            ? Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100)
            : null;

          return (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: (idx % 6) * 0.06 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-3xl border border-[#f1e6da] p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-2xl hover:border-[#e85d04]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top: Badge & Discount */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider bg-[#081d16] text-white">
                  {prod.badge}
                </span>
                {discountPct && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e85d04]/10 text-[#e85d04]">
                    SAVE {discountPct}%
                  </span>
                )}
              </div>

              {/* Image Showcase: 100% Clean Clothes Design with Zero Text Overlay */}
              <div
                onClick={() => openModal(prod)}
                className="relative w-full h-80 sm:h-72 md:h-84 rounded-2xl bg-[#faf6f1] flex items-center justify-center cursor-pointer overflow-hidden mb-3"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80";
                  }}
                  className={`w-full h-full object-cover object-top transition-all duration-700 ${
                    prod.gallery && prod.gallery[1]
                      ? "group-hover:opacity-0 group-hover:scale-105"
                      : "group-hover:scale-108"
                  }`}
                />
                {prod.gallery && prod.gallery[1] && (
                  <img
                    src={prod.gallery[1]}
                    alt={`${prod.name} angle 2`}
                    className="w-full h-full object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  />
                )}
              </div>

              {/* Product Meta */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="uppercase tracking-wider font-bold text-[#e85d04] text-[11px]">
                      {prod.category}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star size={12} fill="currentColor" />
                      {prod.rating} ({prod.reviewsCount})
                    </span>
                  </div>

                  <h3
                    onClick={() => openModal(prod)}
                    className="font-extrabold text-base sm:text-base text-gray-900 group-hover:text-[#e85d04] cursor-pointer transition-colors line-clamp-1"
                    title={prod.name}
                  >
                    {prod.name}
                  </h3>

                  {/* Fabric Composition Tag */}
                  <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                    {prod.composition}
                  </p>

                  {/* Sizing Pills Preview */}
                  <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-1">
                    {prod.sizes.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#faf6f1] border border-[#f1e6da] text-gray-600 font-semibold shrink-0"
                      >
                        {s}
                      </span>
                    ))}
                    {prod.sizes.length > 4 && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        +{prod.sizes.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Interactive Color Swatch Dots */}
                  {prod.colors && (
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        Color:
                      </span>
                      {prod.colors.map((c) => {
                        const isSelected = activeColor?.name === c.name;
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCardColor((prev) => ({
                                ...prev,
                                [prod.id]: c,
                              }));
                              if (showToast)
                                showToast(`Selected ${c.name} for ${prod.name}`);
                            }}
                            className={`w-4 h-4 rounded-full border transition-all ${
                              isSelected
                                ? "ring-2 ring-[#e85d04] ring-offset-1 scale-110 shadow-xs"
                                : "border-black/20 hover:scale-105"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        );
                      })}
                      <span className="text-[11px] font-semibold text-gray-700 ml-1">
                        {activeColor?.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pricing and Action Buttons */}
                <div className="pt-3 border-t border-gray-100 space-y-2 mt-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-lg sm:text-lg text-gray-900">
                        {formatNaira(prod.price)}
                      </span>
                      {prod.oldPrice && (
                        <span className="text-xs text-gray-400 line-through font-medium">
                          {formatNaira(prod.oldPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Custom Fitting Available
                    </span>
                  </div>

                  {/* Dual Action Buttons: Add to Bag + WhatsApp Order */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(prod, activeColor)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#081d16] hover:bg-[#0c261e] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={generateSingleProductWhatsAppUrl(
                        prod,
                        activeColor,
                        prod.sizes[0]
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <FaWhatsapp size={15} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Luxury Interactive Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 pt-6 border-t border-[#f1e6da] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 font-medium">
            Showing{" "}
            <strong className="text-gray-900">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </strong>{" "}
            to{" "}
            <strong className="text-gray-900">
              {Math.min(currentPage * ITEMS_PER_PAGE, displayedProducts.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-gray-900">{displayedProducts.length}</strong>{" "}
            clothing designs
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                document
                  .getElementById("new-arrivals")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-white text-gray-700 border-[#f1e6da] hover:border-[#e85d04] hover:text-[#e85d04] shadow-xs"
              }`}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      document
                        .getElementById("new-arrivals")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-[#081d16] text-white shadow-xs scale-105"
                        : "bg-white text-gray-600 border border-[#f1e6da] hover:border-gray-400"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                document
                  .getElementById("new-arrivals")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all ${
                currentPage === totalPages
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
  );
}
