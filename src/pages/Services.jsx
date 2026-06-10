import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, FileText, Code2, Wrench, Palette,
  CheckCircle2, ArrowRight, Zap, MessageCircle
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    tagline: 'Your digital storefront, perfected.',
    desc: 'We craft beautiful, fast-loading websites that convert visitors into customers. From simple landing pages to complex multi-page platforms, every project is built with performance and conversion in mind.',
    features: ['Custom responsive design', 'SEO optimization', 'Fast load times', 'CMS integration', 'Contact forms & booking', 'SSL & security setup'],
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    tagline: 'Sell online. Grow revenue.',
    desc: 'Full-featured online stores built to maximize sales. We integrate payment gateways, inventory management, and seamless checkout experiences that make buying effortless for your customers.',
    features: ['Product catalog management', 'Paystack & Flutterwave integration', 'Order management system', 'Mobile-optimized checkout', 'Inventory tracking', 'Sales analytics dashboard'],
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
  {
    icon: FileText,
    title: 'CAC Business Registration',
    tagline: 'Make it official. Make it yours.',
    desc: 'We handle the entire CAC registration process for you — from name search to certificate collection. Get your business legally registered without the stress, delays, or confusion.',
    features: ['Business name search', 'Full documentation handling', 'CAC portal submission', 'Status tracking & updates', 'Certificate collection', 'Post-registration support'],
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: Code2,
    title: 'Web Development Training',
    tagline: 'From zero to professional developer.',
    desc: 'Our comprehensive training program takes you from complete beginner to job-ready developer. With online and physical class options, practical projects, and mentorship, we set you up for success.',
    features: ['HTML, CSS & JavaScript', 'React & modern frameworks', 'Online & physical classes', 'Hands-on real projects', 'Career mentorship', 'Job placement assistance'],
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance & Support',
    tagline: 'We keep your site running perfectly.',
    desc: 'Your website needs ongoing care to stay fast, secure, and up-to-date. Our maintenance packages ensure your digital presence is always performing at its best.',
    features: ['Regular content updates', 'Security monitoring & patches', 'Performance optimization', 'Backup & recovery', 'Bug fixes & updates', 'Monthly performance reports'],
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: Palette,
    title: 'Corporate Branding & Graphic Design',
    tagline: 'A brand that speaks before you do.',
    desc: 'Your brand is your first impression. We create comprehensive visual identities — from logos to full brand guidelines — that communicate your values and set you apart from the competition.',
    features: ['Logo design & variations', 'Brand guidelines & style guide', 'Business card & stationery', 'Social media templates', 'Flyers & marketing materials', 'Brand strategy consultation'],
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
]

function ServiceCard({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group"
    >
      <div className="p-8">
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: s.bg }}
          >
            <s.icon size={26} style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.tagline}</p>
            <h3 className="text-xl font-black text-brand-navy">{s.title}</h3>
          </div>
        </div>
        <p className="text-gray-500 leading-relaxed mb-6">{s.desc}</p>
        <ul className="grid grid-cols-2 gap-2">
          {s.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 size={14} style={{ color: s.color, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-8 py-4 border-t border-gray-50 flex items-center justify-between">
        <a
          href="https://wa.me/2349039415354"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all group/btn"
          style={{ color: s.color }}
        >
          Get a Quote
          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
        </a>
        <span className="text-xs text-gray-400 font-medium">Talk to us today</span>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Zap size={14} />
              Our Services
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              Everything Your Business
              <br />
              <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Needs to Succeed Online
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A complete digital agency offering everything from business registration to e-commerce — built for Nigerian businesses that are ready to grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={i} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-gray-500 text-lg mb-8">Let's have a conversation. We'll help you figure out the best solution for your business goals.</p>
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange">
              <MessageCircle size={18} />
              Chat With Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
