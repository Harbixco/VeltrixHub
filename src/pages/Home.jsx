import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, Globe, ShoppingCart, FileText, Code2, Wrench,
  Palette, Star, CheckCircle2, Quote, ChevronRight, Zap, Shield,
  Clock, HeartHandshake, TrendingUp, DollarSign, Play, Users,
  BookOpen, Briefcase, Award, MessageCircle, Phone, Mail,
  Sparkles, Target, Rocket
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useCounter } from '../components/useCounter'

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden mesh-bg noise-overlay">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(26,62,189,0.25) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,93,4,0.2) 0%, transparent 70%)' }}
        />
        {/* Floating geometric shapes */}
        {[
          { w: 60, h: 60, top: '15%', left: '10%', delay: 0 },
          { w: 40, h: 40, top: '60%', left: '5%', delay: 1 },
          { w: 50, h: 50, top: '25%', right: '8%', delay: 2 },
          { w: 35, h: 35, top: '70%', right: '15%', delay: 0.5 },
          { w: 25, h: 25, top: '45%', left: '20%', delay: 1.5 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-xl border border-white/10"
            style={{ width: shape.w, height: shape.h, top: shape.top, left: shape.left, right: shape.right }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
          />
        ))}
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/20"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
          >
            <Sparkles size={14} className="text-brand-orange" />
            <span className="text-white/80 text-sm font-medium">Nigeria's Premium Digital Agency</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
          >
            We Build{' '}
            <span className="relative inline-block">
              <span className="gradient-text">Digital Solutions</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                className="absolute bottom-1 left-0 right-0 h-1 rounded-full origin-left"
                style={{ background: 'linear-gradient(90deg, #1a3ebd, #e85d04)' }}
              />
            </span>
            <br />
            That Help{' '}
            <span className="text-brand-orange">Businesses</span>
            <br />
            <span className="text-white/80">Grow.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
          >
            From business registration to professional websites and digital skills training, we help entrepreneurs build stronger brands and grow faster.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange group">
              Get Started
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link to="/services" className="btn-ghost text-white border-white/30 hover:bg-white/10 hover:border-white/50">
              View Our Services
            </Link>
          </motion.div>

          {/* Quick trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {['✦ Website Development', '✦ E-Commerce', '✦ CAC Registration', '✦ Web Training'].map((item) => (
              <span key={item} className="text-white/50 text-sm font-medium">{item}</span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

// ─── STATS ───────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, color }) {
  const { count, ref } = useCounter(value, 2000)
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl font-black counter-num mb-2" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
    </div>
  )
}

function Stats() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(26,62,189,0.03) 0%, transparent 70%)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16"
        >
          {[
            { value: 120, suffix: '+', label: 'Businesses Supported', color: '#1a3ebd' },
            { value: 95, suffix: '+', label: 'Projects Completed', color: '#e85d04' },
            { value: 200, suffix: '+', label: 'Students Trained', color: '#1a3ebd' },
            { value: 3, suffix: '+', label: 'Years of Experience', color: '#e85d04' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const servicesList = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Beautiful, fast, and conversion-focused websites that make a lasting impression and drive real business results.',
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Development',
    desc: 'Powerful online stores built to sell. We create seamless shopping experiences that convert visitors into customers.',
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
  {
    icon: FileText,
    title: 'CAC Business Registration',
    desc: 'Register your business quickly and professionally. We handle all the paperwork so you can focus on building.',
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: Code2,
    title: 'Web Development Training',
    desc: 'Learn modern web development with hands-on projects. Online and physical classes available for all skill levels.',
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    desc: 'Keep your website fast, secure, and up-to-date with our reliable maintenance and support services.',
    color: '#1a3ebd',
    bg: 'rgba(26,62,189,0.06)',
  },
  {
    icon: Palette,
    title: 'Corporate Branding',
    desc: 'From logos to full brand identities, we craft visual identities that communicate your values with impact.',
    color: '#e85d04',
    bg: 'rgba(232,93,4,0.06)',
  },
]

function Services() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-tag">
            <Zap size={14} />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-4">
            Everything Your Business{' '}
            <span className="gradient-text">Needs to Thrive</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            A full suite of digital solutions designed to help your business establish, grow, and dominate online.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="service-card group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: s.bg }}
              >
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <h3 className="text-brand-navy font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                style={{ color: s.color }}
              >
                Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${s.bg} 0%, transparent 60%)` }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/services" className="btn-primary">
            View All Services <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
const strengths = [
  { icon: Palette, title: 'Modern Design', desc: 'Pixel-perfect designs that look stunning on every device and screen size.' },
  { icon: Shield, title: 'Mobile Responsive', desc: 'Every project is built mobile-first, ensuring flawless experiences everywhere.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'We move with urgency. Get your projects delivered on time, every time.' },
  { icon: HeartHandshake, title: 'Reliable Support', desc: 'We\'re here for you post-launch with responsive, dedicated support.' },
  { icon: TrendingUp, title: 'Growth Focused', desc: 'Everything we build is designed to help your business grow and convert.' },
  { icon: DollarSign, title: 'Affordable Solutions', desc: 'Premium quality at prices that make sense for Nigerian businesses.' },
]

function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(232,93,4,0.04) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-tag">
              <Target size={14} />
              Why Veltrix Hub?
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-6">
              The Partner Your<br />
              <span className="gradient-text">Business Deserves</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              We're not just a service provider — we're your digital growth partner. Every decision we make is centered around helping your business succeed online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start a Project <ArrowRight size={18} />
              </a>
              <Link to="/about" className="btn-ghost text-brand-navy border-gray-200 hover:border-brand-blue hover:text-brand-blue">
                Learn About Us
              </Link>
            </div>
          </motion.div>

          {/* Right - grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <s.icon size={18} className="text-white" />
                </div>
                <h4 className="font-bold text-brand-navy text-sm mb-1">{s.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const projects = [
  { title: 'E-Commerce Store', category: 'Web Development', color: '#1a3ebd', gradient: 'from-blue-600 to-blue-800' },
  { title: 'Corporate Brand Identity', category: 'Branding', color: '#e85d04', gradient: 'from-orange-500 to-red-600' },
  { title: 'Business Portfolio Site', category: 'Website Development', color: '#1a3ebd', gradient: 'from-indigo-600 to-blue-700' },
  { title: 'Restaurant Website', category: 'Web Development', color: '#e85d04', gradient: 'from-orange-600 to-amber-600' },
  { title: 'NGO Web Platform', category: 'Website Development', color: '#1a3ebd', gradient: 'from-blue-700 to-indigo-800' },
  { title: 'Fashion Brand Store', category: 'E-Commerce', color: '#e85d04', gradient: 'from-rose-500 to-orange-600' },
]

function Projects() {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/10 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Briefcase size={14} />
            Featured Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Work We're{' '}
            <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Proud Of
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A glimpse into our portfolio of digital work delivered for businesses across Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Mock browser UI */}
              <div className="aspect-[4/3] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-80`} />
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 flex items-center px-3 gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                  <div className="ml-3 flex-1 h-4 rounded-full bg-white/10" />
                </div>
                {/* Mock content lines */}
                <div className="absolute inset-0 top-10 p-6 flex flex-col gap-3">
                  <div className="h-6 w-3/4 rounded-lg bg-white/20" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-5/6 rounded bg-white/10" />
                  <div className="h-3 w-4/6 rounded bg-white/10" />
                  <div className="mt-2 h-8 w-28 rounded-full bg-white/25" />
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[1,2,3].map(n => <div key={n} className="aspect-square rounded-xl bg-white/10" />)}
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-widest mb-1 block" style={{ color: p.color }}>{p.category}</span>
                <h3 className="text-white font-bold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/projects" className="btn-primary">
            View All Projects <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── TRAINING ────────────────────────────────────────────────────────────────
