import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Globe,
  ShoppingCart,
  FileText,
  Code2,
  Wrench,
  Palette,
  Star,
  CheckCircle2,
  Quote,
  Zap,
  Shield,
  Clock,
  HeartHandshake,
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  Briefcase,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  Target,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { useCounter } from "../components/useCounter";

// ─── CORRECTED IMAGE ASSET IMPORTS (FIXED FOR VERCEL DEPLOYMENT) ────────────────
import heroTeamImg from "../assets/hero-team.webp";
import ecommerceDevImg from "../assets/ecommerce-dev.webp";
import trainingSessionImg from "../assets/training-session.webp";
import corporateSolutionsImg from "../assets/corporate-solutions.webp";
import dove from "../assets/dove.webp";
import affordable from "../assets/affordable.webp";
import walexfarms from "../assets/walexfarms.webp";

// Centralized configurations for easier updates and maintenance
const COMPANY_CONFIG = {
  whatsappUrl: "https://wa.me/2349039415354",
  phoneDisplay: "+234 903 941 5354",
  email: "Officialveltrixhub@gmail.com",
};

const FLOATING_SHAPES = [
  { w: 60, h: 60, top: "15%", left: "10%", delay: 0 },
  { w: 40, h: 40, top: "60%", left: "5%", delay: 1 },
  { w: 50, h: 50, top: "25%", right: "8%", delay: 2 },
  { w: 35, h: 35, top: "70%", right: "15%", delay: 0.5 },
  { w: 25, h: 25, top: "45%", left: "20%", delay: 1.5 },
];

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg noise-overlay pt-24 pb-12 lg:pt-32 lg:pb-20"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,62,189,0.25) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,93,4,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Floating geometric shapes */}
        <div className="hidden sm:block">
          {FLOATING_SHAPES.map((shape, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute rounded-xl border border-white/10"
              style={{
                width: shape.w,
                height: shape.h,
                top: shape.top,
                left: shape.left,
                right: shape.right,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-6 sm:mb-8 border border-white/20"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Sparkles size={14} className="text-brand-orange" />
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                Nigeria's Premium Digital Agency
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight"
            >
              We Build{" "}
              <span className="relative inline-block">
                <span className="gradient-text">Digital Solutions</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                  style={{
                    background: "linear-gradient(90deg, #1a3ebd, #e85d04)",
                  }}
                />
              </span>
              <br /> That Help{" "}
              <span className="text-brand-orange">Businesses</span> Grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-8 sm:mb-10"
            >
              From business registration to professional websites and digital
              skills training, we help entrepreneurs build stronger brands and
              grow faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={COMPANY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange group justify-center text-center px-8 py-4"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <Link
                to="/services"
                className="btn-ghost text-white border-white/30 hover:bg-white/10 hover:border-white/50 text-center px-8 py-4"
              >
                View Our Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-x-4 gap-y-2 mt-8 sm:mt-10"
            >
              {[
                "✦ Website Development",
                "✦ E-Commerce",
                "✦ CAC Registration",
                "✦ Web Training",
              ].map((item) => (
                <span
                  key={item}
                  className="text-white/50 text-xs sm:text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Tech Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:flex justify-center relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-2.5 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl max-w-md overflow-hidden group"
            >
              <img
                src={heroTeamImg}
                alt="Veltrix Hub Tech Accelerator Studio Team"
                className="rounded-2xl object-cover border border-white/5 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -bottom-4 -left-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-white text-xs font-semibold flex items-center gap-3 shadow-2xl">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                Veltrix Accelerator Suite v1.0
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── STATS SECTION ───────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, color }) {
  const { count, ref } = useCounter(value, 2000);
  return (
    <div ref={ref} className="text-center p-2">
      <div
        className="text-4xl sm:text-6xl font-black counter-num mb-1 sm:mb-2"
        style={{ color }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-gray-500 text-xs sm:text-sm font-medium leading-tight">
        {label}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-4 sm:py-8 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(26,62,189,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-16"
        >
          {[
            {
              value: 120,
              suffix: "+",
              label: "Businesses Supported",
              color: "#1a3ebd",
            },
            {
              value: 95,
              suffix: "+",
              label: "Projects Completed",
              color: "#e85d04",
            },
            {
              value: 200,
              suffix: "+",
              label: "Students Trained",
              color: "#1a3ebd",
            },
            {
              value: 3,
              suffix: "+",
              label: "Years of Experience",
              color: "#e85d04",
            },
          ].map((stat, i) => (
            <motion.div
              key={`stat-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ────────────────────────────────────────────────────────
const servicesList = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Beautiful, fast, and conversion-focused websites that make a lasting impression and drive real business results.",
    color: "#1a3ebd",
    bg: "rgba(26,62,189,0.06)",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    desc: "Powerful online stores built to sell. We create seamless shopping experiences that convert visitors into customers.",
    color: "#e85d04",
    bg: "rgba(232,93,4,0.06)",
  },
  {
    icon: FileText,
    title: "CAC Business Registration",
    desc: "Register your business quickly and professionally. We handle all the paperwork so you can focus on building.",
    color: "#1a3ebd",
    bg: "rgba(26,62,189,0.06)",
  },
  {
    icon: Code2,
    title: "Web Development Training",
    desc: "Learn modern web development with hands-on projects. Online and physical classes available for all skill levels.",
    color: "#e85d04",
    bg: "rgba(232,93,4,0.06)",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Keep your website fast, secure, and up-to-date with our reliable maintenance and support services.",
    color: "#1a3ebd",
    bg: "rgba(26,62,189,0.06)",
  },
  {
    icon: Palette,
    title: "Corporate Branding",
    desc: "From logos to full brand identities, we craft visual identities that communicate your values with impact.",
    color: "#e85d04",
    bg: "rgba(232,93,4,0.06)",
  },
];

function Services() {
  return (
    <section className="py-6 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="section-tag mx-auto">
            <Zap size={14} />
            Our Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-navy mb-4 mt-2">
            Everything Your Business{" "}
            <span className="gradient-text">Needs to Thrive</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
            A full suite of digital solutions designed to help your business
            establish, grow, and dominate online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s, i) => (
            <motion.div
              key={`service-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="service-card group relative overflow-hidden"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: s.bg }}
              >
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <h3 className="text-brand-navy font-bold text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {s.desc}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                style={{ color: s.color }}
              >
                Learn More{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${s.bg} 0%, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Services Button Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/services" className="btn-primary inline-flex">
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* ─── IMAGE SET DISPLAY BANNER (POST-SERVICES) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 pt-4 border-t border-gray-200/60"
        >
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange">
              Veltrix Operations Gallery
            </span>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Real human interfaces and modern workflows driving client success
              daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { img: ecommerceDevImg, tag: "E-Commerce Systems" },
              { img: trainingSessionImg, tag: "Active Skills Mentorship" },
              { img: corporateSolutionsImg, tag: "CAC Corporate Operations" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl overflow-hidden shadow-md group border border-gray-100 bg-white p-2"
              >
                <div className="overflow-hidden rounded-xl aspect-[4/3]">
                  <img
                    src={item.img}
                    alt={item.tag}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <span className="text-xs font-bold text-brand-navy">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US SECTION ────────────────────────────────────────────────────
const strengths = [
  {
    icon: Palette,
    title: "Modern Design",
    desc: "Pixel-perfect designs that look stunning on every device and screen size.",
  },
  {
    icon: Shield,
    title: "Mobile Responsive",
    desc: "Every project is built mobile-first, ensuring flawless experiences everywhere.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "We move with urgency. Get your projects delivered on time, every time.",
  },
  {
    icon: HeartHandshake,
    title: "Reliable Support",
    desc: "We are here for you post-launch with responsive, dedicated support.",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    desc: "Everything we build is designed to help your business grow and convert.",
  },
  {
    icon: DollarSign,
    title: "Affordable Solutions",
    desc: "Premium quality at prices that make sense for Nigerian businesses.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-6 sm:py-8 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(232,93,4,0.04) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="section-tag">
              <Target size={14} />
              Why Veltrix Hub?
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-navy mb-4 sm:mb-6 mt-2">
              The Partner Your
              <br />
              <span className="gradient-text">Business Deserves</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              We're not just a service provider — we're your digital growth
              partner. Every decision we make is centered around helping your
              business succeed online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center text-center"
              >
                Start a Project <ArrowRight size={18} />
              </a>
              <Link
                to="/about"
                className="btn-ghost text-brand-navy border-gray-200 hover:border-brand-blue hover:text-brand-blue text-center"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strengths.map((s, i) => (
              <motion.div
                key={`strength-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <s.icon size={18} className="text-white" />
                </div>
                <h4 className="font-bold text-brand-navy text-sm mb-1">
                  {s.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
const projects = [
  {
    title: "E-Commerce Retail Showcase",
    category: "Web Development & E-Commerce",
    image: dove,
  },
  {
    title: "E-Commerce For Gadgets",
    category: "Branding & Portfolios",
    image: affordable,
  },
  {
    title: "An Agro Farms Services",
    category: "UI/UX & Web Development",
    image: walexfarms,
  },
];

function Projects() {
  return (
    <section className="py-16 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/10 text-white/60 mx-auto"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <Briefcase size={14} />
            Featured Projects
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 mt-2">
            Work We're{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2d55e0, #e85d04)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Proud Of
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            A glimpse into our visual portfolio of premium digital spaces built
            across Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={`project-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-900/50 border border-white/5 shadow-xl"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              <div className="p-5 relative z-10">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-1 block">
                  {p.category}
                </span>
                <h3 className="text-white font-bold text-base transition-colors group-hover:text-brand-blue-light">
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            to="/projects"
            className="btn-ghost text-white border-white/20 hover:bg-white/5 inline-flex"
          >
            Explore Complete Portfolio <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TRAINING ACADEMY SECTION ────────────────────────────────────────────────
const courseHighlights = [
  { icon: Users, title: "1-on-1 Personalized Mentorship Support" },
  { icon: BookOpen, title: "100% Comprehensive Practical Curriculum Matrix" },
  { icon: Briefcase, title: "Live Real-World Capstone Project Portfolios" },
  { icon: Award, title: "Globally Verified Career Achievement Certification" },
];

function TrainingSection() {
  return (
    <section className="py-6 sm:py-8 bg-gray-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-tag">
              <Code2 size={14} />
              Veltrix Tech Academy
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-navy mb-4 sm:mb-6 mt-2">
              Launch Your High-Income{" "}
              <span className="gradient-text">Tech Career</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Equip yourself with elite software production engineering stacks.
              Our courses cover Frontend fundamentals, responsive framework
              architecture, logic building blocks, and optimization tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-10">
              {courseHighlights.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-brand-orange shrink-0">
                    <item.icon size={16} />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-navy mt-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/training" className="btn-orange justify-center">
                Enroll Now <ArrowRight size={18} />
              </Link>
              <a
                href={COMPANY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-brand-navy border-gray-200 hover:bg-white text-center justify-center"
              >
                Syllabus Consultation
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative justify-center flex"
          >
            <div className="relative p-2 bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md group overflow-hidden">
              <img
                src={trainingSessionImg}
                alt="Veltrix Hub Interactive Instructor Student Mentorship Session"
                className="rounded-2xl transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg">
                Physical & Online Classes
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CAC CORPORATE BANNER SECTION ────────────────────────────────────────────
const cacSteps = [
  { step: "01", title: "Name Availability Verification Search" },
  { step: "02", title: "Document Uploads & Legal Preparation" },
  { step: "03", title: "Final Certificate & Delivery Execution" },
];

function CACSection() {
  return (
    <section className="py-6 sm:py-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 hidden lg:flex justify-center"
          >
            <div className="p-2 bg-slate-50 border border-slate-100 rounded-3xl shadow-xl max-w-sm group overflow-hidden">
              <img
                src={corporateSolutionsImg}
                alt="Veltrix Hub Corporate Validation Handshake Meeting"
                className="rounded-2xl transition-transform duration-500 group-hover:scale-103"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="section-tag">
              <FileText size={14} />
              Corporate Compliance Suite
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-brand-navy mb-4 sm:mb-6 mt-2">
              Legitimize Your Corporate Entity{" "}
              <span className="gradient-text">With CAC</span>
            </h2>
            <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed">
              Build investor trust, open official corporate bank routing
              channels, and protect your enterprise corporate liability. We
              coordinate entire pipelines without administrative friction.
            </p>

            <div className="space-y-4 mb-8 sm:mb-10">
              {cacSteps.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-brand-blue/20 transition-all"
                >
                  <span className="text-lg font-black text-brand-blue">
                    {item.step}
                  </span>
                  <p className="text-sm font-bold text-brand-navy">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center text-center"
              >
                Register Business Now <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION (SLIDER CAROUSEL REFACTOR) ──────────────────────────
const testimonials = [
  {
    quote:
      "Veltrix Hub completely re-engineered our e-commerce visibility mechanics. Sales scales metrics spiked 40% inside deployment windows.",
    author: "Alhaji Ibrahim K.",
    role: "Logistics Enterprise Principal",
    rating: 5,
  },
  {
    quote:
      "The React development syllabus path inside the academy changed my life. I went from raw script syntax errors to active frontend framework mastery.",
    author: "Chidi O.",
    role: "Junior Web Engineer at Nouvells",
    rating: 5,
  },
  {
    quote:
      "Our corporate CAC compliance execution profile was turned around within 7 business days. No hidden fees or stress.",
    author: "Femi A.",
    role: "Tech Startup Founder",
    rating: 5,
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">
            <Star size={14} />
            Client Testimonials
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-navy mt-2">
            What Our <span className="gradient-text">Clients Are Saying</span>
          </h2>
        </div>

        {/* Carousel Container Wrapper Frame */}
        <div className="relative items-center grid grid-cols-1">
          {/* Main Card Content Container Panel */}
          <div className="relative min-h-[260px] sm:min-h-[220px] overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xl p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <Quote size={32} className="text-brand-orange/20 mb-4" />
                  <p className="text-gray-600 text-base sm:text-lg italic leading-relaxed font-medium mb-6">
                    "{testimonials[active].quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                  <div>
                    <h4 className="font-black text-brand-navy text-sm sm:text-base">
                      {testimonials[active].author}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium">
                      {testimonials[active].role}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonials[active].rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className="fill-brand-orange text-brand-orange"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Manual Navigation Triggers */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-16">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-16">
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-600 hover:text-brand-blue hover:shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bullet Pagination Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === i ? "w-8 bg-brand-blue" : "w-2.5 bg-gray-200"
              }`}
              aria-label={`Go to testimonial card slot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALL TO ACTION SECTION ──────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-6 sm:py-8 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #1a3ebd 0%, transparent 60%)",
          }}
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-brand-orange mx-auto">
            <Rocket size={14} className="animate-bounce" />
            Let's Collaborate Today
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Ready to Accelerate Your
            <br />
            <span className="text-brand-orange">
              Digital Operations Framework?
            </span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Connect with our technical deployment consultants now to schedule
            your initial diagnostic mapping strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={COMPANY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange group justify-center w-full sm:w-auto"
            >
              Let's Talk
              <MessageCircle
                size={18}
                className="transition-transform group-hover:rotate-12"
              />
            </a>
            <a
              href={`mailto:${COMPANY_CONFIG.email}`}
              className="btn-ghost text-white border-white/20 hover:bg-white/10 justify-center w-full sm:w-auto"
            >
              <Mail size={18} />
              Send Email
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6">
            {[
              { icon: Phone, text: COMPANY_CONFIG.phoneDisplay },
              { icon: Mail, text: COMPANY_CONFIG.email },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-white/40 text-xs sm:text-sm"
              >
                <Icon size={14} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MAIN HOME PAGE EXPORT ───────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Projects />
      <TrainingSection />
      <CACSection />
      <Testimonials />
      <CTA />
    </PageTransition>
  );
}
