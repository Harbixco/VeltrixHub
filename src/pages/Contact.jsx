import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageTransition from "../components/PageTransition";

function TikTokIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    whatsapp: "",
    businessDescription: "",
    service: "",
    goals: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailSubject = encodeURIComponent(
      `Free Consultation Request from ${form.name} (${form.businessName || "Business"})`
    );
    const emailBody = encodeURIComponent(
      `Hello Veltrix Hub! 👋\n\n` +
        `I would like to request a consultation for my business:\n\n` +
        `Name: ${form.name}\n` +
        `Business Name: ${form.businessName || "Not Specified"}\n` +
        `Email: ${form.email}\n` +
        `WhatsApp Number: ${form.whatsapp}\n` +
        `Service Needed: ${form.service || "Not Specified"}\n\n` +
        `What my business does:\n${form.businessDescription || "N/A"}\n\n` +
        `Goals & Objectives:\n${form.goals || "N/A"}`
    );

    window.open(
      `mailto:Officialveltrixhub@gmail.com?subject=${emailSubject}&body=${emailBody}`,
      "_self"
    );

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({
        name: "",
        businessName: "",
        email: "",
        whatsapp: "",
        businessDescription: "",
        service: "",
        goals: "",
      });
    }, 6000);
  };

  const WA_PREFILLED_URL =
    "https://wa.me/2348087098270?text=Hello%20Veltrix%20Hub%2C%20I'd%20like%20to%20discuss%20getting%20my%20business%20online.";

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Support",
      value: "Officialveltrixhub@gmail.com",
      href: "mailto:Officialveltrixhub@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: "+234 808 709 8270",
      href: WA_PREFILLED_URL,
    },
    {
      icon: MapPin,
      label: "Base & Scope",
      value: "Global",
      href: "#",
    },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">
              START A CONVERSATION
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Get a Free Consultation
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Tell us about your business, challenges, and goals. We will guide you on the exact digital solutions your business needs to grow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-brand-gray border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-brand-navy mb-3">
                  Let's Talk Growth
                </h2>
                <p className="text-brand-text text-sm leading-relaxed">
                  We respond to consultation requests promptly. For direct inquiries, chatting with us on WhatsApp is fast and convenient.
                </p>
              </div>

              {/* WhatsApp Direct CTA */}
              <a
                href={WA_PREFILLED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-5 rounded-[2px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-colors duration-200 shadow-sm"
              >
                <FaWhatsapp size={22} />
                Chat With Us on WhatsApp
              </a>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <a
                    key={i}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-[2px] hover:border-brand-blue transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-brand-gray text-brand-navy group-hover:bg-brand-blue group-hover:text-white rounded-[2px] flex items-center justify-center flex-shrink-0 transition-colors">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="font-bold text-brand-navy text-sm break-all">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Channels */}
              <div>
                <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-3">
                  Connect With Veltrix Hub
                </p>
                <div className="flex gap-3">
                  {[
                   { icon: Facebook, href: "https://www.facebook.com/Officialveltrixhub", label: "Facebook" },
                                 { icon: TikTokIcon, href: "https://www.tiktok.com/@officialveltrixhub", label: "TikTok" },
                                 { icon: Instagram, href: "https://www.instagram.com/officialveltrixhub/", label: "Instagram" },
                                 { icon: Linkedin, href: "https://www.linkedin.com/in/agbaje-abiodun/", label: "LinkedIn" },
                                 { icon: FaWhatsapp, href: "https://wa.me/2348087098270", label: "WhatsApp" },
                  
                  ].map(({ icon: Icon, href, label }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-brand-navy hover:bg-brand-navy hover:text-white rounded-[2px] transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Comprehensive Lead Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="bg-white border border-gray-200 p-8 sm:p-10 rounded-[2px]">
                <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
                  Tell Us About Your Business
                </h3>
                <p className="text-sm text-brand-text mb-8">
                  Fill out the form below to request a strategic consultation.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 bg-gray-50 border border-gray-200 rounded-[2px]"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-brand-navy mb-2">
                      Consultation Request Ready!
                    </h4>
                    <p className="text-brand-text text-sm max-w-md mx-auto">
                      Your email application has opened with your structured consultation details. Click send to dispatch your message directly to our team!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                          Your Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                          Business Name *
                        </label>
                        <input
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Acme Enterprise"
                          className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="yourname@business.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                          WhatsApp Number *
                        </label>
                        <input
                          name="whatsapp"
                          value={form.whatsapp}
                          onChange={handleChange}
                          required
                          placeholder="+234 800 000 0000"
                          className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                        What does your business do?
                      </label>
                      <input
                        name="businessDescription"
                        value={form.businessDescription}
                        onChange={handleChange}
                        placeholder="Briefly describe your industry, products or services..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                        What do you need help with? *
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm bg-white"
                      >
                        <option value="">Select primary digital service</option>
                        <option value="Website Development">Website Development</option>
                        <option value="E-commerce Development">E-commerce Development</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                        <option value="Business Branding">Business Branding</option>
                        <option value="CAC Registration">CAC Registration</option>
                        <option value="Digital Consultation">Digital Consultation</option>
                        <option value="Website Training">Website Training</option>
                        <option value="Other">Other / Multiple Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-2">
                        Tell us a little about what you're trying to achieve
                      </label>
                      <textarea
                        name="goals"
                        value={form.goals}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Share your key business goals, current challenges, or specific requirements..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-[2px] focus:outline-none focus:border-brand-blue text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-brand-navy hover:bg-brand-blue text-white font-semibold w-full py-4 rounded-[2px] transition-colors duration-200 inline-flex items-center justify-center gap-2 text-base"
                    >
                      <Send size={18} />
                      Request a Consultation
                    </button>

                    <p className="text-xs text-brand-muted text-center">
                      Submitting prepares your email request. We review every consultation request within 24 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}