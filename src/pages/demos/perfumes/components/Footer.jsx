import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import PerfumeLogo from "./PerfumeLogo";
import { WHATSAPP_NUMBER } from "../utils/helpers";

export default function Footer({
  setActiveCategoryPage,
  setActiveNav,
  setActivePolicyModal,
  setExpandedFaq,
  showToast,
}) {
  return (
    <footer className="bg-[#F6EAE7] text-[#231819] border-t border-[#EFE1DD] pt-14 pb-4 text-left select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <PerfumeLogo variant="dark" size="lg" />

            <p className="text-xs text-[#6D5C5B] leading-relaxed max-w-xs font-serif">
              Master-crafted Extrait de Parfums and authentic pure Arabian attars. Curated for distinguished scent signatures across Nigeria.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1 text-[#6D5C5B]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#EFE1DD] flex items-center justify-center hover:text-[#8A4852] hover:border-[#8A4852] transition-colors shadow-2xs"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#EFE1DD] flex items-center justify-center hover:text-[#8A4852] hover:border-[#8A4852] transition-colors shadow-2xs"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#EFE1DD] flex items-center justify-center hover:text-[#8A4852] hover:border-[#8A4852] transition-colors shadow-2xs"
              >
                <FaTwitter size={13} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Nose Concierge"
                className="w-8 h-8 rounded-full bg-emerald-700/10 border border-emerald-600/30 flex items-center justify-center text-emerald-700 hover:text-white hover:bg-emerald-700 transition-colors shadow-2xs"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: OLFACTORY FAMILIES */}
          <div className="hidden md:block">
            <h4 className="font-serif font-black text-xs text-[#231819] uppercase tracking-widest mb-4">
              OLFACTORY FAMILIES
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6D5C5B] font-medium">
              {[
                "Oud & Oriental",
                "Gourmand & Vanilla",
                "Floral & Botanical",
                "Fresh & Woody Aquatic",
                "Attar & Pure Oils",
              ].map((family) => (
                <li key={family}>
                  <button
                    onClick={() => {
                      setActiveCategoryPage(family);
                      setActiveNav(family);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      if (showToast) showToast(`Browsing ${family} Vault`);
                    }}
                    className="hover:text-[#8A4852] transition-colors text-left cursor-pointer"
                  >
                    {family}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: CONCIERGE & TRUST */}
          <div>
            <h4 className="font-serif font-black text-xs text-[#231819] uppercase tracking-widest mb-4">
              CONCIERGE & CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6D5C5B] font-medium">
              {[
                { label: "Client FAQs", key: "faqs" },
                { label: "Batch Code Verification", key: "authenticity" },
                { label: "Discreet Delivery Lagos & FCT", key: "shipping" },
                { label: "Returns & Flacon Guarantee", key: "returns" },
                { label: "Perfume Preservation Guide", key: "storage" },
              ].map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => {
                      setActivePolicyModal(link.key);
                      if (link.key === "faqs" && setExpandedFaq)
                        setExpandedFaq(0);
                    }}
                    className="hover:text-[#8A4852] transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: SHOWROOM */}
          <div>
            <h4 className="font-serif font-black text-xs text-[#231819] uppercase tracking-widest mb-4">
              LAGOS SHOWROOM
            </h4>
            <ul className="space-y-3 text-xs text-[#6D5C5B]">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#8A4852] shrink-0" />
                <span>info@veltrixhub.ng</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#8A4852] shrink-0" />
                <span>+234 808 662 4539</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#8A4852] shrink-0 mt-0.5" />
                <span>Plot 18A Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="pt-1 text-[11px] text-[#8E7574]">
                <span>Showroom Hours: Mon – Sat, 10:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#231819] text-[#EBD2D0] py-4 px-4 text-[11px] text-center border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="font-medium text-[#FFF5F3]">
            © {new Date().getFullYear()} AuraScents Parfumerie. Haute Parfumerie Lagos. All rights reserved.
          </p>
          <p className="text-[#EBD2D0] flex items-center justify-center gap-1.5">
            <span>E-Commerce Store Built by</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Veltrix Hub! I checked out your AuraScents luxury perfume demo store and want to build a similar website for my brand."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ECA5AC] hover:text-[#FFF5F3] font-bold underline underline-offset-2"
            >
              Veltrix Hub — Launch for your brand →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
