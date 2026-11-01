import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, CheckCircle2, CreditCard, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { formatNaira } from "../utils/helpers";

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  totalCartCount,
  cart,
  updateCartQty,
  cartSubtotal,
  freeShippingThreshold = 150000,
  amountToFreeShipping,
  handleOpenPaystack,
  generateWhatsAppCheckoutUrl,
}) {
  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 text-left border-l border-[#EFE1DD]"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#EFE1DD] flex items-center justify-between bg-[#F6EAE7]">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#8A4852]" />
                <h3 className="font-serif font-black text-base text-[#231819]">
                  Your Scent Vault
                </h3>
                <span className="text-xs bg-[#8A4852] text-white px-2 py-0.5 rounded-full font-bold">
                  {totalCartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-[#8E7574] hover:text-[#231819] hover:bg-[#FAF1F0] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF1F0] border-b border-[#EFE1DD] px-4 py-2.5 text-xs">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-1">
                  <div className="text-[#6D5C5B]">
                    Add{" "}
                    <strong className="text-[#8A4852] font-mono font-black">
                      {formatNaira(amountToFreeShipping)}
                    </strong>{" "}
                    more for <strong>FREE Nationwide Express Delivery</strong>!
                  </div>
                  <div className="w-full bg-[#EFE1DD] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8A4852] h-full rounded-full transition-all duration-300"
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
                  <span>Unlocked! Free Nationwide Express Delivery Included</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF1F0]/30">
              {cart.length === 0 ? (
                <div className="py-20 text-center space-y-3 text-[#8E7574]">
                  <ShoppingBag size={48} className="mx-auto text-[#EFE1DD]" />
                  <p className="text-sm font-medium">
                    Your fragrance bag is currently empty.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-[#8A4852] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer hover:bg-[#773D46] transition-colors"
                  >
                    Explore Vault
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl border border-[#EFE1DD] bg-white flex items-center gap-3.5 shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-contain bg-[#FAF1F0] p-1 border border-[#EFE1DD] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-black text-xs text-[#231819] truncate">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-[#9C5B66] mt-0.5 font-medium">
                        {item.selectedSize || "100ml Flacon"}
                      </div>
                      <div className="font-mono font-black text-xs text-[#8A4852] mt-1">
                        {formatNaira(item.price)}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 border border-[#EFE1DD] rounded-xl px-2 py-1 bg-[#FAF1F0]">
                      <button
                        onClick={() =>
                          updateCartQty(item.cartItemId, item.quantity - 1)
                        }
                        className="text-xs font-bold text-[#6D5C5B] hover:text-[#231819] px-1 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-[#231819] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQty(item.cartItemId, item.quantity + 1)
                        }
                        className="text-xs font-bold text-[#6D5C5B] hover:text-[#231819] px-1 cursor-pointer"
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
              <div className="p-4 border-t border-[#EFE1DD] bg-[#F6EAE7] space-y-3">
                <div className="flex justify-between text-sm font-black text-[#231819]">
                  <span>Subtotal:</span>
                  <span className="text-[#8A4852] text-base font-mono">
                    {formatNaira(cartSubtotal)}
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleOpenPaystack}
                    className="w-full py-3.5 rounded-xl bg-[#8A4852] hover:bg-[#773D46] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#8A4852]/25 transition-all cursor-pointer"
                  >
                    <CreditCard size={16} />
                    Pay with Card / Paystack ({formatNaira(cartSubtotal)})
                  </button>

                  <a
                    href={generateWhatsAppCheckoutUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <FaWhatsapp size={17} />
                    <span>Order via WhatsApp (Instant Receipt)</span>
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
