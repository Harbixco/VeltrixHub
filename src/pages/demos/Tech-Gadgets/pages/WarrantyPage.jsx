import { Link } from "react-router-dom";
import { ShieldCheck, RotateCcw, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function WarrantyPage() {
  const handleClaimWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello MobileX Support! I would like to initiate a warranty / replacement request for my device."
    );
    window.open(`https://wa.me/2348087098270?text=${text}`, "_blank");
  };

  return (
    <PageTransition>
      <SEO
        title="Warranty & Returns Policy | MobileX Nigeria"
        description="Learn about our 7-day instant replacement guarantee and 1-year official manufacturer warranty on all smartphones and laptops."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Warranty & Returns</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>TOTAL BUYER PROTECTION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Warranty & Returns Guarantee
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Every gadget sold by MobileX comes backed by comprehensive warranty coverage and an instant swap guarantee.
            </p>
          </div>

          <div className="space-y-8">
            {/* 7-Day Replacement Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/60 border border-orange-200/80 space-y-3">
              <div className="flex items-center gap-2 text-[#FF6B00] font-black text-sm uppercase tracking-wide">
                <RotateCcw size={18} />
                <span>7-Day Instant Swap Guarantee</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                Found a defect? Swap for brand-new unit immediately.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                If your device exhibits any hardware, screen, or software defect within the first 7 days following delivery, we provide an immediate brand-new replacement unit with zero questions asked, or a 100% full refund.
              </p>
            </div>

            {/* 1-Year Official Warranty */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-5">
              <h3 className="text-lg font-black text-gray-950">
                12-Month Official Manufacturer Warranty
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                All Apple, Samsung, OnePlus, Xiaomi, and Google gadgets purchased through MobileX come with full 1-year manufacturer warranty coverage through authorized Nigerian service centers (e.g., Apple Authorized Service Providers, Samsung Customer Service Centers).
              </p>

              {/* Covered vs Not Covered */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                  <span className="font-bold text-xs uppercase text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 size={15} />
                    <span>Covered by Warranty</span>
                  </span>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                    <li>Factory motherboard or logic board failure</li>
                    <li>Unresponsive touchscreen or sensor defects</li>
                    <li>Internal battery failure not holding charge</li>
                    <li>Camera module sensor distortion</li>
                    <li>Speaker or microphone factory defect</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <span className="font-bold text-xs uppercase text-gray-800 flex items-center gap-1.5">
                    <AlertCircle size={15} className="text-amber-500" />
                    <span>Not Covered</span>
                  </span>
                  <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                    <li>Physical damage from dropping or cracked screen</li>
                    <li>Liquid ingress or submersion damage</li>
                    <li>Opening or repairing by unauthorized third-parties</li>
                    <li>Extreme electrical power surge from ungrounded sockets</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Claim */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-left">
                <h4 className="font-black text-base text-gray-950">Need to make a warranty claim?</h4>
                <p className="text-xs text-gray-500">
                  Message our technical desk on WhatsApp with your receipt or IMEI number.
                </p>
              </div>

              <button
                onClick={handleClaimWhatsApp}
                className="px-6 py-3 rounded-xl bg-[#0E8453] hover:bg-[#0c7348] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-md shadow-emerald-600/20"
              >
                <FaWhatsapp size={16} />
                <span>Message Warranty Desk</span>
              </button>
            </div>
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

