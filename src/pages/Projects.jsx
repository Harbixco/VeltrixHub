import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Briefcase } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const categories = ['All', 'Website', 'E-Commerce', 'Branding', 'Training']

const projects = [
  { title: 'StyleByAda Online Store', category: 'E-Commerce', desc: 'Fashion e-commerce store with product catalog, cart, and Paystack checkout integration.', gradient: 'from-rose-500 to-pink-700', tags: ['React', 'E-Commerce', 'Paystack'] },
  { title: 'TechStartNG Corporate Site', category: 'Website', desc: 'Modern corporate website with team pages, blog, and lead generation forms.', gradient: 'from-blue-600 to-indigo-800', tags: ['React', 'Framer Motion', 'CMS'] },
  { title: 'Eze Farms Portfolio', category: 'Website', desc: 'Agricultural business portfolio showcasing farm produce and wholesale inquiries.', gradient: 'from-green-600 to-emerald-800', tags: ['HTML/CSS', 'JavaScript', 'Forms'] },
  { title: 'LuxeHair Brand Identity', category: 'Branding', desc: 'Complete brand identity for a premium hair extension brand — logo, colours, guidelines.', gradient: 'from-amber-500 to-orange-700', tags: ['Logo Design', 'Brand Guide', 'Social Media'] },
  { title: 'QuickEats Food Delivery', category: 'E-Commerce', desc: 'Restaurant ordering platform with menu management and delivery tracking features.', gradient: 'from-orange-500 to-red-700', tags: ['React', 'Node.js', 'Payments'] },
  { title: 'ProphitMedia Agency', category: 'Website', desc: 'Marketing agency website with animated portfolio and service bookings.', gradient: 'from-purple-600 to-blue-700', tags: ['React', 'Animations', 'Portfolio'] },
  { title: 'Veltrix Training Platform', category: 'Training', desc: 'Online learning platform for our web development bootcamp with progress tracking.', gradient: 'from-brand-blue to-blue-900', tags: ['React', 'LMS', 'Dashboard'] },
  { title: 'NaijaThreads Apparel', category: 'E-Commerce', desc: 'African fashion brand with full inventory management and international shipping.', gradient: 'from-yellow-500 to-orange-600', tags: ['Shopify', 'Custom Theme', 'Logistics'] },
  { title: 'BuildRight Construction', category: 'Branding', desc: 'Professional rebrand for a construction company — bold, trustworthy visual identity.', gradient: 'from-slate-600 to-gray-800', tags: ['Rebrand', 'Logo', 'Stationery'] },
]

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Briefcase size={14} />
              Our Portfolio
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              Work We're{' '}
              <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Proud Of
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Every project tells a story of transformation. Here's how we've helped businesses across Nigeria grow online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:text-brand-blue hover:bg-blue-50 border border-gray-200'
                }`}
                style={active === cat ? { background: 'linear-gradient(135deg, #1a3ebd, #2d55e0)', boxShadow: '0 8px 24px rgba(26,62,189,0.3)' } : {}}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 group cursor-pointer"
                >
                  {/* Project visual */}
                  <div className={`aspect-video relative overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    {/* Browser frame */}
                    <div className="absolute top-4 left-4 right-4 bottom-4 rounded-lg bg-black/20 backdrop-blur overflow-hidden">
                      <div className="h-6 bg-black/30 flex items-center px-3 gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-400/70" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                        <div className="w-2 h-2 rounded-full bg-green-400/70" />
                        <div className="ml-2 flex-1 h-3 rounded bg-white/10" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="h-4 w-3/4 rounded bg-white/20" />
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-5/6 rounded bg-white/10" />
                        <div className="grid grid-cols-3 gap-1.5 mt-2">
                          {[1,2,3].map(n => <div key={n} className="aspect-square rounded bg-white/10" />)}
                        </div>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white text-sm font-semibold bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                        <ExternalLink size={14} />
                        View Project
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1 block">{p.category}</span>
                    <h3 className="font-black text-brand-navy mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">Want a Project Like These?</h2>
            <p className="text-gray-500 text-lg mb-8">Let's discuss your vision and build something extraordinary together.</p>
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start Your Project <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
