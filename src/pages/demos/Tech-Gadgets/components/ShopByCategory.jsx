import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/mobilexData";

export default function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 select-none">
      {/* Header Row - Cleanly aligned across mobile, tablet & desktop without awkward wrapping */}
      <div className="flex items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#FF6B00] block mb-1 truncate">
            CURATED DEPARTMENTS
          </span>
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

      {/* 5 Cards Row matching the requested template (First uploaded image) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
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
            className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300"
          >
            {/* Visual stage with top-right floating pill count */}
            <div className="relative w-full h-44 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-[#f0f2f5] mb-3 flex items-center justify-center p-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-lg sm:rounded-xl transform group-hover:scale-108 transition-transform duration-500"
              />

              {/* Floating Pill Badge in Top Right */}
              <span className="absolute top-2.5 right-2.5 text-[10px] sm:text-[11px] font-bold bg-white/95 backdrop-blur-md text-gray-800 px-2.5 py-1 rounded-full shadow-xs border border-black/5 pointer-events-none">
                {cat.count}
              </span>
            </div>

            {/* Category Name & "Shop Now →" Link below */}
            <div className="text-center pt-1 pb-1">
              <h3 className="font-extrabold text-sm sm:text-base text-gray-950 group-hover:text-[#FF6B00] transition-colors mb-1 leading-snug">
                {cat.name}
              </h3>
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
