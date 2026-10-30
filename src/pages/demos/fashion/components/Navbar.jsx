import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  X,
  ShoppingCart,
  Menu,
} from "lucide-react";
import { formatNaira } from "../utils/helpers";

export default function Navbar({
  activeCategoryPage,
  setActiveCategoryPage,
  activeNav,
  setActiveNav,
  setSelectedFilterCategory,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearchOpen,
  setIsSearchOpen,
  totalCartCount,
  cartSubtotal,
  setIsCartOpen,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  openModal,
  showToast,
}) {
  return (
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
                      document
                        .getElementById("deal-of-the-day")
                        ?.scrollIntoView({ behavior: "smooth" });
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
            <Search
              size={13}
              className="absolute left-2.5 text-gray-400 pointer-events-none"
            />
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
                <span>
                  Found {searchResults.length} piece
                  {searchResults.length === 1 ? "" : "s"}
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-gray-900"
                >
                  Close
                </button>
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
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-[#e85d04] font-semibold">
                          {item.category}
                        </span>
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

        {/* Actions: Search + Cart + Shop Now + Hamburger */}
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

          {/* Cart Drawer Trigger */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-gray-800 hover:text-[#e85d04] hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all group"
            title="View Wardrobe Cart"
          >
            <div className="relative">
              <ShoppingCart
                size={18}
                className="group-hover:scale-105 transition-transform"
              />
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
                document
                  .getElementById("new-arrivals")
                  ?.scrollIntoView({ behavior: "smooth" });
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
                  <span>
                    Found {searchResults.length} piece
                    {searchResults.length === 1 ? "" : "s"}
                  </span>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[#e85d04]"
                  >
                    Done
                  </button>
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
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#e85d04]">
                            {item.category}
                          </span>
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
  );
}

