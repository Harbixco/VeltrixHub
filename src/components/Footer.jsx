import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";

const services = [
  "Website Development",
  "E-Commerce Development",
  "Website Maintenance",
  "Business Branding",
  "CAC Business Registration",
  "Digital Consultation",
  "Website Training",
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Our Work", path: "/projects" },
  { label: "About Veltrix Hub", path: "/about" },
  { label: "Veltrix Tech Academy", path: "/training" },
  { label: "Get Consultation", path: "/contact" },
];

function TikTokIcon({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(160deg, #050f2c 0%, #0a1a45 100%)" }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      {/* Blue glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(26,62,189,0.2) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Veltrix Hub Logo" width={70} className="h-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Helping businesses become visible, build trust, and grow online.
            </p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {[
                { icon: Facebook, href: "https://www.facebook.com/Officialveltrixhub", label: "Facebook" },
                { icon: TikTokIcon, href: "https://www.tiktok.com/@officialveltrixhub", label: "TikTok" },
                { icon: Instagram, href: "https://www.instagram.com/officialveltrixhub/", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/agbaje-abiodun/", label: "LinkedIn" },
                { icon: FaWhatsapp, href: "https://wa.me/2348087098270", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-[4px] border border-white/10 bg-white/5 hover:bg-brand-blue hover:border-brand-blue flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-blue inline-block" />
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={13} className="text-brand-orange opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-orange inline-block" />
              Digital Solutions
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={13} className="text-brand-orange opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-emerald-500 inline-block" />
              Contact & Support
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@veltrixhub.ng" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-[4px] bg-white/5 group-hover:bg-brand-blue flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm break-all">info@veltrixhub.ng</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/2348087098270" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-[4px] bg-white/5 group-hover:bg-emerald-600 flex items-center justify-center shrink-0 transition-colors">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm">+234 808 709 8270</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-[4px] bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <span className="text-sm">Osogbo, Osun State, Nigeria</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Veltrix Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span>Become Visible</span>
            <span className="text-brand-orange">•</span>
            <span>Build Trust</span>
            <span className="text-brand-orange">•</span>
            <span>Grow</span>
          </div>
        </div>
      </div>
    </footer>
  );
}