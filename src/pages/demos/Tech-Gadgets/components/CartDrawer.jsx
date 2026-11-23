import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira } from "../data/mobilexData";

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  updateCartQty,
  cartSubtotal,
  totalCartCount,
  onOpenCheckout,
}) {
  const FREE_SHIPPING_LIMIT = 100000; // ₦100,000 limit for free delivery
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - cartSubtotal);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsSummary = cart
      .map(
        (item) =>
          `• ${item.name} (Qty: ${item.quantity}) - ${formatNaira(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `Hello MobileX Nigeria! I would like to place an order for the following items:\n\n${itemsSummary}\n\n*Total:* ${formatNaira(
        cartSubtotal
      )}\n\nPlease provide payment and delivery details.`
    );
    window.open(`https://wa.me/2348087098270?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
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
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 text-left"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-[#FF6B00]" />
                <h3 className="font-bold text-sm text-gray-900">
                  Your Cart ({totalCartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free shipping bar (₦100,000) */}
            <div className="bg-orange-50/60 border-b border-orange-100 px-4 py-2.5 text-xs">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-1">
                  <div className="text-gray-700">
                    Add{" "}
                    <strong className="text-[#FF6B00]">
                      {formatNaira(amountToFreeShipping)}
                    </strong>{" "}
                    more for <strong>Free Nationwide Delivery</strong>!
                  </div>
                  <div className="w-full bg-orange-200/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF6B00] h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (cartSubtotal / FREE_SHIPPING_LIMIT) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Unlocked! Free Express Delivery On This Order</span>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-3 text-gray-400">
                  <ShoppingCart size={40} className="mx-auto text-gray-300" />
                  <p className="text-xs font-medium">Your cart is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId || item.id}
                    className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 items-center"
                  >
                    <div className="w-16 h-16 rounded-lg bg-white p-1 shrink-0 flex items-center justify-center border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="font-bold text-xs text-gray-900 truncate">
                        {item.name}
                      </h4>
                      {item.selectedColor && (
                        <span className="text-[10px] text-gray-500 block">
                          {item.selectedColor} • {item.selectedSize}
                        </span>
                      )}
                      <div className="font-black text-xs text-[#FF6B00] font-mono">
                        {formatNaira(item.price * item.quantity)}
                      </div>

                      {/* Qty */}
                      <div className="flex items-center gap-3 pt-0.5">
                        <div className="flex items-center border border-gray-200 rounded bg-white">
                          <button
                            onClick={() =>
                              updateCartQty(item.cartItemId || item.id, item.quantity - 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-xs text-gray-600 hover:text-black cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQty(item.cartItemId || item.id, item.quantity + 1)
                            }
                            className="w-5 h-5 flex items-center justify-center text-xs text-gray-600 hover:text-black cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => updateCartQty(item.cartItemId || item.id, 0)}
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal & Dual Checkout CTAs */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white space-y-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-black text-base text-gray-900 font-mono">
                    {formatNaira(cartSubtotal)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={onOpenCheckout}
                    className="w-full py-3 rounded-md bg-[#FF6B00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3 rounded-md bg-[#0E8453] hover:bg-[#0c7348] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FaWhatsapp size={15} />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
