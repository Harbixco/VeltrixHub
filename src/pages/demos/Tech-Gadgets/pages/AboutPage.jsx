import { Link } from "react-router-dom";
import { Building2, ShieldCheck, Truck, Users, CheckCircle, Award, Star } from "lucide-react";
import SEO from "../../../../components/SEO";
import PageTransition from "../../../../components/PageTransition";
import TechGadgetsLayout from "../components/TechGadgetsLayout";

export default function AboutPage() {
  return (
    <PageTransition>
      <SEO
        title="About Us | MobileX Nigeria - Ikeja Computer Village"
        description="Learn about MobileX, Nigeria's premier destination for original smartphones, laptops, and smart gadgets located at Otigba Street, Ikeja, Lagos."
      />

      <TechGadgetsLayout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f9fa] border-b border-gray-100 py-4 select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/demos/tech-gadgets" className="hover:text-[#FF6B00] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">About Us</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 select-none text-left">
          {/* Hero Story Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#FF6B00] text-[11px] font-black uppercase tracking-widest">
                <Building2 size={14} />
                <span>NIGERIA'S TECH HEARTLAND</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-950 uppercase tracking-tight leading-tight">
                Authentic Tech. <br />
                <span className="text-[#FF6B00]">Delivered Nationwide.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                Founded on <strong>Otigba Street, Computer Village, Ikeja, Lagos</strong>, MobileX was created to solve the single largest challenge facing Nigerian tech buyers: <em>trust</em>. We bridge the gap between global manufacturers and Nigerian professionals with 100% brand-new, factory-sealed gadgets.
              </p>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Tech Hub"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4 Pillars of Excellence */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight mb-6">
              Why Nigeria Chooses MobileX
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-orange-200 hover:shadow-lg transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-base text-gray-950">100% Authentic OEM</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Direct factory-sealed stock with verifiable IMEI codes. No refurbished, UK-used, or repackaged stock ever.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-orange-200 hover:shadow-lg transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <h3 className="font-bold text-base text-gray-950">Express Dispatch</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Same-day delivery across Lagos; 24-48 hours delivery across Abuja, Port Harcourt, and all 36 Nigerian states.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-orange-200 hover:shadow-lg transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <h3 className="font-bold text-base text-gray-950">Prices in Naira (₦)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Transparent pricing with no foreign exchange conversion penalties. Paystack, Verve, Mastercard & Bank Transfer accepted.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:border-orange-200 hover:shadow-lg transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-base text-gray-950">Physical Storefront</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Walk in, inspect your device, meet our technicians, and receive immediate hands-on support in Computer Village Ikeja.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Trust Quote */}
          <div className="rounded-3xl bg-[#0e1626] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-lg sm:text-2xl font-bold leading-snug">
                &ldquo;MobileX delivered my MacBook Pro M3 to Victoria Island within 4 hours. Fully sealed with verified Apple warranty. Best gadget store in Lagos!&rdquo;
              </blockquote>
              <div className="text-xs text-gray-400">
                <strong className="text-white block font-bold">Chinedu Okafor</strong>
                Senior Software Engineer, Paystack Alum
              </div>
            </div>
          </div>
        </section>
      </TechGadgetsLayout>
    </PageTransition>
  );
}

