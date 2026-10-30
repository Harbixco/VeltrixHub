import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export default function CategoriesSection({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      {/* Header Row strictly matching image */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Shop by Category
        </h2>

        <a
          href="#trending"
          className="text-xs sm:text-sm font-bold text-[#0066FF] hover:underline flex items-center gap-1 group cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight
            size={14}
            className="transform group-hover:translate-x-0.5 transition-transform"
          />
        </a>
      </div>

      {/* 7 Categories Grid strictly matching template */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`bg-[#f8fafc] hover:bg-white rounded-2xl border p-3 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 shadow-2xs hover:shadow-md ${
                isSelected
                  ? "border-[#0066FF] ring-2 ring-[#0066FF]/20 bg-white"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              {/* Product Visual Container */}
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-2 rounded-xl mb-1">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
                />
              </div>

              {/* Category Name with chevron */}
              <div className="flex items-center gap-1 font-bold text-xs sm:text-[13px] text-gray-900 mt-1">
                <span>{cat.name}</span>
                <span className="text-gray-400 text-xs">›</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
