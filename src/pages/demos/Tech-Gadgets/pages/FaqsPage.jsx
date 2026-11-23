import { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Are all phones and laptops on MobileX brand new and factory sealed?",
      a: "Yes, 100%. We do not sell refurbished, UK-used, or repackaged gadgets. All devices are factory sealed with full manufacturer warranty and verified clean IMEI numbers.",
    },
    {
      q: "How does payment work for delivery in Lagos and other states?",
      a: "We support secure card payments via Paystack, direct Nigerian Bank Transfers, and Pay-on-Delivery (POS/Transfer) for verified addresses within Lagos State. For orders outside Lagos, we require payment before nationwide dispatch via our insured courier partners.",
    },
    {
      q: "How long does shipping take to Abuja, Port Harcourt, and other states?",
      a: "Deliveries within Lagos take between 4 to 8 hours (same-day). Deliveries to Abuja, Port Harcourt, and Ibadan arrive within 24 to 36 hours. Other state capitals receive their packages within 48 hours via GIG Logistics or DHL.",
    },
    {
      q: "Can I inspect the gadget before completing payment or signing?",
      a: "Yes! Our dispatch riders and courier partners allow you to confirm the sealed box, verify the IMEI code, and inspect the outer packaging before signing the delivery slip.",
    },
    {
      q: "Can I pick up my gadget directly at your Computer Village store?",
      a: "Absolutely. You are welcome to walk into our flagship store at 12 Otigba Street, Computer Village, Ikeja, Lagos (Monday to Saturday, 8am – 7pm) to pick up your order and meet our technicians.",
    },
    {
      q: "What happens if my device has a factory defect?",
      a: "We offer an instant 7-day swap guarantee. If any factory defect occurs in the first week, we swap it for a brand-new sealed unit immediately. After 7 days, your device is fully protected by the 1-year manufacturer warranty.",
    },
    {
      q: "Are iPhones and Samsung phones on MobileX compatible with Nigerian SIMs?",
      a: "Yes. All our smartphones are factory unlocked global models. They work out of the box with MTN 5G, Airtel 5G, Glo, and 9mobile networks.",
    },
  ];

  return (
    <PageTransition>
      <SEO
        title="Frequently Asked Questions | MobileX Nigeria"
        description="Find answers to common questions about payment on delivery, nationwide shipping, warranty, and authentic gadgets at MobileX Nigeria."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">FAQs</span>
          </div>
        </div>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
              <HelpCircle size={14} />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Got Questions? We Have Answers.
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Clear information about shopping, authentic devices, delivery across Nigeria, and warranty protection.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-white shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-gray-950 hover:text-[#FF6B00] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 shrink-0 transform transition-transform ${
                        isOpen ? "rotate-180 text-[#FF6B00]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions CTA */}
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center space-y-4">
            <h3 className="text-lg font-black text-gray-950">Still have a question?</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Our sales engineers in Computer Village Ikeja are ready to help you with pricing, bulk orders, and custom setups.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/2348087098270"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-xl bg-[#0E8453] hover:bg-[#0c7348] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <FaWhatsapp size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

