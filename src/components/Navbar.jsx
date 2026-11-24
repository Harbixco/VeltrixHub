import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Layers,
  Lock,
  LogOut,
  ShieldCheck,
  Phone,
  HardHat,
  Paintbrush,
  Sparkles,
  Wrench,
  Stethoscope,
  Scale,
  SunMedium,
  ShieldAlert,
  Shirt,
  Smartphone,
  Flame,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Academy", path: "/training" },
  { label: "Contact", path: "/contact" },
];

const industryDemos = [
  { label: "Building & Contractors", path: "/contractor", icon: HardHat, tag: "₦2M-₦10M+" },
  { label: "Painting & Finishing", path: "/painting", icon: Paintbrush, tag: "Visual" },
  { label: "Commercial Cleaning", path: "/cleaning", icon: Sparkles, tag: "Corporate" },
  { label: "Auto Diagnostics", path: "/auto-repair", icon: Wrench, tag: "Emergency" },
  { label: "Dental Care Clinics", path: "/dental-care", icon: Stethoscope, tag: "Elective" },
  { label: "Commercial Law Practice", path: "/personal-injury", icon: Scale, tag: "Retainers" },
  { label: "Solar & Electrical", path: "/electrical", icon: SunMedium, tag: "Power" },
  { label: "Pest Control & Fumigation", path: "/pest-control", icon: ShieldAlert, tag: "Quarterly" },
  { label: "Luxury Fashion Atelier", path: "/fashion", icon: Shirt, tag: "Bespoke" },
  { label: "Tech Gadgets Hub", path: "/tech-gadgets", icon: Smartphone, tag: "Retail" },
  { label: "Haute Parfumerie", path: "/perfumes", icon: Flame, tag: "Prestige" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demosExpanded, setDemosExpanded] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDemosExpanded(false);
  }, [location.pathname]);

  const isHero = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-md"
            : isHero
            ? "py-5 bg-transparent"
            : "py-4 bg-white border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Veltrix Hub Homepage">
            <img src={logo} alt="Veltrix Hub Logo" width={64} className="h-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              const isLight = !scrolled && !isHero;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors duration-200 group ${
                    active
                      ? isLight
                        ? "text-brand-blue"
                        : "text-white"
                      : isLight
                      ? "text-brand-navy hover:text-brand-blue"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: active && isLight ? "#1a3ebd" : "#e85d04" }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Demos Quick Anchor */}
            <a
              href="/#demos"
              className={`text-sm font-semibold transition-colors ${
                !scrolled && !isHero
                  ? "text-brand-navy hover:text-brand-blue"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              Industry Demos
            </a>
          </nav>

          {/* Desktop CTA & Portal Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/outreach"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Outreach Console</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`p-2 rounded text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                  !scrolled && !isHero
                    ? "text-slate-600 hover:text-brand-navy"
                    : "text-slate-300 hover:text-white"
                }`}
                title="Staff & Outreach Login"
              >
                <Lock size={14} />
                <span className="text-[11px] uppercase tracking-wider font-bold">Portal</span>
              </Link>
            )}

            <Link
              to="/contact"
              className={`text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group ${
                scrolled || isHero
                  ? "bg-brand-blue hover:bg-brand-blue-light text-white"
                  : "bg-brand-navy hover:bg-brand-blue text-white"
              }`}
            >
              Free Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors border ${
              scrolled || isHero
                ? "text-white border-white/20 bg-white/5"
                : "text-brand-navy border-slate-300 bg-slate-50"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Categorized Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bottom-0 z-40 md:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-y-auto"
          >
            <div className="px-4 py-6 flex flex-col gap-6 max-w-lg mx-auto pb-12">
              
              {/* SECTION 1: PRIMARY AGENCY NAVIGATION */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
                  Agency Navigation
                </span>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const active = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                          active
                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                            : "text-slate-200 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span>{link.label}</span>
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* SECTION 2: 11 LIVE INDUSTRY DEMOS (VELTRIX HUB FOCUS) */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setDemosExpanded(!demosExpanded)}
                  className="w-full flex items-center justify-between px-2 py-2 text-left"
                >
                  <div className="flex items-center gap-2">
                    <Layers size={15} className="text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Live Industry Demos (11)
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${
                      demosExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {demosExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 gap-1.5 mt-2 pl-2"
                  >
                    {industryDemos.map((demo) => {
                      const Icon = demo.icon;
                      return (
                        <Link
                          key={demo.path}
                          to={demo.path}
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={14} className="text-blue-400" />
                            <span>{demo.label}</span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">
                            {demo.tag}
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* SECTION 3: STAFF & OUTREACH CONSOLE */}
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
                  Staff & Outreach Portal
                </span>
                {isAuthenticated ? (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <ShieldCheck size={16} />
                        <span>Logged in as {user?.username}</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Link
                        to="/outreach"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Outreach Console
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded transition-colors"
                        title="Sign Out"
                      >
                        <LogOut size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Lock size={14} className="text-blue-400" />
                      <span>Executive & Outreach Login</span>
                    </div>
                    <ArrowRight size={13} className="text-slate-500" />
                  </Link>
                )}
              </div>

              {/* SECTION 4: DIRECT QUICK CONTACT ACTION BUTTONS */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white w-full text-center block py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/20"
                >
                  Get a Free Consultation
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/2348087098270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
                  >
                    <FaWhatsapp size={15} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+2348087098270"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Phone size={14} />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
