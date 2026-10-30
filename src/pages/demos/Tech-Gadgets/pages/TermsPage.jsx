import { Link } from "react-router-dom";
import { FileText, ShieldCheck } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function TermsPage() {
  return (
    <PageTransition>
      <SEO
        title="Terms of Service & Privacy Policy | MobileX Nigeria"
        description="Review MobileX's customer terms of service, product authenticity guarantees, return conditions, and privacy policies."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Terms & Privacy</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <FileText size={14} />
              <span>LEGAL & COMPLIANCE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Terms of Service & Privacy
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Clear, transparent conditions for shopping original gadgets with MobileX Technologies Ltd.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-xs space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide">
                1. Product Authenticity Commitment
              </h2>
              <p>
                MobileX Technologies Ltd warrants that all devices distributed through our platform are original, factory-sealed consumer electronics from sanctioned OEM distribution chains. We operate with zero tolerance for counterfeit merchandise. Every device carries an authentic IMEI number verifiable globally.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide">
                2. Currency and Settlement
              </h2>
              <p>
                All prices are stated and settled in Nigerian Naira (NGN, ₦). Payments processed through Paystack, Verve, Mastercard, or corporate bank transfer are safeguarded by 256-Bit SSL military-grade encryption. No additional foreign exchange conversion surcharges apply.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide">
                3. Order Dispatch and Inspection
              </h2>
              <p>
                Risk of loss transfers to the customer upon physical handover and signature with the delivery courier. Customers are entitled and advised to examine the tamper-proof security seals before accepting delivery.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide">
                4. Customer Data Privacy
              </h2>
              <p>
                Customer delivery addresses, telephone numbers, and order histories are solely used for order dispatch, shipment tracking notifications, and warranty management. We do not sell or monetize personal information.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-black text-gray-950 uppercase tracking-wide">
                5. Corporate Affairs Commission Registration
              </h2>
              <p>
                MobileX Technologies Ltd is registered under the laws of the Federal Republic of Nigeria with headquarters situated on Otigba Street, Computer Village, Ikeja, Lagos State.
              </p>
            </div>
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

