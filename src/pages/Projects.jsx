import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageTransition from "../components/PageTransition";

import dove from "../assets/dove.webp";
import translator from "../assets/translator.png";
import walexfarms from "../assets/walexfarms.webp";
import numace from "../assets/numace.webp";
import affordable from "../assets/affordable.webp";
import trashcycle from "../assets/trashcycle.png";
import nimble from "../assets/nimble.jpg";
import nimblebasa from "../assets/nimblebasa.jpg";
import portfolio from "../assets/portfolio.webp";

const categories = ["All", "Website", "E-Commerce", "Branding", "Training"];

const projects = [
  {
    title: "FindAll Online Store",
    industry: "Electronics Retail",
    category: "E-Commerce",
    challenge: "The business relied on manual social chats, making inventory updates and transaction processing slow.",
    solution: "We built a full-featured e-commerce portal with product catalog, cart system, and Paystack checkout.",
    outcome: "Created a 24/7 automated sales channel that processes buyer orders nationwide.",
    image: dove,
    tags: ["React", "E-Commerce", "Paystack"],
    link: "https://dove-five.vercel.app/",
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
    title: "Walex Farms & Agro-Services",
    industry: "Commercial Agriculture",
    category: "Website",
    challenge: "The business needed a professional online presence to clearly communicate its commercial farming services.",
    solution: "We created a modern website that presents the business professionally and makes it easy to understand operations.",
    outcome: "Established online credibility and clear channels for corporate agricultural buyer enquiries.",
    image: walexfarms,
    tags: ["Web Development", "Responsive Design", "Forms"],
    link: "https://agrowalexfarms.vercel.app/",
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
    title: "Numace Coding Academy",
    industry: "Specialized Medical Education",
    category: "Training",
    challenge: "An institute required a structured platform to present clinical coding courses and enroll candidates.",
    solution: "Developed an educational web platform with course outlines, schedules, and registration workflows.",
    outcome: "Streamlined student course inquiries and online program enrollments.",
    image: numace,
    tags: ["Education Portal", "Course Catalog", "Forms"],
    link: "https://numaceproject.vercel.app/",
  },
  {
    title: "Affordable Gadgets Hub",
    industry: "Consumer Electronics Retail",
    category: "E-Commerce",
    challenge: "The brand needed an online showcase to display available gadgets with price transparency.",
    solution: "Designed an e-commerce catalog enabling buyers to inspect product specifications and order.",
    outcome: "Boosted customer confidence and reduced routine price inquiry messages.",
    image: affordable,
    tags: ["React", "E-Commerce", "Payments"],
    link: "https://affordablegadgetshub.vercel.app/",
  },
  {
    title: "Trashcycle",
    industry: "Environmental Sustainability",
    category: "Website",
    challenge: "An initiative needed to raise public awareness and accept recycling drop-off requests.",
    solution: "Created an engaging informational platform outlining recycling benefits and drop-off points.",
    outcome: "Increased community engagement and digitized pickup request handling.",
    image: trashcycle,
    tags: ["React", "Sustainability", "UI Design"],
    link: "https://trashcycle.vercel.app/",
  },
  {
    title: "Nimblebash Event Platform",
    industry: "Event Management & Hospitality",
    category: "E-Commerce",
    challenge: "Event hosts and guests needed an organized onboarding portal to manage invitations and access.",
    solution: "Built a customized event onboarding system with host registration and guest tools.",
    outcome: "Simplified event coordination and guest registration for corporate and private functions.",
    image: nimblebasa,
    tags: ["Custom Portal", "Onboarding", "Web App"],
    link: "https://nimblebash.com/onboarding",
  },
  {
    title: "Software Developer Portfolio",
    industry: "Professional Services",
    category: "Branding",
    challenge: "A software specialist needed a brand showcase to pitch international contract work.",
    solution: "Designed a clean portfolio website highlighting code repositories, skills, and past work.",
    outcome: "Secured a professional showcase for remote contract opportunities.",
    image: portfolio,
    tags: ["Branding", "Portfolio", "Minimal Design"],
    link: "https://hagiostech.vercel.app/",
  },
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-navy text-white relative overflow-hidden">
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
      <section className="py-20 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  active === cat
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
                      className="block aspect-[16/10] relative overflow-hidden bg-slate-100 border-b border-gray-100 group"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
      <section className="py-20 bg-white">
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
