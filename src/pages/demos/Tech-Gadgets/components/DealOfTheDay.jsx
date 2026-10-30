import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle,
  Truck,
  ShoppingBag,
  Zap,
  MessageCircle,
} from "lucide-react";
import { DEAL_OF_THE_DAY } from "../data/dealOfTheDay";
import { formatCurrency, generateWhatsAppOrderUrl } from "../utils/helpers";

export default function DealOfTheDay({
  addToCart,
  openModal,
  currency = "NGN",
  showToast,
}) {
  const deal = DEAL_OF_THE_DAY;
  const [selectedColor, setSelectedColor] = useState(deal.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(deal.storage[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Live countdown timer with Hours, Minutes, Seconds, and Milliseconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    mins: 24,
    secs: 39,
    msecs: 65,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.msecs > 0) {
          return { ...prev, msecs: prev.msecs - 1 };
        } else if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1, msecs: 99 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59, msecs: 99 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59, msecs: 99 };
        }
        return { hours: 12, mins: 0, secs: 0, msecs: 0 };
      });
    }, 10);
    return () => clearInterval(timer);
  }, []);

  const handleClaimDeal = () => {
    addToCart(
      {
        ...deal,
        price: deal.price,
      },
      selectedColor,
      selectedStorage,
      1
    );
  };

  const handleWhatsAppDeal = () => {
    const url = generateWhatsAppOrderUrl({
      cart: [
        {
          ...deal,
          selectedColor,
          selectedStorage,
          quantity: 1,
        },
      ],
      customerInfo: {},
      cartSubtotal: deal.price,
      amountToFreeShipping: 0,
      currency,
    });
    window.open(url, "_blank");
  };

  return (
    <section id="deal-of-the-day" className="py-12 sm:py-16 bg-[#0B101D] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame size={14} className="animate-bounce" />
              <span>FLASH TECH DEAL OF THE DAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Limited Units Available In Lagos Hub
            </h2>
          </div>

          {/* Live Countdown Timer matching template */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#131B2E] border border-white/10 px-4 py-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider mr-1">
              <Clock size={16} className="animate-spin text-cyan-400" style={{ animationDuration: "8s" }} />
              <span className="hidden sm:inline">Ends In:</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="text-xl sm:text-2xl font-black font-mono text-white">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                HRS
              </span>
            </div>
            <span className="text-gray-600 font-bold">:</span>

            {/* Mins */}
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="text-xl sm:text-2xl font-black font-mono text-white">
                {String(timeLeft.mins).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                MINS
              </span>
            </div>
            <span className="text-gray-600 font-bold">:</span>

            {/* Secs */}
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400">
                {String(timeLeft.secs).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                SEC
              </span>
            </div>
            <span className="text-gray-600 font-bold">:</span>

            {/* MSecs */}
            <div className="flex flex-col items-center min-w-[44px]">
              <span className="text-xl sm:text-2xl font-black font-mono text-red-400">
                {String(timeLeft.msecs).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                MSEC
              </span>
            </div>
          </div>
        </div>

        {/* Deal Content Card */}
        <div className="bg-gradient-to-br from-[#111827] via-[#0E1524] to-[#0A0E18] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Product Imagery with Angle Thumbnails */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#1E293B]/60 to-[#0B0F19] p-8 border border-white/10 flex items-center justify-center min-h-[320px] sm:min-h-[400px]">
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Zap size={12} fill="currentColor" />
                  <span>{deal.badge}</span>
                </div>

                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={deal.gallery[activeImageIndex]}
                  alt={deal.name}
                  className="max-h-[300px] sm:max-h-[360px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,102,255,0.35)]"
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-3 justify-center">
                {deal.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white/5 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#0066FF] shadow-lg shadow-blue-500/30 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Deal Details & CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">
                  OFFICIAL NIGERIA FLASH SALE
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {deal.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{deal.subtitle}</p>
              </div>

              {/* Pricing in Naira */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formatCurrency(deal.price, currency)}
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  {formatCurrency(deal.oldPrice, currency)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Save ₦500,000 (26% OFF)
                </span>
              </div>

              {/* Stock Urgency Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-red-400 flex items-center gap-1">
                    <Flame size={13} fill="currentColor" /> Only {deal.stockLeft} units remaining in Ikeja
                  </span>
                  <span className="text-gray-400">82% Claimed Today</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Color Finish: <span className="text-white font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {deal.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor.name === color.name
                          ? "border-[#0066FF] bg-blue-500/10 text-white"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage / Configuration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Storage Capacity:
                </label>
                <div className="flex items-center gap-2">
                  {deal.storage.map((stor) => (
                    <button
                      key={stor}
                      onClick={() => setSelectedStorage(stor)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedStorage === stor
                          ? "bg-[#0066FF] text-white border-[#0066FF] shadow-lg shadow-blue-500/30"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {stor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs Bullets */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 py-2 border-y border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                  <span>Snapdragon 8 Gen 3 (4nm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                  <span>200MP OIS Studio Sensor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-emerald-400 shrink-0" />
                  <span>Free Lagos Same-Day Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span>1-Year Official Warranty</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClaimDeal}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-sm tracking-wide shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  <span>Claim Flash Deal Now</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppDeal}
                  className="py-4 px-6 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Order on WhatsApp</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

