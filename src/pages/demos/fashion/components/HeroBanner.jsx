import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../data/heroSlides";

export default function HeroBanner({
  currentSlideIndex,
  setCurrentSlideIndex,
  touchStartX,
  setTouchStartX,
}) {
  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
      {/* ─── Hero Fashion Showcase: 100% Clean Garment Display with Zero Text Overlay ─── */}
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
        className="relative rounded-3xl overflow-hidden shadow-xl border border-[#f1e6da] bg-[#faf6f1] h-[460px] sm:h-[520px] md:h-[600px] flex items-center justify-center group select-none"
      >
        {/* Dynamic Carousel Slide Image: Pure, Crisp Clothes Design */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt="Bespoke Clothes Design"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Carousel Navigation: Previous Slide Arrow */}
        <button
          onClick={() =>
            setCurrentSlideIndex((prev) =>
              prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
            )
          }
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20 backdrop-blur-xs opacity-85 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Minimalist Carousel Navigation: Next Slide Arrow */}
        <button
          onClick={() =>
            setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20 backdrop-blur-xs opacity-85 hover:opacity-100"
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
              className={`h-2 rounded-full transition-all ${
                currentSlideIndex === idx
                  ? "w-7 bg-[#e85d04]"
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
