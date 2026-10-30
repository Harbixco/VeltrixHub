import { motion } from "framer-motion";
import {
  Eye,
  Star,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatNaira } from "../utils/helpers";

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
              if (showToast) showToast("Showing all 20 curated fashion pieces");
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
          const activeColor =
            selectedCardColor[prod.id] || (prod.colors ? prod.colors[0] : null);
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
              {/* Top: Badge */}
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black tracking-wider bg-[#081d16] text-white">
                  {prod.badge}
                </span>
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
                            setSelectedCardColor((prev) => ({
                              ...prev,
                              [prod.id]: c,
                            }));
                            if (showToast)
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

      {/* Luxury Interactive Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 pt-6 border-t border-[#f1e6da] flex flex-col sm:flex-row items-center justify-between gap-4">
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
            pieces
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

