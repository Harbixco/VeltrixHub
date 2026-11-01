import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  X,
  ShoppingCart,
  Menu,
} from "lucide-react";
import PerfumeLogo from "./PerfumeLogo";
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
    <header className="bg-[#F6EAE7]/95 backdrop-blur-md border-b border-[#EFE1DD] sticky top-0 z-40 shadow-xs transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo - Bespoke Haute Parfumerie Identity */}
        <button
          onClick={() => {
            setActiveCategoryPage(null);
            setActiveNav("All Scents");
            setSelectedFilterCategory("All");
            setCurrentPage(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="shrink-0 cursor-pointer focus:outline-none"
          aria-label="AuraScents Parfumerie Home"
        >
          <PerfumeLogo variant="dark" size="md" />
        </button>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6 text-xs lg:text-[13px] font-semibold text-[#6D5C5B] shrink-0">
          {[
            { label: "All Scents", key: null },
            { label: "Oud & Oriental", key: "Oud & Oriental" },
            { label: "Gourmand", key: "Gourmand & Vanilla" },
            { label: "Floral", key: "Floral & Botanical" },
            { label: "Fresh Woody", key: "Fresh & Woody Aquatic" },
            { label: "Pure Attar Oils", key: "Attar & Pure Oils" },
          ].map((item) => {
            const isCurNav =
              item.key === null
                ? activeCategoryPage === null && activeNav !== "Deals"
                : activeCategoryPage === item.key;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.key === null) {
                    setActiveCategoryPage(null);
                    setActiveNav("All Scents");
                    setSelectedFilterCategory("All");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    setActiveCategoryPage(item.key);
                    setActiveNav(item.label);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    showToast(`Exploring ${item.label}`);
                  }
                }}
                className={`whitespace-nowrap transition-all py-1 px-0.5 hover:text-[#8A4852] relative tracking-normal cursor-pointer ${
                  isCurNav ? "text-[#8A4852] font-bold" : ""
                }`}
              >
                {item.label}
                {isCurNav && (
                  <motion.span
                    layoutId="nav-underline-perfume"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8A4852] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Live Search Input */}
        <div className="relative hidden xl:block w-40 2xl:w-60 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search oud, vanillas, attars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] text-xs text-[#231819] placeholder-[#8E7574] focus:outline-none focus:border-[#8A4852] focus:bg-white transition-all shadow-2xs"
            />
            <Search
              size={13}
              className="absolute left-2.5 text-[#8E7574] pointer-events-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 text-[#8E7574] hover:text-[#231819] p-0.5 cursor-pointer"
              >
                <X size={11} />
              </button>
            )}
          </div>

          {/* Desktop Search Dropdown Results */}
          {searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#EFE1DD] overflow-hidden z-50 max-h-80 overflow-y-auto">
              <div className="p-2.5 bg-[#FAF1F0] border-b border-[#EFE1DD] text-[10px] font-black uppercase tracking-wider text-[#6D5C5B] flex justify-between items-center">
                <span>
                  Found {searchResults.length} fragrance
                  {searchResults.length === 1 ? "" : "s"}
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-[#231819] cursor-pointer"
                >
                  Close
                </button>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#8E7574]">
                  No luxury fragrances found for "{searchQuery}".
                </div>
              ) : (
                <div className="divide-y divide-[#EFE1DD]">
                  {searchResults.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        openModal(item);
                        setSearchQuery("");
                      }}
                      className="p-2.5 flex items-center gap-3 hover:bg-[#FAF1F0] cursor-pointer transition-colors text-left"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-[#F6EAE7] shrink-0 border border-[#EFE1DD]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#231819] truncate font-serif">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-[#9C5B66] font-medium">
                          {item.category} • {item.concentration}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#8A4852] shrink-0">
                        {formatNaira(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile Search Icon Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] text-[#231819] flex items-center justify-center hover:bg-[#EFE1DD] transition-colors cursor-pointer"
            title="Search Fragrances"
          >
            <Search size={15} />
          </button>

          {/* Scent Bag Button with Total Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#8A4852] hover:bg-[#773D46] text-white shadow-md shadow-[#8A4852]/25 transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingCart size={15} />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ECA5AC] text-[#231819] font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold tracking-wide">
              {formatNaira(cartSubtotal)}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] text-[#231819] flex items-center justify-center hover:bg-[#EFE1DD] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Live Search Drawer (Collapsible) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden bg-[#FAF1F0] border-t border-[#EFE1DD] px-4 py-3 text-left overflow-hidden"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                autoFocus
                placeholder="Search oud, vanilla, amber, attar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#EFE1DD] text-xs text-[#231819] placeholder-[#8E7574] focus:outline-none focus:border-[#8A4852]"
              />
              <Search
                size={14}
                className="absolute left-3 text-[#8E7574] pointer-events-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-[#8E7574] hover:text-[#231819] p-1 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery.trim() && (
              <div className="mt-2.5 bg-white rounded-xl border border-[#EFE1DD] shadow-lg max-h-60 overflow-y-auto divide-y divide-[#EFE1DD]">
                {searchResults.length === 0 ? (
                  <div className="p-3.5 text-center text-xs text-[#8E7574]">
                    No fragrances matching "{searchQuery}".
                  </div>
                ) : (
                  searchResults.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        openModal(item);
                        setSearchQuery("");
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 flex items-center gap-2.5 hover:bg-[#FAF1F0] cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-9 h-9 rounded-md object-cover bg-[#F6EAE7] shrink-0 border border-[#EFE1DD]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#231819] truncate font-serif">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-[#9C5B66]">
                          {item.category} • {item.concentration}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#8A4852]">
                        {formatNaira(item.price)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
