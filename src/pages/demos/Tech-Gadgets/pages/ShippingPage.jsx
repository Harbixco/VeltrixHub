import { Link } from "react-router-dom";
import { Truck, CheckCircle2, ShieldCheck, MapPin, Clock } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function ShippingPage() {
  return (
    <PageTransition>
      <SEO
        title="Nationwide Shipping Policy | MobileX Nigeria"
        description="Fast, insured nationwide delivery across Lagos, Abuja, Port Harcourt, and all 36 Nigerian states. Free express delivery over ₦100,000."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Nationwide Shipping</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <Truck size={14} />
              <span>NATIONWIDE LOGISTICS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Shipping & Delivery Information
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              We provide fast, secure, and fully insured gadget delivery straight to your doorstep across Nigeria.
            </p>
          </div>

          <div className="space-y-8">
            {/* Free Shipping Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-500 to-[#FF6B00] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-orange-500/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-200 block mb-1">
                  OFFICIAL STORE OFFER
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  Free Express Delivery on Orders Over ₦100,000
                </h2>
                <p className="text-xs text-orange-100 mt-1">
                  Applicable automatically at checkout for all smartphones, laptops, and gadget bundles.
                </p>
              </div>
              <Link
                to="/demos/tech-gadgets/products"
                className="px-6 py-2.5 rounded-xl bg-white text-[#FF6B00] text-xs font-black uppercase tracking-wider shadow-sm shrink-0 hover:bg-gray-50 transition-colors"
              >
                Shop Gadgets Now
              </Link>
            </div>

            {/* Regional Timelines */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-5">
              <h3 className="text-lg font-black text-gray-950">
                Delivery Zones & Estimated Timelines
              </h3>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="block text-sm font-bold text-gray-950">
                      Lagos State (Island, Mainland & Environs)
                    </strong>
                    <span className="text-xs text-gray-500">
                      Direct MobileX express riders with real-time phone coordination.
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shrink-0">
                    Within 4 – 8 Hours (Same-Day)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="block text-sm font-bold text-gray-950">
                      Abuja (FCT), Port Harcourt, Ibadan, Abeokuta
                    </strong>
                    <span className="text-xs text-gray-500">
                      Handled via priority air cargo and express courier logistics.
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shrink-0">
                    24 – 36 Hours
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="block text-sm font-bold text-gray-950">
                      All Other Nigerian States (Kano, Enugu, Asaba, Calabar, etc.)
                    </strong>
                    <span className="text-xs text-gray-500">
                      Insured doorstep delivery or terminal pickup via GIG Logistics and DHL.
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#FF6B00] bg-orange-50 px-3 py-1 rounded-full border border-orange-100 shrink-0">
                    Within 48 Hours Max
                  </span>
                </div>
              </div>
            </div>

            {/* Packaging & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-1">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-bold text-sm text-gray-950">100% Insured Transit</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Every package dispatched from our Computer Village hub is fully insured against theft, loss, or transit damage until it is safely in your hands.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E8453] flex items-center justify-center mb-1">
                  <CheckCircle2 size={18} />
                </div>
                <h4 className="font-bold text-sm text-gray-950">Pre-Payment Inspection</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  You are allowed to inspect the intact security seal and verify device specifications before concluding delivery with our dispatch team.
                </p>
              </div>
            </div>
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

