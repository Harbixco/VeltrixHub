import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HardHat,
  Paintbrush,
  Sparkles,
  Wrench,
  Stethoscope,
  Scale,
  SunMedium,
  ShieldAlert,
  Shirt,
  Smartphone,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const DEMOS = [
  {
    title: "Building & General Contractors",
    niche: "High deal size (₦2M - ₦10M+)",
    desc: "CAC verified credentials, project timelines, and mobile portfolio for commercial developers and diaspora clients.",
    path: "/contractor",
    icon: HardHat,
    color: "#f59e0b",
    badge: "High Ticket",
  },
  {
    title: "Painting & Decorative Finishing",
    niche: "High Visual Impact",
    desc: "Interactive before/after color demonstrations and direct WhatsApp quotation calculators.",
    path: "/painting",
    icon: Paintbrush,
    color: "#0284c7",
    badge: "Interactive",
  },
  {
    title: "Commercial Cleaning & Facilities",
    niche: "Corporate Contracts",
    desc: "Service scope checklist, safety compliance badges, and instant booking forms for corporate offices.",
    path: "/cleaning",
    icon: Sparkles,
    color: "#10b981",
    badge: "Recurring B2B",
  },
  {
    title: "Auto Repair & Diagnostics",
    niche: "Emergency Intent",
    desc: "Rapid diagnostic service schedule, workshop photo galleries, and immediate WhatsApp mechanic dispatch.",
    path: "/auto-repair",
    icon: Wrench,
    color: "#ef4444",
    badge: "High Intent",
  },
  {
    title: "Dental Clinics & Private Practices",
    niche: "High-Margin Elective Care",
    desc: "Gentle cosmetic dentistry showcases, online patient appointment scheduling, and verified reviews.",
    path: "/dental-care",
    icon: Stethoscope,
    color: "#06b6d4",
    badge: "Private Healthcare",
  },
  {
    title: "Commercial Law & Legal Counsel",
    niche: "Retainers & Advisory",
    desc: "Practice area authority, attorney credentials, and direct consultation booking without reception friction.",
    path: "/personal-injury",
    icon: Scale,
    color: "#d4a359",
    badge: "Corporate Law",
  },
  {
    title: "Solar & Inverter Engineering",
    niche: "Critical Grid Reliability",
    desc: "Wattage tier packages, lithium battery comparison matrices, and one-tap engineer site visits.",
    path: "/electrical",
    icon: SunMedium,
    color: "#eab308",
    badge: "Market Demand",
  },
  {
    title: "Pest Control & Fumigation",
    niche: "Mandatory Compliance",
    desc: "Commercial health certifications, quarterly service contracts, and residential extermination pricing.",
    path: "/pest-control",
    icon: ShieldAlert,
    color: "#16a34a",
    badge: "Quarterly Retainers",
  },
  {
    title: "Luxury Fashion & Kaftan Atelier",
    niche: "Bespoke Elegance",
    desc: "High-res Senator wear lookbooks, size measurement selectors, and WhatsApp atelier order routing.",
    path: "/fashion",
    icon: Shirt,
    color: "#8b5cf6",
    badge: "E-Commerce",
  },
  {
    title: "Tech Gadgets & Electronics Hub",
    niche: "Retail & Wholesalers",
    desc: "Smartphones, laptops, fast delivery reassurance, official Nigerian warranty, and live shopping cart.",
    path: "/tech-gadgets",
    icon: Smartphone,
    color: "#2563eb",
    badge: "High Velocity",
  },
  {
    title: "Haute Parfumerie & Scents",
    niche: "Luxury Retail",
    desc: "Oud and niche fragrances, scent pyramid notes breakdown, flash deals, and seamless checkout.",
    path: "/perfumes",
    icon: Flame,
    color: "#d97706",
    badge: "Prestige Brands",
  },
];

export default function IndustryDemosSection() {
  return (
    <section className="py-20 bg-slate-900 border-t border-b border-slate-800 text-white relative overflow-hidden" id="demos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <span>LIVE INTERACTIVE INDUSTRY PROTOTYPES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Purpose-Built Websites Engineered for High-Conversion Nigerian Industries
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We do not build generic templates. Explore our interactive live prototypes tailored specifically to client psychology, mobile intent, and high-ticket sales across Nigeria.
          </p>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEMOS.map((demo, idx) => {
            const Icon = demo.icon;
            return (
              <motion.div
                key={demo.path}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="group relative bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${demo.color}15`, color: demo.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        background: `${demo.color}10`,
                        color: demo.color,
                        borderColor: `${demo.color}30`,
                      }}
                    >
                      {demo.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">
                    {demo.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mb-2.5">
                    {demo.niche}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {demo.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500">Live Client Template</span>
                  <Link
                    to={demo.path}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Launch Demo</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
