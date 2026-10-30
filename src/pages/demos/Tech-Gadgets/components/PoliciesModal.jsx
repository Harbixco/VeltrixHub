import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  X,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#0d1322] text-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-10 shadow-2xl flex flex-col text-left border border-white/10"
          >
            {/* Modal Header */}
            <div className="bg-[#070b14] text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-[10px] font-bold tracking-widest uppercase">
                  <HelpCircle size={12} className="text-cyan-400" />
                  {POLICY_DATA[activePolicyModal]?.badge || "VOLTIX TECH SUPPORT"}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {POLICY_DATA[activePolicyModal]?.title}
                </h3>
              </div>

              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab Navigation Bar */}
            <div className="bg-[#0b101d] border-b border-white/10 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none py-2.5">
              {[
                { key: "faqs", label: "FAQs" },
                { key: "shipping", label: "Shipping & Delivery" },
                { key: "warranty", label: "1-Yr Warranty & Care" },
                { key: "returns", label: "Returns & Exchanges" },
                { key: "terms", label: "Terms of Service" },
                { key: "privacy", label: "Privacy Policy" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActivePolicyModal(tab.key);
                    if (tab.key === "faqs" && setExpandedFaq) setExpandedFaq(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activePolicyModal === tab.key
                      ? "bg-[#0066FF] text-white shadow-md shadow-blue-600/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              {/* Subtitle / intro */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {POLICY_DATA[activePolicyModal]?.subtitle}
              </p>

              {/* Highlight Cards if available */}
              {POLICY_DATA[activePolicyModal]?.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {POLICY_DATA[activePolicyModal].highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#131b2e] border border-white/10 space-y-1.5"
                    >
                      <h4 className="font-extrabold text-xs text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {h.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-normal">{h.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs Accordion View */}
              {activePolicyModal === "faqs" && (
                <div className="space-y-3 pt-2">
                  {FAQ_ITEMS.map((item, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all ${
                          isExpanded
                            ? "bg-[#131b2e] border-cyan-500/40 shadow-lg"
                            : "bg-[#0d1322] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          className="w-full p-4 flex items-center justify-between text-left gap-3 cursor-pointer"
                        >
                          <span className="font-bold text-xs sm:text-sm text-white">
                            {item.q}
                          </span>
                          <span className="shrink-0 text-cyan-400">
                            {isExpanded ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </span>
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Text Sections for other policies */}
              {POLICY_DATA[activePolicyModal]?.sections && (
                <div className="space-y-4 pt-2">
                  {POLICY_DATA[activePolicyModal].sections.map((sec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#111827] border border-white/5 space-y-2"
                    >
                      <h5 className="font-extrabold text-xs sm:text-sm text-white">
                        {sec.heading}
                      </h5>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {sec.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Direct Support Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 to-[#131b2e] border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                    <ShieldCheck size={14} className="text-cyan-400" />
                    Computer Village Ikeja Tech Care Hub
                  </span>
                  <p className="text-xs text-gray-300">
                    Questions about a specific device serial or same-day Lagos dispatch?
                  </p>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Voltix%20Team!%20I%20have%20a%20question%20regarding%20gadget%20warranty%20and%20delivery.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-gray-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-lg shadow-green-600/20 transition-all cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

