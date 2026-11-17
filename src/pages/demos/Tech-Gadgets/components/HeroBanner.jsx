import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES } from "../data/mobilexData";

export default function HeroBanner({ onShopNow }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

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
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 select-none">
      {/* ─── Hero Tech Showcase: 100% Clean Device Display with Zero Text Overlay ─── */}
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
        className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-[#f8f9fa] h-[460px] sm:h-[520px] md:h-[600px] flex items-center justify-center group select-none"
      >
        {/* Dynamic Carousel Slide Image: Pure, Crisp Gadget Design */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.alt || "Flagship Device"}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Carousel Navigation: Previous Slide Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20 backdrop-blur-xs opacity-85 hover:opacity-100 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Minimalist Carousel Navigation: Next Slide Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20 backdrop-blur-xs opacity-85 hover:opacity-100 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Minimalist Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? "w-7 bg-[#FF6B00]"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
