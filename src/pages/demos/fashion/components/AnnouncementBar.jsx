import { Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../utils/helpers";

export default function AnnouncementBar({ setActivePolicyModal }) {
  return (
    <div className="bg-[#081d16] text-[#e2e8f0] py-2 px-4 text-xs font-medium border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2 text-center sm:text-left">
        {/* Delivery Announcement - Centered & 2 lines on mobile */}
        <div className="flex items-center gap-2 justify-center text-center">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-center leading-tight">
            Complimentary nationwide delivery
            <br />
            on all orders over ₦100,000
          </span>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#cbd5e1]">
          <Sparkles size={13} className="text-[#f06428]" />
          <span>New Season: 25 Bespoke Tailored Garments & Haute Prêt-à-Porter</span>
        </div>

        {/* Right (Desktop only) */}
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello Atelier Veltrix! I would like assistance with bespoke tailoring and garment sizing."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f06428] hover:text-orange-400 font-bold transition-colors flex items-center gap-1"
          >
            <FaWhatsapp size={13} />
            <span>VIP Atelier Concierge</span>
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setActivePolicyModal("faqs")}
            className="text-[#94a3b8] hover:text-white transition-colors"
          >
            Help & FAQs
          </button>
        </div>
      </div>
    </div>
  );
}

