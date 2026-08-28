import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "Understand", desc: "We learn about your business, customers, challenges, and goals.", color: "from-blue-600 to-brand-blue" },
  { num: "02", title: "Strategize", desc: "We identify the digital solutions that make sense for your business.", color: "from-brand-blue to-brand-blue-light" },
  { num: "03", title: "Build", desc: "We create a professional, user-friendly solution around your goals.", color: "from-brand-blue-light to-indigo-500" },
  { num: "04", title: "Launch", desc: "We test, refine, and prepare your digital presence for real customers.", color: "from-orange-500 to-brand-orange" },
  { num: "05", title: "Grow", desc: "We continue supporting you as your business evolves.", color: "from-brand-orange to-brand-orange-light" },
];

export default function ProcessSection() {
  return (
    <section
      className="relative py-10 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #050f2c 0%, #0a1a45 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 mb-5">
            OUR GROWTH PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How We Help Your Business Grow
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            We work as your long-term growth partner, guiding you from initial strategy to ongoing support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-[6px] border border-white/10 cursor-default overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {/* Number accent */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-white text-sm mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>

              {/* Hover gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/contact"
            className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-8 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group"
            style={{ boxShadow: "0 4px 20px rgba(26,62,189,0.4)" }}
          >
            Start Your Growth Journey
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
