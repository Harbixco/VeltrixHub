import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { WHATSAPP_NUMBER } from "../utils/helpers";

export default function Footer({
  setActiveCategoryPage,
  setActiveNav,
  setActivePolicyModal,
  setExpandedFaq,
  showToast,
}) {
  return (
    <footer className="bg-[#fcf8f4] border-t border-[#f1e6da] pt-14 pb-4 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#e85d04] flex items-center justify-center text-white shadow-sm">
                <ShoppingBag size={20} />
              </div>
              <div>
                <span className="font-black text-xl text-gray-900 block leading-none">
                  ShopEase
                </span>
                <span className="text-[10px] text-[#e85d04] font-semibold tracking-wide">
                  Shop Smart, Live Better
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Your one-stop destination for quality clothes, footwears,
              perfumes, creams, and virgin human hair wigs.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1 text-gray-600">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
              >
                <FaTwitter size={13} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center hover:text-[#e85d04] hover:border-[#e85d04] shadow-2xs transition-colors"
              >
                <FaPinterestP size={13} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Stylist Concierge"
                className="w-8 h-8 rounded-full bg-white border border-[#f1e6da] flex items-center justify-center text-emerald-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-2xs transition-colors"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: QUICK LINKS */}
          <div className="hidden md:block">
            <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              {["Women", "Men", "Footwear", "Perfume", "Beauty & Hair"].map(
                (link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const catKey =
                          link === "Beauty & Hair" ? "Beauty" : link;
                        setActiveCategoryPage(catKey);
                        setActiveNav(link);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        if (showToast) showToast(`Viewing ${link} Collection`);
                      }}
                      className="hover:text-[#e85d04] transition-colors text-left"
                    >
                      {link} Collection
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE */}
          <div>
            <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              {[
                { label: "FAQs", key: "faqs" },
                { label: "Shipping Policy", key: "shipping" },
                { label: "Returns & Refunds", key: "returns" },
                { label: "Terms & Conditions", key: "terms" },
                { label: "Privacy Policy", key: "privacy" },
              ].map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => {
                      setActivePolicyModal(link.key);
                      if (link.key === "faqs" && setExpandedFaq)
                        setExpandedFaq(0);
                    }}
                    className="hover:text-[#e85d04] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: CONTACT US */}
          <div>
            <h4 className="font-black text-xs text-gray-900 uppercase tracking-wider mb-4">
              CONTACT US
            </h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#e85d04] shrink-0" />
                <span>support@shopease.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#e85d04] shrink-0" />
                <span>+234 808 709 8270</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#e85d04] shrink-0 mt-0.5" />
                <span>Plot 12 Victoria Island, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar: Dynamic Current Year & Clean */}
      <div className="bg-[#081d16] text-[#94a3b8] py-4 px-4 text-[11px] text-center border-t border-black/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="font-medium text-white/90">
            © {new Date().getFullYear()} ShopEase Boutique. All rights reserved.
          </p>
          <p className="text-gray-400 flex items-center justify-center gap-1.5">
            <span>E-Commerce Store Built by</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello Veltrix Hub! I checked out your ShopEase fashion/beauty store demo and want to build a similar website for my brand."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e85d04] hover:text-orange-400 font-bold underline underline-offset-2"
            >
              Veltrix Hub — Launch for your brand →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

