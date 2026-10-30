import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, CheckCircle2, CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira } from "../utils/helpers";

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  totalCartCount,
  cart,
  updateCartQty,
  cartSubtotal,
  freeShippingThreshold,
  amountToFreeShipping,
  handleOpenPaystack,
  generateWhatsAppCheckoutUrl,
}) {
  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 text-left"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcf8f4]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#e85d04]" />
                <h3 className="font-extrabold text-base text-gray-900">
                  Your Wardrobe Cart
                </h3>
                <span className="text-xs bg-[#e85d04] text-white px-2 py-0.5 rounded-full font-bold">
                  {totalCartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-orange-50/60 border-b border-orange-100/80 px-4 py-2.5 text-xs">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-1">
                  <div className="text-gray-700">
                    Add{" "}
                    <strong className="text-[#e85d04]">
                      {formatNaira(amountToFreeShipping)}
                    </strong>{" "}
                    more for <strong>FREE Nationwide Express Delivery</strong>!
                  </div>
                  <div className="w-full bg-orange-200/50 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#e85d04] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          (cartSubtotal / freeShippingThreshold) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Unlocked! Free Nationwide Express Delivery</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-3 text-gray-400">
                  <ShoppingBag size={48} className="mx-auto text-gray-300" />
                  <p className="text-sm font-medium">
                    Your wardrobe cart is currently empty.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#e85d04] text-white text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl border border-gray-100 bg-[#fdfbf9] flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-contain bg-white p-1 border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-xs text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {item.selectedColor ? item.selectedColor.name : ""}
                        {item.selectedSize ? ` • ${item.selectedSize}` : ""}
                      </div>
                      <div className="font-black text-xs text-[#e85d04] mt-1">
                        {formatNaira(item.price)}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                      <button
                        onClick={() =>
                          updateCartQty(item.cartItemId, item.quantity - 1)
                        }
                        className="text-xs font-bold text-gray-500 hover:text-gray-900 px-1"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-gray-900 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQty(item.cartItemId, item.quantity + 1)
                        }
                        className="text-xs font-bold text-gray-500 hover:text-gray-900 px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-[#fcf8f4] space-y-3">
                <div className="flex justify-between text-sm font-black text-gray-900">
                  <span>Subtotal:</span>
                  <span className="text-[#e85d04] text-base">
                    {formatNaira(cartSubtotal)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleOpenPaystack}
                    className="w-full py-3.5 rounded-xl bg-[#081d16] hover:bg-[#0c261e] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <CreditCard size={16} />
                    Pay with Card / Paystack ({formatNaira(cartSubtotal)})
                  </button>

                  <a
                    href={generateWhatsAppCheckoutUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <FaWhatsapp size={17} />
                    <span>Order via WhatsApp (1-Click)</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

