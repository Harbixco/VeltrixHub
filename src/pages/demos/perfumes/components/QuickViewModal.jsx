import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira, generateSingleProductWhatsAppUrl } from "../utils/helpers";

export default function QuickViewModal({
  activeModalProduct,
  setActiveModalProduct,
  activeImageIndex,
  setActiveImageIndex,
  modalSize,
  setModalSize,
  modalQty,
  currentModalImages,
  addToCart,
}) {
  return (
    <AnimatePresence>
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProduct(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-3xl w-full max-w-3xl overflow-hidden z-10 shadow-2xl p-5 sm:p-8 text-left border border-[#EFE1DD] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FAF1F0] hover:bg-[#EFE1DD] text-[#231819] flex items-center justify-center transition-colors cursor-pointer"
              title="Close modal"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* LEFT: Multi-Image Bottle Gallery */}
              <div className="space-y-3">
                {/* Main Stage with Carousel Nav */}
                <div className="relative w-full h-72 sm:h-92 rounded-3xl bg-[#FAF1F0] p-4 flex items-center justify-center overflow-hidden border border-[#EFE1DD] group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      src={
                        currentModalImages[activeImageIndex] ||
                        activeModalProduct.image
                      }
                      alt={`${activeModalProduct.name} - view ${
                        activeImageIndex + 1
                      }`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-lg"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {currentModalImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev > 0 ? prev - 1 : currentModalImages.length - 1
                          );
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#231819] flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
                        aria-label="Previous angle"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) =>
                            prev < currentModalImages.length - 1 ? prev + 1 : 0
                          );
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#231819] flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
                        aria-label="Next angle"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Image Index Counter */}
                      <div className="absolute bottom-3 right-3 bg-[#5A2931]/80 text-[#FFF5F3] text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {activeImageIndex + 1} / {currentModalImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {currentModalImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {currentModalImages.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#FAF1F0] border-2 transition-all p-1.5 shrink-0 cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-[#8A4852] ring-2 ring-[#8A4852]/30 scale-102 opacity-100"
                            : "border-[#EFE1DD] hover:border-[#8A4852] opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-1 right-1 text-[8px] font-bold bg-[#231819]/70 text-white px-1 rounded">
                          0{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Perfume Details & Scent Pyramid */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#9C5B66] font-bold uppercase tracking-wider flex-wrap">
                    <span>{activeModalProduct.category}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      100% Original Flacon
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#231819] tracking-tight mt-1">
                    {activeModalProduct.name}
                  </h3>

                  {/* Pricing in Naira */}
                  <div className="flex items-baseline gap-2.5 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#8A4852] font-mono">
                      {formatNaira(activeModalProduct.price)}
                    </span>
                    {activeModalProduct.oldPrice && (
                      <span className="text-sm text-[#8E7574] line-through font-mono">
                        {formatNaira(activeModalProduct.oldPrice)}
                      </span>
                    )}
                    {activeModalProduct.oldPrice && (
                      <span className="text-[10px] font-black bg-[#FAF1F0] text-[#8A4852] border border-[#EFE1DD] px-2 py-0.5 rounded">
                        Save{" "}
                        {Math.round(
                          ((activeModalProduct.oldPrice -
                            activeModalProduct.price) /
                            activeModalProduct.oldPrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>

                  {/* Sillage & Concentration Badges */}
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    <span className="text-[10px] font-bold bg-[#5A2931] text-[#FFF5F3] px-2.5 py-1 rounded-md border border-[#8A4852]/40">
                      {activeModalProduct.concentration}
                    </span>
                    <span className="text-[10px] font-bold bg-[#FAF1F0] text-[#8A4852] border border-[#EFE1DD] px-2.5 py-1 rounded-md">
                      {activeModalProduct.sillage}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#6D5C5B] leading-relaxed mt-3">
                    {activeModalProduct.description}
                  </p>

                  {/* Olfactory Note Pyramid */}
                  {activeModalProduct.notes && (
                    <div className="mt-3 p-3 bg-[#FAF1F0] rounded-2xl border border-[#EFE1DD] space-y-1.5 text-xs">
                      <div className="font-serif font-bold text-[#231819] flex items-center gap-1">
                        <Sparkles size={12} className="text-[#9C5B66]" />
                        <span>Olfactory Note Pyramid</span>
                      </div>
                      <div className="text-[11px] text-[#6D5C5B] space-y-0.5">
                        <p><strong className="text-[#231819]">Top Notes:</strong> {activeModalProduct.notes.top}</p>
                        <p><strong className="text-[#231819]">Heart Notes:</strong> {activeModalProduct.notes.heart}</p>
                        <p><strong className="text-[#231819]">Base Notes:</strong> {activeModalProduct.notes.base}</p>
                      </div>
                    </div>
                  )}

                  {/* Flacon Size Options */}
                  {activeModalProduct.sizes && (
                    <div className="pt-3">
                      <label className="block text-xs font-bold text-[#6D5C5B] uppercase tracking-wider mb-1.5">
                        Flacon Size:{" "}
                        <strong className="text-[#231819]">{modalSize}</strong>
                      </label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {activeModalProduct.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setModalSize(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                              modalSize === s
                                ? "bg-[#8A4852] text-white border-[#8A4852]"
                                : "bg-[#FAF1F0] text-[#6D5C5B] border-[#EFE1DD] hover:border-[#8A4852]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Symmetrical Action Buttons */}
                <div className="pt-4 border-t border-[#EFE1DD] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart(activeModalProduct, modalSize, modalQty);
                      setActiveModalProduct(null);
                    }}
                    className="w-full py-3.5 px-3 rounded-xl bg-[#8A4852] hover:bg-[#773D46] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#8A4852]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <ShoppingCart size={16} className="shrink-0" />
                    <span className="truncate">Add to Scent Bag</span>
                  </button>

                  <a
                    href={generateSingleProductWhatsAppUrl({
                      product: activeModalProduct,
                      size: modalSize,
                      qty: modalQty,
                      city: "Victoria Island, Lagos",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <FaWhatsapp size={16} className="shrink-0" />
                    <span className="truncate">Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
