import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Building2,
  TrendingUp,
} from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Barrister Anthony Sterling",
    role: "Principal Partner",
    company: "Sterling Chambers",
    category: "Legal Platform",
    rating: 5,
    metrics: "3x Increase in Retainer Inquiries",
    quote:
      "Veltrix Hub transformed our corporate posture completely. Prior to our new website, commercial clients doubted our digital legitimacy. Now, corporate legal counsels easily explore our practice areas and book high-stakes litigation consultations directly. Their attention to detail was exceptional.",
    avatarBg: "from-blue-600 to-indigo-800",
    initials: "AS",
  },
  {
    id: 2,
    name: "Wale Adebayo",
    role: "Founder & Managing Director",
    company: "Walex Farms & Agro-Services",
    category: "AgriTech Web Portal",
    rating: 5,
    metrics: "Opened Global Export Channels",
    quote:
      "Working with Veltrix Hub was effortless. They didn't just write code; they understood how Nigerian agribusinesses need to interface with commercial off-takers. The website established our credibility immediately and opened doors to institutional buyers we couldn't reach on WhatsApp alone.",
    avatarBg: "from-emerald-600 to-teal-800",
    initials: "WA",
  },
  {
    id: 3,
    name: "Tunde Oladipo",
    role: "Chief Technology Officer",
    company: "NimbleByte Global",
    category: "Enterprise Corporate Web",
    rating: 5,
    metrics: "Shortened Enterprise Sales Cycles",
    quote:
      "Our B2B software sales cycle shortened noticeably after Veltrix Hub revamped our enterprise presence. The UI responsiveness, modern typography, and clean technical architecture give enterprise procurement officers the confidence to sign contracts without hesitation.",
    avatarBg: "from-brand-blue to-brand-navy",
    initials: "TO",
  },
  {
    id: 4,
    name: "Dr. Emeka Nnamdi",
    role: "Director of Academic Programs",
    company: "Numace Coding Academy",
    category: "Education & Enrollment Portal",
    rating: 5,
    metrics: "Automated Student Onboarding",
    quote:
      "The student registration portal Veltrix Hub built eliminated our manual intake headaches. Prospective students now view curriculum schedules, select cohorts, and complete applications seamlessly. The team's post-launch support has been rock solid.",
    avatarBg: "from-amber-600 to-orange-700",
    initials: "EN",
  },
  {
    id: 5,
    name: "Grace Okafor",
    role: "E-Commerce Director",
    company: "Affordable Gadgets Hub",
    category: "E-Commerce Catalog",
    rating: 5,
    metrics: "40% Drop in Routine Price DMs",
    quote:
      "Before our online catalog, my team spent hours every single day answering repetitive 'How much?' questions in WhatsApp chats. Veltrix Hub gave our customers a clean, transparent catalog that converts directly. Our sales velocity has surged ever since.",
    avatarBg: "from-rose-600 to-purple-800",
    initials: "GO",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-advance every 6 seconds unless user pauses or hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 60) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -60) {
      handlePrev();
    }
  };

  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafd 50%, #eef4ff 100%)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/10 mb-4">
              <Sparkles size={13} className="text-brand-orange" />
              CLIENT STORIES & RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
              Trusted by Ambitious Brands.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-orange">
                Proven by Measurable Impact.
              </span>
            </h2>
          </motion.div>

          {/* Social Proof Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-200/80 shadow-xs"
          >
            <div className="flex -space-x-2">
              {TESTIMONIALS.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.avatarBg} text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs`}
                >
                  {t.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-brand-navy ml-1">5.0 / 5.0</span>
              </div>
              <p className="text-[11px] text-brand-text font-medium">From verified Nigerian founders & executives</p>
            </div>
          </motion.div>
        </div>

        {/* Carousel Showcase Card */}
        <div
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-100/90 relative overflow-hidden"
              style={{
                boxShadow:
                  "0 20px 40px -15px rgba(5, 15, 44, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.03)",
              }}
            >
              {/* Subtle top brand glow accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-orange to-emerald-500" />

              {/* Decorative background quote watermark */}
              <Quote
                size={140}
                className="absolute right-4 bottom-2 text-gray-50/80 pointer-events-none -rotate-12"
              />

              <div className="relative z-10 flex flex-col justify-between min-h-[300px]">
                {/* Top row: Category tag & rating */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-blue/10 text-brand-blue">
                      {current.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                      <TrendingUp size={13} className="text-emerald-600" />
                      {current.metrics}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-800 ml-1">Verified Client</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-base sm:text-xl md:text-2xl font-medium text-brand-navy leading-relaxed mb-8 italic">
                  "{current.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${current.avatarBg} text-white font-bold text-lg flex items-center justify-center shadow-md`}
                    >
                      {current.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-brand-navy">{current.name}</h4>
                        <CheckCircle2 size={16} className="text-brand-blue" />
                      </div>
                      <p className="text-xs sm:text-sm text-brand-text font-medium flex items-center gap-1.5 mt-0.5">
                        <span>{current.role}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-brand-navy font-semibold flex items-center gap-1">
                          <Building2 size={13} className="text-gray-400" />
                          {current.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-brand-navy hover:text-white hover:border-brand-navy text-brand-navy flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-brand-navy hover:text-white hover:border-brand-navy text-brand-navy flex items-center justify-center transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-brand-blue"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
