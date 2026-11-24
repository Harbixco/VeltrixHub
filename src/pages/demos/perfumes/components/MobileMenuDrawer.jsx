import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ChevronRight, ShieldCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PerfumeLogo from "./PerfumeLogo";
import { WHATSAPP_NUMBER } from "../utils/helpers";

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
  setActivePolicyModal,
}) {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000000] md:hidden select-none">
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
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-y-0 left-0 w-[84%] max-w-xs bg-white shadow-2xl flex flex-col z-10 text-left border-r border-[#EFE1DD]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#EFE1DD] flex items-center justify-between bg-[#F6EAE7]">
              <PerfumeLogo variant="dark" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl bg-[#FAF1F0] border border-[#EFE1DD] flex items-center justify-center text-[#231819] hover:bg-white cursor-pointer transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#FAF1F0]/40">
              <div className="space-y-1">
                <span className="text-[10px] font-black tracking-widest uppercase text-[#8E7574] px-3 block mb-2">
                  FRAGRANCE FAMILIES
                </span>
                {[
                  { label: "All Fragrances", key: null, badge: "Master Edit" },
                  {
                    label: "Oud & Oriental",
                    key: "Oud & Oriental",
                    badge: "48+ Extraits",
                  },
                  {
                    label: "Gourmand & Vanilla",
                    key: "Gourmand & Vanilla",
                    badge: "36+ Scents",
                  },
                  {
                    label: "Floral & Botanical",
                    key: "Floral & Botanical",
                    badge: "42+ Bouquets",
                  },
                  {
                    label: "Fresh & Woody Aquatic",
                    key: "Fresh & Woody Aquatic",
                    badge: "32+ Scents",
                  },
                  {
                    label: "Attar & Pure Oils",
                    key: "Attar & Pure Oils",
                    badge: "100% Oil",
                  },
                  {
                    label: "Deal of the Day",
                    key: "Deals",
                    badge: "Save 40%",
                  },
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
                          }, 50);
                        } else if (item.key === null) {
                          setActiveCategoryPage(null);
                          setActiveNav("All Scents");
                          setSelectedFilterCategory("All");
                          setCurrentPage(1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          setActiveCategoryPage(item.key);
                          setActiveNav(item.label);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          showToast(`Browsing ${item.label}`);
                        }
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isCur
                          ? "bg-white text-[#8A4852] border border-[#EFE1DD] shadow-xs"
                          : "text-[#6D5C5B] hover:bg-white"
                      }`}
                    >
                      <span className="font-serif font-bold">{item.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold ${
                            isCur
                              ? "bg-[#8A4852] text-white"
                              : "bg-[#FAF1F0] text-[#8E7574]"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <ChevronRight size={13} className="text-[#8E7574]" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Client Assurance */}
              <div className="pt-3 border-t border-[#EFE1DD] space-y-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-[#8E7574] px-3 block">
                  CLIENT ASSURANCE
                </span>
                <div className="p-3 bg-white rounded-xl border border-[#EFE1DD] space-y-1.5 text-xs text-[#6D5C5B]">
                  <div className="flex items-center gap-2 text-[#231819] font-bold">
                    <ShieldCheck size={14} className="text-[#8A4852]" />
                    <span>100% Original Flacons Guaranteed</span>
                  </div>
                  <p className="text-[11px] text-[#8E7574] leading-relaxed">
                    Verify batch codes on CheckFresh upon unboxing. Complied with strict European & Gulf fragrance authenticity standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-[#EFE1DD] bg-[#F6EAE7] space-y-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello AuraScents! 👋 I am browsing your fragrance store and need recommendations for a long-lasting signature perfume."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <FaWhatsapp size={16} />
                <span>Chat with Scent Specialist</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#8E7574] pt-1">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActivePolicyModal?.("faqs");
                  }}
                  className="hover:text-[#231819] underline cursor-pointer"
                >
                  Sillage & FAQs
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActivePolicyModal?.("shipping");
                  }}
                  className="hover:text-[#231819] underline cursor-pointer"
                >
                  Shipping Terms
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
