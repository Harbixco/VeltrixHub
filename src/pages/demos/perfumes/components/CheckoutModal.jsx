import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, ShieldCheck, Sparkles } from "lucide-react";
import PerfumeLogo from "./PerfumeLogo";
import { formatNaira } from "../utils/helpers";

export default function CheckoutModal({
  isPaystackOpen,
  setIsPaystackOpen,
  paystackStep,
  setPaystackStep,
  isProcessingPayment,
  customerInfo,
  setCustomerInfo,
  mockTrxRef,
  cartSubtotal,
  handlePaystackPayment,
  setCart,
  showToast,
}) {
  return (
    <AnimatePresence>
      {isPaystackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isProcessingPayment && setIsPaystackOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden z-10 shadow-2xl text-left border border-[#EFE1DD]"
          >
            {/* Header */}
            <div className="bg-[#5A2931] text-white p-5 flex items-center justify-between border-b border-[#8A4852]/40">
              <div>
                <PerfumeLogo variant="light" size="sm" showSubtitle={false} />
                <div className="text-[11px] font-bold text-[#ECA5AC] mt-1">
                  Order Total: {formatNaira(cartSubtotal)}
                </div>
              </div>
              {!isProcessingPayment && (
                <button
                  onClick={() => setIsPaystackOpen(false)}
                  className="text-[#EBD2D0] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {paystackStep === "customer" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPaystackStep("payment");
                }}
                className="p-5 sm:p-6 space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-bold text-[#231819] mb-1">
                    Full Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Babatunde Adeleke"
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE1DD] text-xs text-[#231819] focus:outline-none focus:border-[#8A4852]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#231819] mb-1">
                    Email Address (For Batch Code & Receipt)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. babatunde@example.com"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE1DD] text-xs text-[#231819] focus:outline-none focus:border-[#8A4852]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#231819] mb-1">
                    Lagos / Nigeria Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 Admirality Way, Lekki Phase 1, Lagos"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE1DD] text-xs text-[#231819] focus:outline-none focus:border-[#8A4852]"
                  />
                </div>

                <div className="p-3 bg-[#FAF1F0] rounded-xl border border-[#EFE1DD] flex items-center gap-2 text-[11px] text-[#6D5C5B]">
                  <ShieldCheck size={16} className="text-[#8A4852] shrink-0" />
                  <span>Insured luxury shockproof packaging included with all flacons.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#8A4852] hover:bg-[#773D46] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer"
                >
                  Proceed to Secure Checkout ({formatNaira(cartSubtotal)})
                </button>
              </form>
            ) : paystackStep === "payment" ? (
              <div className="p-6 space-y-4">
                <div className="p-4 bg-[#FAF1F0] rounded-2xl border border-[#EFE1DD] text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E7574]">Test Debit Card:</span>
                    <span className="font-mono font-bold text-[#231819]">
                      4084 •••• •••• 0841
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E7574]">Security Gate:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Lock size={12} /> 256-Bit SSL Encrypted
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#EFE1DD]">
                    <span className="text-[#8E7574]">Destination:</span>
                    <span className="font-semibold text-[#231819] truncate max-w-[200px]">
                      {customerInfo.address || "Lagos, Nigeria"}
                    </span>
                  </div>
                </div>

                <button
                  disabled={isProcessingPayment}
                  onClick={handlePaystackPayment}
                  className="w-full py-3.5 rounded-xl bg-[#8A4852] hover:bg-[#773D46] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing with Interswitch / Bank...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Pay {formatNaira(cartSubtotal)} Now</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
                  <Check size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-black text-[#231819]">
                    Flacon Reserved Successfully!
                  </h4>
                  <p className="text-xs text-[#6D5C5B] mt-1">
                    Thank you, {customerInfo.fullName}. Your order reference is{" "}
                    <strong className="font-mono text-[#231819]">
                      {mockTrxRef}
                    </strong>
                    . A dispatch concierge has been notified.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsPaystackOpen(false);
                    setCart([]);
                    if (showToast)
                      showToast("Demo checkout completed successfully!");
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#231819] hover:bg-black text-[#FFF5F3] font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
                >
                  Done & Return to Parfumerie
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
