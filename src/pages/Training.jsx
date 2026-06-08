import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Code2, Globe, Users, BookOpen, Award, Briefcase, Clock, Star, MessageCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const curriculum = [
  { phase: 'Phase 1', title: 'Web Fundamentals', weeks: '2 weeks', topics: ['HTML5 & Semantic Markup', 'CSS3 & Flexbox/Grid', 'Responsive Design', 'Basic JavaScript'], color: '#1a3ebd' },
  { phase: 'Phase 2', title: 'JavaScript Mastery', weeks: '3 weeks', topics: ['ES6+ Features', 'DOM Manipulation', 'Fetch API & AJAX', 'Project: Dynamic Web App'], color: '#e85d04' },
  { phase: 'Phase 3', title: 'React Development', weeks: '4 weeks', topics: ['React Fundamentals', 'Hooks & State Management', 'React Router', 'Component Architecture'], color: '#1a3ebd' },
  { phase: 'Phase 4', title: 'Full-Stack & Career', weeks: '3 weeks', topics: ['Node.js Basics', 'Database Integration', 'Portfolio Building', 'Job Interview Prep'], color: '#e85d04' },
]

const features = [
  { icon: BookOpen, title: 'Beginner Friendly', desc: 'We start from absolute zero. No prior experience required — just curiosity and commitment.' },
  { icon: Globe, title: 'Online & Physical', desc: 'Join classes online via Zoom or attend our physical location in person — your choice.' },
  { icon: Code2, title: 'Practical Projects', desc: 'Build 5+ real-world projects you can show to employers and add to your portfolio.' },
  { icon: Users, title: 'Mentorship', desc: 'Get direct access to experienced developers who guide you through every challenge.' },
  { icon: Award, title: 'Certificate', desc: 'Earn a Veltrix Hub certificate of completion recognized by employers.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'CV review, LinkedIn optimization, interview prep, and job placement support.' },
]

export default function Training() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050f2c 0%, #0a1a45 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Code2 size={14} />
                Web Dev Training
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
                Launch Your{' '}
                <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tech Career
                </span>{' '}
                in 3 Months
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Our intensive web development program is designed to take you from zero to job-ready. Learn from working developers, build real projects, and join a growing community of Nigerian tech talent.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock size={14} className="text-brand-orange" />
                  3 Months Intensive
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Users size={14} className="text-brand-orange" />
                  Small Class Sizes
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Star size={14} className="text-brand-orange fill-current" />
                  5.0 Rating
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange">
                  Enroll Now <ArrowRight size={18} />
                </a>
                <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-ghost text-white border-white/20 hover:bg-white/10">
                  Ask Questions
                </a>
              </div>
            </motion.div>

            {/* Price card */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="relative rounded-3xl p-8 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #e85d04, #f77f00)' }}>
                  MOST POPULAR
                </div>
                <h3 className="text-white font-black text-xl mb-1">Full Web Dev Bootcamp</h3>
                <p className="text-white/50 text-sm mb-6">Online & Physical options available</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-white font-black text-5xl">₦</span>
                  <span className="text-white font-black text-5xl">50,000</span>
                  <span className="text-white/40 text-sm">/program</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {['12 weeks of structured learning', 'Online & physical attendance', '5 portfolio projects', '1-on-1 mentorship sessions', 'Certificate of completion', 'Job placement support', 'Lifetime community access'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                      <CheckCircle2 size={15} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange w-full justify-center">
                  Secure Your Spot <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">Why Our Program Works</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">We've designed every aspect of our training to maximize your chances of success.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group bg-gray-50 hover:bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">What You'll Learn</h2>
            <p className="text-gray-500 text-lg">A structured 12-week journey from HTML to full-stack React development.</p>
          </motion.div>
          <div className="space-y-5">
            {curriculum.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: c.color }}>{c.phase} • {c.weeks}</span>
                      <h3 className="font-black text-brand-navy text-lg">{c.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {c.topics.map(topic => (
                      <span key={topic} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{topic}</span>
                    ))}
                  </div>
                </div>
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
            <h2 className="text-4xl font-black text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/50 text-lg mb-8">Limited spots available for the next cohort. Secure yours today.</p>
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange">
              <MessageCircle size={18} />
              Chat With Us to Enroll
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
