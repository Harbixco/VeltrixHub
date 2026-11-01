export default function PerfumeLogo({
  variant = "dark", // "dark" (for light backgrounds) | "light" (for deep plum backgrounds)
  size = "md", // "sm" | "md" | "lg"
  showSubtitle = true,
}) {
  const isLight = variant === "light";

  // Sizing tokens
  const emblemSizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
  };

  const svgSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  const subSizes = {
    sm: "text-[7.5px]",
    md: "text-[8.5px] sm:text-[9.5px]",
    lg: "text-[9.5px] sm:text-[10.5px]",
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none text-left">
      {/* Bespoke Crystal Flacon Crest Emblem */}
      <div
        className={`${emblemSizes[size]} rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs group-hover:scale-105 ${
          isLight
            ? "bg-[#451C22]/90 border border-[#8A4852]/60 text-[#ECA5AC] group-hover:border-[#FFF5F3] group-hover:text-white"
            : "bg-[#FAF1F0] border border-[#EFE1DD] text-[#8A4852] group-hover:border-[#8A4852]/60 group-hover:bg-white"
        }`}
      >
        <svg
          className={`${svgSizes[size]} transition-transform duration-300 group-hover:rotate-3`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Crystal Octagonal Stopper */}
          <polygon points="10,2 14,2 15.5,5 8.5,5" />
          {/* Stopper Neck */}
          <line x1="10.5" y1="5" x2="10.5" y2="7" />
          <line x1="13.5" y1="5" x2="13.5" y2="7" />
          {/* Flacon Shoulders & Crystal Body */}
          <path d="M7 10.5 C7 8 9 7 12 7 C15 7, 17 8, 17 10.5 L17.5 20 C17.5 21.1 16.6 22 15.5 22 L8.5 22 C7.4 22 6.5 21.1 6.5 20 Z" />
          {/* Diamond Facet Centerpiece */}
          <polygon
            points="12,10.5 14,13 12,15.5 10,13"
            strokeWidth="1"
            opacity="0.85"
          />
          {/* Base facet highlight */}
          <line x1="9" y1="19.5" x2="15" y2="19.5" opacity="0.6" strokeWidth="1" />
        </svg>
      </div>

      {/* Haute Parfumerie Brand Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif font-black ${titleSizes[size]} tracking-[0.05em] leading-none transition-colors ${
            isLight ? "text-[#FFF5F3]" : "text-[#231819]"
          }`}
        >
          Aura
          <span
            className={`font-serif italic font-normal ml-0.5 ${
              isLight ? "text-[#ECA5AC]" : "text-[#9C5B66]"
            }`}
          >
            Scents
          </span>
        </span>

        {showSubtitle && (
          <span
            className={`${subSizes[size]} font-sans font-bold tracking-[0.28em] uppercase mt-1 leading-none whitespace-nowrap transition-colors ${
              isLight ? "text-[#EBD2D0]" : "text-[#8E7574]"
            }`}
          >
            Haute Parfumerie • Lagos
          </span>
        )}
      </div>
    </div>
  );
}

