import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";
import logo from "../assets/logo.png";

const PRESET_MESSAGES = [
  {
    label: "🌐 Custom Website",
    text: "Hello Veltrix Hub! 👋 I am interested in building a professional website or web application for my business. I'd like to discuss the requirements and get a quote.",
  },
  {
    label: "🛒 E-Commerce Store",
    text: "Hi Veltrix Hub! 🛒 I want to build an e-commerce website with online payments and inventory management. Can we discuss options?",
  },
  {
    label: "🎓 Tech Academy Training",
    text: "Hello! 🎓 I would like to learn more about Veltrix Tech Academy courses, schedules, and tuition fees.",
  },
  {
    label: "📋 CAC Registration",
    text: "Hi Veltrix Hub! 📋 I need assistance with CAC Business Name / Company Registration. What are the requirements and timeline?",
  },
  {
    label: "⚡ Free Consultation",
    text: "Hello Veltrix Hub! ⚡ I would like to schedule a free digital strategy consultation to discuss how to grow my brand online.",
  },
];

const WHATSAPP_NUMBER = "2348087098270";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    "Hello Veltrix Hub! 👋 I visited your website and would like to make an inquiry."
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const widgetRef = useRef(null);
  const textareaRef = useRef(null);

  // Show teaser tooltip after a short delay on initial visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Handle outside click to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectPreset = (presetText) => {
    setMessage(presetText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSend = () => {
    const trimmed = message.trim();
    const finalMsg = trimmed || "Hello Veltrix Hub! 👋 I would like to inquire about your services.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-24 right-6 z-50 flex flex-col items-end print:hidden select-none"
    >
      {/* ── CHAT POPUP WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-[90vw] sm:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-4 flex flex-col origin-bottom-right"
            style={{
              boxShadow: "0 20px 40px -10px rgba(5, 15, 44, 0.25), 0 0 1px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md p-1.5 border border-white/20 flex items-center justify-center overflow-hidden">
                      <img src={logo} alt="Veltrix Hub" className="w-full h-auto object-contain brightness-0 invert" />
                    </div>
                    {/* Live status dot */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm tracking-wide leading-tight">Veltrix Hub Support</h3>
                      <CheckCircle2 size={14} className="text-emerald-300" />
                    </div>
                    <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                      Online • Typically replies in minutes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close WhatsApp chat"
                  className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#f8f9fa] flex-1 max-h-[380px] overflow-y-auto space-y-3.5">
              {/* Bot Greeting Bubble */}
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FaWhatsapp size={14} />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm text-xs text-brand-navy shadow-sm border border-gray-100/80 leading-relaxed max-w-[85%]">
                  <p className="font-semibold text-brand-navy mb-1 flex items-center gap-1">
                    <Sparkles size={12} className="text-brand-orange" />
                    Welcome to Veltrix Hub!
                  </p>
                  <p className="text-gray-600">
                    How can we help your business grow today? Pick a quick option or type your custom message below:
                  </p>
                  <span className="block text-[10px] text-gray-400 text-right mt-1">Just now</span>
                </div>
              </div>

              {/* Quick Prompt Pills */}
              <div className="pt-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                  Popular Topics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_MESSAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset.text)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-brand-navy hover:text-emerald-700 border border-gray-200 hover:border-emerald-300 shadow-2xs font-medium transition-all text-left"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Area */}
              <div className="pt-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 px-1">
                  Your Message
                </label>
                <textarea
                  ref={textareaRef}
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full text-xs text-gray-800 p-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none shadow-2xs"
                />
              </div>
            </div>

            {/* Footer / Send Button */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSend}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FaWhatsapp size={16} />
                <span>Start Chat on WhatsApp</span>
                <Send size={13} className="ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TEASER PROMPT (WHEN COLLAPSED) ── */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2.5 bg-white text-brand-navy rounded-full py-1.5 px-3.5 shadow-lg border border-gray-100 flex items-center gap-2 max-w-xs cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="text-xs font-semibold text-brand-navy group-hover:text-emerald-600 transition-colors">
              Chat on WhatsApp
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-gray-400 hover:text-gray-600 ml-1 p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING TRIGGER BUTTON ── */}
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat with Veltrix Hub on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        style={{
          boxShadow: "0 8px 24px -4px rgba(37, 211, 102, 0.45)",
        }}
      >
        {/* Pulsing ring animation */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
        )}

        {isOpen ? (
          <X size={26} className="text-white relative z-10 transition-transform duration-200" />
        ) : (
          <FaWhatsapp size={30} className="text-white relative z-10" />
        )}

        {/* Unread badge dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-brand-orange border-2 border-white rounded-full z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
