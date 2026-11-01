import { Sparkles, Clock, Heart, Award } from "lucide-react";

export default function TrustBadges({ setActivePolicyModal, setExpandedFaq }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 select-none">
      <div className="bg-[#FAF1F0] border border-[#F1DFDC] rounded-3xl p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shadow-xs">
        {/* Premium Ingredients */}
        <div
          onClick={() => setActivePolicyModal("authenticity")}
          className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66] shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#8A4852] group-hover:text-white transition-all">
            <Award size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#231819] group-hover:text-[#8A4852] transition-colors leading-snug font-serif">
              Premium Ingredients
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#6D5C5B]">Sourced Globally</p>
          </div>
        </div>

        {/* Long Lasting Fragrance */}
        <div
          onClick={() => setActivePolicyModal("storage")}
          className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66] shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#8A4852] group-hover:text-white transition-all">
            <Clock size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#231819] group-hover:text-[#8A4852] transition-colors leading-snug font-serif">
              Long Lasting
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#6D5C5B]">24hr Sillage Fragrance</p>
          </div>
        </div>

        {/* Artisan Crafted */}
        <div
          onClick={() => setActivePolicyModal("authenticity")}
          className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66] shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#8A4852] group-hover:text-white transition-all">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#231819] group-hover:text-[#8A4852] transition-colors leading-snug font-serif">
              Artisan Crafted
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#6D5C5B]">For High Perfection</p>
          </div>
        </div>

        {/* Luxury Packaging */}
        <div
          onClick={() => {
            setActivePolicyModal("shipping");
            setExpandedFaq(0);
          }}
          className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer text-left"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-[#EFE1DD] flex items-center justify-center text-[#9C5B66] shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#8A4852] group-hover:text-white transition-all">
            <Heart size={18} />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-[#231819] group-hover:text-[#8A4852] transition-colors leading-snug font-serif">
              Luxury Packaging
            </h4>
            <p className="text-[10px] sm:text-[11px] text-[#6D5C5B]">Made with Love</p>
          </div>
        </div>
      </div>
    </section>
  );
}
