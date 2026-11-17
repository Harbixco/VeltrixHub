import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/mobilexData";

export default function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* Header Row */}
      <div className="flex items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight whitespace-nowrap">
            Shop By Category
          </h2>
        </div>

        {/* Link to dedicated Categories Page */}
        <Link
          to="/demos/tech-gadgets/categories"
          className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#FF6B00] sm:text-gray-800 hover:text-[#FF6B00] transition-colors uppercase tracking-wider cursor-pointer group shrink-0 whitespace-nowrap pb-0.5"
        >
          <span>
            <span className="hidden sm:inline">VIEW ALL CATEGORIES</span>
            <span className="sm:hidden">VIEW ALL</span>
          </span>
          <ChevronRight
            size={14}
            className="transform group-hover:translate-x-1 transition-transform shrink-0"
          />
        </Link>
      </div>

      {/* Grid: 1 column on mobile (single device per row), 2 on tablet, 5 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(
                `/demos/tech-gadgets/products?category=${encodeURIComponent(
                  cat.name
                )}`
              )
            }
            className="group bg-white rounded-3xl border border-gray-100 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300"
          >
            {/* Pure, Clean Device Photo: Full Gadget Display with Zero Text Overlay */}
            <div className="relative w-full h-64 sm:h-52 rounded-2xl overflow-hidden bg-[#faf6f1] mb-3 flex items-center justify-center p-3.5">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Category Info Cleanly Below the Photo */}
            <div className="text-center pt-1 pb-1">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-950 group-hover:text-[#FF6B00] transition-colors mb-0.5 leading-snug">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-500 font-medium mb-1">
                {cat.count}
              </p>
              <span className="text-xs font-bold text-[#FF6B00] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Shop Now →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
