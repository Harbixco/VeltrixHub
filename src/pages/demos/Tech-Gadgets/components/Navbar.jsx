import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Smartphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTechGadgets } from "../context/TechGadgetsContext";

export default function Navbar() {
  const location = useLocation();
  const { totalCartCount, setIsCartOpen } = useTechGadgets();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const currentPath = location.pathname.toLowerCase();

  // Header navigation links with PRODUCTS replacing BRANDS per instructions
  const navLinks = [
    { name: "HOME", path: "/demos/tech-gadgets" },
    { name: "PRODUCTS", path: "/demos/tech-gadgets/products" },
    { name: "CATEGORIES", path: "/demos/tech-gadgets/categories" },
    { name: "ABOUT US", path: "/demos/tech-gadgets/about" },
    { name: "FAQ", path: "/demos/tech-gadgets/faqs" },
  ];

  const isLinkActive = (path) => {
    if (path === "/demos/tech-gadgets") {
      return (
        currentPath === "/demos/tech-gadgets" ||
        currentPath === "/demos/tech-gadgets/" ||
        currentPath === "/demos/gadgets"
      );
    }
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 select-none shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* MobileX Logo linking to tech-gadgets home */}
        <Link
          to="/demos/tech-gadgets"
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF6B00]">
            <Smartphone size={20} className="stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center text-2xl font-black tracking-tight text-gray-900 leading-none">
              <span>Mobile</span>
              <span className="text-[#FF6B00]">X</span>
            </div>
            <span className="text-[7.5px] font-bold text-gray-400 tracking-[0.16em] uppercase mt-0.5 leading-none">
              YOUR WORLD, CONNECTED
            </span>
          </div>
        </Link>

        {/* Center Nav Links pointing to proper pages */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-wider text-gray-800">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`py-1.5 relative transition-colors cursor-pointer uppercase ${
                  active
                    ? "text-[#FF6B00]"
                    : "text-gray-800 hover:text-[#FF6B00]"
                }`}
              >
                {/* Orange top active bar matching template */}
                {active && (
                  <div className="absolute -top-3.5 left-0 right-0 h-[2px] bg-[#FF6B00]" />
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search & Cart */}
        <div className="flex items-center gap-4 text-gray-700 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchActive(!isSearchActive)}
            className="p-1 hover:text-[#FF6B00] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={19} className="stroke-[1.9]" />
          </button>

          {/* Cart Icon with Orange Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 hover:text-[#FF6B00] transition-colors cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingCart size={19} className="stroke-[1.9]" />
            <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-gray-800 hover:text-[#FF6B00] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 px-4 py-2 bg-gray-50/70"
          >
            <div className="max-w-2xl mx-auto relative flex items-center">
              <Search size={15} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search smartphones, laptops, earpods, powerbanks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#FF6B00]"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-2.5 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-[78%] max-w-xs bg-white shadow-2xl flex flex-col z-10 text-left p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center">
                    <Smartphone size={16} />
                  </div>
                  <span className="font-black text-xl text-gray-900">
                    Mobile<span className="text-[#FF6B00]">X</span>
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2.5 text-xs font-bold tracking-wider ${
                      isLinkActive(link.path)
                        ? "text-[#FF6B00]"
                        : "text-gray-700 hover:text-[#FF6B00]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
