import { motion } from "framer-motion";

const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ValueStrip() {
  const items = [
    { num: "01", title: "PROFESSIONAL DIGITAL PRESENCE" },
    { num: "02", title: "CREATED TO BUILD TRUST" },
    { num: "03", title: "SUPPORTING LONG-TERM GROWTH" },
  ];

  return (
    <section className="hidden md:block bg-brand-gray py-6 sm:py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              {...revealProps(idx * 0.1)}
              className="py-4 md:py-1 md:px-8 first:pl-0 last:pr-0 flex items-center gap-4"
            >
              <span className="text-xs font-black text-brand-blue tracking-wider">
                {item.num}
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-navy">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
