import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Eye,
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
  openModal,
  addToCart,
  currentPage,
  setCurrentPage,
  totalPages,
  ITEMS_PER_PAGE,
  showToast,
}) {
  return (
    <section id="perfume-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="text-left">
          <span className="text-[#9C5B66] text-xs font-bold tracking-widest uppercase">
            CERTIFIED HAUTE PARFUMERIE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#231819] tracking-tight mt-0.5">
            Our Fragrance Collection
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { label: "All Scents", key: "All" },
            { label: "Oud & Oriental", key: "Oud & Oriental" },
            { label: "Gourmand", key: "Gourmand & Vanilla" },
            { label: "Floral", key: "Floral & Botanical" },
            { label: "Fresh Woody", key: "Fresh & Woody Aquatic" },
            { label: "Pure Attar Oils", key: "Attar & Pure Oils" },
          ].map((pill) => (
            <button
              key={pill.key}
              onClick={() => handleSelectCategory(pill.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilterCategory === pill.key
                  ? "bg-[#8A4852] text-white border border-[#8A4852] shadow-xs"
                  : "bg-white border border-[#EFE1DD] text-[#6D5C5B] hover:border-[#8A4852] hover:text-[#8A4852]"
              }`}
            >
              {pill.label}
            </button>
          ))}
          <button
            onClick={() => {
              handleSelectCategory("All");
              if (showToast) showToast("Showing all 20 curated master perfumes");
            }}
            className="text-xs font-bold text-[#8A4852] hover:underline flex items-center gap-1 ml-2 cursor-pointer shrink-0"
          >
            <span>View All (20)</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Cards Grid: 2 columns on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
        {paginatedProducts.map((prod, idx) => (
          <motion.div
            key={prod.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: (idx % 6) * 0.06 }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-3xl border border-[#EFE1DD] p-2.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#8A4852]/40 transition-all duration-300 relative text-left"
          >
            {/* Top: Badge & Concentration */}
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider bg-[#FAF1F0] text-[#8A4852] border border-[#EFE1DD]">
                {prod.badge}
              </span>
              <span className="text-[9px] font-bold text-[#8E7574] hidden sm:inline truncate max-w-[130px]">
                {prod.concentration}
              </span>
            </div>

            {/* Image Showcase */}
            <div
              onClick={() => openModal(prod)}
              className="relative w-full h-52 sm:h-68 md:h-72 rounded-2xl bg-[#FAF1F0] flex items-center justify-center cursor-pointer overflow-hidden mb-2 sm:mb-3"
            >
              <img
                src={prod.image}
                alt={prod.name}
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
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center backdrop-blur-2xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#231819] font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye size={13} />
                  <span>Inspect Scent Notes</span>
                </span>
              </div>

              {/* Sillage Tag */}
              <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-[#5A2931]/90 backdrop-blur-md text-[#FFF5F3] border border-[#8A4852]/40 px-2 py-0.5 rounded-md shadow-xs">
                {prod.sillage}
              </span>
            </div>

            {/* Product Meta */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#8E7574]">
                <span className="uppercase tracking-wider font-bold text-[#9C5B66]">
                  {prod.category}
                </span>
                <span className="flex items-center gap-0.5 text-[#8A4852] font-bold">
                  <Star size={11} fill="currentColor" />
                  {prod.rating}
                </span>
              </div>

              <h3
                onClick={() => openModal(prod)}
                className="font-serif font-black text-xs sm:text-sm text-[#231819] group-hover:text-[#8A4852] cursor-pointer transition-colors line-clamp-1"
                title={prod.name}
              >
                {prod.name}
              </h3>

              {/* Note Pyramid Highlights */}
              {prod.notes && (
                <p className="text-[10px] sm:text-[11px] text-[#6D5C5B] line-clamp-1 font-sans">
                  <span className="font-bold text-[#231819]">Notes:</span> {prod.notes.top}
                </p>
              )}

              {/* Pricing and Action in Naira */}
              <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#EFE1DD] mt-1.5 sm:mt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
                  <span className="font-mono font-black text-xs sm:text-base text-[#8A4852]">
                    {formatNaira(prod.price)}
                  </span>
                  {prod.oldPrice && (
                    <span className="text-[10px] sm:text-xs text-[#8E7574] line-through font-mono">
                      {formatNaira(prod.oldPrice)}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => addToCart(prod)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#EFE1DD] bg-[#FAF1F0] hover:bg-[#8A4852] text-[#231819] hover:text-white flex items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer"
                  title="Add to Scent Bag"
                >
                  <ShoppingCart size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Luxury Interactive Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 pt-6 border-t border-[#EFE1DD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6D5C5B] font-medium">
            Showing{" "}
            <strong className="text-[#231819]">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </strong>{" "}
            to{" "}
            <strong className="text-[#231819]">
              {Math.min(currentPage * ITEMS_PER_PAGE, displayedProducts.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-[#231819]">{displayedProducts.length}</strong>{" "}
            fragrance masterpieces
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                document
                  .getElementById("perfume-catalog")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-white text-[#6D5C5B] border-[#EFE1DD] hover:border-[#8A4852] hover:text-[#8A4852] shadow-xs"
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
                        .getElementById("perfume-catalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#8A4852] text-white shadow-xs scale-105 border border-[#8A4852]"
                        : "bg-white text-[#6D5C5B] border border-[#EFE1DD] hover:border-[#8A4852]"
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
                  .getElementById("perfume-catalog")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1 transition-all cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-white text-[#6D5C5B] border-[#EFE1DD] hover:border-[#8A4852] hover:text-[#8A4852] shadow-xs"
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
