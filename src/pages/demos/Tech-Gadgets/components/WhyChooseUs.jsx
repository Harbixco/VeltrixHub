import { Users, Tag, Headphones, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const items = [
    {
      id: "trusted",
      title: "Trusted by Thousands",
      description: "50,000+ happy customers trust our service.",
      icon: Users,
    },
    {
      id: "prices",
      title: "Best Prices Guaranteed",
      description: "Find the best prices on the latest mobiles.",
      icon: Tag,
    },
    {
      id: "support",
      title: "Expert Support",
      description: "Get help from our experts anytime you need.",
      icon: Headphones,
    },
    {
      id: "warranty",
      title: "Warranty & Genuine",
      description: "Official warranty on all products.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      {/* Centered Heading strictly matching image */}
      <h2 className="text-base sm:text-lg font-black text-gray-950 uppercase tracking-tight text-center mb-6">
        WHY CHOOSE US?
      </h2>

      {/* 4 Cards Grid strictly matching image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3.5 text-left shadow-2xs hover:shadow-md hover:border-orange-200 transition-all duration-200 group"
            >
              {/* Orange Outline Icon */}
              <div className="w-10 h-10 rounded-full bg-orange-50/60 border border-orange-100 flex items-center justify-center text-[#FF6B00] shrink-0 group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                <Icon size={19} className="stroke-[1.9]" />
              </div>

              <div>
                <h3 className="font-bold text-xs sm:text-[13px] text-gray-950 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 font-normal mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

