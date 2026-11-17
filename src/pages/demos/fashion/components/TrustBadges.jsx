import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

export default function TrustBadges({ setActivePolicyModal, setExpandedFaq }) {
  return (
    <section className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-[#fcf7f2] border border-[#f1e6da] rounded-2xl p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xs">
        {/* Free Shipping */}
        <div
          onClick={() => setActivePolicyModal("shipping")}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
            <Truck size={19} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
              Free Shipping
            </h4>
            <p className="text-[11px] text-gray-500">On orders over ₦100,000</p>
          </div>
        </div>

        {/* Easy Returns */}
        <div
          onClick={() => setActivePolicyModal("returns")}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
            <RotateCcw size={19} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
              Easy Returns
            </h4>
            <p className="text-[11px] text-gray-500">30-day returns</p>
          </div>
        </div>

        {/* Noble Fabrics */}
        <div
          onClick={() => setActivePolicyModal("terms")}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
            <ShieldCheck size={19} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
              Noble Fabrics
            </h4>
            <p className="text-[11px] text-gray-500">Pure Silk, Wool & Linen</p>
          </div>
        </div>

        {/* Atelier Stylist */}
        <div
          onClick={() => {
            setActivePolicyModal("faqs");
            if (setExpandedFaq) setExpandedFaq(0);
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-white border border-[#f1e6da] flex items-center justify-center text-[#e85d04] shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-[#e85d04] group-hover:text-white transition-all">
            <Headphones size={19} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 group-hover:text-[#e85d04] transition-colors leading-snug">
              Atelier Stylist
            </h4>
            <p className="text-[11px] text-gray-500">Custom Fitting Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

