import { Link } from "react-router-dom";
import { Smartphone, MapPin, Phone, Mail, Lock, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0c10] text-gray-400 pt-14 pb-8 text-left select-none text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced 4-Column Grid ("Top Brands" section removed per user instructions) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link to="/demos/tech-gadgets" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#FF6B00]">
                <Smartphone size={17} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-2xl font-black tracking-tight text-white leading-none">
                  <span>Mobile</span>
                  <span className="text-[#FF6B00]">X</span>
                </div>
                <span className="text-[7px] font-bold text-gray-400 tracking-[0.18em] uppercase mt-0.5 leading-none">
                  YOUR WORLD, CONNECTED
                </span>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-sm text-xs font-normal">
              Nigeria&apos;s leading tech hub for original brand-new smartphones, pro laptops, earpods, heavy-duty powerbanks, and wearables with express delivery across all 36 states.
            </p>

            {/* Social Icons including WhatsApp */}
            <div className="flex items-center gap-3 pt-1 text-gray-400">
              <a
                href="https://wa.me/2348087098270"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="hover:text-[#25D366] transition-colors"
              >
                <FaWhatsapp size={14} />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <FaYoutube size={13} />
              </a>
              <a
                href="#twitter"
                aria-label="X (Twitter)"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <FaXTwitter size={13} />
              </a>
            </div>
          </div>

          {/* Col 2: QUICK LINKS (3 cols) -> Proper page links (Hidden on mobile per instructions) */}
          <div className="hidden sm:block lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/demos/tech-gadgets"
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/products"
                  className="hover:text-white transition-colors"
                >
                  All Tech Products Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/categories"
                  className="hover:text-white transition-colors"
                >
                  All Categories Showcase
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/brands"
                  className="hover:text-white transition-colors"
                >
                  Featured Brands Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/about"
                  className="hover:text-white transition-colors"
                >
                  About MobileX Nigeria
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/faqs"
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: CUSTOMER CARE (2 cols) -> Proper page links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/demos/tech-gadgets/tracking"
                  className="hover:text-white transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/shipping"
                  className="hover:text-white transition-colors"
                >
                  Nationwide Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/warranty"
                  className="hover:text-white transition-colors"
                >
                  Warranty & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/verification"
                  className="hover:text-white transition-colors text-[#FF6B00] font-bold"
                >
                  IMEI Verification
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/faqs"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/demos/tech-gadgets/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: VISIT OUR STORE (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              VISIT OUR STORE
            </h4>
            <div className="space-y-2.5 text-gray-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 text-[#FF6B00] mt-0.5" />
                <span>Computer Village, 12 Otigba St, Ikeja, Lagos, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} className="shrink-0 text-[#FF6B00]" />
                <span>+234 (0) 808 662 4539</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="shrink-0 text-[#FF6B00]" />
                <span className="truncate">sales@mobilex.ng</span>
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/2348087098270"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-[#25D366] text-white text-[11px] font-bold transition-colors cursor-pointer"
                >
                  <FaWhatsapp size={12} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges (Matching Uploaded Template) */}
        <div className="pt-6 pb-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300">
              <Lock size={12} className="text-emerald-400" />
              <span>256–Bit SSL Encrypted</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300">
              <ShieldCheck size={13} className="text-[#FF6B00]" />
              <span>Paystack Secured</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Bank Transfer / Verve / Mastercard</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Veltrix Hub Credit */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-center sm:text-left">
          <p className="font-medium text-white/90">
            © {new Date().getFullYear()} MobileX Technologies Ltd All Rights Reserved.
          </p>
          <p className="text-gray-400 flex flex-wrap items-center justify-center gap-1.5">
            <span>E-Commerce Store Built by</span>
            <a
              href="https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub!%20I%20checked%20out%20your%20MobileX%20tech%20gadgets%20store%20demo%20and%20want%20to%20build%20a%20similar%20website%20for%20my%20brand."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B00] hover:text-orange-400 font-bold underline underline-offset-2"
            >
              Veltrix Hub — Launch for your brand →
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
