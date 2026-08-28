import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const PERKS = [
  "Official business name search",
  "End-to-end CAC registration",
  "Clear, straightforward process",
];

export default function CACSection() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[8px] p-8 sm:p-12"
          style={{
            background: "linear-gradient(135deg, #f0f4ff 0%, #eef2ff 50%, #fff7f0 100%)",
            border: "1px solid #e0e7ff",
          }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none opacity-30"
            style={{ background: "radial-gradient(circle, #1a3ebd 0%, transparent 70%)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">
                <ShieldCheck size={15} />
                SUPPORTING SERVICE — BUSINESS FORMALIZATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight leading-tight mb-3">
                CAC Business Registration
              </h2>
              <p className="text-base text-brand-text leading-relaxed mb-5">
                Formalize your business and establish a stronger foundation for growth. We handle your business name search and registration clearly and efficiently.
              </p>
              <div className="flex flex-wrap gap-4">
                {PERKS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-brand-navy">
                    <CheckCircle2 size={15} className="text-brand-blue" />
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:text-right">
              <Link
                to="/contact"
                className="bg-brand-navy hover:bg-brand-blue text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group text-sm"
                style={{ boxShadow: "0 4px 16px rgba(5,15,44,0.2)" }}
              >
                Register Your Business
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
