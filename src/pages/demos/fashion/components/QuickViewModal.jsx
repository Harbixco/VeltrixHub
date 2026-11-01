import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  WHATSAPP_NUMBER,
  formatNaira,
  generateSingleProductWhatsAppUrl,
} from "../utils/helpers";

export default function QuickViewModal({
  activeModalProduct,
  setActiveModalProduct,
  activeImageIndex,
  setActiveImageIndex,
  modalColor,
  setModalColor,
  modalSize,
  setModalSize,
  modalQty,
  currentModalImages,
  addToCart,
}) {
  return (
    <AnimatePresence>
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProduct(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-white rounded-3xl w-full max-w-3xl overflow-hidden z-10 shadow-2xl p-6 sm:p-8 text-left max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* LEFT: Multi-Image Stock Gallery */}
              <div className="space-y-3">
                {/* Main Stage with Carousel Nav */}
                <div className="relative w-full h-72 sm:h-92 rounded-2xl bg-[#faf6f1] p-4 flex items-center justify-center overflow-hidden border border-[#f1e6da] group">
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
                      onError={(e) => {
                        e.currentTarget.src =
                          activeModalProduct.image ||
                          "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="max-h-full max-w-full object-contain"
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
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
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
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-all hover:scale-110"
                        aria-label="Next angle"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Image Index Counter */}
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {activeImageIndex + 1} / {currentModalImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails Row: Exactly 3 views for every item */}
                {currentModalImages.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {currentModalImages.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#faf6f1] border-2 transition-all p-1.5 shrink-0 ${
                          activeImageIndex === idx
                            ? "border-[#e85d04] ring-2 ring-[#e85d04]/30 scale-102 opacity-100"
                            : "border-[#f1e6da] hover:border-gray-400 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`View ${idx + 1}`}
                          onError={(e) => {
                            e.currentTarget.src =
                              activeModalProduct.image ||
                              "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-1 right-1 text-[8px] font-bold bg-black/60 text-white px-1 rounded">
                          0{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Stock Details & Options */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#e85d04] font-bold uppercase tracking-wider">
                    <span>{activeModalProduct.category}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      In Stock ({activeModalProduct.stockLeft || 12} available)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
                    {activeModalProduct.name}
                  </h3>

                  {/* Pricing in Naira */}
                  <div className="flex items-baseline gap-2.5 mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#e85d04]">
                      {formatNaira(activeModalProduct.price)}
                    </span>
                    {activeModalProduct.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatNaira(activeModalProduct.oldPrice)}
                      </span>
                    )}
                    {activeModalProduct.oldPrice && (
                      <span className="text-[10px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded">
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

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed mt-3">
                    {activeModalProduct.description}
                  </p>

                  {/* Composition */}
                  {activeModalProduct.composition && (
                    <div className="mt-2 text-[11px] text-gray-500 font-medium">
                      <strong>Material:</strong> {activeModalProduct.composition}
                    </div>
                  )}

                  {/* Color Options */}
                  {activeModalProduct.colors && (
                    <div className="pt-3 border-t border-gray-100 mt-3">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Color:{" "}
                        <strong className="text-gray-900">
                          {modalColor?.name}
                        </strong>
                      </label>
                      <div className="flex items-center gap-2">
                        {activeModalProduct.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setModalColor(c)}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              modalColor?.name === c.name
                                ? "ring-2 ring-[#e85d04] scale-110"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Options */}
                  {activeModalProduct.sizes && (
                    <div className="pt-3">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Size:{" "}
                        <strong className="text-gray-900">{modalSize}</strong>
                      </label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {activeModalProduct.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setModalSize(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                              modalSize === s
                                ? "bg-[#081d16] text-white border-[#081d16]"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
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
                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart(
                        activeModalProduct,
                        modalColor,
                        modalSize,
                        modalQty
                      );
                      setActiveModalProduct(null);
                    }}
                    className="w-full py-3.5 px-3 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart size={16} className="shrink-0" />
                    <span className="truncate">Add to Wardrobe</span>
                  </button>

                  <a
                    href={generateSingleProductWhatsAppUrl({
                      product: activeModalProduct,
                      color: modalColor,
                      size: modalSize,
                      qty: modalQty,
                      city: "Lekki, Lagos",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
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

