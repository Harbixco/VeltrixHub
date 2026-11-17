import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { SiGoogle, SiXiaomi, SiSamsung, SiOneplus } from "react-icons/si";

export default function TopBrandsDeals() {
  const brandPhones = [
    {
      id: "apple",
      name: "Apple iPhone 15 Pro",
      brand: "Apple",
      badge: "Titanium",
      logo: <FaApple size={16} className="text-white" />,
      // Clean isolated studio render
      image: "/demos/gadgets/gadget-11.jpg",
    },
    {
      id: "samsung",
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      badge: "AI 200MP",
      logo: (
        <span className="text-[11px] font-black tracking-widest text-white uppercase font-sans">
          SAMSUNG
        </span>
      ),
      // Clean frontal studio render
      image: "/demos/gadgets/gadget-12.jpg",
    },
    {
      id: "oneplus",
      name: "OnePlus 12 5G",
      brand: "OnePlus",
      badge: "Hasselblad",
      logo: (
        <div className="flex items-center gap-1 text-white font-bold text-[10px] uppercase">
          <SiOneplus size={14} className="text-red-500" />
          <span>ONEPLUS</span>
        </div>
      ),
      // Clean studio device render
      image: "/demos/gadgets/gadget-13.jpg",
    },
    {
      id: "xiaomi",
      name: "Xiaomi 14 Ultra",
      brand: "Xiaomi",
      badge: "Leica Optics",
      logo: (
        <div className="w-5 h-5 rounded bg-[#FF6900] flex items-center justify-center text-white font-black text-[9px]">
          mi
        </div>
      ),
      // Clean phone portrait
      image: "/demos/gadgets/gadget-14.jpg",
    },
    {
      id: "google",
      name: "Google Pixel 8 Pro",
      brand: "Google",
      badge: "Tensor G3",
      logo: (
        <div className="flex items-center gap-1 text-white font-bold text-[11px]">
          <SiGoogle size={13} className="text-white" />
          <span>Google</span>
        </div>
      ),
      // Clean flagship camera bar device
      image: "/demos/gadgets/gadget-15.jpg",
    },
  ];

  return (
    <section id="top-brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="rounded-3xl bg-[#0b0e14] text-white p-6 sm:p-10 relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & CTA */}
          <div className="lg:col-span-4 space-y-3.5 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00] block">
              LIMITED TIME DEAL
            </span>

            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white tracking-tight">
              Best Deals on <br />
              <span className="text-[#FF6B00]">Top Brands</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-sm">
              Grab amazing offers on your favorite certified flagship smartphones with official nationwide warranty.
            </p>

            <div className="pt-2">
              <Link
                to="/demos/tech-gadgets/brands"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>EXPLORE ALL BRANDS</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Center: Redesigned Smartphone Visuals (Hidden on mobile per uploaded image 2) */}
          <div className="hidden lg:flex lg:col-span-6 items-end justify-center gap-2.5 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {brandPhones.map((phone) => (
              <Link
                key={phone.id}
                to={`/demos/tech-gadgets/products?brand=${encodeURIComponent(phone.brand)}`}
                className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
              >
                {/* Refined Mockup Card with Gradient Surface & Lighting */}
                <div className="w-16 sm:w-20 lg:w-22 h-32 sm:h-40 rounded-2xl bg-gradient-to-b from-[#161a24] to-[#0f121a] border border-white/10 group-hover:border-[#FF6B00]/70 p-2 flex flex-col items-center justify-between overflow-hidden shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                  {/* Subtle Top Spec Badge */}
                  <span className="text-[8px] font-extrabold text-gray-400 group-hover:text-orange-400 uppercase tracking-tighter">
                    {phone.badge}
                  </span>

                  {/* Clean Device Photo */}
                  <div className="w-full flex-1 flex items-center justify-center overflow-hidden my-1">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="max-h-full max-w-full object-contain rounded-lg transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <div className="w-full h-1 bg-white/5 rounded-full group-hover:bg-[#FF6B00] transition-colors" />
                </div>

                {/* Brand Logo under each phone */}
                <div className="h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  {phone.logo}
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Round "UP TO 30% OFF" Badge (Hidden on mobile per uploaded image 2) */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center lg:justify-end">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#181c28] to-[#0e111a] border-2 border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.3)] flex flex-col items-center justify-center text-center p-1 leading-none transform hover:scale-105 transition-transform">
              <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-gray-400">
                UP TO
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] my-0.5">
                30%
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-white">
                OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
