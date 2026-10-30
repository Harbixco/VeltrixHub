import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Search, CheckCircle2, Smartphone, Lock, Award } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function VerificationPage() {
  const [imeiInput, setImeiInput] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (imeiInput.trim()) {
      setResult({
        imei: imeiInput.trim().toUpperCase(),
        status: "AUTHENTIC & VERIFIED GENUINE",
        brand: "Apple Inc. (California) / Authorized OEM",
        model: "iPhone 15 Pro Max 256GB - Model A3106",
        simStatus: "Factory Unlocked (MTN, Airtel, Glo, 9mobile 5G Compatible)",
        warranty: "Valid AppleCare+ until November 2025",
        activation: "Original Factory Sealed Stock",
        inspectionId: "MX-CERT-9942-NG",
      });
    }
  };

  return (
    <PageTransition>
      <SEO
        title="IMEI & Device Verification Portal | MobileX Nigeria"
        description="Verify the authenticity of any smartphone, laptop, or gadget purchased from MobileX with our genuine IMEI anti-counterfeit lookup."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Device Verification</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>ANTI-COUNTERFEIT PORTAL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              IMEI & Serial Verification
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Confirm that your gadget is 100% original, brand-new, and covered under official manufacturer warranty in Nigeria.
            </p>
          </div>

          {/* Verification Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs mb-8 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100 text-xs text-gray-700">
              <Smartphone size={20} className="text-[#FF6B00] shrink-0" />
              <div>
                <strong>How to find your IMEI:</strong> Dial <strong>*#06#</strong> on any phone, or check the barcode sticker on the back of your factory-sealed box.
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <label className="block text-xs font-bold text-gray-800">
                Enter 15-Digit IMEI or Device Serial Number
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 352847118942351 or FK29XL00P"
                    value={imeiInput}
                    onChange={(e) => setImeiInput(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0E8453] hover:bg-[#0c7348] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Verify Device
                </button>
              </div>
              <p className="text-[11px] text-gray-400">
                Quick test: Enter any 15-digit number to run simulated verification.
              </p>
            </form>
          </div>

          {/* Verification Result */}
          {result && (
            <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-emerald-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    IMEI: {result.imei}
                  </span>
                  <h3 className="text-xl font-black text-gray-950">
                    {result.model}
                  </h3>
                  <span className="text-xs text-gray-500">Manufacturer: {result.brand}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs self-start sm:self-center">
                  <CheckCircle2 size={16} />
                  <span>{result.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Network Compatibility</span>
                  <strong className="text-gray-900 text-xs mt-1 block">{result.simStatus}</strong>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Warranty Coverage</span>
                  <strong className="text-gray-900 text-xs mt-1 block">{result.warranty}</strong>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Certificate Number</span>
                  <strong className="text-gray-900 text-xs mt-1 block font-mono">{result.inspectionId}</strong>
                </div>
              </div>
            </div>
          )}
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

