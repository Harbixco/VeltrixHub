import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Briefcase } from "lucide-react";
import PageTransition from "../components/PageTransition";

// ─── REAL IMAGE ASSET IMPORTS ────────────────────────────────────────────────
import dove from "../assets/dove.png";
import translator from "../assets/translator.png";
import korpea from "../assets/korpea.jpg";
import numace from "../assets/numace.png";
import affordable from "../assets/affordable.png";
import trashcycle from "../assets/trashcycle.png";
import nimble from "../assets/nimble.jpg";
import nimblebasa from "../assets/nimblebasa.jpg";
import portfolio from "../assets/portfolio.png";

const categories = ["All", "Website", "E-Commerce", "Branding", "Training"];

// Added unique destination links for each specific project item
const projects = [
  {
    title: "FindAll Online Store",
    category: "E-Commerce",
    desc: "Electronics e-commerce store with product catalog, cart, and Paystack checkout integration.",
    image: dove,
    tags: ["React", "E-Commerce", "Paystack"],
    link: "https://dove-five.vercel.app/", // Replace with real live URL
  },
  {
    title: "Language Translator System",
    category: "Website",
    desc: "Web app for translating text between multiple languages in real-time",
    image: translator,
    tags: ["React", "Framer Motion", "CMS"],
    link: "https://language-translators-zeta.vercel.app/",
  },
  {
    title: "Korpea Technologies",
    category: "Website",
    desc: "Corporate website for showcasing tech services and solutions.",
    image: korpea,
    tags: ["HTML/CSS", "JavaScript", "Forms"],
    link: "https://korpeatech.com/",
  },
  {
    title: "Numace Coding Academy",
    category: "Training",
    desc: "A specialized clinical coding training and workforce-development institute .",
    image: numace,
    tags: ["HTML/CSS", "JavaScript", "Forms"],
    link: "https://numaceproject.vercel.app/", // Can point to Behance/Drive/Portfolio links
  },
  {
    title: "Affordable Hub",
    category: "E-Commerce",
    desc: "E-commerce platform for browsing and purchasing affordable gadgets",
    image: affordable,
    tags: ["React", "Node.js", "Payments"],
    link: "https://affordablegadgetshub.vercel.app/",
  },
  {
    title: "Trashcycle",
    category: "Website",
    desc: "Recycling and waste management awareness platform.",
    image: trashcycle,
    tags: ["React", "Animations", "Portfolio"],
    link: "https://trashcycle.vercel.app/",
  },
  {
    title: "Nimblebyte Global",
    category: "Website",
    desc: "Responsive business website for a tech solutions company.",
    image: nimble,
    tags: ["React", "LMS", "Dashboard"],
    link: "https://nimble-byte.com/", // Can link internally to your local route
  },
  {
    title: "Nimblebash",
    category: "E-Commerce",
    desc: "A Event platform with host & guest onboarding system.",
    image: nimblebasa,
    tags: ["Shopify", "Custom Theme", "Logistics"],
    link: "https://nimblebash.com/onboarding",
  },
  {
    title: "Porfolio",
    category: "Branding",
    desc: "Personal portfolio for a software developer.",
    image: portfolio,
    tags: ["Rebrand", "Logo", "Stationery"],
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
      <section className="pt-32 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/15 text-white/60"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <Briefcase size={14} />
              Our Portfolio
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              Work We're{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #2d55e0, #e85d04)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Proud Of
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Every project tells a story of transformation. Here's how we've
              helped businesses across Nigeria grow online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === cat
                    ? "text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:text-brand-blue hover:bg-blue-50 border border-gray-200"
                }`}
                style={
                  active === cat
                    ? {
                        background: "linear-gradient(135deg, #1a3ebd, #2d55e0)",
                        boxShadow: "0 8px 24px rgba(26,62,189,0.3)",
                      }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                // Determine whether to use external <a> or an internal link configuration if needed
                const isExternal = p.link.startsWith("http");

                return (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 group cursor-pointer"
                  >
                    {/* Wrap the clickable image structure with the project link */}
                    <a
                      href={p.link}
                      target={isExternal ? "_blank" : "_self"}
                      rel={isExternal ? "noopener noreferrer" : ""}
                      className="block aspect-[16/10] relative overflow-hidden bg-slate-900"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />

                      {/* Shadow overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                      {/* Hover overlay with dynamic text response */}
                      <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white text-sm font-semibold bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                          <ExternalLink size={14} />
                          View Project
                        </div>
                      </div>
                    </a>

                    {/* Info */}
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-1 block">
                        {p.category}
                      </span>
                      <h3 className="font-black text-brand-navy mb-2 text-lg">
                        <a
                          href={p.link}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : ""}
                          className="hover:text-brand-blue transition-colors"
                        >
                          {p.title}
                        </a>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 h-12 line-clamp-2">
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mb-4">
              Want a Project Like These?
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Let's discuss your vision and build something extraordinary
              together.
            </p>
            <a
              href="https://wa.me/2349039415354"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Start Your Project <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
