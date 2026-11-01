import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Sparkles,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolicyModal(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-10 shadow-2xl flex flex-col text-left border border-[#EFE1DD]"
          >
            {/* Modal Header */}
            <div className="bg-[#5A2931] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#8A4852]/40">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#451C22]/90 text-[#ECA5AC] text-[10px] font-black tracking-widest uppercase border border-[#8A4852]/40">
                  <Sparkles size={11} className="text-[#ECA5AC]" />
                  {POLICY_DATA[activePolicyModal]?.badge || "HAUTE PARFUMERIE ASSURANCE"}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#FFF5F3] tracking-tight">
                  {POLICY_DATA[activePolicyModal]?.title}
                </h3>
              </div>

              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Navigation Bar */}
            <div className="bg-[#FAF1F0] border-b border-[#EFE1DD] px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-2.5">
              {[
                { key: "faqs", label: "Client FAQs" },
                { key: "authenticity", label: "Authenticity & Batch Codes" },
                { key: "shipping", label: "Discreet Delivery" },
                { key: "returns", label: "Returns & Flacons" },
                { key: "storage", label: "Preservation Guide" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActivePolicyModal(tab.key);
                    if (tab.key === "faqs" && setExpandedFaq) setExpandedFaq(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activePolicyModal === tab.key
                      ? "bg-[#8A4852] text-white shadow-xs"
                      : "text-[#6D5C5B] hover:text-[#231819] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 bg-white">
              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#6D5C5B] leading-relaxed font-medium">
                {POLICY_DATA[activePolicyModal]?.subtitle}
              </p>

              {/* Highlight Cards */}
              {POLICY_DATA[activePolicyModal]?.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {POLICY_DATA[activePolicyModal].highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#FAF1F0] border border-[#EFE1DD] space-y-1"
                    >
                      <h4 className="font-serif font-black text-xs text-[#231819] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A4852]" />
                        {h.title}
                      </h4>
                      <p className="text-[11px] text-[#6D5C5B] leading-relaxed">
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
                        className="rounded-2xl border border-[#EFE1DD] overflow-hidden bg-white shadow-2xs"
                      >
                        <button
                          onClick={() => setExpandedFaq(isOpen ? null : idx)}
                          className="w-full p-4 flex items-center justify-between text-left gap-4 hover:bg-[#FAF1F0] transition-colors cursor-pointer"
                        >
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#231819]">
                            {faq.q}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-[#FAF1F0] flex items-center justify-center shrink-0 text-[#6D5C5B]">
                            {isOpen ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-1 bg-[#FAF1F0]/50 border-t border-[#EFE1DD] text-xs sm:text-sm text-[#6D5C5B] leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Detailed Sections */}
              {POLICY_DATA[activePolicyModal]?.sections && (
                <div className="space-y-4 pt-2">
                  {POLICY_DATA[activePolicyModal].sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4.5 rounded-2xl bg-[#FAF1F0] border border-[#EFE1DD] space-y-1.5 text-left"
                    >
                      <h4 className="font-serif font-black text-xs sm:text-sm text-[#231819]">
                        {sec.heading}
                      </h4>
                      <p className="text-xs text-[#6D5C5B] leading-relaxed">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer with Support Action */}
            <div className="bg-[#F6EAE7] border-t border-[#EFE1DD] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-[#6D5C5B]">
                <ShieldCheck size={16} className="text-[#8A4852]" />
                <span>Original Flacon Sillage & Longevity Assurance</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello AuraScents Concierge! I have an inquiry regarding your ${POLICY_DATA[activePolicyModal]?.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <FaWhatsapp size={14} />
                  <span>WhatsApp Nose Concierge</span>
                </a>
                <button
                  onClick={() => setActivePolicyModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#231819] hover:bg-black text-[#FFF5F3] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
