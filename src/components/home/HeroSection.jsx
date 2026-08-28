import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe, ShieldCheck, Users, TrendingUp } from "lucide-react";
import hero from "../../assets/hero.webp";

const WA_URL = "https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20discuss%20getting%20my%20business%20online.";

const GROWTH_STEPS = [
  { icon: Building2, label: "Business" },
  { icon: Globe, label: "Online Presence" },
  { icon: ShieldCheck, label: "Trust" },
  { icon: Users, label: "Customers" },
  { icon: TrendingUp, label: "Growth" },
];

export default function HeroSection() {
  return (
    <section
      className="relative pt-10 pb-10 lg:pt-20 lg:pb-12 overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #050f2c 0%, #0a1a45 55%, #050f2c 100%)",
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Decorative glow orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #1a3ebd 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #e85d04 0%, transparent 70%)", transform: "translate(-40%, 40%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/15 text-white/70 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              DIGITAL GROWTH PARTNER FOR BUSINESSES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Become Visible. <br />
              Build Trust. <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #4d78ff, #f77f00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Grow Your Business.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mb-8"
            >
              We help businesses build a professional online presence that attracts customers, earns trust, and creates real business opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                to="/contact"
                className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base group"
                style={{ boxShadow: "0 4px 20px rgba(26,62,189,0.4)" }}
              >
                Get a Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-4 rounded-[4px] border border-white/20 transition-all duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                See Our Work
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Growth pathway */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                THE DIGITAL GROWTH PATHWAY
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
                {GROWTH_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] border border-white/15 cursor-default"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <step.icon size={13} className="text-brand-orange" />
                      <span>{step.label}</span>
                    </motion.div>
                    {idx < GROWTH_STEPS.length - 1 && (
                      <span className="text-white/30 font-black text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div
              className="p-1.5 rounded-[6px] relative"
              style={{ background: "linear-gradient(135deg, rgba(26,62,189,0.6), rgba(232,93,4,0.4))" }}
            >
              <img
                src={hero}
                alt="FindAll E-Commerce Platform Built by Veltrix Hub"
                className="w-full h-auto object-cover rounded-[4px]"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-brand-navy/80 backdrop-blur-sm p-3 rounded-[4px] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="block font-bold text-white">FindAll E-Commerce Store</span>
                  <span className="text-brand-orange font-medium">Real Business Case →</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-blue/30 flex items-center justify-center">
                  <Globe size={14} className="text-brand-blue-light" />
                </div>
              </div>
            </div>

            {/* Floating trust badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-bold text-white"
              style={{ background: "rgba(26,62,189,0.4)", backdropFilter: "blur(12px)" }}
            >
              <ShieldCheck size={14} className="text-green-400" />
              Trusted by Nigerian Businesses
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
