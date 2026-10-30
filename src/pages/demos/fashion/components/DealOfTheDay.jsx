import { motion } from "framer-motion";
import { Flame, Clock, ArrowRight, Eye, Star } from "lucide-react";
import { DEAL_OF_THE_DAY } from "../data/dealOfTheDay";
import { formatNaira } from "../utils/helpers";

export default function DealOfTheDay({ timeLeft, addToCart, openModal }) {
  return (
    <section id="deal-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="bg-[#fcf6ef] border border-[#f1e5d6] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        {/* Left Description */}
        <div className="flex-1 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[#e85d04] text-xs font-black tracking-widest uppercase">
            <Flame size={14} className="text-[#e85d04]" />
            DEAL OF THE DAY
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Grab It Before <br />
            It's Gone!
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm font-medium max-w-md">
            Hurry! Limited stock available. Over 218 fashion clients have claimed theirs this week.
          </p>

          {/* Live Urgency Countdown Timer */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} className="text-[#e85d04]" />
              Offer Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black">
              <div className="bg-[#081d16] text-white px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.hours).padStart(2, "0")}h
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <div className="bg-[#081d16] text-white px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.mins).padStart(2, "0")}m
              </div>
              <span className="text-gray-400 font-bold">:</span>
              <motion.div
                key={timeLeft.secs}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-[#e85d04] text-white px-2.5 py-1 rounded-lg shadow-xs"
              >
                {String(timeLeft.secs).padStart(2, "0")}s
              </motion.div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => addToCart(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>SHOP THE DEAL</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => openModal(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl bg-white border border-[#f1e5d6] text-gray-700 hover:text-gray-900 text-xs font-bold shadow-xs hover:bg-gray-50 transition-colors"
            >
              <Eye size={14} />
              <span>Inspect All Angles</span>
            </button>
          </div>
        </div>

        {/* Right Product Card with Countdown */}
        <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-2xl border border-[#f1e6da] p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6">
          {/* Product Image */}
          <div
            onClick={() => openModal(DEAL_OF_THE_DAY)}
            className="w-full h-64 sm:h-auto sm:w-52 md:w-60 lg:w-64 min-h-[240px] sm:min-h-[280px] rounded-xl bg-[#faf6f1] p-2 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group relative"
          >
            <img
              src={DEAL_OF_THE_DAY.image}
              alt={DEAL_OF_THE_DAY.name}
              className="w-full h-full object-cover object-center rounded-lg transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Details & Timer */}
          <div className="flex-1 min-w-0 text-left space-y-2">
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <Star size={13} fill="currentColor" />
              <span>{DEAL_OF_THE_DAY.rating}</span>
              <span className="text-gray-400 font-normal">
                ({DEAL_OF_THE_DAY.reviewsCount} reviews)
              </span>
            </div>

            <h3
              onClick={() => openModal(DEAL_OF_THE_DAY)}
              className="font-extrabold text-base text-gray-900 hover:text-[#e85d04] cursor-pointer transition-colors"
            >
              {DEAL_OF_THE_DAY.name}
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {DEAL_OF_THE_DAY.subtitle}
            </p>

            {/* Pricing in Naira */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl font-black text-[#e85d04]">
                {formatNaira(DEAL_OF_THE_DAY.price)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formatNaira(DEAL_OF_THE_DAY.oldPrice)}
              </span>
              <span className="text-[10px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                Save 50%
              </span>
            </div>

            {/* Stock Left */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-[#e85d04]">
                <span>Only {DEAL_OF_THE_DAY.stockLeft} wigs left!</span>
                <span className="text-gray-400 font-normal">Selling fast</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden relative">
                <div className="bg-gradient-to-r from-orange-400 to-[#e85d04] h-full rounded-full w-2/5 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 text-center">
              <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                <div className="font-mono font-black text-xs text-gray-900">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-gray-400 font-semibold">HRS</div>
              </div>
              <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                <div className="font-mono font-black text-xs text-gray-900">
                  {String(timeLeft.mins).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-gray-400 font-semibold">MINS</div>
              </div>
              <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                <div className="font-mono font-black text-xs text-gray-900">
                  {String(timeLeft.secs).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-gray-400 font-semibold">SEC</div>
              </div>
              <div className="bg-[#faf6f1] border border-[#f1e6da] rounded-lg py-1 px-1">
                <div className="font-mono font-black text-xs text-[#e85d04]">
                  {String(timeLeft.msecs).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-gray-400 font-semibold">MSEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

