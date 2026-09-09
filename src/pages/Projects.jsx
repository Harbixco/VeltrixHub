import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageTransition from "../components/PageTransition";
import lawfirm from "../assets/lawfirm.jpg";
import translator from "../assets/translator.png";
import walexfarms from "../assets/walexfarms.webp";
import numace from "../assets/numace.webp";
import affordable from "../assets/affordable.webp";
import nimble from "../assets/nimble.jpg";
import portfolio from "../assets/portfolio.jpg";
import nimblebasa from "../assets/nimblebasa.jpg";
import korpea from "../assets/korpea.jpg";


const categories = ["All", "Website", "E-Commerce", "Training"];

const projects = [
  {
    title: "Numace Coding Academy",
    industry: "Specialized Technical & Healthcare Training",
    category: "Training",
    challenge: "An institute required a structured platform to present professional coding courses and enroll candidates.",
    solution: "Developed an educational web platform with course outlines, schedules, and registration workflows.",
    outcome: "Streamlined student course inquiries and online program enrollments.",
    image: numace,
    tags: ["Education Portal", "Course Catalog", "Registration"],
    link: "https://numaceproject.vercel.app/",
  },
  {
    title: "Sterling Chambers",
    industry: "Legal Services & Commercial Litigation",
    category: "Website",
    challenge: "The firm needed an authoritative digital presence to communicate specialized litigation expertise and attract commercial clients.",
    solution: "We engineered a prestigious corporate legal platform with practice area overviews, attorney highlights, and direct consultation scheduling.",
    outcome: "Enhanced corporate credibility and streamlined qualified client inquiries for high-stakes dispute resolution.",
    image: lawfirm,
    tags: ["React", "Legal Platform", "UI/UX"],
    link: "https://law-firm-blush.vercel.app/",
  },
  {
    title: "Walex Farms & Agro-Services",
    industry: "Commercial Agriculture",
    category: "Website",
    challenge: "The business needed a professional online presence to clearly communicate its commercial farming services.",
    solution: "We created a modern website that presents the business professionally and makes it easy to understand operations.",
    outcome: "Established online credibility and clear channels for corporate agricultural buyer enquiries.",
    image: walexfarms,
    tags: ["Web Development", "Responsive Design", "AgriTech"],
    link: "https://agrowalexfarms.vercel.app/",
  },
  {
    title: "NimbleByte Global",
    industry: "Enterprise Technology Solutions",
    category: "Website",
    challenge: "Corporate clients questioned service offerings due to an outdated web presence.",
    solution: "We created a modern corporate website that presents technical services with authority.",
    outcome: "Established immediate enterprise credibility and streamlined B2B proposal discussions.",
    image: nimble,
    tags: ["React", "Corporate Website", "UI/UX"],
    link: "https://nimble-byte.com/",
  },
  {
    title: "Affordable Gadgets Hub",
    industry: "Consumer Electronics Retail",
    category: "E-Commerce",
    challenge: "The brand needed an online showcase to display available gadgets with price transparency.",
    solution: "Designed an e-commerce catalog enabling buyers to inspect product specifications and order.",
    outcome: "Boosted customer confidence and reduced routine price inquiry messages.",
    image: affordable,
    tags: ["React", "E-Commerce", "Product Catalog"],
    link: "https://affordablegadgetshub.vercel.app/",
  },
  {
    title: "Nimblebasa Technologies",
    industry: "Digital Tools & Productivity",
    category: "Website",
    challenge: "Users needed a fast, clean interface for converting text across multiple languages in real-time.",
    solution: "Engineered a lightweight web tool leveraging translation APIs with an intuitive UI.",
    outcome: "Provided an easy-to-use utility for multilingual users and students.",
    image: nimblebasa,
    tags: ["React", "Web App", "API Integration"],
    link: "https://language-translators-zeta.vercel.app/",
  },
  {
    title: "Portfolio Website",
    industry: "Portfolio",
    category: "Website",
    challenge: "I needed a website to showcase my work and services.",
    solution: "I created a professional portfolio website to display my projects and services.",
    outcome: "I have a professional website to showcase my work and services.",
    image: portfolio,
    tags: ["React", "Web App", "Portfolio"],
    link: "https://hagiostech.vercel.app/",
  },
  {
    title: "Language Translator System",
    industry: "Digital Tools & Productivity",
    category: "Website",
    challenge: "Users needed a fast, clean interface for converting text across multiple languages in real-time.",
    solution: "Engineered a lightweight web tool leveraging translation APIs with an intuitive UI.",
    outcome: "Provided an easy-to-use utility for multilingual users and students.",
    image: translator,
    tags: ["React", "Web App", "API Integration"],
    link: "https://language-translators-zeta.vercel.app/",
  },
  {
    title: "Korpea Technologies",
    industry: "Company Website",
    category: "Website",
    challenge: "Korpea an emerging beauty and skincare brand needed a modern, aesthetic-driven e-commerce platform to launch their products.",
    solution: "We created a modern corporate website that presents technical services with authority.",
    outcome: "Established immediate enterprise credibility and streamlined B2B proposal discussions.",
    image: korpea,
    tags: ["React", "Corporate Website", "UI/UX"],
    link: "https://korpeatech.com/",
  },
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-10 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              OUR PORTFOLIO
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Work That Solves<br className="hidden sm:inline" /> Real Business Problems
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore digital solutions we have built to help businesses build credibility, establish market trust, and generate real opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-10 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all duration-200 ${active === cat
                  ? "bg-brand-navy text-white"
                  : "bg-white text-brand-navy hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white rounded-[2px] border border-gray-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-[16/9] relative overflow-hidden bg-slate-950 border-b border-gray-100 group flex items-center justify-center"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 bg-white text-brand-navy text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-[2px]">
                          View Project <ExternalLink size={14} />
                        </span>
                      </div>
                    </a>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
                        <span>{p.category}</span>
                        <span className="text-brand-blue">{p.industry}</span>
                      </div>

                      <h3 className="font-extrabold text-brand-navy text-xl mb-4">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-blue transition-colors"
                        >
                          {p.title}
                        </a>
                      </h3>

                      <div className="space-y-2.5 text-xs text-brand-text mb-6 bg-gray-50 p-4 border border-gray-200 rounded-[2px]">
                        <div>
                          <span className="font-bold text-brand-navy block">Challenge:</span>
                          <p>{p.challenge}</p>
                        </div>
                        <div>
                          <span className="font-bold text-brand-navy block">Solution:</span>
                          <p>{p.solution}</p>
                        </div>
                        <div>
                          <span className="font-bold text-brand-blue block">Outcome:</span>
                          <p className="font-semibold text-brand-navy">{p.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-100 mt-auto flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase bg-gray-100 text-brand-navy"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase text-brand-navy hover:text-brand-blue inline-flex items-center gap-1 shrink-0 ml-2"
                    >
                      View <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-4">
              Ready to Solve Your Online Growth Challenge?
            </h2>
            <p className="text-brand-text text-base sm:text-lg mb-8">
              Let's build a professional digital solution tailored to your business goals.
            </p>
            <a
              href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20discuss%20getting%20my%20business%20online."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-[2px] transition-colors duration-200 inline-flex items-center gap-2"
            >
              Get a Free Consultation <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
