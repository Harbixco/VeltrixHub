import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, GraduationCap } from "lucide-react";
import trainingSessionImg from "../../assets/training-session.webp";

const ACADEMY_ITEMS = [
  "Web Development Fundamentals",
  "Frontend & React Engineering",
  "Hands-on Practical Projects",
  "Career Guidance & Mentorship",
];

export default function AcademySection() {
  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050f2c 0%, #0f2580 60%, #050f2c 100%)" }}
    >
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/15 mb-5">
              <GraduationCap size={13} />
              EDUCATION & TRAINING ARM
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Want to Learn the Skills Yourself?
            </h2>
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              Through Veltrix Tech Academy, we help individuals learn practical digital and web development skills from experienced builders.
            </p>

            <ul className="space-y-3 mb-8">
              {ACADEMY_ITEMS.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-3 text-gray-200 text-sm font-medium"
                >
                  <div className="w-5 h-5 bg-brand-orange/20 text-brand-orange rounded-full flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link
              to="/training"
              className="bg-white hover:bg-gray-100 text-brand-navy font-bold px-6 py-3.5 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 text-sm group"
            >
              Explore Veltrix Tech Academy
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div
              className="p-1.5 rounded-[6px]"
              style={{ background: "linear-gradient(135deg, rgba(26,62,189,0.5), rgba(232,93,4,0.4))" }}
            >
              <img
                src={trainingSessionImg}
                alt="Veltrix Tech Academy Training Session"
                className="w-full h-auto object-cover rounded-[4px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
