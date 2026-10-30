import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, CheckCircle2, Clock, Truck, ShieldCheck } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setTrackingResult({
        orderId: trackingNumber.trim().toUpperCase(),
        item: "Apple iPhone 15 Pro Max 256GB (Natural Titanium)",
        status: "Out for Doorstep Delivery",
        destination: "Lekki Phase 1, Lagos, Nigeria",
        eta: "Today before 5:00 PM",
        carrier: "MobileX Express Courier & GIG Logistics",
        steps: [
          { title: "Order Verified & Packed", desc: "Computer Village Flagship Store, Ikeja, Lagos", done: true, time: "Yesterday, 4:30 PM" },
          { title: "Passed QA & IMEI Security Check", desc: "Inspected by MobileX Certified Techs", done: true, time: "Yesterday, 6:15 PM" },
          { title: "Dispatched from Ikeja Hub", desc: "In transit with regional logistics vehicle", done: true, time: "Today, 8:45 AM" },
          { title: "Out for Doorstep Delivery", desc: "Assigned to courier rider Tunde (0809 123 4567)", done: true, time: "Today, 10:20 AM" },
          { title: "Recipient Confirmed & Signed", desc: "Awaiting customer signature and device inspection", done: false, time: "Expected soon" },
        ],
      });
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Live Order Tracking | MobileX Nigeria"
        description="Track your smartphone, laptop, or gadget order dispatched from Ikeja Computer Village across all 36 Nigerian states."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Order Tracking</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <Truck size={14} />
              <span>LIVE SHIPMENT DISPATCH</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Track Your MobileX Package
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Enter your Order Tracking Number or phone number provided upon order confirmation to check real-time courier status.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs mb-8">
            <form onSubmit={handleTrack} className="space-y-4">
              <label className="block text-xs font-bold text-gray-800">
                Order Tracking ID or Phone Number
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. MX-8924-LAG or 08086624539"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Track Package
                </button>
              </div>
              <p className="text-[11px] text-gray-400">
                Quick test: Enter any mock ID like <strong>MX-2024</strong> to view simulated Nigerian tracking.
              </p>
            </form>
          </div>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Order ID: {trackingResult.orderId}
                  </span>
                  <h3 className="text-lg font-black text-gray-950">
                    {trackingResult.item}
                  </h3>
                  <span className="text-xs text-gray-500">Destination: {trackingResult.destination}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs self-start sm:self-center">
                  <CheckCircle2 size={14} />
                  <span>{trackingResult.status}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                {trackingResult.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 text-xs">
                    <div className="mt-0.5">
                      {step.done ? (
                        <div className="w-6 h-6 rounded-full bg-[#0E8453] text-white flex items-center justify-center">
                          <CheckCircle2 size={14} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <Clock size={12} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 pb-3 border-b border-gray-50 last:border-b-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`font-bold ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                          {step.title}
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

