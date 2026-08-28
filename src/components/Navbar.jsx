import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Academy", path: "/training" },
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

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isHero = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "py-3 bg-brand-navy/90 backdrop-blur-md border-b border-white/10 shadow-md"
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
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              const isLight = !scrolled && !isHero;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors duration-200 group ${active
                      ? isLight ? "text-brand-blue" : "text-white"
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
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className={`text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group ${scrolled || isHero
                  ? "bg-brand-blue hover:bg-brand-blue-light text-white"
                  : "bg-brand-navy hover:bg-brand-blue text-white"
                }`}
            >
              Free Consultation
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${scrolled || isHero ? "text-white" : "text-brand-navy"
              }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden border-b border-white/10 shadow-xl"
            style={{ background: "rgba(5,15,44,0.97)", backdropFilter: "blur(16px)" }}
          >
            <nav className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-[4px] text-base font-semibold transition-colors ${active
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-white/10 mt-1">
                <Link
                  to="/contact"
                  className="bg-brand-blue hover:bg-brand-blue-light text-white w-full text-center block py-3.5 rounded-[4px] text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Get a Free Consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
