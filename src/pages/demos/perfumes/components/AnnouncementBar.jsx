import { Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../utils/helpers";

export default function AnnouncementBar({ setActivePolicyModal }) {
  return (
    <div className="bg-[#451C22] text-[#EBD2D0] py-2 px-4 text-xs font-medium border-b border-[#5A2931]/40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2 text-center sm:text-left">
        {/* Delivery Announcement */}
        <div className="flex items-center gap-2 justify-center text-center">
          <span className="w-2 h-2 rounded-full bg-[#ECA5AC] animate-pulse shrink-0" />
          <span className="text-center leading-tight">
            Complimentary express delivery
            <br className="sm:hidden" />
            <span className="sm:ml-1">on orders over ₦150,000</span>
          </span>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#EBD2D0]">
          <Sparkles size={13} className="text-[#ECA5AC]" />
          <span>Haute Parfumerie: Batch-Code Certified 100% Original Flacons</span>
        </div>

        {/* Right (Desktop only) */}
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello AuraScents! 👋 I would like a consultation with a Scent Specialist to help choose my signature fragrance."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ECA5AC] hover:text-[#FFF5F3] font-bold transition-colors flex items-center gap-1"
          >
            <FaWhatsapp size={13} />
            <span>VIP Scent Specialist</span>
          </a>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setActivePolicyModal("faqs")}
            className="text-[#EBD2D0] hover:text-white transition-colors cursor-pointer"
          >
            Sillage & FAQs
          </button>
        </div>
      </div>
    </div>
  );
}
