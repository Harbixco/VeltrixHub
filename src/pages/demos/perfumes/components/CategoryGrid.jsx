import { motion } from "framer-motion";
import { CATEGORIES } from "../data/categories";

export default function CategoryGrid({
  setActiveCategoryPage,
  setActiveNav,
  showToast,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8">
        <div>
          <span className="text-[#9C5B66] text-xs font-bold tracking-widest uppercase">
            CURATED OLFACTORY FAMILIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#231819] tracking-tight mt-0.5">
            Shop By Fragrance Family
          </h2>
        </div>
        <p className="text-xs text-[#6D5C5B] max-w-sm text-left sm:text-right mt-1 sm:mt-0">
          Discover wild Cambodian ouds, decadent bourbon vanillas, French florals, and alcohol-free pure attar drops.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
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
              if (showToast) showToast(`Viewing ${cat.name} Family`);
            }}
            className="group bg-white rounded-3xl border border-[#EFE1DD] p-3 overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:border-[#8A4852]/50 transition-all flex flex-col justify-between"
          >
            {/* Photo with Overlay Badge */}
            <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-[#FAF1F0] mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-2 right-2 text-[10px] bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full font-bold text-[#231819] shadow-xs border border-[#EFE1DD]">
                {cat.itemCount}
              </span>
            </div>

            {/* Info & Link */}
            <div className="text-center pb-1">
              <h3 className="font-serif font-bold text-sm text-[#231819] group-hover:text-[#8A4852] transition-colors mb-0.5">
                {cat.name}
              </h3>
              <span className="text-xs font-bold text-[#8A4852] inline-flex items-center gap-1 group-hover:underline">
                {cat.linkText}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
