import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 select-none">
      {/* ─── MOBILE HERO (< lg): Interactive Luxury Fragrance Carousel ─── */}
      <div
        onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (diff > 45) {
            setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
          } else if (diff < -45) {
            setCurrentSlideIndex((prev) =>
              prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
            );
          }
          setTouchStartX(null);
        }}
        className="lg:hidden relative rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 text-white border border-[#8A4852]/30 bg-gradient-to-br from-[#5A2931] via-[#6E3A42] to-[#451C22]"
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

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#451C22]/95 via-[#5A2931]/75 to-transparent z-10" />

        {/* Carousel Prev/Next Touch Buttons */}
        <button
          onClick={() =>
            setCurrentSlideIndex((prev) =>
              prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
            )
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-all cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() =>
            setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-all cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? "w-5 bg-[#ECA5AC]"
                  : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Animated Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 space-y-4 max-w-sm text-left mt-auto"
          >
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#451C22]/90 backdrop-blur-sm border border-[#8A4852]/40 text-[#ECA5AC] text-[10px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ECA5AC] animate-ping" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-[1.1] text-white drop-shadow-md">
              <span className="text-[#FFF5F3]">{activeSlide.titleLine1}</span>{" "}
              <br />
              <span className="text-[#ECA5AC] italic font-serif">
                {activeSlide.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#EBD2D0] leading-relaxed line-clamp-2">
              {activeSlide.subtitle}
            </p>

            {/* Trust Points */}
            <div className="flex items-center gap-3 text-[11px] text-[#EBD2D0] pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#8A4852]/80 flex items-center justify-center text-white">
                  <ShieldCheck size={10} />
                </div>
                <span>100% Original Flacons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#8A4852]/80 flex items-center justify-center text-white">
                  <Truck size={10} />
                </div>
                <span>Express Dispatch Nigeria</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={activeSlide.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8A4852] to-[#9C5B66] hover:from-[#773D46] hover:to-[#884752] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-black/40 transition-all text-center cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="#deal-of-the-day"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/25 transition-colors text-center cursor-pointer"
              >
                <span>Deal of the Day</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ambient progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <motion.div
            key={currentSlideIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-[#ECA5AC]"
          />
        </div>
      </div>

      {/* ─── DESKTOP HERO (>= lg): Romantic Haute Parfumerie (Matching Template) ─── */}
      <div className="hidden lg:block relative rounded-3xl bg-gradient-to-r from-[#FAF1F0] via-[#F6EAE7] to-[#F1DFDC] text-[#231819] overflow-hidden shadow-xl p-10 lg:p-14 border border-[#EFE1DD]">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ECA5AC]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#8A4852]/10 rounded-full blur-3xl pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-xs border border-[#EFE1DD] text-[#8A4852] text-[11px] font-bold tracking-widest uppercase shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#9C5B66] animate-ping" />
                {activeSlide.badge}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.08] text-[#231819]">
                <span>{activeSlide.titleLine1}</span>{" "}
                <br />
                <span className="text-[#9C5B66] italic font-serif font-normal">
                  {activeSlide.titleLine2}
                </span>
              </h1>

              <p className="text-[#6D5C5B] text-base font-normal leading-relaxed max-w-md">
                {activeSlide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-[#6D5C5B] font-medium pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66]">
                    <ShieldCheck size={12} />
                  </div>
                  <span>100% Original Flacons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66]">
                    <Sparkles size={11} />
                  </div>
                  <span>24-Hour Beast Projection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FAF1F0] border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66]">
                    <Truck size={12} />
                  </div>
                  <span>Nationwide Express</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={activeSlide.ctaLink}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8A4852] hover:bg-[#773D46] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#8A4852]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight size={15} />
                </a>
                <a
                  href="#deal-of-the-day"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF1F0] text-[#231819] text-xs font-bold border border-[#EFE1DD] transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Deal of the Day</span>
                </a>
              </div>
            </div>

            {/* Right Visual Box with Bottle on Plinth */}
            <div className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="absolute top-2 right-4 sm:top-4 sm:right-6 z-20 w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8A4852] to-[#5A2931] text-white flex flex-col items-center justify-center text-center shadow-xl border-2 border-white transform rotate-6 transition-all"
              >
                <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none">
                  {activeSlide.discountLabel}
                </span>
                <span className="text-2xl sm:text-3xl font-black leading-none my-0.5">
                  {activeSlide.discountBadge}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-wider uppercase leading-none">
                  OFF
                </span>
              </motion.div>

              <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/60 relative group bg-white/40">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.titleLine1}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Desktop Navigation Arrows */}
        <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentSlideIndex((prev) =>
                prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
              )
            }
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#231819] border border-[#EFE1DD] flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-bold text-[#8E7574] px-1">
            0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
          </span>
          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
            }
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#231819] border border-[#EFE1DD] flex items-center justify-center transition-all shadow-sm cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
