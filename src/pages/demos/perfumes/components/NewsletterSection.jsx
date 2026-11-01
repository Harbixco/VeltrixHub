import { Sparkles, ArrowRight } from "lucide-react";

export default function NewsletterSection({
  emailInput,
  setEmailInput,
  handleSubscribe,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      <div className="bg-gradient-to-br from-[#5A2931] via-[#6E3A42] to-[#451C22] text-[#FFF5F3] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-[#8A4852]/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ECA5AC]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Heading */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#8A4852] to-[#5A2931] text-[#FFF5F3] flex items-center justify-center shrink-0 shadow-lg shadow-black/30 border border-[#8A4852]/50">
            <Sparkles size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-serif font-black text-xl sm:text-2xl text-[#FFF5F3] tracking-tight">
              Stay in the Loop
            </h3>
            <p className="text-xs sm:text-sm text-[#EBD2D0] mt-0.5">
              Subscribe for exclusive private cellar offers, new extraits, and a ₦15,000 welcome voucher.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubscribe}
          className="w-full md:w-auto flex items-center gap-2 relative z-10"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full sm:w-80 px-4 py-3 rounded-full bg-white text-[#231819] placeholder-[#8E7574] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8A4852] shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#ECA5AC] hover:bg-white text-[#231819] text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-black/30 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>JOIN</span>
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </section>
  );
}
