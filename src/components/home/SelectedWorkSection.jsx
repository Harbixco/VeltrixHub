import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import lawfirm from "../../assets/lawfirm.jpg";
import nimble from "../../assets/nimble.jpg";
import walexfarms from "../../assets/walexfarms.webp";


const PROJECTS = [
  {
    img: lawfirm,
    alt: "Sterling Chambers Legal Services & Litigation Website",
    industry: "Legal Services & Commercial Litigation",
    title: "Sterling Chambers",
    challenge:
      "Needed an authoritative digital presence to communicate specialized litigation practice areas and build client trust.",
    solution:
      "Engineered a distinguished corporate legal website featuring structured practice overviews and seamless consultation scheduling.",
    outcome:
      "Established strong market authority for commercial dispute resolution, driving qualified corporate client consultations.",
    href: "https://law-firm-blush.vercel.app/",
    accent: "#1a3ebd",
    layout: "left",
  },
  {
    img: nimble,
    alt: "NimbleByte Global Corporate Website",
    industry: "Technology & IT Services",
    title: "NimbleByte Global",
    challenge:
      "Corporate clients questioned service offerings due to an outdated web presence.",
    solution:
      "Designed a modern corporate website communicating enterprise technology solutions.",
    outcome:
      "Established immediate corporate authority and streamlined B2B client proposals.",
    href: "https://nimble-byte.com/",
    accent: "#7c3aed",
    layout: "right",
  },
  {
    img: walexfarms,
    alt: "Walex Farms & Agro-Services",
    industry: "Commercial Agriculture",
    title: "Walex Farms & Agro-Services",
    challenge:
      "Needed a digital presence to clearly present farming operations and corporate agricultural services.",
    solution:
      "Created a clean agricultural website highlighting operations, produce, and partnership options.",
    outcome:
      "Positioned the farm as a reputable partner for commercial food distributors and institutional buyers.",
    href: "https://agrowalexfarms.vercel.app/",
    accent: "#059669",
    layout: "left",
  },
];

function CaseRow({ project }) {
  const isLeft = project.layout === "left";

  const imgCol = (
    <div className="lg:col-span-7">
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -24 : 24,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[8px] group cursor-pointer"
        style={{
          boxShadow: "0 4px 24px rgba(5,15,44,0.1)",
        }}
      >
        <img
          src={project.img}
          alt={project.alt}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ExternalLink size={15} />
            View Live Project
          </a>
        </div>
      </motion.div>
    </div>
  );

  const textCol = (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? 24 : -24,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: 0.1,
      }}
      className="lg:col-span-5"
    >
      <span
        className="text-xs font-bold uppercase tracking-widest mb-2 block"
        style={{ color: project.accent }}
      >
        {project.industry}
      </span>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-4">
        {project.title}
      </h3>

      <div
        className="space-y-3.5 text-sm rounded-[6px] p-5 border border-gray-100 mb-5"
        style={{
          background:
            "linear-gradient(135deg, #f8f9ff, #ffffff)",
        }}
      >
        {[
          ["Challenge", project.challenge],
          ["Solution", project.solution],
          ["Outcome", project.outcome],
        ].map(([label, text]) => (
          <div key={label}>
            <span className="font-bold text-brand-navy">
              {label}:{" "}
            </span>

            <span className="text-brand-text">
              {text}
            </span>
          </div>
        ))}
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors group"
      >
        View Project

        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </a>
    </motion.div>
  );

  return (
    <div className="mb-2 lg:mb-10 pt-5 lg:pt-10 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {isLeft ? (
          <>
            {imgCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {imgCol}
          </>
        )}
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 mb-5">
            SELECTED WORK
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight mb-4">
            Work That Solves Real
            <br className="hidden sm:inline" /> Business Problems
          </h2>

          <p className="text-base sm:text-lg text-brand-text">
            A look at real digital platforms and websites we have developed
            to help businesses build credibility and attract customers.
          </p>
        </motion.div>

        {PROJECTS.map((project, i) => (
          <CaseRow
            key={i}
            project={project}
          />
        ))}

        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="mt-4 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex mb-5 items-center gap-2 bg-brand-navy hover:bg-brand-blue text-white font-bold px-7 py-4 rounded-[4px] transition-all duration-200 text-sm group"
            style={{
              boxShadow: "0 4px 16px rgba(5,15,44,0.2)",
            }}
          >
            Explore Complete Portfolio

            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}