import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../Asset/logo.png";

// Centralized configurations matching shared contact properties
const COMPANY_CONFIG = {
  whatsappUrl: "https://wa.me/2349039415354",
};

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Training", path: "/training" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-xl shadow-lg shadow-brand-navy/5 border-b border-gray-100"
            : isHome
              ? "py-5 bg-transparent"
              : "py-5 bg-white/95 backdrop-blur-xl border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="logo" width={70} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "text-brand-blue bg-blue-50"
                      : scrolled || !isHome
                        ? "text-gray-600 hover:text-brand-blue hover:bg-blue-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={COMPANY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-sm py-2.5 px-5"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-5 rounded-lg transition-colors z-50 ${
              mobileOpen
                ? "text-white" // Keep toggle white when menu is open over dark background
                : scrolled || !isHome
                  ? "text-brand-navy"
                  : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Dropdown Menu Container */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl md:hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-5 py-3 rounded-xl text-base font-semibold transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 px-1">
                <a
                  href={COMPANY_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-orange w-full justify-center py-3 text-base shadow-lg shadow-orange-600/10"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
