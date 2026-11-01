import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Sparkles, X, ChevronUp, ArrowRight } from "lucide-react";

export default function VeltrixFloatingCTA() {
  const [isMinimized, setIsMinimized] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Veltrix Hub! 👋 I am browsing your ShopEase demo store and want an identical e-commerce store set up for my brand in 3–5 days. Let's discuss pricing and launch!"
  );
  const whatsappUrl = `https://wa.me/2348086624539?text=${whatsappMessage}`;

  return (
    <aside aria-label="Built by Veltrix Hub" className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 select-none">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Glowing Floating Pill */
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#081d16]/95 backdrop-blur-md border border-emerald-500/40 text-white shadow-2xl hover:border-emerald-400 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles size={14} className="text-[#e85d04]" />
            <span className="text-[11px] font-bold text-gray-100">
              Built by Veltrix Hub
            </span>
            <span className="text-[10px] bg-[#e85d04] text-white px-2 py-0.5 rounded-full font-black">
              3–5 Day Launch
            </span>
            <ChevronUp size={13} className="text-gray-400 group-hover:text-white" />
          </motion.button>
        ) : (
          /* Expanded Sleek Lead-Magnet Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative w-[calc(100vw-1.75rem)] sm:w-96 rounded-2xl bg-gradient-to-br from-[#081d16]/98 via-[#0b241c]/95 to-[#081d16]/98 backdrop-blur-md border border-emerald-500/40 p-3.5 sm:p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header: Badge & Minimize Button */}
            <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16392d]/90 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Demo Store by Veltrix Hub</span>
              </div>

              <button
                onClick={() => setIsMinimized(true)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Minimize banner"
                aria-label="Minimize banner"
              >
                <X size={13} />
              </button>
            </div>

            {/* Hook Headline */}
            <div className="space-y-1 mb-3 text-left relative z-10">
              <p className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                Want an identical luxury store set up for your brand in 3–5 days?
              </p>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                We design and launch fast, Paystack & WhatsApp integrated e-commerce websites for Nigerian boutiques & businesses.
              </p>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#20ba59] hover:to-[#17a34d] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <FaWhatsapp size={16} className="shrink-0" />
              <span>Tap to Chat on WhatsApp</span>
              <ArrowRight size={13} className="shrink-0" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

