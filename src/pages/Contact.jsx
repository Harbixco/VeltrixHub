import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import PageTransition from '../components/PageTransition'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hello Veltrix Hub! 👋\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`
    )
    window.open(`https://wa.me/2349039415354?text=${msg}`, '_blank')
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }, 5000)
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'Officialveltrixhub@gmail.com', href: 'mailto:Officialveltrixhub@gmail.com', color: '#1a3ebd' },
    { icon: Phone, label: 'Phone / WhatsApp', value: '+234 903 941 5354', href: 'https://wa.me/2349039415354', color: '#e85d04' },
    { icon: MapPin, label: 'Location', value: 'Nigeria', href: '#', color: '#1a3ebd' },
  ]

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <MessageCircle size={14} />
              Contact Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              Let's Start a{' '}
              <span style={{ background: 'linear-gradient(135deg, #2d55e0, #e85d04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Conversation
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Ready to grow your business online? Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: contact info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-brand-navy mb-2">Get In Touch</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We respond to all messages within 24 hours. For urgent matters, WhatsApp is the fastest way to reach us.
                </p>
              </div>

              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ background: `${info.color}15` }}>
                    <info.icon size={20} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{info.label}</div>
                    <div className="font-semibold text-brand-navy text-sm break-all">{info.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2349039415354"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 rounded-2xl text-white font-semibold transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <MessageCircle size={20} />
                Chat on WhatsApp Now
              </a>

              {/* Social */}
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue hover:shadow-md transition-all">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-brand-navy mb-6">Send Us a Message</h3>

                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">Message Sent!</h4>
                    <p className="text-gray-500">We've opened WhatsApp with your message. We'll respond as soon as possible!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          name="name" value={form.name} onChange={handleChange} required
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                        <input
                          name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+234 xxx xxx xxxx"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Interested In</label>
                        <select
                          name="service" value={form.service} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm transition-all bg-white"
                        >
                          <option value="">Select a service</option>
                          <option>Website Development</option>
                          <option>E-Commerce Development</option>
                          <option>CAC Registration</option>
                          <option>Web Dev Training</option>
                          <option>Website Maintenance</option>
                          <option>Corporate Branding</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message *</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange} required rows={5}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 text-sm transition-all resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send size={18} />
                      Send Message via WhatsApp
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      By submitting, you'll be redirected to WhatsApp to confirm. We respond within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
