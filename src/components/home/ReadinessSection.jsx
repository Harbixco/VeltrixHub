import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, CheckCircle2 } from "lucide-react";

const READINESS_POINTS = [
  "Customers can't easily find your business online when searching for your services.",
  "You rely mostly on WhatsApp statuses and direct messages to market your business.",
  "Your competitors look more established and professional online.",
  "New customers frequently ask whether your business is legitimate before buying.",
  "You don't have a professional website to share when pitching clients.",
  "Your current website exists, but it produces zero customer enquiries or sales.",
  "Your current online presence doesn't reflect the true quality of your products or services.",
];

export default function ReadinessSection() {
  return (
    <section
      className="relative py-5 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #050f2c 0%, #0a1a45 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      {/* Orange glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,93,4,0.15) 0%, transparent 70%)", transform: "translate(30%, 30%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 mb-5">
              BUSINESS DIAGNOSTIC
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Is Your Business Ready for the Next Level?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              If any of these sound familiar, your business is missing out on qualified leads, brand trust, and revenue growth.
            </p>

            <motion.div
              whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
              className="p-6 rounded-[6px] border border-white/10 mb-8 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <h3 className="text-lg font-bold text-white">You don't have to figure it out alone.</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                We work directly with business owners to analyze their current digital gaps and deploy practical, high-impact web solutions.
              </p>
            </motion.div>

            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-brand-navy font-bold px-8 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group text-sm"
            >
              Talk to Veltrix Hub
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div
              className="p-6 sm:p-8 rounded-[6px] border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-2 h-6 bg-brand-orange rounded-full" />
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Common Growth Barriers
                </span>
              </div>

              <div className="space-y-4">
                {READINESS_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3 group"
                  >
                    <HelpCircle size={16} className="text-brand-orange shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <p className="text-sm text-gray-300 leading-snug">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
