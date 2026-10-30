import { Truck, RotateCcw, Headphones, CreditCard } from "lucide-react";

export default function TrustBadges() {
  const items = [
    {
      icon: Truck,
      title: "Free Shipping",
      subtitle: "On orders over $50",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      subtitle: "Hassle-free",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      subtitle: "Always here for you",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      subtitle: "Shop with confidence",
    },
  ];

  return (
    <section id="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 shadow-xs">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 text-left"
            >
              <div className="text-[#0066FF] shrink-0">
                <Icon size={26} className="stroke-[1.6]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-normal">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
