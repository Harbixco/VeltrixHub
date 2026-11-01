import { Home, Sparkles, Search, ShoppingBag } from "lucide-react";

export default function MobileBottomNav({
  activeCategoryPage,
  setActiveCategoryPage,
  setSelectedFilterCategory,
  setIsSearchOpen,
  totalCartCount,
  setIsCartOpen,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#F6EAE7]/95 backdrop-blur-md border-t border-[#EFE1DD] shadow-[0_-4px_25px_rgba(35,24,25,0.08)] px-2 py-2 flex items-center justify-around select-none">
      {/* Home */}
      <button
        onClick={() => {
          setActiveCategoryPage(null);
          setSelectedFilterCategory("All");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
          !activeCategoryPage
            ? "text-[#8A4852] font-black"
            : "text-[#8E7574] hover:text-[#231819] font-medium"
        }`}
      >
        <Home size={19} />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* Fragrance Vault */}
      <button
        onClick={() => {
          const el = document.getElementById("perfume-catalog");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 700, behavior: "smooth" });
          }
        }}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#8E7574] hover:text-[#231819] font-medium transition-all cursor-pointer"
      >
        <Sparkles size={19} />
        <span className="text-[10px] tracking-tight">Fragrances</span>
      </button>

      {/* Search */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[#8E7574] hover:text-[#231819] font-medium transition-all cursor-pointer"
      >
        <Search size={19} />
        <span className="text-[10px] tracking-tight">Search</span>
      </button>

      {/* Scent Bag */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 py-0.5 px-3 rounded-xl text-[#231819] font-bold transition-all cursor-pointer"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#8A4852] text-white flex items-center justify-center shadow-md">
            <ShoppingBag size={15} />
          </div>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ECA5AC] text-[#231819] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
              {totalCartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight text-[#8A4852]">Scent Bag</span>
      </button>
    </div>
  );
}
