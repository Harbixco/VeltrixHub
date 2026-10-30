import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES } from "../data/mobilexData";

export default function HeroBanner({ onShopNow }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-play carousel every 4.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);

    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? HERO_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 select-none">
      {/* ─── MOBILE HERO (< lg): Dedicated Interactive Tech Carousel (Matching Fashion Architecture) ─── */}
      <div
        onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const touchEndX = e.changedTouches[0].clientX;
          const diff = touchStartX - touchEndX;
          if (diff > 45) {
            handleNext();
          } else if (diff < -45) {
            handlePrev();
          }
          setTouchStartX(null);
        }}
        className="lg:hidden relative rounded-3xl overflow-hidden shadow-2xl min-h-[580px] flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 text-white border border-[#1b3d32] bg-[#091b15]"
      >
        {/* Dynamic Slide Background Image with Smooth Fade & Scale */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 5, ease: "easeOut" },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.alt || slide.titlePrimary}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark contrast gradient overlay ensuring 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#091b15]/82 via-[#091b15]/88 to-[#091b15]/85 backdrop-blur-[0.5px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Texts Centered Vertically */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 space-y-4 text-left my-auto"
          >
            {/* Badge & Discount Tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122e23]/90 backdrop-blur-md border border-[#235342] text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>NEW ARRIVAL • {slide.category}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                {slide.badgeSmall} {slide.badgeHighlight} {slide.badgeFoot}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3.5xl sm:text-4xl font-black tracking-tight leading-[1.08] text-white">
              <span className="text-white drop-shadow-md">
                {slide.titlePrimary}
              </span>{" "}
              <br />
              <span className="text-[#FF6B00] drop-shadow-md">
                {slide.titleSecondary}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-xs sm:text-sm font-normal leading-relaxed max-w-sm drop-shadow-xs">
              {slide.subtitle}
            </p>

            {/* 3 Value Bullets */}
            <div className="space-y-2 text-xs text-gray-200 font-medium pt-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00] shrink-0">
                  <Check size={12} />
                </div>
                <span>Best Prices Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00] shrink-0">
                  <Lock size={11} />
                </div>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00] shrink-0">
                  <Truck size={12} />
                </div>
                <span>Fast Delivery Nationwide</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all text-center cursor-pointer"
              >
                <span>SHOP {slide.category.toUpperCase()}</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="#top-brands"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/25 transition-colors text-center cursor-pointer"
              >
                <span>Deal of the Day</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Ambient progress bar showing autoplay timing */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <motion.div
            key={currentSlideIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.8, ease: "linear" }}
            className="h-full bg-[#FF6B00]"
          />
        </div>
      </div>

      {/* ─── DESKTOP HERO (>= lg): Interactive 2-Column Luxury Carousel ─── */}
      <div className="hidden lg:block relative rounded-3xl bg-[#091b15] text-white overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12 border border-[#1b3d32]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Inner Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Top Tag Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#122e23] border border-[#235342] text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>NEW ARRIVAL • {slide.category}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-black tracking-tight leading-[1.08] text-white">
                <span className="text-white drop-shadow-sm">{slide.titlePrimary}</span>{" "}
                <br />
                <span className="text-[#FF6B00] drop-shadow-sm">
                  {slide.titleSecondary}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                {slide.subtitle}
              </p>

              {/* 3 Inline Trust Items */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-200 font-medium pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00]">
                    <Check size={12} />
                  </div>
                  <span>Best Prices Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00]">
                    <Lock size={11} />
                  </div>
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center text-[#FF6B00]">
                    <Truck size={12} />
                  </div>
                  <span>Fast Delivery Nationwide</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onShopNow}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>SHOP {slide.category.toUpperCase()}</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="#top-brands"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/20 transition-colors cursor-pointer"
                >
                  <span>Deal of the Day</span>
                </a>
              </div>
            </div>

            {/* Right Media Viewport */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Floating Discount Orange Circle Badge */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#e05e00] text-white flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white/25 transform rotate-6">
                <span className="text-[9px] font-black tracking-widest uppercase leading-none">
                  {slide.badgeSmall}
                </span>
                <span className="text-xl sm:text-2xl font-black leading-none my-0.5">
                  {slide.badgeHighlight}
                </span>
                <span className="text-[9px] font-black tracking-wider uppercase leading-none">
                  {slide.badgeFoot}
                </span>
              </div>

              {/* Floating Social Proof Pill */}
              <div className="absolute -bottom-3 left-4 z-20 bg-white/95 backdrop-blur-md text-gray-900 border border-white/30 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2.5">
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
                  8,500+ Verified Buyers
                </div>
              </div>

              {/* Studio Stage Box with Product Image */}
              <div className="relative w-full h-72 sm:h-84 lg:h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#98d4db] via-[#bfe3eb] to-[#e4f3f6] border border-white/20 flex items-center justify-center p-4">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.22)] transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Bottom Controls: Arrows, Counter & Dash Indicators */}
        <div className="relative z-20 mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          {/* Left Arrow Controls & Counter */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={16} />
            </button>
            <span className="text-xs text-gray-300 font-mono ml-2">
              0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Right Dash Indicators */}
          <div className="flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx
                    ? "w-8 bg-[#FF6B00]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom Value Strip (As in Template Image 2) ─── */}
      <div className="mt-4 bg-[#fcf9f5] border border-[#f0e6da] rounded-2xl p-4 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shadow-2xs">
        {/* Free Shipping */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#f0e6da] flex items-center justify-center text-[#FF6B00] shrink-0 shadow-xs">
            <Truck size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              Free Shipping
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">On orders over ₦100,000</p>
          </div>
        </div>

        {/* Easy Returns */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#f0e6da] flex items-center justify-center text-[#FF6B00] shrink-0 shadow-xs">
            <RotateCcw size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              Easy Returns
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">30-day returns</p>
          </div>
        </div>

        {/* Premium Quality */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#f0e6da] flex items-center justify-center text-[#FF6B00] shrink-0 shadow-xs">
            <ShieldCheck size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              Premium Quality
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">100% original products</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#f0e6da] flex items-center justify-center text-[#FF6B00] shrink-0 shadow-xs">
            <Headphones size={18} />
          </div>
          <div className="text-left">
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight">
              24/7 Support
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">We're here to help</p>
          </div>
        </div>
      </div>
    </section>
  );
}
