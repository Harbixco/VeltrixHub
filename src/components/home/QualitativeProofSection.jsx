import { motion } from "framer-motion";
import { ShieldCheck, Smartphone, MessageSquareCode, Headset } from "lucide-react";

const QUALITATIVE_PILLARS = [
  { icon: ShieldCheck, title: "Business-First Approach", desc: "We prioritize your commercial goals, audience trust, and customer conversion over tech buzzwords.", accent: "#1a3ebd", bg: "#eff4ff" },
  { icon: Smartphone, title: "Mobile-First Excellence", desc: "Every website and system is engineered to load lightning fast on African mobile networks.", accent: "#e85d04", bg: "#fff4ee" },
  { icon: MessageSquareCode, title: "Clear & Honest Communication", desc: "No technical jargon or hidden steps. You always know what we're building and why.", accent: "#7c3aed", bg: "#f5f3ff" },
  { icon: Headset, title: "Dedicated Post-Launch Support", desc: "We don't disappear after launching your website. We remain your growth partner as your business scales.", accent: "#059669", bg: "#ecfdf5" },
];

export default function QualitativeProofSection() {
  return (
    <section
      className="relative py-10 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #eef2ff 40%, #ffffff 100%)" }}
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
            OUR COMMITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Built on Trust, Clarity,<br className="hidden sm:inline" /> and Results.
          </h2>
          <p className="text-base sm:text-lg text-brand-text leading-relaxed">
            We measure success not by vanity metrics, but by the tangible credibility and growth we bring to your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {QUALITATIVE_PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-7 rounded-[8px] border border-gray-100 flex flex-col cursor-default relative overflow-hidden group"
              style={{ boxShadow: "0 2px 10px rgba(5,15,44,0.06)" }}
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-[8px] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: p.accent }}
              />

              <div
                className="w-12 h-12 rounded-[8px] flex items-center justify-center mb-5"
                style={{ background: p.bg, color: p.accent }}
              >
                <p.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">{p.title}</h3>
              <p className="text-sm text-brand-text leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
