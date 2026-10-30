import { Home, ShoppingBag, Search, ShoppingCart } from "lucide-react";

export default function MobileBottomNav({
  activeCategoryPage,
  setActiveCategoryPage,
  setSelectedFilterCategory,
  setIsSearchOpen,
  totalCartCount,
  setIsCartOpen,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#f1e6da] shadow-[0_-4px_25px_rgba(8,29,22,0.08)] px-2 py-2 flex items-center justify-around">
      {/* Home */}
      <button
        onClick={() => {
          setActiveCategoryPage(null);
          setSelectedFilterCategory("All");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          !activeCategoryPage
            ? "text-[#e85d04] font-black"
            : "text-gray-500 hover:text-gray-900 font-medium"
        }`}
      >
        <Home size={19} />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* Shop */}
      <button
        onClick={() => {
          const el = document.getElementById("new-arrivals");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 800, behavior: "smooth" });
          }
        }}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
      >
        <ShoppingBag size={19} />
        <span className="text-[10px] tracking-tight">Shop</span>
      </button>

      {/* Search */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
      >
        <Search size={19} />
        <span className="text-[10px] tracking-tight">Search</span>
      </button>

      {/* Bag / Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 py-0.5 px-3 rounded-xl text-[#081d16] font-bold transition-all"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#081d16] text-white flex items-center justify-center shadow-md">
            <ShoppingCart size={15} />
          </div>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e85d04] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
              {totalCartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight text-[#081d16]">Bag</span>
      </button>
    </div>
  );
}

