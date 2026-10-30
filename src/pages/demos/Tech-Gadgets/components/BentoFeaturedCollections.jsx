import { ArrowRight, ChevronRight } from "lucide-react";
import { FaPlaystation } from "react-icons/fa";

export default function BentoFeaturedCollections({ onSelectCategory }) {
  return (
    <section id="featured-collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      {/* Header Row strictly matching image */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Featured Collections
        </h2>
        <a
          href="#trending"
          className="text-xs sm:text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1 group"
        >
          <span>View All</span>
          <ChevronRight
            size={14}
            className="transform group-hover:translate-x-0.5 transition-transform"
          />
        </a>
      </div>

      <div className="space-y-4">
        {/* Row 1: 3 Bento Cards (Laptops, Audio, Smart Home) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Pro Performance Everyday */}
          <div className="rounded-3xl bg-[#0f172a] text-white p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xs border border-slate-800 min-h-[250px] group">
            <div className="relative z-10 max-w-[200px] text-left space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                Pro Performance Everyday
              </h3>
              <p className="text-xs text-gray-400 font-normal">
                Laptops for work, play and beyond.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onSelectCategory("Laptops")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Laptops</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Laptop Visual right bottom */}
            <div className="absolute right-[-10%] bottom-[-5%] w-[60%] sm:w-[55%] pointer-events-none transform group-hover:scale-103 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                alt="Laptops Collection"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Card 2: Sound Reimagined */}
          <div className="rounded-3xl bg-[#0f172a] text-white p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xs border border-slate-800 min-h-[250px] group">
            <div className="relative z-10 max-w-[190px] text-left space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                Sound Reimagined
              </h3>
              <p className="text-xs text-gray-400 font-normal">
                Premium audio for a richer you.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onSelectCategory("Audio")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Shop Audio</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Audio Visual right bottom */}
            <div className="absolute right-[-5%] bottom-[-5%] w-[55%] sm:w-[50%] pointer-events-none transform group-hover:scale-103 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                alt="Audio Collection"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Card 3: Live Smarter at Home (Warm soft neutral) */}
          <div className="rounded-3xl bg-[#eae6df] text-gray-900 p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xs border border-gray-200 min-h-[250px] group">
            <div className="relative z-10 max-w-[190px] text-left space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black leading-tight text-gray-900">
                Live Smarter at Home
              </h3>
              <p className="text-xs text-gray-600 font-normal">
                Smart devices for a connected life.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onSelectCategory("Smart Home")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Shop Smart Home</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Smart Home Visual */}
            <div className="absolute right-[-5%] bottom-[-5%] w-[52%] sm:w-[48%] pointer-events-none transform group-hover:scale-103 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
                alt="Smart Home Collection"
                className="w-full h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        </div>

        {/* Row 2: 2 Bento Cards (Up to 40% Off & Upgrade Your Game) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Card 4: Limited Time Offer Up to 40% Off */}
          <div className="md:col-span-6 rounded-3xl bg-[#f8fafc] text-gray-900 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xs border border-gray-200 min-h-[250px] group">
            <div className="relative z-10 max-w-[240px] text-left space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
                LIMITED TIME OFFER
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-gray-900">
                Up to <span className="text-[#0066FF]">40% Off</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Top Tech Brands
              </p>
              <div className="pt-3">
                <button
                  onClick={() => onSelectCategory("All")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>Shop Deals</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Multi-Device Visual on right */}
            <div className="absolute right-[-5%] bottom-[-5%] w-[55%] pointer-events-none transform group-hover:scale-103 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80"
                alt="Deals"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

          {/* Card 5: Upgrade Your Game (Electric Blue with PlayStation logo) */}
          <div className="md:col-span-6 rounded-3xl bg-gradient-to-r from-[#0055EE] to-[#0066FF] text-white p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-500/15 border border-blue-400/30 min-h-[250px] group">
            {/* PlayStation logo in top right matching image */}
            <div className="absolute top-6 right-6 text-white/50 pointer-events-none">
              <FaPlaystation size={32} />
            </div>

            <div className="relative z-10 max-w-[240px] text-left space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                Upgrade <br />
                Your Game
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                Consoles, accessories and more.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => onSelectCategory("Gaming")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-[#0066FF] font-black text-xs shadow-lg transition-all cursor-pointer"
                >
                  <span>Shop Gaming</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* White Gamepad Visual on right */}
            <div className="absolute right-[-2%] bottom-[-8%] w-[55%] pointer-events-none transform group-hover:scale-103 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80"
                alt="Gaming"
                className="w-full h-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
