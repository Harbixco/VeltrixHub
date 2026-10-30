import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, Zap, CreditCard, ShieldCheck, PhoneCall, MessageCircle } from "lucide-react";
import { formatCurrency, generateWhatsAppOrderUrl, WHATSAPP_NUMBER } from "../utils/helpers";

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  cartSubtotal,
  onClearCart,
  showToast,
  currency = "NGN",
}) {
  const [step, setStep] = useState("form"); // 'form' | 'processing' | 'success'
  const [paymentMethod, setPaymentMethod] = useState("paystack"); // 'paystack' | 'transfer' | 'pod'
  const [customer, setCustomer] = useState({
    fullName: "Babajide Adeleke",
    email: "b.adeleke@lagosfounders.ng",
    phone: "08031234567",
    address: "Plot 14 Admiralty Way, Lekki Phase 1",
    city: "Lagos",
  });
  const [mockRef, setMockRef] = useState("");

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      const ref = `VTX-NG-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setMockRef(ref);
      setStep("success");
      if (showToast) showToast("Payment confirmed! Device reserved at Ikeja Hub.");
    }, 1800);
  };

  const handleWhatsAppConfirmation = () => {
    const url = generateWhatsAppOrderUrl({
      cart,
      customerInfo: customer,
      cartSubtotal,
      amountToFreeShipping: 0,
      currency,
    });
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== "processing" && onClose()}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-[#0d1322] text-white rounded-3xl w-full max-w-lg overflow-hidden z-10 shadow-2xl text-left border border-white/10"
        >
          {/* Header */}
          <div className="bg-[#070b14] text-white p-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#38bdf8] flex items-center justify-center text-white font-black shadow-md shadow-blue-500/30">
                <Zap size={18} fill="currentColor" />
              </div>
              <div>
                <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-black">
                  Voltix Nigeria Fast Checkout
                </div>
                <div className="text-sm font-black text-white">
                  Payable: {formatCurrency(cartSubtotal, currency)}
                </div>
              </div>
            </div>
            {step !== "processing" && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {step === "form" ? (
            <form onSubmit={handlePay} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({ ...customer, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131b2e] border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Phone Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131b2e] border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#131b2e] border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131b2e] border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                    State / City
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#131b2e] border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
                  Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "paystack", label: "Paystack (Cards/Verve)", badge: "Instant" },
                    { id: "transfer", label: "Direct Bank Transfer", badge: "GTB / Zenith" },
                    { id: "pod", label: "Pay on Delivery", badge: "Lagos Only" },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? "border-[#0066FF] bg-blue-500/10 text-white"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <span className="text-[11px] font-bold">{m.label}</span>
                      <span className="text-[9px] text-cyan-400 mt-1">{m.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>1-Year Nigerian Warranty</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock size={12} className="text-cyan-400" />
                  <span>Paystack 256-Bit Encrypted</span>
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Lock size={14} />
                  <span>
                    Authorize Payment of {formatCurrency(cartSubtotal, currency)}
                  </span>
                </button>
              </div>
            </form>
          ) : step === "processing" ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto" />
              <h4 className="font-bold text-base text-white">
                Verifying with Paystack Gateway...
              </h4>
              <p className="text-xs text-gray-400">
                Securing your hardware allocation from our Ikeja Central Hub.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check size={28} />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  ORDER SUCCESSFULLY PLACED
                </span>
                <h4 className="text-xl font-black text-white mt-0.5">
                  Thank You, {customer.fullName}!
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Reference: <span className="font-mono text-cyan-300 font-bold">{mockRef}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 text-left text-xs space-y-1.5 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Fulfillment Hub:</span>
                  <span className="font-bold text-white">12 Otigba St, Computer Village, Ikeja</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Address:</span>
                  <span className="font-bold text-white">{customer.address}, {customer.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dispatch Status:</span>
                  <span className="font-bold text-cyan-400">Queued for Today&apos;s Express Rider</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleWhatsAppConfirmation}
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-gray-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Receive Live Tracking on WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    onClearCart?.();
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
