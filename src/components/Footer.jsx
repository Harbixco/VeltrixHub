import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight, ChevronRight } from 'lucide-react'

const services = [
  'Website Development',
  'E-Commerce Development',
  'CAC Registration',
  'Web Dev Training',
  'Website Maintenance',
  'Corporate Branding',
]

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Training', path: '/training' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-navy relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #1a3ebd, #e85d04, transparent)' }} />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #1a3ebd, transparent)' }} />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #e85d04, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">VH</span>
              </div>
              <span className="text-white font-black text-xl">
                Veltrix<span className="text-brand-orange">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We help businesses establish and grow their online presence through powerful digital solutions.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-blue flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                  >
                    <ChevronRight size={14} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0 duration-200" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:Officialveltrixhub@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-blue transition-colors">
                    <Mail size={14} className="text-brand-blue-light group-hover:text-white" />
                  </div>
                  <span className="text-sm break-all">Officialveltrixhub@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+2349039415354" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors">
                    <Phone size={14} className="text-brand-orange group-hover:text-white" />
                  </div>
                  <span className="text-sm">+234 903 941 5354</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-gray-400" />
                  </div>
                  <span className="text-sm">Nigeria</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Veltrix Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>Innovate</span>
            <span className="text-brand-orange mx-1">•</span>
            <span>Build</span>
            <span className="text-brand-orange mx-1">•</span>
            <span>Grow</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
