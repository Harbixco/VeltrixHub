import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function CategoryGrid({
  setActiveCategoryPage,
  setActiveNav,
  showToast,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
        <div>
          <span className="text-[#e85d04] text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#e85d04]" />
            CURATED SARTORIAL WARDROBE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Shop By Clothing Category
          </h2>
        </div>
        <p className="text-xs text-gray-500 max-w-sm text-left sm:text-right mt-1 sm:mt-0 font-medium">
          Handcrafted Senator kaftans, Super 150s bespoke suits, luxury resort sets, fine knitwear, and structured outerwear.
        </p>
      </div>

      {/* Grid: 1 column on mobile (Single Clothe category per row), 2 on tablet, 5 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            onClick={() => {
              setActiveCategoryPage(cat.name);
              setActiveNav(cat.name);
              window.scrollTo({ top: 0, behavior: "smooth" });
              if (showToast) showToast(`Viewing ${cat.name} Collection`);
            }}
            className="group bg-white rounded-3xl border border-[#f1e6da] p-3 sm:p-3.5 overflow-hidden cursor-pointer shadow-xs hover:shadow-2xl hover:border-[#e85d04]/40 transition-all flex flex-col justify-between"
          >
            {/* Photo with Overlay Badge */}
            <div className="relative w-full h-64 sm:h-56 rounded-2xl overflow-hidden bg-[#faf6f1] mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
              <span className="absolute top-2.5 right-2.5 text-[10px] bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full font-extrabold text-gray-800 shadow-xs">
                {cat.itemCount}
              </span>
            </div>

            {/* Info & Link */}
            <div className="text-center pb-1">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#e85d04] transition-colors mb-0.5">
                {cat.name}
              </h3>
              <span className="text-xs font-bold text-[#e85d04] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                {cat.linkText}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
