import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ToastNotification({ toastMessage }) {
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#231819] text-[#FFF5F3] text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[#8A4852]/40 backdrop-blur-md"
        >
          <Sparkles size={15} className="text-[#ECA5AC] shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
