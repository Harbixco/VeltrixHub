import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Lock,
  Truck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HERO_SLIDES } from "../data/heroSlides";

export default function HeroBanner({
  currentSlideIndex,
  setCurrentSlideIndex,
  touchStartX,
  setTouchStartX,
}) {
  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* ─── MOBILE HERO (< lg): Interactive Luxury Fashion Carousel ─── */}
      <div
        onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (diff > 45) {
            // swipe left -> next slide
            setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
          } else if (diff < -45) {
            // swipe right -> prev slide
            setCurrentSlideIndex((prev) =>
              prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
            );
          }
          setTouchStartX(null);
        }}
        className="lg:hidden relative rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 text-white border border-[#235342]/40 bg-[#081d16]"
      >
        {/* Background Image: Dynamic Carousel Slide Image with Smooth Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 6, ease: "easeOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.titleLine1}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark green gradient contrast overlay ensuring 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081d16]/80 via-[#081d16]/88 to-[#081d16]/85 backdrop-blur-[0.5px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Texts Centered Vertically with Equal Space Top & Bottom */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 space-y-4 text-left my-auto"
          >
            {/* Badge & Discount Tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16392d]/90 backdrop-blur-md border border-[#235342] text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {activeSlide.badge}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e85d04] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                {activeSlide.discountLabel} {activeSlide.discountBadge} OFF
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3.5xl sm:text-4xl font-black tracking-tight leading-[1.08] text-white">
              <span className="text-white drop-shadow-md">
                {activeSlide.titleLine1}
              </span>{" "}
              <br />
              <span className="text-[#f06428] drop-shadow-md">
                {activeSlide.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-xs sm:text-sm font-normal leading-relaxed max-w-sm drop-shadow-xs">
              {activeSlide.subtitle}
            </p>

            {/* 3 Value Bullets */}
            <div className="space-y-2 text-xs text-gray-200 font-medium pt-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                  <Check size={12} />
                </div>
                <span>Best Prices Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                  <Lock size={11} />
                </div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428] shrink-0">
                  <Truck size={12} />
                </div>
                <span>Fast Delivery Worldwide</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={activeSlide.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all text-center"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="#deal-of-the-day"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/25 transition-colors text-center"
              >
                <span>Deal of the Day</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Subtle ambient 2px progress bar indicating slide progression */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <motion.div
            key={currentSlideIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-[#e85d04]"
          />
        </div>
      </div>

      {/* ─── DESKTOP HERO (>= lg): Interactive 2-Column Luxury Carousel ─── */}
      <div className="hidden lg:block relative rounded-3xl bg-[#0c261e] text-white overflow-hidden shadow-2xl p-10 lg:p-14">
        {/* Ambient lighting accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#e85d04]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Carousel Slide Animation Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-row items-center justify-between gap-10 relative z-10"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-6 max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16392d]/90 backdrop-blur-xs border border-[#235342] text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {activeSlide.badge}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                <span className="text-white drop-shadow-sm">
                  {activeSlide.titleLine1}
                </span>{" "}
                <br />
                <span className="text-[#f06428] drop-shadow-sm">
                  {activeSlide.titleLine2}
                </span>
              </h1>

              <p className="text-gray-200 text-base font-normal leading-relaxed max-w-md">
                {activeSlide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-gray-200 font-medium pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                    <Check size={12} />
                  </div>
                  <span>Best Prices Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                    <Lock size={11} />
                  </div>
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#f06428]">
                    <Truck size={12} />
                  </div>
                  <span>Fast Delivery Worldwide</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={activeSlide.ctaLink}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#deal-of-the-day"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-colors"
                >
                  <span>Deal of the Day</span>
                </a>
              </div>
            </div>

            {/* Right Visual Box */}
            <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="absolute top-2 right-4 sm:top-4 sm:right-6 z-20 w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#f06428] to-[#e85d04] text-white flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white/20 transform rotate-6 transition-all"
              >
                <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none">
                  {activeSlide.discountLabel}
                </span>
                <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">
                  {activeSlide.discountBadge}
                </span>
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase leading-none">
                  OFF
                </span>
              </motion.div>

              <div className="absolute -bottom-3 left-4 z-20 bg-white/95 backdrop-blur-md text-gray-900 border border-white/20 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                  />
                </div>
                <div className="text-[11px] font-bold text-gray-800 leading-tight">
                  {activeSlide.socialProof}
                </div>
              </div>

              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-[#081a14] border border-white/10 group">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.titleLine1}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Carousel Controls */}
        <div className="relative z-20 mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentSlideIndex((prev) =>
                  prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
                )
              }
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
              }
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
            <span className="text-xs text-gray-300 font-mono ml-2">
              0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? "w-8 bg-[#e85d04]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

