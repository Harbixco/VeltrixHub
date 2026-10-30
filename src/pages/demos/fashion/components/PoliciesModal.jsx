import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FAQ_ITEMS, POLICY_DATA } from "../data/policies";
import { WHATSAPP_NUMBER } from "../utils/helpers";

export default function PoliciesModal({
  activePolicyModal,
  setActivePolicyModal,
  expandedFaq,
  setExpandedFaq,
}) {
  return (
    <AnimatePresence>
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolicyModal(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-10 shadow-2xl flex flex-col text-left border border-[#f1e6da]"
          >
            {/* Modal Header */}
            <div className="bg-[#081d16] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#235342]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16392d] text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
                  <HelpCircle size={12} className="text-[#f06428]" />
                  {POLICY_DATA[activePolicyModal]?.badge || "CUSTOMER ASSISTANCE"}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {POLICY_DATA[activePolicyModal]?.title}
                </h3>
              </div>

              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Navigation Bar */}
            <div className="bg-[#faf6f1] border-b border-[#f1e6da] px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-2.5">
              {[
                { key: "faqs", label: "FAQs" },
                { key: "shipping", label: "Shipping Policy" },
                { key: "returns", label: "Returns & Refunds" },
                { key: "terms", label: "Terms & Conditions" },
                { key: "privacy", label: "Privacy Policy" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActivePolicyModal(tab.key);
                    if (tab.key === "faqs" && setExpandedFaq) setExpandedFaq(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activePolicyModal === tab.key
                      ? "bg-[#081d16] text-white shadow-xs"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {/* Subtitle / intro */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {POLICY_DATA[activePolicyModal]?.subtitle}
              </p>

              {/* Highlight Cards if available */}
              {POLICY_DATA[activePolicyModal]?.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {POLICY_DATA[activePolicyModal].highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#fdfbf9] border border-[#f1e6da] space-y-1"
                    >
                      <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e85d04]" />
                        {h.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs Accordion */}
              {activePolicyModal === "faqs" && (
                <div className="space-y-3 pt-2">
                  {FAQ_ITEMS.map((faq, idx) => {
                    const isOpen = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-[#f1e6da] overflow-hidden bg-white shadow-2xs"
                      >
                        <button
                          onClick={() =>
                            setExpandedFaq(isOpen ? null : idx)
                          }
                          className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-[#faf6f1] transition-colors"
                        >
                          <span className="font-extrabold text-xs sm:text-sm text-gray-900">
                            {faq.q}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-600">
                            {isOpen ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-1 bg-[#fdfbf9] border-t border-[#f1e6da] text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Policy Detailed Sections */}
              {POLICY_DATA[activePolicyModal]?.sections && (
                <div className="space-y-4 pt-2">
                  {POLICY_DATA[activePolicyModal].sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4.5 rounded-2xl bg-[#faf6f1] border border-[#f1e6da] space-y-1.5 text-left"
                    >
                      <h4 className="font-extrabold text-xs sm:text-sm text-gray-900">
                        {sec.heading}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer with Support Action */}
            <div className="bg-[#fcf8f4] border-t border-[#f1e6da] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-[#e85d04]" />
                <span>Official ShopEase Client Assurance & Protection</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello ShopEase Support! I have a question regarding your ${POLICY_DATA[activePolicyModal]?.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <FaWhatsapp size={14} />
                  <span>WhatsApp Stylist</span>
                </a>
                <button
                  onClick={() => setActivePolicyModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