const trainingFeatures = [
  { icon: BookOpen, title: 'Beginner Friendly', desc: 'No experience required. Start from zero.' },
  { icon: Globe, title: 'Online & Physical', desc: 'Learn from anywhere or attend in person.' },
  { icon: Code2, title: 'Practical Projects', desc: 'Build real projects you can show employers.' },
  { icon: Users, title: 'Mentorship', desc: 'One-on-one guidance from experienced devs.' },
  { icon: Award, title: 'Certificate', desc: 'Earn a recognized completion certificate.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'Job placement support and career advice.' },
]

function TrainingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-tag">
              <Code2 size={14} />
              Web Dev Training
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-5">
              Launch Your{' '}
              <span className="gradient-text">Tech Career</span>
              <br />With Veltrix Hub
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Our practical web development training prepares you for the real world. Learn HTML, CSS, JavaScript, React, and more — with hands-on projects and expert mentors.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {trainingFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center flex-shrink-0">
                    <f.icon size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-navy">{f.title}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/training" className="btn-primary">
              Enroll Now <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Right - visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #050f2c 0%, #0a1a45 100%)' }}>
              {/* Code mock */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-white/30 text-xs font-mono">index.jsx</span>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div><span className="text-blue-400">import</span> <span className="text-white">React</span> <span className="text-blue-400">from</span> <span className="text-green-400">'react'</span></div>
                  <div className="h-2" />
                  <div><span className="text-blue-400">function</span> <span className="text-yellow-300">MyFirstApp</span><span className="text-white">() {'{'}</span></div>
                  <div className="ml-4"><span className="text-blue-400">return</span> <span className="text-white">(</span></div>
                  <div className="ml-8"><span className="text-orange-400">&lt;div</span> <span className="text-green-300">className</span><span className="text-white">=</span><span className="text-green-400">"hero"</span><span className="text-orange-400">&gt;</span></div>
                  <div className="ml-12"><span className="text-orange-400">&lt;h1&gt;</span><span className="text-white">Hello World!</span><span className="text-orange-400">&lt;/h1&gt;</span></div>
                  <div className="ml-8"><span className="text-orange-400">&lt;/div&gt;</span></div>
                  <div className="ml-4"><span className="text-white">)</span></div>
                  <div><span className="text-white">{'}'}</span></div>
                  <div className="h-2" />
                  <div><span className="text-blue-400">export default</span> <span className="text-yellow-300">MyFirstApp</span></div>
                </div>
                {/* Cursor blink */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-brand-orange ml-1 mt-2"
                />
              </div>
              {/* Bottom bar */}
              <div className="px-8 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/40 text-xs font-mono">React • 50+ Students Enrolled</span>
                <span className="text-green-400 text-xs font-medium">● Live Class Available</span>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-5 glass-card px-4 py-3 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-navy">Certificate Included</div>
                  <div className="text-xs text-gray-500">Upon completion</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── CAC SECTION ─────────────────────────────────────────────────────────────
function CACSection() {
  const steps = [
    { n: '01', title: 'Consultation', desc: 'We discuss your business type and registration needs.' },
    { n: '02', title: 'Documentation', desc: 'We handle all the required forms and paperwork.' },
    { n: '03', title: 'Submission', desc: 'We submit your application to the CAC portal.' },
    { n: '04', title: 'Certificate', desc: 'You receive your official business registration certificate.' },
  ]
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="section-tag">
            <FileText size={14} />
            CAC Registration
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-4">
            Make Your Business{' '}
            <span className="gradient-text">Legally Official</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We make CAC business registration fast, easy, and stress-free. Get your business registered in days, not weeks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-0.5 z-10" style={{ background: 'linear-gradient(90deg, #1a3ebd, #e85d04)' }} />
              )}
              <div className="text-4xl font-black mb-4" style={{ color: i % 2 === 0 ? 'rgba(26,62,189,0.12)' : 'rgba(232,93,4,0.12)' }}>
                {s.n}
              </div>
              <h3 className="font-bold text-brand-navy mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange">
            Register My Business <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Adaeze Okonkwo',
    role: 'Founder, StyleByAda',
    text: 'Veltrix Hub built our online store and the results have been amazing. Sales tripled in the first month! The team is professional and delivered beyond our expectations.',
    rating: 5,
  },
  {
    name: 'Emeka Chukwu',
    role: 'CEO, TechStartNG',
    text: 'From CAC registration to building our company website, Veltrix Hub handled everything seamlessly. Their attention to detail and professionalism is top-notch.',
    rating: 5,
  },
  {
    name: 'Fatima Bello',
    role: 'Graduate, Web Dev Training',
    text: 'The web development training changed my life. Within 3 months, I landed my first developer job. The mentorship and practical projects made all the difference.',
    rating: 5,
  },
  {
    name: 'Chukwuemeka Eze',
    role: 'Owner, Eze Farms',
    text: 'Professional, affordable, and they delivered exactly what I envisioned. My farm business now has a beautiful website that clients love. Highly recommended!',
    rating: 5,
  },
]

function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,62,189,0.03) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="section-tag">
            <Star size={14} />
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-navy mb-4">
            Trusted by{' '}
            <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Don't just take our word for it — hear what our clients have to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <Quote size={36} className="text-brand-blue/10 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-brand-orange fill-current" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-brand-navy text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
              {/* Accent line */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: 'linear-gradient(90deg, #1a3ebd, #e85d04)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050f2c 0%, #0a1a45 60%, #1a1a4e 100%)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-white/5"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #1a3ebd, transparent)' }} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Rocket size={14} />
            Ready to grow?
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Take Your<br />
            <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Business Online?
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Join 120+ businesses that have trusted Veltrix Hub to power their digital presence. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/2349039415354" target="_blank" rel="noopener noreferrer" className="btn-orange group">
              Let's Talk
              <MessageCircle size={18} className="transition-transform group-hover:rotate-12" />
            </a>
            <a href="mailto:Officialveltrixhub@gmail.com" className="btn-ghost text-white border-white/20 hover:bg-white/10">
              <Mail size={18} />
              Send Email
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: Phone, text: '+234 903 941 5354' },
              { icon: Mail, text: 'Officialveltrixhub@gmail.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
                <Icon size={14} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Projects />
      <TrainingSection />
      <CACSection />
      <Testimonials />
      <CTA />
    </PageTransition>
  )
}
