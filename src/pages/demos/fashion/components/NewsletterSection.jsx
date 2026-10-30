import { Tag } from "lucide-react";

export default function NewsletterSection({
  emailInput,
  setEmailInput,
  handleSubscribe,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#0c261e] text-white rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Left Heading */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-[#e85d04] text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
            <Tag size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-extrabold text-xl text-white tracking-tight">
              Get Exclusive Offers & Updates
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
              Sign up now and get 10% OFF on your first order!
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
            className="w-full sm:w-80 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e85d04] shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}

