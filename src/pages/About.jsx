import { motion } from 'framer-motion'
import { ArrowRight, Target, Eye, Heart, Users, Zap, TrendingUp, Shield, MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const values = [
  { icon: Heart, title: 'Client First', desc: 'Every decision we make is centered on delivering real value and results for our clients.' },
  { icon: Shield, title: 'Integrity', desc: 'We\'re honest, transparent, and deliver on our promises — always.' },
  { icon: Zap, title: 'Innovation', desc: 'We stay ahead of digital trends to give our clients competitive advantages.' },
  { icon: TrendingUp, title: 'Growth Mindset', desc: 'We\'re committed to continuous improvement — ours and yours.' },
]

const team = [
  { name: 'The Founder', role: 'Founder & Lead Developer', initials: 'VH', color: 'from-brand-blue to-brand-blue-light' },
  { name: 'Design Lead', role: 'UI/UX & Brand Designer', initials: 'DL', color: 'from-brand-orange to-orange-400' },
  { name: 'Dev Team', role: 'Frontend Developers', initials: 'DT', color: 'from-indigo-600 to-blue-700' },
  { name: 'Support', role: 'Client Relations', initials: 'CS', color: 'from-green-600 to-emerald-600' },
]

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Users size={14} />
              About Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              The Team Behind{' '}
              <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Your Growth
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              We're a passionate team of developers, designers, and strategists helping Nigerian businesses build powerful digital presences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="section-tag">
                <Heart size={14} />
                Our Story
              </div>
              <h2 className="text-4xl font-black text-brand-navy mb-6">
                Born from a Passion for<br />
                <span className="gradient-text">Digital Excellence</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Veltrix Hub was founded with one clear mission: to make premium digital solutions accessible to every Nigerian business, regardless of size or budget. We saw too many businesses losing opportunities because they lacked an online presence, and we decided to change that.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                Starting as a small web development studio, we've grown into a full-service digital agency. Today, we've helped over 120 businesses establish their online presence, trained 200+ aspiring developers, and completed 95+ projects across diverse industries.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We believe every Nigerian entrepreneur deserves a world-class digital presence. That belief drives everything we do at Veltrix Hub.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '120+', label: 'Businesses Helped', color: '#1a3ebd' },
                  { num: '95+', label: 'Projects Done', color: '#FF7A00' },
                  { num: '200+', label: 'Students Trained', color: '#e85d04' },
                  { num: '3+', label: 'Years Active', color: '#FF7A00' },
                ].map((s, i) => (
                  <div key={i} className="p-6 rounded-2xl text-center bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.num}</div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To empower Nigerian businesses with world-class digital tools and solutions, making premium web presence accessible to every entrepreneur regardless of their budget or technical knowledge.',
                color: '#1a3ebd'
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To become Nigeria\'s most trusted digital solutions partner — a company synonymous with innovation, quality, and real business growth for entrepreneurs across Africa.',
                color: '#e85d04'
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)` }}>
                  <item.icon size={26} style={{ color: item.color }} />
                </div>
                <h3 className="text-2xl font-black text-brand-navy mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">Our Core Values</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">The principles that guide everything we do.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-black text-white mb-4">Let's Build Together</h2>
            <p className="text-white/50 text-lg mb-8">Ready to take your business to the next level? We'd love to hear your story.</p>
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange">
              <MessageCircle size={18} />
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
