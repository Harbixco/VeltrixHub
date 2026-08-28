import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SERVICES_LIST = [
  { num: "01", title: "Website Development", desc: "Professional websites designed to establish credibility, communicate clearly, and generate enquiries." },
  { num: "02", title: "E-Commerce Development", desc: "Online stores designed to make it easier for customers to discover, trust, and buy from your business." },
  { num: "03", title: "Website Maintenance", desc: "Keep your website secure, updated, fast, and performing properly after launch." },
  { num: "04", title: "Business Branding", desc: "Build a consistent visual identity that makes your business look professional and memorable." },
  { num: "05", title: "CAC Business Registration", desc: "Formalize your business and establish a stronger foundation for growth." },
  { num: "06", title: "Digital Consultation", desc: "Get practical guidance on the digital solutions your business actually needs." },
  { num: "07", title: "Website Training", desc: "Learn how to build and manage websites with practical, hands-on training." },
];

export default function ServicesSection() {
  return (
    <section className="relative py-10 lg:py-16 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 mb-5">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Digital Solutions Built<br className="hidden sm:inline" /> Around Your Business
          </h2>
          <p className="text-base sm:text-lg text-brand-text leading-relaxed">
            Every business is different. We recommend and build the digital solutions that make sense for your goals, customers, and stage of growth.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-100">
          {SERVICES_LIST.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="py-2 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group cursor-default"
            >
              <div className="md:col-span-1 text-xs font-black text-brand-muted">{s.num}</div>
              <div className="md:col-span-5 font-extrabold text-brand-navy text-xl sm:text-2xl group-hover:text-brand-blue transition-colors duration-200 flex items-center gap-3">
                <motion.span
                  className="inline-block w-1.5 h-6 bg-brand-blue rounded-full"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
                />
                {s.title}
              </div>
              <div className="md:col-span-5 text-sm sm:text-base text-brand-text leading-relaxed">
                {s.desc}
              </div>
              <div className="md:col-span-1 flex justify-end">
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link
                    to="/services"
                    className="w-9 h-9 rounded-full border border-gray-200 group-hover:border-brand-blue group-hover:bg-brand-blue text-brand-navy group-hover:text-white flex items-center justify-center transition-all duration-200"
                    aria-label={`Learn more about ${s.title}`}
                  >
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-brand-text text-sm">Not sure which service fits your business?</p>
          <Link
            to="/services"
            className="bg-brand-navy hover:bg-brand-blue text-white font-bold px-6 py-3 rounded-[4px] transition-all duration-200 inline-flex items-center gap-2 group text-sm"
          >
            Explore All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
