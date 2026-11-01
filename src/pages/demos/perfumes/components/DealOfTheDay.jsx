import { motion } from "framer-motion";
import { Flame, Clock, ArrowRight, Eye, Star } from "lucide-react";
import { DEAL_OF_THE_DAY } from "../data/dealOfTheDay";
import { formatNaira } from "../utils/helpers";

export default function DealOfTheDay({ timeLeft, addToCart, openModal }) {
  return (
    <section id="deal-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 select-none">
      <div className="bg-gradient-to-br from-[#5A2931] via-[#6E3A42] to-[#451C22] border border-[#8A4852]/40 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl text-white relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#ECA5AC]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Description */}
        <div className="flex-1 space-y-4 text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#451C22]/90 border border-[#8A4852]/40 text-[#ECA5AC] text-xs font-black tracking-widest uppercase">
            <Flame size={14} className="text-[#ECA5AC]" />
            LIMITED SCENT ALLOTMENT
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#FFF5F3] tracking-tight leading-tight">
            Claim Your Signature <br />
            <span className="text-[#ECA5AC] italic font-normal">Before It's Gone!</span>
          </h2>

          <p className="text-[#EBD2D0] text-xs sm:text-sm font-medium max-w-md leading-relaxed">
            Hurry! Strictly limited cellar batch. Over 312 fragrance connoisseurs in Lagos and Abuja claimed their flacon this week.
          </p>

          {/* Live Urgency Countdown Timer */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[11px] font-bold text-[#EBD2D0] uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={13} className="text-[#ECA5AC]" />
              Offer Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black">
              <div className="bg-[#451C22] text-[#FFF5F3] border border-[#8A4852]/40 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.hours).padStart(2, "0")}h
              </div>
              <span className="text-[#ECA5AC] font-bold">:</span>
              <div className="bg-[#451C22] text-[#FFF5F3] border border-[#8A4852]/40 px-2.5 py-1 rounded-lg shadow-xs">
                {String(timeLeft.mins).padStart(2, "0")}m
              </div>
              <span className="text-[#ECA5AC] font-bold">:</span>
              <motion.div
                key={timeLeft.secs}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-[#8A4852] text-white px-2.5 py-1 rounded-lg shadow-xs border border-white/20"
              >
                {String(timeLeft.secs).padStart(2, "0")}s
              </motion.div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => addToCart(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ECA5AC] hover:bg-white text-[#231819] font-black text-xs uppercase tracking-wider shadow-lg shadow-black/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>CLAIM SCENT DEAL</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => openModal(DEAL_OF_THE_DAY)}
              className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white/10 border border-white/25 text-[#FFF5F3] hover:text-white text-xs font-bold shadow-xs hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Eye size={14} />
              <span>Inspect Flacon</span>
            </button>
          </div>
        </div>

        {/* Right Product Card with Countdown */}
        <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl bg-white rounded-3xl border border-[#EFE1DD] p-4 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6 relative z-10 text-[#231819]">
          {/* Product Image */}
          <div
            onClick={() => openModal(DEAL_OF_THE_DAY)}
            className="w-full h-64 sm:h-auto sm:w-52 md:w-60 lg:w-64 min-h-[240px] sm:min-h-[280px] rounded-2xl bg-[#FAF1F0] p-2 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group relative"
          >
            <img
              src={DEAL_OF_THE_DAY.image}
              alt={DEAL_OF_THE_DAY.name}
              className="w-full h-full object-cover object-center rounded-xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 bg-[#451C22]/90 backdrop-blur-md text-[#ECA5AC] border border-[#8A4852]/40 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider">
              {DEAL_OF_THE_DAY.sillage}
            </span>
          </div>

          {/* Product Details & Timer */}
          <div className="flex-1 min-w-0 text-left space-y-2">
            <div className="flex items-center gap-1 text-[#8A4852] text-xs font-bold">
              <Star size={13} fill="currentColor" />
              <span>{DEAL_OF_THE_DAY.rating}</span>
              <span className="text-[#8E7574] font-normal">
                ({DEAL_OF_THE_DAY.reviewsCount} verified reviews)
              </span>
            </div>

            <h3
              onClick={() => openModal(DEAL_OF_THE_DAY)}
              className="font-serif font-black text-base sm:text-lg text-[#231819] hover:text-[#8A4852] cursor-pointer transition-colors leading-snug"
            >
              {DEAL_OF_THE_DAY.name}
            </h3>
            <p className="text-xs text-[#6D5C5B] font-medium line-clamp-2">
              {DEAL_OF_THE_DAY.subtitle}
            </p>

            {/* Pricing in Naira */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="text-2xl font-black text-[#8A4852] font-mono">
                {formatNaira(DEAL_OF_THE_DAY.price)}
              </span>
              <span className="text-xs text-[#8E7574] line-through font-mono">
                {formatNaira(DEAL_OF_THE_DAY.oldPrice)}
              </span>
              <span className="text-[10px] font-black bg-[#FAF1F0] text-[#8A4852] border border-[#EFE1DD] px-1.5 py-0.5 rounded">
                Save 40%
              </span>
            </div>

            {/* Stock Left */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-[#8A4852]">
                <span>Only {DEAL_OF_THE_DAY.stockLeft} flacons left in cellar!</span>
                <span className="text-[#8E7574] font-normal">Selling fast</span>
              </div>
              <div className="w-full bg-[#FAF1F0] h-2 rounded-full overflow-hidden relative border border-[#EFE1DD]">
                <div className="bg-gradient-to-r from-[#9C5B66] to-[#8A4852] h-full rounded-full w-2/5 relative overflow-hidden">
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

            {/* Countdown Box */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 text-center">
              <div className="bg-[#FAF1F0] border border-[#EFE1DD] rounded-xl py-1 px-1">
                <div className="font-mono font-black text-xs text-[#231819]">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-[#8E7574] font-semibold">HRS</div>
              </div>
              <div className="bg-[#FAF1F0] border border-[#EFE1DD] rounded-xl py-1 px-1">
                <div className="font-mono font-black text-xs text-[#231819]">
                  {String(timeLeft.mins).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-[#8E7574] font-semibold">MINS</div>
              </div>
              <div className="bg-[#FAF1F0] border border-[#EFE1DD] rounded-xl py-1 px-1">
                <div className="font-mono font-black text-xs text-[#231819]">
                  {String(timeLeft.secs).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-[#8E7574] font-semibold">SEC</div>
              </div>
              <div className="bg-[#FAF1F0] border border-[#EFE1DD] rounded-xl py-1 px-1">
                <div className="font-mono font-black text-xs text-[#8A4852]">
                  {String(timeLeft.msecs).padStart(2, "0")}
                </div>
                <div className="text-[9px] text-[#8E7574] font-semibold">MSEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
