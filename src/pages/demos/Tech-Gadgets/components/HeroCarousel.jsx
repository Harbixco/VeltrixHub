import { useState } from "react";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function HeroCarousel({ onShopNow }) {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section id="hero" className="relative bg-[#070b14] text-white overflow-hidden select-none">
      {/* Background radial blue ambient lighting matching template */}
      <div className="absolute top-1/4 right-1/4 w-[520px] h-[520px] bg-[#0066FF]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Typography & CTAs strictly matching image */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {/* Small uppercase tag */}
            <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-gray-400">
              NEXT GENERATION TECH
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] text-white">
              Smarter Devices <br />
              Brighter Days
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md font-normal">
              Discover innovative electronics that power your life, work and play.
            </p>

            {/* Shop Now Button matching template */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-950 font-bold text-sm tracking-tight shadow-xl transition-all group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight
                  size={15}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            {/* 3 Trust Features in horizontal row */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-[11px] sm:text-xs text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-cyan-400 shrink-0">
                  <Zap size={13} fill="currentColor" />
                </div>
                <span className="leading-tight">Innovative Technology</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span className="leading-tight">Trusted Quality</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-cyan-400 shrink-0">
                  <Truck size={14} />
                </div>
                <span className="leading-tight">Faster Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Device Showcase on Volcanic Rock Floor */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            {/* Handwritten neon script in top right: "Tech Without Limits" */}
            <div className="absolute top-0 right-2 sm:right-6 z-20 pointer-events-none">
              <div className="font-serif italic text-cyan-300 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-wide drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]">
                Tech Without Limits
              </div>
            </div>

            {/* Multi-Device Arrangement on dark rock platform */}
            <div className="relative w-full h-full flex items-center justify-center pt-8">
              {/* Leaning Dark Matte Tablet in background */}
              <div className="relative w-[60%] z-10 -mr-12">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#1a2333] via-[#0d1320] to-[#080c14] p-2 transform -rotate-1">
                  <div className="rounded-xl overflow-hidden bg-[#0a0f18] aspect-[4/3] flex items-center justify-center border border-white/5">
                    <img
                      src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"
                      alt="Voltix Tablet"
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity contrast-150"
                    />
                  </div>
                </div>
              </div>

              {/* Upright Smartphone with Blue Curve Wallpaper */}
              <div className="relative w-[30%] z-20 -ml-6">
                <div className="rounded-[26px] p-1 bg-gradient-to-b from-blue-400/40 via-cyan-500/20 to-transparent shadow-[0_25px_45px_rgba(0,102,255,0.4)]">
                  <img
                    src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80"
                    alt="Voltix Smartphone"
                    className="w-full h-auto object-contain rounded-[22px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>

              {/* Open Earbuds Case in front of tablet */}
              <div className="absolute bottom-2 left-10 sm:left-20 w-24 sm:w-30 z-30">
                <img
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
                  alt="Pulse Buds Pro"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* Smartwatch with Blue Digital Face on far right */}
              <div className="absolute bottom-2 right-4 sm:right-8 w-24 sm:w-30 z-30">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
                  alt="TrackFit Smartwatch"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* Textured Volcanic Rock Floor Reflection Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070b14] via-[#070b14]/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3 Pagination dots at bottom center strictly matching template */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveDot(dot)}
              className={`rounded-full transition-all cursor-pointer ${
                activeDot === dot
                  ? "w-2.5 h-2.5 bg-white"
                  : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
