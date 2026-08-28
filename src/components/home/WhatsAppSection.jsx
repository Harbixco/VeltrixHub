import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const FOUNDATION_ITEMS = [
  "Professional website that presents your brand 24/7",
  "Search visibility so new customers discover you on Google",
  "Clear business information and contact credentials",
  "Strong brand credibility that builds immediate trust",
  "Dedicated customer enquiry channels that capture leads",
  "Clear presentation of your full range of products & services",
  "An automated digital system that works even while you sleep",
];

export default function WhatsAppSection() {
  return (
    <section
      className="relative py-5 md:py-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #eef2ff 50%, #fff7ed 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 mb-5">
              THE WHATSAPP PARADOX
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-5">
              WhatsApp Alone Isn't<br className="hidden sm:inline" /> Your Online Presence.
            </h2>
            <p className="text-base sm:text-lg text-brand-text leading-relaxed mb-6">
              WhatsApp is useful for communication and customer follow-up, but your business needs more than status updates to build lasting online credibility.
            </p>

            <motion.div
              whileHover={{ borderColor: "#1a3ebd" }}
              className="p-5 bg-white border-l-4 border-brand-blue rounded-r-[6px] mb-8 transition-colors duration-200"
              style={{ boxShadow: "0 2px 12px rgba(26,62,189,0.08)" }}
            >
              <p className="text-sm font-semibold text-brand-navy leading-relaxed italic">
                "WhatsApp is part of your digital presence—not the entire foundation."
              </p>
            </motion.div>

            <Link
              to="/contact"
              className="bg-brand-navy hover:bg-brand-blue text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group"
              style={{ boxShadow: "0 4px 16px rgba(5,15,44,0.2)" }}
            >
              Build Your Online Presence
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div
              className="p-8 rounded-[8px] text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #050f2c 0%, #0f2580 100%)" }}
            >
              {/* Grid pattern inside card */}
              <div className="absolute inset-0 grid-pattern pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">A Complete Digital Foundation</h3>
                    <p className="text-xs text-gray-400">What serious businesses build alongside messaging</p>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-6">
                  {FOUNDATION_ITEMS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-start gap-3 text-sm text-gray-200"
                    >
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <p className="text-xs text-gray-500 italic border-t border-white/10 pt-4">
                  Combine the personal feel of WhatsApp with the authority of a dedicated web system.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
