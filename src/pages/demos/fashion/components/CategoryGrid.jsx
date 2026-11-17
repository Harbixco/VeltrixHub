import { motion } from "framer-motion";
import { CATEGORIES } from "../data/categories";

export default function CategoryGrid({
  setActiveCategoryPage,
  setActiveNav,
  showToast,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shop By Clothing Category
          </h2>
        </div>
        <p className="text-xs text-gray-500 max-w-sm text-left sm:text-right mt-1 sm:mt-0 font-medium">
          Handcrafted Senator kaftans, Super 150s bespoke suits, luxury resort sets, and fine tailored garments.
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
            className="group bg-white rounded-3xl border border-[#f1e6da] p-3 sm:p-3.5 overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:border-[#e85d04]/40 transition-all flex flex-col justify-between"
          >
            {/* Pure, Clean Photo with Zero Text Overlay */}
            <div className="relative w-full h-72 sm:h-56 rounded-2xl overflow-hidden bg-[#faf6f1] mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-700"
              />
            </div>

            {/* Info & Link Cleanly Below the Photo */}
            <div className="text-center pb-1">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#e85d04] transition-colors mb-0.5">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium mb-1">
                {cat.itemCount}
              </p>
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
