import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isProcessingPayment && setIsPaystackOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden z-10 shadow-2xl text-left"
          >
            {/* Header */}
            <div className="bg-[#081d16] text-white p-4.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#e85d04] flex items-center justify-center font-black text-xs text-white">
                  S
                </div>
                <div>
                  <div className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                    ShopEase Fashion Studio
                  </div>
                  <div className="text-xs font-bold text-white">
                    Total Amount: {formatNaira(cartSubtotal)}
                  </div>
                </div>
              </div>
              {!isProcessingPayment && (
                <button
                  onClick={() => setIsPaystackOpen(false)}
                  className="text-gray-400 hover:text-white"
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#e85d04]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                >
                  Proceed to Secure Payment ({formatNaira(cartSubtotal)})
                </button>
              </form>
            ) : paystackStep === "payment" ? (
              <div className="p-6 space-y-4">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Test Debit Card:</span>
                    <span className="font-mono font-bold text-gray-900">
                      4084 •••• •••• 0841
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Security:</span>
                    <span className="text-emerald-600 font-bold">
                      256-Bit SSL Encrypted
                    </span>
                  </div>
                </div>

                <button
                  disabled={isProcessingPayment}
                  onClick={handlePaystackPayment}
                  className="w-full py-3.5 rounded-xl bg-[#e85d04] hover:bg-[#d94e02] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing with Bank...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Complete Order ({formatNaira(cartSubtotal)})</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <Check size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-900">
                    Order Placed Successfully!
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Thank you {customerInfo.fullName}, your reference is{" "}
                    <strong className="font-mono text-gray-900">
                      {mockTrxRef}
                    </strong>
                    .
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsPaystackOpen(false);
                    setCart([]);
                    if (showToast)
                      showToast("Demo checkout completed successfully!");
                  }}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider"
                >
                  Done & Return to Store
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

