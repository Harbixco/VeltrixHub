import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Globe, ShoppingCart, FileText, Code2, Wrench, Palette, HelpCircle,
  CheckCircle2, ArrowRight
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const servicesList = [
  {
    icon: Globe,
    title: "Website Development",
    whoFor: "Businesses needing a strong online presence to earn trust and generate leads.",
    problem: "Without a professional website, potential customers cannot verify your credibility online.",
    outcome: "A modern, mobile-optimized website that communicates your value and attracts enquiries.",
    features: ["Custom responsive layout", "SEO setup & Google visibility", "Fast loading speeds", "Contact & enquiry forms", "SSL & security configuration"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    whoFor: "Retailers, brands, and product sellers looking to sell directly to customers nationwide.",
    problem: "Relying strictly on manual chats limits sales volume and creates friction for buyers.",
    outcome: "An online store that allows customers to discover, trust, and purchase your products 24/7.",
    features: ["Product catalog & categories", "Paystack & payment gateway setup", "Shopping cart & checkout", "Mobile-friendly store experience", "Order management workflow"],
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    whoFor: "Businesses with existing websites that need regular care and technical updates.",
    problem: "Neglected websites become slow, outdated, vulnerable to hacks, and lose search ranking.",
    outcome: "Your website stays secure, fast, backed up, and updated without taking up your time.",
    features: ["Content updates & changes", "Security monitoring & patches", "Performance & speed optimization", "Regular backups & recovery", "Technical glitch fixes"],
  },
  {
    icon: Palette,
    title: "Business Branding",
    whoFor: "New or expanding businesses wanting a consistent, credible visual identity.",
    problem: "Inconsistent logos and unpolished visuals make your business look amateurish.",
    outcome: "A memorable visual identity that presents your brand professionally across all channels.",
    features: ["Logo design & variations", "Brand identity guidelines", "Business cards & stationery", "Social media templates", "Brand messaging alignment"],
  },
  {
    icon: FileText,
    title: "CAC Business Registration",
    whoFor: "Entrepreneurs looking to formalize their business and open corporate accounts.",
    problem: "Operating an unregistered business limits corporate contracts and customer confidence.",
    outcome: "Full business formalization providing an official foundation for growth.",
    features: ["Business name search", "CAC documentation filing", "Certificate collection", "Clear status updates", "Post-registration guidance"],
  },
  {
    icon: HelpCircle,
    title: "Digital Consultation",
    whoFor: "Business owners unsure which digital solutions make practical sense for their stage.",
    problem: "Wasting money on complex digital tools that do not fit actual business needs.",
    outcome: "Actionable guidance on the exact digital systems required to reach your goals.",
    features: ["Digital presence assessment", "Goal & requirement analysis", "Practical solution roadmap", "Tech stack recommendation", "Clear next steps action plan"],
  },
  {
    icon: Code2,
    title: "Website Training",
    whoFor: "Individuals and team members seeking practical, hands-on web development skills.",
    problem: "Theoretical tutorials that do not teach real-world application or job skills.",
    outcome: "Practical engineering skills delivered through hands-on project building.",
    features: ["HTML, CSS & JavaScript", "React framework training", "Hands-on practical projects", "Experienced mentor guidance", "Veltrix Tech Academy certificate"],
  },
]

export default function Services() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              DIGITAL SOLUTIONS FOR BUSINESSES
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Digital Solutions Built<br className="hidden sm:inline" /> Around Your Business
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Every business is different. We recommend and build the digital solutions that make sense for your goals, customers, and stage of growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {servicesList.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-200 p-8 rounded-[2px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-4">
                  <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-[2px] flex items-center justify-center mb-4">
                    <s.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-brand-navy mb-3">
                    {s.title}
                  </h2>
                  <div className="space-y-3 text-sm text-brand-text mb-6">
                    <div>
                      <span className="font-bold text-brand-navy block">Who it is for:</span>
                      <p>{s.whoFor}</p>
                    </div>
                    <div>
                      <span className="font-bold text-brand-navy block">Problem it solves:</span>
                      <p>{s.problem}</p>
                    </div>
                    <div>
                      <span className="font-bold text-brand-blue block">Business outcome:</span>
                      <p className="font-semibold text-brand-navy">{s.outcome}</p>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-[2px] transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    Get a Free Consultation
                    <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="lg:col-span-8 bg-gray-50 p-6 border border-gray-200 rounded-[2px]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-navy mb-4">
                    Key Features & Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-brand-text">
                        <CheckCircle2 size={16} className="text-brand-blue shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-brand-text text-base sm:text-lg mb-8">Let's talk about your business and find the right digital solution.</p>
            <Link to="/contact" className="bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-[2px] transition-colors duration-200 inline-flex items-center justify-center gap-2">
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
