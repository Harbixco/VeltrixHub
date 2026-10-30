import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Search, ShoppingCart } from "lucide-react";
import { useTechGadgets } from "../context/TechGadgetsContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { totalCartCount, setIsCartOpen } = useTechGadgets();
  const currentPath = location.pathname.toLowerCase();

  const isHomeActive =
    currentPath === "/demos/tech-gadgets" ||
    currentPath === "/demos/tech-gadgets/" ||
    currentPath === "/demos/gadgets";

  const isShopActive =
    currentPath.startsWith("/demos/tech-gadgets/products") ||
    currentPath.startsWith("/demos/tech-gadgets/categories");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#f1e6da] shadow-[0_-4px_25px_rgba(8,29,22,0.08)] px-2 py-2 flex items-center justify-around select-none">
      {/* 1. Home */}
      <Link
        to="/demos/tech-gadgets"
        onClick={() => {
          if (isHomeActive) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          isHomeActive
            ? "text-[#FF6B00] font-black"
            : "text-gray-500 hover:text-gray-900 font-medium"
        }`}
      >
        <Home size={19} />
        <span className="text-[10px] tracking-tight">Home</span>
      </Link>

      {/* 2. Shop */}
      <Link
        to="/demos/tech-gadgets/products"
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
          isShopActive
            ? "text-[#FF6B00] font-black"
            : "text-gray-500 hover:text-gray-900 font-medium"
        }`}
      >
        <ShoppingBag size={19} />
        <span className="text-[10px] tracking-tight">Shop</span>
      </Link>

      {/* 3. Search */}
      <Link
        to="/demos/tech-gadgets/products?focusSearch=1"
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-gray-500 hover:text-gray-900 font-medium transition-all"
      >
        <Search size={19} />
        <span className="text-[10px] tracking-tight">Search</span>
      </Link>

      {/* 4. Bag / Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-0.5 py-0.5 px-3 rounded-xl text-gray-900 font-bold transition-all cursor-pointer"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#111418] text-white flex items-center justify-center shadow-md">
            <ShoppingCart size={15} />
          </div>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-xs">
              {totalCartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight text-gray-900">Bag</span>
      </button>
    </div>
  );
}

