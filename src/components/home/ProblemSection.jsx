import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MonitorOff, MessageSquareX, EyeOff, ShieldAlert, UserMinus, SearchX } from "lucide-react";

const PROBLEMS = [
  { icon: MessageSquareX, title: "Depending Only on WhatsApp", desc: "Relying strictly on status updates limits your reach and makes your business look informal.", bg: "#fff0e6", border: "#fcd3aa", iconBg: "#e85d04", iconColor: "#ffffff" },
  { icon: MonitorOff, title: "No Professional Website", desc: "Without a modern web presence, customers cannot verify your legitimacy or view complete offerings.", bg: "#eef2ff", border: "#c7d3fa", iconBg: "#1a3ebd", iconColor: "#ffffff" },
  { icon: EyeOff, title: "Low Online Visibility", desc: "When customers search for services like yours, they find your competitors instead.", bg: "#f0fdf4", border: "#a7f3c3", iconBg: "#059669", iconColor: "#ffffff" },
  { icon: ShieldAlert, title: "Poor Customer Trust", desc: "Inconsistent branding and lack of official channels make buyers hesitate before purchasing.", bg: "#fdf4ff", border: "#e4b8f5", iconBg: "#7c3aed", iconColor: "#ffffff" },
  { icon: UserMinus, title: "Losing Customers to Competitors", desc: "Competitors with established websites capture buyers who are ready to order 24/7.", bg: "#fff7ed", border: "#fcd4a5", iconBg: "#d97706", iconColor: "#ffffff" },
  { icon: SearchX, title: "Missing Everyday Opportunities", desc: "High-value clients and corporate buyers expect formal web presence before engaging.", bg: "#fef2f2", border: "#fca5a5", iconBg: "#dc2626", iconColor: "#ffffff" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ProblemSection() {
  return (
    <section className="relative py-5 lg:py-10 overflow-hidden bg-white">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 mb-4">
            THE ONLINE VISIBILITY GAP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Your Business Shouldn't Be<br className="hidden sm:inline" /> Invisible Online.
          </h2>
          <p className="text-base sm:text-lg text-brand-text leading-relaxed">
            Your customers are searching, comparing, and deciding who to trust online. If they can't find your business or what they find doesn't look professional you may be losing opportunities every day.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
        >
          {PROBLEMS.map((prob, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(5,15,44,0.12)" }}
              className="p-6 rounded-[8px] flex flex-col gap-4 cursor-default transition-all duration-300"
              style={{ background: prob.bg, border: `1.5px solid ${prob.border}`, boxShadow: "0 2px 8px rgba(5,15,44,0.05)" }}
            >
              <div
                className="w-11 h-11 rounded-[6px] flex items-center justify-center shrink-0"
                style={{ background: prob.iconBg, color: prob.iconColor, boxShadow: `0 4px 12px ${prob.iconBg}55` }}
              >
                <prob.icon size={21} />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-navy mb-1.5">{prob.title}</h3>
                <p className="text-sm text-brand-text leading-relaxed">{prob.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Transition banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-[6px] p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
          style={{
            background: "linear-gradient(135deg, #050f2c 0%, #1a3ebd 100%)",
          }}
        >
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">Veltrix Hub helps you fix that.</h3>
            <p className="text-sm text-gray-300">We turn your invisible business into an established, trust-earning digital brand.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 bg-white hover:bg-gray-100 text-brand-navy font-bold px-6 py-3 rounded-[4px] transition-all duration-200 text-sm inline-flex items-center gap-2 group"
          >
            Get a Free Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
