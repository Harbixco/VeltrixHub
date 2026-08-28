import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WA_URL = "https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20discuss%20getting%20my%20business%20online.";

export default function FinalCTA() {
  return (
    <section
      className="relative py-10 lg:py-16 overflow-hidden text-white"
      style={{ background: "linear-gradient(150deg, #050f2c 0%, #0f2580 50%, #050f2c 100%)" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Blue glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(26,62,189,0.25) 0%, transparent 70%)" }}
      />

      {/* Orange glow right */}
      <div
        className="absolute -right-32 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,93,4,0.2) 0%, transparent 70%)", transform: "translateY(-50%)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs font-bold uppercase tracking-widest mb-8"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            READY TO GROW?
          </motion.div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6"
          >
            Ready to Build a Stronger<br className="hidden sm:inline" />
            <span
              style={{
                background: "linear-gradient(135deg, #4d78ff, #f77f00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}Online Presence?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
            Tell us about your business or project and let&apos;s discuss how we can help you become visible, build trust, and grow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-brand-navy font-bold px-8 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 text-base"
                style={{ boxShadow: "0 8px 32px rgba(255,255,255,0.2)" }}
              >
                Get a Free Consultation
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 text-base"
                style={{ boxShadow: "0 8px 24px rgba(16,185,129,0.25)" }}
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
