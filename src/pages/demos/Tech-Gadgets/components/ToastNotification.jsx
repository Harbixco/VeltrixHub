import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function ToastNotification({ toastMessage }) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#0b0f19] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 border border-white/10"
        >
          <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0">
            <Zap size={12} fill="currentColor" />
          </div>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

