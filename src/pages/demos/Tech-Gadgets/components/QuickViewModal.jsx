import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira } from "../data/mobilexData";

export default function QuickViewModal({
  activeProduct,
  setActiveProduct,
  addToCart,
  showToast,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  // Reset indices whenever active product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColorIndex(0);
    setSelectedSizeIndex(0);
  }, [activeProduct]);

  if (!activeProduct) return null;

  // Build gallery of 3 images
  const gallery =
    activeProduct.gallery && activeProduct.gallery.length >= 3
      ? activeProduct.gallery
      : [
          activeProduct.image,
          activeProduct.gallery?.[1] || activeProduct.image,
          activeProduct.gallery?.[2] || activeProduct.image,
        ];

  const colors = activeProduct.colors || [
    { name: "TITANIUM GRAY", hex: "#7E7F83" },
    { name: "TITANIUM BLACK", hex: "#232426" },
    { name: "TITANIUM BLUE", hex: "#2B3545" },
  ];

  const sizes = activeProduct.sizes || ["128GB", "256GB", "512GB", "1TB"];

  const currentColor = colors[selectedColorIndex] || colors[0];
  const currentSize = sizes[selectedSizeIndex] || sizes[0];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "2348086624539";
    const textMessage = encodeURIComponent(
      `Hello MobileX Nigeria! I would like to order:\n\n*Product:* ${activeProduct.name}\n*Price:* ${formatNaira(
        activeProduct.price
      )}\n*Color:* ${currentColor.name}\n*Storage/Size:* ${currentSize}\n\nPlease confirm availability and payment options for Lagos/Nationwide delivery.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card strictly matching the uploaded template */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-white rounded-3xl w-full max-w-4xl overflow-hidden z-10 shadow-2xl p-5 sm:p-8 text-left my-auto max-h-[94vh] overflow-y-auto border border-gray-100"
        >
          {/* Top Right Close Button matching template */}
          <button
            onClick={() => setActiveProduct(null)}
            className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer z-20"
            aria-label="Close product modal"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-9 items-start">
            {/* Left Column: Image Stage with Carousel Arrows & 3 Thumbnails */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {/* Main Image Box on warm beige background */}
              <div className="relative rounded-2xl bg-[#F6F4EF] p-6 min-h-[300px] sm:min-h-[350px] flex items-center justify-center overflow-hidden border border-amber-900/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={gallery[activeImageIndex]}
                    alt={`${activeProduct.name} - view ${activeImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-[260px] sm:max-h-[300px] max-w-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)]"
                  />
                </AnimatePresence>

                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevImage}
                  className="w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black absolute left-3 top-1/2 -translate-y-1/2 transition-all cursor-pointer z-10"
                  aria-label="Previous view"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextImage}
                  className="w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black absolute right-3 top-1/2 -translate-y-1/2 transition-all cursor-pointer z-10"
                  aria-label="Next view"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnails Row: 01, 02, 03 */}
              <div className="flex items-center gap-3">
                {gallery.map((imgUrl, idx) => {
                  const isActive = activeImageIndex === idx;
                  const thumbLabel = `0${idx + 1}`;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl bg-[#F6F4EF] p-1.5 flex items-center justify-center cursor-pointer transition-all border-2 overflow-hidden ${
                        isActive
                          ? "border-[#FF6B00] ring-2 ring-orange-200"
                          : "border-transparent hover:border-gray-300 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${thumbLabel}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Title, Stock, Price, Specs, Swatches & Dual CTAs */}
            <div className="md:col-span-7 space-y-4">
              {/* Category & In Stock Indicator */}
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <span className="text-[#FF6B00]">
                  {activeProduct.category || "SMARTPHONES"}
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 text-[#0E8453] font-extrabold">
                  <CheckCircle2 size={13} className="text-[#0E8453]" />
                  <span>
                    IN STOCK ({activeProduct.stockCount || 12} AVAILABLE)
                  </span>
                </span>
              </div>

              {/* Title matching template */}
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight">
                {activeProduct.name}
              </h2>

              {/* Price Line: Orange Price + Gray Strikethrough + Pink/Red Discount Pill */}
              <div className="flex items-baseline gap-3 pt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-[#FF6B00] font-mono tracking-tight">
                  {formatNaira(activeProduct.price)}
                </span>
                <span className="text-base text-gray-400 line-through font-mono">
                  {formatNaira(activeProduct.originalPrice || activeProduct.price * 1.2)}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-100/70 px-2.5 py-0.5 rounded-full">
                  {activeProduct.discountBadge || "Save 17%"}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                {activeProduct.description}
              </p>

              {/* Specs Line */}
              <div className="text-xs text-gray-700 font-medium py-1">
                <span className="font-bold text-gray-900">Specs: </span>
                <span>
                  {activeProduct.material || "Grade 5 Titanium"} •{" "}
                  {activeProduct.battery || "5000 mAh"} •{" "}
                  {activeProduct.processor || "Flagship Processor"}
                </span>
              </div>

              {/* Color Swatch Circles */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-extrabold text-gray-900 tracking-wider uppercase">
                  COLOR:{" "}
                  <span className="text-gray-600 font-semibold">
                    {currentColor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {colors.map((color, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-7 h-7 rounded-full transition-all border border-black/10 cursor-pointer ${
                          isSelected
                            ? "ring-2 ring-offset-2 ring-gray-950 scale-105"
                            : "hover:scale-105 opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Size / Capacity Options */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-extrabold text-gray-900 tracking-wider uppercase">
                  SIZE / CAPACITY:{" "}
                  <span className="text-gray-600 font-semibold">
                    {currentSize}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {sizes.map((size, idx) => {
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-gray-950 text-white shadow-xs"
                            : "bg-white border border-gray-200 text-gray-800 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dual Action CTAs strictly matching uploaded template */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Orange Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart({
                      ...activeProduct,
                      selectedColor: currentColor.name,
                      selectedSize: currentSize,
                    });
                    setActiveProduct(null);
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={15} />
                  <span>ADD TO CART</span>
                </button>

                {/* Green WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#0E8453] hover:bg-[#0c7348] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
                >
                  <FaWhatsapp size={16} />
                  <span>ORDER ON WHATSAPP</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
