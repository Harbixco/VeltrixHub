import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Compass, PhoneCall, Layers, Wrench, GraduationCap } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageTransition from "../components/PageTransition";

const QUICK_NAV = [
  { label: "Home", path: "/", icon: Home, desc: "Return to the main page" },
  { label: "Digital Services", path: "/services", icon: Wrench, desc: "Explore our web & business services" },
  { label: "Portfolio & Work", path: "/projects", icon: Layers, desc: "Inspect live business platforms we built" },
  { label: "Veltrix Academy", path: "/training", icon: GraduationCap, desc: "Practical web development training" },
  { label: "Get in Touch", path: "/contact", icon: PhoneCall, desc: "Speak directly with our team" },
];

export default function NotFound() {
  return (
    <PageTransition>
      <section
        className="min-h-[85vh] pt-32 pb-20 flex items-center justify-center relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(150deg, #050f2c 0%, #0a1a45 55%, #050f2c 100%)",
        }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #1a3ebd 0%, #e85d04 50%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-white/15 text-xs font-bold uppercase tracking-widest text-brand-orange"
              style={{ background: "rgba(232,93,4,0.1)" }}
            >
              <Compass size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
              404 • Page Not Found
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
              Looks Like You&apos;ve Found a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #4d78ff, #f77f00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Missing Link
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
              The page or link you requested does not exist, may have been moved, or the URL might be mistyped. Let&apos;s get you back on track!
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <Link
                to="/"
                className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base group"
                style={{ boxShadow: "0 4px 20px rgba(26,62,189,0.4)" }}
              >
                <Home size={18} />
                Back to Homepage
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I%20came%20across%20a%20page%20issue%20on%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base"
                style={{ boxShadow: "0 4px 16px rgba(16,185,129,0.25)" }}
              >
                <FaWhatsapp size={18} />
                Contact Support on WhatsApp
              </a>
            </div>

            {/* Quick Navigation Cards */}
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 text-center">
                OR JUMP DIRECTLY TO KEY SECTIONS
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {QUICK_NAV.map((nav, i) => (
                  <Link
                    key={i}
                    to={nav.path}
                    className="p-4 rounded-[6px] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-blue/50 transition-all duration-200 flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-[4px] bg-white/10 group-hover:bg-brand-blue text-white flex items-center justify-center shrink-0 transition-colors">
                      <nav.icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-brand-blue-light transition-colors flex items-center gap-1.5">
                        {nav.label}
                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{nav.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
