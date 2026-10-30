import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ShoppingCart, Star, Eye, Filter, ArrowLeft } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";
import { POPULAR_PRODUCTS, formatNaira } from "../data/mobilexData";
import { useTechGadgets } from "../context/TechGadgetsContext";

function ProductsPageContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "ALL";
  const initialBrand = searchParams.get("brand") || "ALL";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState("FEATURED");

  const { addToCart, setActiveModalProduct } = useTechGadgets();

  const categories = ["ALL", "Smartphones", "Laptops", "Audio", "Powerbanks", "Smartwatches"];
  const brands = ["ALL", "Apple", "Samsung", "OnePlus", "Xiaomi", "Dell", "HP", "Sony", "JBL", "Anker"];

  const filteredProducts = useMemo(() => {
    let result = [...POPULAR_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "ALL") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedBrand !== "ALL") {
      result = result.filter(
        (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (sortBy === "PRICE_LOW") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "PRICE_HIGH") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, sortBy]);

  return (
    <>
      <SEO
        title="All Products Catalog | MobileX Nigeria"
        description="Browse all original smartphones, pro laptops, wireless earbuds, heavy-duty powerbanks, and smartwatches available in Nigeria."
      />

      <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">All Products</span>
        </div>
      </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none text-left">
          {/* Header Title - Mobile-optimized */}
          <div className="mb-6 sm:mb-8 text-left">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF6B00] block mb-1">
              COMPLETE NIGERIA INVENTORY
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 uppercase tracking-tight">
              All Tech Products
              <span className="text-sm sm:text-base font-bold text-gray-400 ml-2.5 normal-case">
                ({filteredProducts.length} available)
              </span>
            </h1>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs mb-8 space-y-3.5">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by model, brand, or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              {/* Brand Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="ALL">All Brands</option>
                  {brands.filter((b) => b !== "ALL").map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="FEATURED">Sort: Featured</option>
                  <option value="PRICE_LOW">Price: Low to High</option>
                  <option value="PRICE_HIGH">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-[#FF6B00] text-white shadow-xs"
                      : "bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid (Large, High-Visibility Images) */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-3 text-gray-400 bg-white rounded-2xl border border-gray-100">
              <Search size={44} className="mx-auto text-gray-300" />
              <p className="text-sm font-semibold text-gray-700">No gadgets match your current filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setSelectedBrand("ALL");
                }}
                className="text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-gray-100 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 text-left relative group"
                >
                  <div>
                    {/* High-Visibility Showcase Stage with Overlaid Badges */}
                    <div
                      onClick={() => setActiveModalProduct(prod)}
                      className="relative w-full h-72 sm:h-80 lg:h-84 rounded-2xl bg-gradient-to-b from-[#f8f9fa] to-[#edf1f5] flex items-center justify-center mb-3.5 cursor-pointer overflow-hidden shadow-2xs"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700"
                      />

                      {/* Top-Left: Brand & Category Badge */}
                      <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md border border-white/10">
                        {prod.brand} • {prod.category}
                      </span>

                      {/* Top-Right: Discount Badge */}
                      <span className="absolute top-3 right-3 bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        {prod.discountBadge}
                      </span>

                      {/* Quick View Hover Pill on Desktop */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-2xs">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-gray-950 text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye size={14} />
                          <span>Quick View</span>
                        </span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => setActiveModalProduct(prod)}
                      className="font-extrabold text-sm sm:text-base text-gray-950 truncate hover:text-[#FF6B00] transition-colors cursor-pointer mb-1 px-0.5"
                      title={prod.name}
                    >
                      {prod.name}
                    </h3>

                    {/* Naira Price */}
                    <div className="flex items-baseline gap-2 pt-0.5 px-0.5 mb-2">
                      <span className="font-black text-base sm:text-lg text-[#FF6B00] font-mono tracking-tight">
                        {formatNaira(prod.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through font-mono">
                        {formatNaira(prod.originalPrice)}
                      </span>
                    </div>
                  </div>

                  {/* Star Rating & Cart Button */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 px-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">
                        ({prod.reviewsCount})
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(prod)}
                      className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] text-gray-700 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <PageTransition>
      <TechGadgetsLayout>
        <ProductsPageContent />
      </TechGadgetsLayout>
    </PageTransition>
  );
}

