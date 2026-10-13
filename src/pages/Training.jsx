import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Code2, Globe, Users, BookOpen, Award, Briefcase, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SEO from '../components/SEO'
import { FaWhatsapp } from "react-icons/fa";

const curriculum = [
  { phase: 'Phase 1', title: 'Web Fundamentals', weeks: '2 weeks', topics: ['HTML5 & Semantic Markup', 'CSS3 & Flexbox/Grid', 'Responsive Design', 'Basic JavaScript'], color: '#1a3ebd' },
  { phase: 'Phase 2', title: 'JavaScript Mastery', weeks: '3 weeks', topics: ['ES6+ Features', 'DOM Manipulation', 'Fetch API & Async JS', 'Project: Dynamic Web App'], color: '#e85d04' },
  { phase: 'Phase 3', title: 'React Development', weeks: '4 weeks', topics: ['React Fundamentals', 'Hooks & State Management', 'React Router', 'Component Architecture'], color: '#1a3ebd' },
  { phase: 'Phase 4', title: 'Full-Stack & Career', weeks: '3 weeks', topics: ['Node.js Basics', 'Database Integration', 'Portfolio Building', 'Interview Prep'], color: '#e85d04' },
]

const features = [
  { icon: BookOpen, title: 'Beginner Friendly', desc: 'We start from zero. No prior experience required — just commitment and curiosity.' },
  { icon: Globe, title: 'Online & Physical Options', desc: 'Join live interactive classes online or attend in person based on your schedule.' },
  { icon: Code2, title: 'Practical Projects', desc: 'Build real-world projects you can show to potential clients and employers.' },
  { icon: Users, title: 'Developer Mentorship', desc: 'Direct guidance from active software developers building real applications.' },
  { icon: Award, title: 'Certificate of Completion', desc: 'Earn a Veltrix Tech Academy certificate validating your practical engineering skills.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'Portfolio review, LinkedIn setup, and guidance on landing tech opportunities.' },
]

export default function Training() {
  return (
    <PageTransition>
      <SEO
        title="Veltrix Tech Academy – Practical Web Development Training"
        description="Learn modern web development from industry practitioners. Hands-on coding curriculum covering HTML, CSS, JavaScript, React, and portfolio projects."
        keywords="web development training Nigeria, coding academy Lagos, learn React JS, frontend developer course"
      />
      {/* Hero */}
      <section className="pt-32 pb-10 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] text-xs font-bold uppercase tracking-wider mb-6 bg-white/10 text-white border border-white/10">
                <Code2 size={14} className="text-brand-orange" />
                VELTRIX TECH ACADEMY — EDUCATION ARM
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Learn Practical Web<br />
                <span className="text-brand-blue-light">Development Skills</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                Through Veltrix Tech Academy, we help individuals learn practical digital and web development skills. Master modern frontend tools through hands-on project execution.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-300 text-xs font-semibold uppercase tracking-wider">
                  <Clock size={14} className="text-brand-orange" />
                  12 Weeks Program
                </div>
                <div className="flex items-center gap-2 text-gray-300 text-xs font-semibold uppercase tracking-wider">
                  <Users size={14} className="text-brand-orange" />
                  Small Cohort Learning
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20enquire%20about%20Web%20Development%20Training." target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-100 text-brand-navy font-semibold px-7 py-3.5 rounded-[2px] transition-colors duration-200 inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                  Enroll in Next Cohort <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>

            {/* Program Details Card */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2px]">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-2">
                  PRACTICAL LEARNING
                </div>
                <h3 className="text-white font-extrabold text-2xl mb-1">Web Development Bootcamp</h3>
                <p className="text-gray-400 text-xs mb-6">Online & Physical Training Cohorts</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-white font-black text-4xl">₦100,000</span>
                  <span className="text-gray-400 text-xs">/ complete program</span>
                </div>
                <ul className="space-y-3 mb-8 border-t border-white/10 pt-6">
                  {['12 weeks structured hands-on learning', 'Online & physical session choices', '5 real portfolio projects', 'Mentor code reviews', 'Certificate of completion', 'Lifetime developer community access'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-gray-200 text-sm">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20enquire%20about%20Web%20Development%20Training." target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-full py-3.5 rounded-[2px] transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                  <FaWhatsapp size={18} />
                  Enquire via WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">TRAINING METHODOLOGY</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Why Our Training Model Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-7 rounded-[2px] border border-gray-200 bg-brand-gray"
              >
                <div className="w-10 h-10 rounded-[2px] bg-brand-navy text-white flex items-center justify-center mb-4">
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold text-brand-navy text-lg mb-2">{f.title}</h3>
                <p className="text-brand-text text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-10 bg-brand-gray border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">LEARNING ROADMAP</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Curriculum Overview</h2>
          </motion.div>
          <div className="space-y-4">
            {curriculum.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-[2px] p-6 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">{c.phase} • {c.weeks}</span>
                    <h3 className="font-extrabold text-brand-navy text-xl">{c.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.topics.map(topic => (
                      <span key={topic} className="px-3 py-1 rounded-[2px] text-xs font-semibold bg-gray-100 text-brand-navy">{topic}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">Ready to Start Learning?</h2>
            <p className="text-brand-text text-base sm:text-lg mb-8">Contact Veltrix Tech Academy to discuss enrollment for the upcoming cohort.</p>
            <a href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20enquire%20about%20Web%20Development%20Training." target="_blank" rel="noopener noreferrer" className="bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-[2px] transition-colors duration-200 inline-flex items-center gap-2">
              <FaWhatsapp size={18} />
              Chat With Us to Enroll
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
