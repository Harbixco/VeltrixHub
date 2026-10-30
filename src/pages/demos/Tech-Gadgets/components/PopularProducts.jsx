import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Star,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { POPULAR_PRODUCTS, formatNaira } from "../data/mobilexData";
import { useTechGadgets } from "../context/TechGadgetsContext";

// Badges distribution matching template image (BESTSELLER, SIGNATURE, NEW)
const BADGES = ["BESTSELLER", "SIGNATURE", "NEW", "HOT DEAL"];

export default function PopularProducts() {
  const { addToCart, setActiveModalProduct, showToast } = useTechGadgets();

  // Selected color per card
  const [selectedCardColor, setSelectedCardColor] = useState({});

  // Pagination state: 2 rows × 4 columns = 8 products per page
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(POPULAR_PRODUCTS.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return POPULAR_PRODUCTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const el = document.getElementById("popular-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="popular-products"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 select-none"
    >
      {/* Header Row - Mobile-optimized to prevent awkward wrapping */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8 text-left">
        <div>
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF6B00] block mb-1">
            VERIFIED NIGERIA STOCK
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight">
            Popular Products
          </h2>
        </div>

        {/* Link to dedicated Products Page */}
        <Link
          to="/demos/tech-gadgets/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] sm:text-gray-800 hover:text-[#FF6B00] transition-colors uppercase tracking-wider cursor-pointer group w-fit"
        >
          <span>View All Products ({POPULAR_PRODUCTS.length})</span>
          <ChevronRight
            size={14}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* 2 Rows x 4 Columns Grid (8 products per page) matching the uploaded template */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {paginatedProducts.map((prod, idx) => {
          const badgeText = BADGES[idx % BADGES.length];
          const activeColor =
            selectedCardColor[prod.id] ||
            (prod.colors && prod.colors.length > 0 ? prod.colors[0] : null);

          return (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 p-3 sm:p-3.5 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 text-left relative group"
            >
              <div>
                {/* Visual Stage with Badge, Angle Hover & Quick View - High Visibility */}
                <div
                  onClick={() => setActiveModalProduct(prod)}
                  className="relative w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#f8f9fa] to-[#edf1f5] flex items-center justify-center mb-3 cursor-pointer overflow-hidden shadow-2xs"
                >
                  {/* Top Left Dark Badge (BESTSELLER / SIGNATURE / NEW) */}
                  <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-md text-[9px] font-black tracking-wider uppercase bg-black text-white shadow-xs">
                    {badgeText}
                  </span>

                  {/* Primary Product Image with high-definition coverage */}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700"
                  />

                  {/* Desktop Quick View Overlay Pill */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-gray-950 font-bold text-xs shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                      <Eye size={13} />
                      <span>View Angles</span>
                    </span>
                  </div>
                </div>

                {/* Category & Star Rating Row */}
                <div className="flex items-center justify-between text-xs px-0.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6B00]">
                    {prod.category}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-amber-500 text-[11px]">
                    <Star size={11} fill="currentColor" />
                    <span>{prod.rating ? prod.rating.toFixed(1) : "5.0"}</span>
                  </div>
                </div>

                {/* Product Title */}
                <h3
                  onClick={() => setActiveModalProduct(prod)}
                  className="font-extrabold text-xs sm:text-sm text-gray-950 hover:text-[#FF6B00] transition-colors cursor-pointer line-clamp-1 px-0.5"
                  title={prod.name}
                >
                  {prod.name}
                </h3>

                {/* Color Swatches */}
                {prod.colors && prod.colors.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1.5 px-0.5">
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
                            if (showToast) {
                              showToast(`Selected ${c.name} for ${prod.name}`);
                            }
                          }}
                          className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                            isSelected
                              ? "ring-2 ring-[#FF6B00] ring-offset-1 scale-110 shadow-xs"
                              : "border-black/20 hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price & Shopping Cart Button Row */}
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 px-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-sm sm:text-base text-gray-950 font-mono tracking-tight">
                    {formatNaira(prod.price)}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through font-mono">
                      {formatNaira(prod.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Cart Action Button */}
                <button
                  type="button"
                  onClick={() => addToCart(prod)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-gray-200 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] text-gray-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  title="Add to Cart"
                  aria-label={`Add ${prod.name} to cart`}
                >
                  <ShoppingCart size={15} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Controls (Paginate the remaining products) */}
      <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 font-medium order-2 sm:order-1">
          Showing{" "}
          <strong className="text-gray-900 font-bold">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, POPULAR_PRODUCTS.length)}
          </strong>{" "}
          of <strong className="text-gray-900 font-bold">{POPULAR_PRODUCTS.length}</strong> Popular Products
        </p>

        {/* Page navigation buttons */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          {/* Previous Button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
            <span>Prev</span>
          </button>

          {/* Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-[#FF6B00] text-white shadow-sm shadow-orange-500/25"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
