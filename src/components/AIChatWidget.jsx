import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.png";

const SUGGESTED_QUESTIONS = [
  {
    label: "🌐 Web & App Development",
    text: "Can you tell me about Veltrix Hub's web development services and how much a professional website costs?",
  },
  {
    label: "🛒 E-Commerce & Paystack",
    text: "How does Veltrix Hub build e-commerce websites with online payments like Paystack?",
  },
  {
    label: "🎓 Veltrix Tech Academy",
    text: "What are the courses, curriculum, and duration for the Veltrix Tech Academy?",
  },
  {
    label: "📋 CAC Registration",
    text: "Can Veltrix Hub help me register my business with CAC Nigeria? What are the requirements?",
  },
  {
    label: "⚡ Free Consultation",
    text: "How can I book a free digital consultation for my business?",
  },
];

const INITIAL_MESSAGE = {
  id: "welcome-1",
  role: "assistant",
  content:
    "Hello and welcome to Veltrix Hub! 👋 I am **Veltrix AI**, your instant digital consultant.\n\nI can help you with **Website & Mobile Development**, **E-Commerce Stores**, **CAC Business Registration**, or enrolling in **Veltrix Tech Academy**.\n\nHow can we help your business thrive today?",
  timestamp: "Just now",
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const widgetRef = useRef(null);

  // Show teaser tooltip after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSendMessage = async (textToSend) => {
    const rawText = typeof textToSend === "string" ? textToSend : input;
    const messageContent = (rawText || "").trim();
    if (!messageContent || isLoading) return;

    const userMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Map to payload for /api/chat
      const apiPayload = newMessages
        .filter((m) => m.id !== "welcome-1")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      // Ensure at least the current user message is sent
      if (apiPayload.length === 0) {
        apiPayload.push({ role: "user", content: messageContent });
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to reach Veltrix AI service.");
      }

      const botMessage = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: data.reply || "Thank you for reaching out! Let me know if you need more details.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content:
          "I apologize, I'm having a brief connection issue. You can speak directly with our team on **WhatsApp (+234 808 709 8270)** for an immediate response!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showWhatsAppCTA: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: "welcome-" + Date.now(),
        timestamp: "Just now",
      },
    ]);
  };

  const handleWhatsAppRedirect = (customText) => {
    const text = customText || "Hello Veltrix Hub! 👋 I was chatting with Veltrix AI on your website and would like to continue our discussion.";
    window.open(
      `https://wa.me/2348087098270?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Helper to format basic markdown (bold, lists)
  const renderFormattedText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold formatting
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const bulletText = line.trim().replace(/^[-•]\s*/, "");
        return (
          <li
            key={idx}
            className="ml-4 list-disc text-gray-700 leading-relaxed my-0.5"
            dangerouslySetInnerHTML={{
              __html: bulletText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p
          key={idx}
          className="my-1 leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden select-none"
    >
      {/* ── CHAT POPUP WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-3 flex flex-col origin-bottom-right"
            style={{
              boxShadow: "0 20px 50px -10px rgba(5, 15, 44, 0.35), 0 0 1px 1px rgba(0,0,0,0.08)",
            }}
          >
            {/* ── Header ── */}
            <div className="bg-gradient-to-r from-brand-navy via-[#0d2259] to-brand-navy text-white p-4 relative border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange to-amber-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-brand-navy rounded-[10px] flex items-center justify-center p-1.5">
                        <img
                          src={logo}
                          alt="Veltrix Hub"
                          className="w-full h-auto object-contain brightness-0 invert"
                        />
                      </div>
                    </div>
                    {/* Live indicator dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-brand-navy rounded-full animate-pulse" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm tracking-wide leading-tight text-white flex items-center gap-1">
                        Veltrix AI
                        <Sparkles size={13} className="text-brand-orange" />
                      </h3>
                      <span className="text-[10px] font-semibold bg-white/15 px-1.5 py-0.5 rounded text-gray-200">
                        24/7
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online • Instant AI Consultant
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Reset conversation button */}
                  <button
                    onClick={handleResetChat}
                    title="Restart Conversation"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close AI Chat"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── WhatsApp Quick Handoff Banner ── */}
            <div className="bg-emerald-50 px-3.5 py-2 border-b border-emerald-100/80 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-medium flex items-center gap-1.5 text-[11px]">
                <FaWhatsapp className="text-emerald-600" size={13} />
                Need a human agent or instant quote?
              </span>
              <button
                type="button"
                onClick={() => handleWhatsAppRedirect()}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 flex items-center gap-0.5"
              >
                WhatsApp Us
                <ArrowRight size={10} />
              </button>
            </div>

            {/* ── Messages Feed ── */}
            <div className="p-4 bg-[#f8f9fc] flex-1 overflow-y-auto space-y-3.5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === "user"
                        ? "bg-brand-navy text-white shadow-xs"
                        : "bg-gradient-to-tr from-brand-orange to-amber-500 text-white shadow-xs"
                    }`}
                  >
                    {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] text-xs p-3.5 rounded-2xl shadow-2xs ${
                      msg.role === "user"
                        ? "bg-brand-navy text-white rounded-tr-xs"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-xs"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="text-xs">{renderFormattedText(msg.content)}</div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    )}

                    {msg.showWhatsAppCTA && (
                      <div className="mt-2.5 pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleWhatsAppRedirect()}
                          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 text-[11px] transition-colors"
                        >
                          <FaWhatsapp size={14} />
                          Continue on WhatsApp
                        </button>
                      </div>
                    )}

                    <span
                      className={`block text-[10px] mt-1.5 ${
                        msg.role === "user" ? "text-gray-300 text-right" : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-orange to-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot size={13} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-gray-100 shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-brand-navy animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-brand-blue-light animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                    <span className="text-[11px] text-gray-400 ml-1.5 font-medium">
                      Veltrix AI is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Quick Topic Chips (when conversation is short) ── */}
            {messages.length <= 3 && !isLoading && (
              <div className="px-3.5 py-2 bg-white border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Suggested Topics
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q.text)}
                      className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-gray-50 hover:bg-brand-navy hover:text-white text-gray-700 border border-gray-200 transition-all font-medium shrink-0"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input Box & Send Button ── */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about websites, tech academy, CAC..."
                disabled={isLoading}
                className="flex-1 text-xs text-gray-800 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-orange to-amber-600 hover:from-amber-600 hover:to-brand-orange text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 shrink-0"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TEASER PROMPT TOOLTIP ── */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2.5 bg-brand-navy text-white rounded-full py-1.5 px-4 shadow-xl border border-white/10 flex items-center gap-2.5 max-w-xs cursor-pointer group"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping shrink-0" />
            <span className="text-xs font-semibold text-white group-hover:text-brand-orange transition-colors flex items-center gap-1.5">
              <Sparkles size={13} className="text-brand-orange" />
              Chat with Veltrix AI
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-gray-400 hover:text-white ml-0.5 p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING TRIGGER BUTTON ── */}
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open Veltrix AI Chat"
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-brand-navy via-[#0d2259] to-brand-orange text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-orange/30 border border-white/20"
        style={{
          boxShadow: "0 8px 25px -4px rgba(232, 93, 4, 0.45)",
        }}
      >
        {/* Pulsing glow ring */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-brand-orange opacity-35 animate-ping pointer-events-none" />
        )}

        {isOpen ? (
          <X size={24} className="text-white relative z-10" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot size={26} className="text-white relative z-10" />
            <Sparkles
              size={12}
              className="absolute -top-1.5 -right-2 text-brand-orange animate-pulse"
            />
          </div>
        )}

        {/* AI status badge dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-brand-navy rounded-full z-20 flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
