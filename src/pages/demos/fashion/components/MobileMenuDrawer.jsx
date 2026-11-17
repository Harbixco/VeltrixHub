import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

export default function MobileMenuDrawer({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeNav,
  setActiveNav,
  activeCategoryPage,
  setActiveCategoryPage,
  setSelectedFilterCategory,
  setCurrentPage,
  showToast,
}) {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-y-0 left-0 w-[84%] max-w-xs bg-white shadow-2xl flex flex-col z-10 text-left border-r border-[#f1e6da]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#f1e6da] flex items-center justify-between bg-[#fcf8f4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#e85d04] to-[#f06428] flex items-center justify-center text-white shadow-sm">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <span className="font-black text-lg text-gray-900 block leading-none">
                    Atelier Veltrix
                  </span>
                  <span className="text-[9px] font-bold text-[#e85d04] tracking-wider uppercase">
                    Haute Prêt-à-Porter
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 px-3 block mb-2">
                  CLOTHING COLLECTIONS
                </span>
                {[
                  { label: "New In (All Garments)", key: null, badge: "25 Pieces" },
                  {
                    label: "Classic Senator",
                    key: "Classic Senator",
                    badge: "45+ Cuts",
                  },
                  {
                    label: "Embroidered Kaftans",
                    key: "Embroidered Kaftans",
                    badge: "38+ Royal Designs",
                  },
                  {
                    label: "Color-Block Tunics",
                    key: "Color-Block Tunics",
                    badge: "32+ Modern Cuts",
                  },
                  {
                    label: "Mandarin Suits",
                    key: "Mandarin Suits",
                    badge: "28+ Toggle Suits",
                  },
                  {
                    label: "Short-Sleeve Casual",
                    key: "Short-Sleeve Casual",
                    badge: "35+ Friday Wear",
                  },
                  { label: "Deal of the Day", key: "Deals", badge: "SPECIAL EDIT" },
                ].map((item) => {
                  const isCur =
                    item.key === "Deals"
                      ? activeNav === "Deals"
                      : item.key === null
                        ? activeCategoryPage === null && activeNav !== "Deals"
                        : activeCategoryPage === item.key;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (item.key === "Deals") {
                          setActiveCategoryPage(null);
                          setActiveNav("Deals");
                          setTimeout(() => {
                            document
                              .getElementById("deal-of-the-day")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
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
                          showToast(`Viewing ${item.label}`);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                        isCur
                          ? "bg-[#081d16] text-white shadow-xs"
                          : "text-gray-700 hover:bg-[#faf6f1] hover:text-[#e85d04]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isCur
                            ? "bg-[#e85d04] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer info */}
            <div className="p-3.5 bg-[#fcf8f4] border-t border-[#f1e6da] text-[11px] text-gray-500 text-center font-medium">
              Plot 12 Victoria Island, Lagos
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

