import { motion } from "framer-motion";
import { ShieldCheck, Clock, Lightbulb, GraduationCap, Handshake } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const REASONS = [
  { icon: ShieldCheck, title: "We Think Like Partners, Not Vendors", desc: "We take time to understand your business before recommending anything. Our focus is on giving you the right solution, not the most expensive one.", accent: "#1a3ebd" },
  { icon: Clock, title: "Practical Over Theoretical", desc: "Every decision we make is tied directly to what benefits your business. No abstract strategies, no unnecessary complexity.", accent: "#e85d04" },
  { icon: Lightbulb, title: "Ongoing Support, Not Just Delivery", desc: "We don't abandon you after launch. We provide ongoing guidance, support, and refinements as your business evolves.", accent: "#7c3aed" },
  { icon: FaWhatsapp, title: "Clear Communication", desc: "We explain what we're doing and why in plain language, not jargon. You always understand what's happening with your project.", accent: "#059669" },
  { icon: GraduationCap, title: "Built for Nigerian Business Context", desc: "Our solutions are designed with real knowledge of Nigerian market conditions, customer behavior, and business challenges.", accent: "#d97706" },
  { icon: Handshake, title: "Honest About Fit", desc: "If what you're asking for isn't the right fit for your current stage, we'll tell you directly and offer a more practical path.", accent: "#dc2626" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function WhyVeltrixSection() {
  return (
    <section
      className="relative py-10 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #ffffff 50%, #f8f9ff 100%)" }}
    >
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 mb-5">
            WHY VELTRIX HUB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Why Businesses Choose<br className="hidden sm:inline" /> Veltrix Hub
          </h2>
          <p className="text-base sm:text-lg text-brand-text leading-relaxed">
            We don&apos;t just build websites. We build trust — and a digital foundation that helps your business grow.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-7 bg-white rounded-[8px] border border-gray-100 cursor-default relative overflow-hidden"
              style={{ boxShadow: "0 2px 10px rgba(5,15,44,0.06)" }}
            >
              {/* top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 rounded-t-[8px]"
                style={{ background: reason.accent }}
              />

              <div
                className="w-12 h-12 rounded-[6px] flex items-center justify-center mb-5 text-white"
                style={{ background: reason.accent, boxShadow: `0 4px 16px ${reason.accent}40` }}
              >
                <reason.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-200">{reason.title}</h3>
              <p className="text-sm text-brand-text leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
