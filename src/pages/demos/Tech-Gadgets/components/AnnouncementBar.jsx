import { MapPin, Truck, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#111418] text-[#9ca3af] py-2 px-4 text-xs font-normal border-b border-white/5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between gap-2 text-center md:text-left">
        {/* Left: Nigerian Tech Hub Location (Desktop only) */}
        <div className="hidden md:flex items-center gap-1.5 justify-center md:justify-start">
          <MapPin size={13} className="text-[#FF6B00] shrink-0" />
          <span>Computer Village, 12 Otigba St, Ikeja, Lagos</span>
        </div>

        {/* Center: Free Nationwide Shipping in Naira */}
        <div className="flex items-center gap-2 justify-center text-center">
          <Truck size={14} className="text-[#FF6B00] shrink-0" />
          <span className="text-gray-200 text-center leading-tight">
            Free Express Nationwide Delivery
            <br />
            on orders over ₦100,000
          </span>
        </div>

        {/* Right: Phone & Socials (Desktop only) */}
        <div className="hidden md:flex items-center gap-4 justify-center md:justify-end">
          <a
            href="tel:+2348087098270"
            className="flex items-center gap-1.5 text-gray-300 hover:text-[#FF6B00] transition-colors"
          >
            <Phone size={13} className="shrink-0" />
            <span>+234 (0) 808 662 4539</span>
          </a>

          <div className="flex items-center gap-3 text-gray-400">
            <a
              href="https://wa.me/2348087098270"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-[#25D366] transition-colors"
            >
              <FaWhatsapp size={13} />
            </a>
            <a
              href="#facebook"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <FaFacebookF size={12} />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <FaInstagram size={12} />
            </a>
            <a
              href="#youtube"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <FaYoutube size={12} />
            </a>
            <a
              href="#twitter"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors"
            >
              <FaXTwitter size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
