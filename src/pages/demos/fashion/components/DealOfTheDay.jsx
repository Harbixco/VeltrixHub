import { motion } from "framer-motion";
import { Flame, Clock, ArrowRight, Eye, Star } from "lucide-react";
import { DEAL_OF_THE_DAY } from "../data/dealOfTheDay";
import { formatNaira } from "../utils/helpers";

export default function DealOfTheDay({ timeLeft, addToCart, openModal }) {
  return (
    <section id="deal-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
      <div className="bg-[#fcf6ef] border border-[#f1e5d6] rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm">
        {/* Left Description: Compact & Streamlined */}
        <div className="flex-1 space-y-3 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100/80 text-[#e85d04] text-[11px] font-black tracking-widest uppercase">
            <Flame size={13} className="text-[#e85d04]" />
            DEAL OF THE DAY
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-snug">
            Grab It Before It's Gone!
          </h2>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Clock size={12} className="text-[#e85d04]" />
              Offer Ends In:
            </span>
            <div className="flex items-center gap-1 font-mono text-xs font-black">
              <div className="bg-[#081d16] text-white px-2 py-0.5 rounded-md shadow-xs">
                {String(timeLeft.hours).padStart(2, "0")}h
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <div className="bg-[#081d16] text-white px-2 py-0.5 rounded-md shadow-xs">
                {String(timeLeft.mins).padStart(2, "0")}m
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <motion.div
                key={timeLeft.secs}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-[#e85d04] text-white px-2 py-0.5 rounded-md shadow-xs"
              >
                {String(timeLeft.secs).padStart(2, "0")}s
              </motion.div>
            </div>
          </div>

          {/* Sleek Compact Action Buttons */}
          <div className="pt-1 flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => addToCart(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>SHOP THE DEAL</span>
              <ArrowRight size={13} />
            </button>
            <button
              onClick={() => openModal(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-[#f1e5d6] text-gray-700 hover:text-gray-900 text-xs font-semibold shadow-xs hover:bg-gray-50 transition-colors"
            >
              <Eye size={13} />
              <span>Inspect All Angles</span>
            </button>
          </div>
        </div>

        {/* Right Product Card: Compact with 100% Clean Image */}
        <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl border border-[#f1e6da] p-3 sm:p-4 shadow-md flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
          {/* Clean Product Image with Zero Text Overlay */}
          <div
            onClick={() => openModal(DEAL_OF_THE_DAY)}
            className="w-full h-52 sm:h-auto sm:w-44 md:w-48 rounded-xl bg-[#faf6f1] p-1 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group"
          >
            <img
              src={DEAL_OF_THE_DAY.image}
              alt={DEAL_OF_THE_DAY.name}
              className="w-full h-full object-cover object-top rounded-lg transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0 text-left space-y-1.5 flex flex-col justify-between py-1">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star size={12} fill="currentColor" />
                <span>{DEAL_OF_THE_DAY.rating}</span>
                <span className="text-gray-400 font-normal">
                  ({DEAL_OF_THE_DAY.reviewsCount} reviews)
                </span>
              </div>

              <h3
                onClick={() => openModal(DEAL_OF_THE_DAY)}
                className="font-extrabold text-sm sm:text-base text-gray-900 hover:text-[#e85d04] cursor-pointer transition-colors line-clamp-1"
              >
                {DEAL_OF_THE_DAY.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium line-clamp-2">
                {DEAL_OF_THE_DAY.subtitle}
              </p>
            </div>

            {/* Pricing in Naira */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xl font-black text-[#e85d04]">
                {formatNaira(DEAL_OF_THE_DAY.price)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatNaira(DEAL_OF_THE_DAY.oldPrice)}
              </span>
              <span className="text-[10px] font-black bg-orange-100 text-[#e85d04] px-2 py-0.5 rounded-full">
                Save {Math.round(((DEAL_OF_THE_DAY.oldPrice - DEAL_OF_THE_DAY.price) / DEAL_OF_THE_DAY.oldPrice) * 100)}%
              </span>
            </div>

            {/* Minimal Stock Left Indicator (No heavy progress bar) */}
            <div className="pt-1 text-[11px] font-bold text-[#e85d04]">
              Only {DEAL_OF_THE_DAY.stockLeft} bespoke sets left in stock!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
