import { useState } from "react";
import { Send, Truck, Lock } from "lucide-react";

export default function NewsletterSection({ showToast }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast?.("Thank you for subscribing to MobileX updates!");
      setEmail("");
    }
  };

  return (
    <section className="bg-[#111418] text-white py-8 px-4 sm:px-6 lg:px-8 border-t border-b border-white/5 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Orange plane icon + Title & Subtitle */}
        <div className="flex items-center gap-3.5 text-left w-full lg:w-auto">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shrink-0">
            <Send size={18} className="transform -rotate-12" />
          </div>
          <div>
            <span className="text-[9.5px] font-black uppercase tracking-widest text-[#FF6B00] block">
              STAY UPDATED
            </span>
            <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
              Subscribe to our Newsletter
            </h3>
            <p className="text-[11px] text-gray-400 font-normal leading-snug">
              Get the latest updates on new arrivals, exclusive deals and special offers.
            </p>
          </div>
        </div>

        {/* Center: Input Box + Orange Subscribe Button */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-auto flex items-center gap-2 max-w-md"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 sm:w-64 px-3.5 py-2.5 rounded-md bg-white border-none text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            SUBSCRIBE
          </button>
        </form>

    
      </div>
    </section>
  );
}
