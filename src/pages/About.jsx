import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Shield,
  Zap,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

import agencyStoryImg from "../assets/corporate-solutions.webp";

const CORE_VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We are honest, transparent, and take full responsibility for delivering quality work.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We build modern, reliable, and high-performing digital solutions that create real value.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "We continuously refine our tools and methods to keep our clients ahead in their industries.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Success",
    desc: "When our clients grow, we grow. Your business objectives guide everything we do.",
  },
  {
    icon: CheckCircle2,
    title: "Reliability",
    desc: "We respect deadlines, communicate clearly, and remain available long after launch.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    desc: "We constantly upgrade our skills, design standards, and processes to better serve you.",
  },
];

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About Us – Digital Growth Partner | Veltrix Hub"
        description="Learn about Veltrix Hub's mission to empower Nigerian and African businesses with credible digital foundations, bespoke engineering, and brand trust."
        keywords="about Veltrix Hub, web agency Nigeria, digital agency mission, African tech solutions"
      />
      {/* Hero Banner */}
      <section className="pt-32 pb-10 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              ABOUT VELTRIX HUB
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              We Don't Just Build Websites.<br className="hidden sm:inline" />
              <span className="text-brand-blue-light"> We Build Trust.</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Veltrix Hub is a digital growth partner for businesses across Nigeria and Africa. We help companies become visible online, attract customers, and build lasting credibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why We Exist Story */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2 block">
                WHY WE EXIST
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-6 leading-tight">
                Most Businesses Are Invisible Online.
              </h2>
              <p className="text-brand-text leading-relaxed mb-5">
                Every day, millions of customers in Africa search for products and services on their smartphones. Yet, countless capable businesses remain invisible because they lack a professional digital foundation or rely solely on temporary social media posts.
              </p>
              <p className="text-brand-text leading-relaxed mb-5">
                Without a clear website and credible online presence, businesses lose high-value contracts, struggle to build trust with new buyers, and miss out on sustainable growth.
              </p>
              <p className="text-brand-text leading-relaxed font-semibold text-brand-navy">
                Veltrix Hub was founded to bridge this gap—giving entrepreneurs and companies the exact digital solutions they need to be found, trusted, and chosen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <div className="border border-gray-200 p-2 bg-white rounded-[2px] shadow-sm">
                <img
                  src={agencyStoryImg}
                  alt="Veltrix Hub Strategy Session"
                  className="w-full h-auto object-cover rounded-[2px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-2 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-gray-200 rounded-[2px]"
            >
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-[2px] flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy mb-4">
                Our Mission
              </h3>
              <p className="text-brand-text leading-relaxed">
                To help businesses become visible online, attract more customers, build trust, and increase sales through professional digital solutions.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white border border-gray-200 rounded-[2px]"
            >
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-[2px] flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy mb-4">
                Our Vision
              </h3>
              <p className="text-brand-text leading-relaxed">
                To become one of Africa's most trusted digital growth brands, helping thousands of businesses build a powerful online presence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="py-10 border-b border-gray-100"
        style={{ background: "linear-gradient(160deg, #f8f9ff 0%, #eef2ff 40%, #fff7ed 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
              OUR CORE PHILOSOPHY
            </p>
            <blockquote className="text-2xl sm:text-3xl font-black text-brand-navy leading-snug mb-10">
              &ldquo;We don&apos;t just build websites. We build trust.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Visibility", text: "We don't just increase traffic. We create visibility.", color: "#1a3ebd", bg: "#eef2ff", border: "#c7d3fa" },
                { label: "Opportunities", text: "We don't just deliver projects. We create opportunities.", color: "#e85d04", bg: "#fff0e6", border: "#fcd3aa" },
                { label: "Relationships", text: "We don't chase clients. We earn relationships.", color: "#7c3aed", bg: "#fdf4ff", border: "#e4b8f5" },
                { label: "Growth", text: "When our clients grow, we grow.", color: "#059669", bg: "#f0fdf4", border: "#a7f3c3" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-[8px] text-center cursor-default transition-all duration-300"
                  style={{ background: item.bg, border: `1.5px solid ${item.border}`, boxShadow: "0 2px 8px rgba(5,15,44,0.05)" }}
                >
                  <p
                    className="text-xs font-black uppercase tracking-widest mb-2"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </p>
                  <p className="text-sm text-brand-navy font-semibold leading-snug">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-10 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
              WHAT GUIDES US
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-7 bg-white border border-gray-200 rounded-[2px]"
              >
                <div className="w-10 h-10 bg-brand-navy text-white rounded-[2px] flex items-center justify-center mb-4">
                  <val.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-brand-text leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
              Let's Build Your Online Presence Together
            </h2>
            <p className="text-brand-text text-base sm:text-lg mb-8">
              Talk to us today to discuss your business goals and get a clear roadmap for growth.
            </p>
            <Link to="/contact" className="bg-brand-navy hover:bg-brand-blue text-white font-semibold px-8 py-4 rounded-[2px] transition-colors duration-200 inline-flex items-center justify-center gap-2">
              Get a Free Consultation <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
