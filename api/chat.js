// Vercel Serverless Function & Node handler for Veltrix AI
const SYSTEM_PROMPT = `
You are "Veltrix AI", the warm, intelligent, and highly professional digital assistant for Veltrix Hub.

ABOUT VELTRIX HUB:
Veltrix Hub is a premier digital technology agency and training hub based in Nigeria, serving businesses and individuals globally.
Official Email: info@veltrixhub.ng
Official WhatsApp / Phone: +234 808 709 8270
Website: https://veltrixhub.com

CORE SERVICES & EXPERTISE:
1. Website Development:
   - Custom modern websites built with React, Vite, TailwindCSS, and modern web standards.
   - Fully mobile-responsive, lightning fast, SEO-optimized for Google ranking, secure with SSL.
   - Includes contact/inquiry forms, lead generation systems, and clean UI/UX.

2. E-Commerce Store Development:
   - Full-featured online stores allowing businesses to sell products 24/7.
   - Payment gateway integration (Paystack, Flutterwave, cards, bank transfers).
   - Inventory management, shopping cart, mobile checkout, and automated order notifications.

3. Website Maintenance & Optimization:
   - Security monitoring, malware patches, speed optimization, regular backups, and bug fixes for existing websites.

4. Business Branding & Visual Identity:
   - Professional logo design, typography, brand guidelines, stationery, and social media brand kits.

5. CAC Business Registration:
   - Full assistance with Corporate Affairs Commission (CAC) Nigeria registration.
   - Business Name registration, Limited Liability Company (LTD) incorporation, and NGO registration.
   - Fast turnaround, name reservation, filing, and delivery of official certificates.

6. Veltrix Tech Academy (Education Arm):
   - Practical 12-week hands-on training in Web Development.
   - Curriculum: HTML5/CSS3 -> JavaScript Mastery -> React.js -> Full-Stack & Portfolio Building.
   - Flexible options: Online live interactive classes & in-person options. Beginner friendly (starts from zero).
   - Features: Real-world project building, active developer mentorship, career/portfolio guidance, and an official Certificate of Completion.

7. Free Digital Strategy Consultation:
   - Strategic guidance for business owners to determine the exact digital tools needed to grow online.

YOUR COMMUNICATION GUIDELINES:
- Greet visitors warmly and enthusiastically.
- Keep answers clear, concise, and easy to read (use short bullet points or 2-3 brief paragraphs).
- Tone: Professional, helpful, innovative, and reassuring.
- When asked about pricing: Explain that pricing is transparent and depends on project scope. Give rough starting estimates if asked, but always encourage them to connect on WhatsApp (+234 808 709 8270) or submit the contact form for an exact, tailored quote.
- Direct to WhatsApp: When users want to start a project, enroll in training, or speak with an engineer, invite them to chat directly with the team on WhatsApp (+234 808 709 8270).
- Never invent services, false guarantees, or team members that do not exist.
`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API key is not configured. Please set GEMINI_API_KEY in environment variables.",
    });
  }

  try {
    const { messages = [] } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid messages payload." });
    }

    // Format conversation history for Gemini API
    // Gemini expects 'user' and 'model' roles
    const contents = [];

    // First user turn embeds the system instructions so the model always respects the knowledge base
    let isFirstUserTurn = true;

    for (const msg of messages) {
      const role = msg.role === "assistant" ? "model" : "user";
      let text = msg.content || "";

      if (role === "user" && isFirstUserTurn) {
        text = `[SYSTEM INSTRUCTIONS & KNOWLEDGE BASE]\n${SYSTEM_PROMPT}\n\n[USER INQUIRY]\n${text}`;
        isFirstUserTurn = false;
      }

      contents.push({
        role,
        parts: [{ text }],
      });
    }

    // Models to try in order of priority
    const modelsToTry = [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
      "gemini-flash-latest",
    ];

    let lastError = null;
    let replyText = "";

    for (const model of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        const data = await response.json();

        if (data.error) {
          lastError = data.error.message;
          continue;
        }

        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          replyText = candidateText.trim();
          break;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!replyText) {
      throw new Error(lastError || "Could not generate reply from AI service.");
    }

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("Veltrix AI Error:", err);
    return res.status(500).json({
      error: "Sorry, I am having trouble connecting right now. Please try reaching us directly on WhatsApp (+234 808 709 8270).",
    });
  }
}
