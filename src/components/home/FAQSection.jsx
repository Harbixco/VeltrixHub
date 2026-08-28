import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "Do I need a website if I already use WhatsApp?", a: "Yes. While WhatsApp is great for direct messaging, a website gives your business 24/7 visibility on search engines, establishes credibility with new customers, and presents your full catalogue or service details without requiring manual chat replies every time." },
  { q: "How much does a professional website cost?", a: "The cost depends on your business goals, required features, and project scope. We provide clear, transparent pricing options tailored to small businesses, growing companies, and enterprise organizations after an initial consultation." },
  { q: "How long does it take to build a website?", a: "Most business websites are built and launched within 2 to 4 weeks, depending on content availability and design complexity. We communicate realistic timelines upfront and keep you informed at every milestone." },
  { q: "Will my website work on mobile phones?", a: "Absolutely. Every website we build is fully responsive and optimized for mobile devices, ensuring fast load times and flawless viewing across smartphones, tablets, and desktop computers." },
  { q: "Can you redesign my existing website?", a: "Yes. We evaluate your current website, identify design and technical weaknesses, and rebuild it into a modern, high-converting digital platform aligned with your current business goals." },
  { q: "Do you maintain websites after launch?", a: "Yes. We offer ongoing website maintenance and support plans to keep your site updated, secure, backed up, and performing at its best." },
  { q: "Do you work with small businesses?", a: "Yes. We specialize in helping Nigerian small businesses, startups, and growing enterprises build strong digital foundations that help them compete and earn market trust." },
  { q: "Can you help with CAC registration?", a: "Yes. We assist business owners with CAC business registration to formalize their business structure and build brand legitimacy." },
  { q: "Do you provide website training?", a: "Yes. Through Veltrix Tech Academy, we offer practical, hands-on web development and digital skills training for individuals and teams." },
  { q: "How do I get started?", a: "Simply click 'Get a Free Consultation' or send us a message on WhatsApp. We will discuss your business needs, recommend the right solution, and outline clear next steps." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #ffffff 50%, #f8f9ff 100%)" }}
    >
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 mb-5">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Everything You Need to Know
          </h2>
          <p className=" hidden md: block text-base sm:text-lg text-brand-text">
            Clear, honest answers to common questions about building your online presence with Veltrix Hub.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`rounded-[6px] overflow-hidden border transition-colors duration-200 ${isOpen ? "border-brand-blue shadow-md shadow-brand-blue/10" : "border-gray-200 bg-white"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-brand-navy text-base flex items-center gap-3">
                    <HelpCircle size={17} className={`shrink-0 transition-colors duration-200 ${isOpen ? "text-brand-blue" : "text-brand-muted"}`} />
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={20} className={`shrink-0 transition-colors duration-200 ${isOpen ? "text-brand-blue" : "text-brand-muted"}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-brand-text leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
