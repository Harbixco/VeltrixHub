// Voltix Gadgets Concierge Contact & Formatting Helpers (Nigeria & Global)
export const WHATSAPP_NUMBER = "2348087098270";

// Free Lagos & Nationwide express delivery on orders over ₦100,000
export const FREE_DELIVERY_THRESHOLD = 100000;
export const STANDARD_DELIVERY_FEE = 4500;

export const formatNaira = (val) => {
  const num = Math.round(Number(val) || 0);
  return `₦${num.toLocaleString("en-NG")}`;
};

export const formatUSD = (val) => {
  const num = Number(val) || 0;
  return `$${num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Formatter respecting currency toggle
export const formatCurrency = (val, currency = "NGN") => {
  if (currency === "USD") {
    // Approximate conversion rate ₦1,500 = $1 for demo toggle
    return formatUSD(Math.round((val || 0) / 1500));
  }
  return formatNaira(val);
};

export const generateWhatsAppOrderUrl = ({
  cart = [],
  customerInfo = {},
  cartSubtotal = 0,
  amountToFreeShipping = 0,
  currency = "NGN",
}) => {
  const lines = [
    `⚡ *NEW VOLTIX TECH GADGETS ORDER*`,
    `---------------------------------------`,
  ];

  if (customerInfo.fullName && customerInfo.fullName.trim()) {
    lines.push(
      `*Customer Details:*`,
      `• Name: ${customerInfo.fullName}`,
      `• Phone: ${customerInfo.phone || "Not provided"}`,
      `• Email: ${customerInfo.email || "Not provided"}`,
      `• Delivery Address: ${
        customerInfo.address
          ? `${customerInfo.address}, ${customerInfo.city || "Lagos"}`
          : "Lagos / Nationwide dispatch"
      }`,
      ``
    );
  } else {
    lines.push(`*Customer:* Direct Website Shopper (Nigeria)`, ``);
  }

  lines.push(`*Selected Tech Gadgets:*`);

  cart.forEach((item, idx) => {
    const colorText = item.selectedColor ? ` / ${item.selectedColor.name}` : "";
    const storageText = item.selectedStorage ? ` / ${item.selectedStorage}` : "";
    lines.push(
      `${idx + 1}. *${item.name}*${colorText}${storageText}`
    );
    lines.push(
      `   Qty: ${item.quantity} × ${formatCurrency(item.price, currency)} = ${formatCurrency(
        item.price * item.quantity,
        currency
      )}`
    );
  });

  lines.push(`---------------------------------------`);
  lines.push(`💵 *Subtotal:* ${formatCurrency(cartSubtotal, currency)}`);
  lines.push(
    `🚚 *Delivery:* ${
      amountToFreeShipping <= 0
        ? "FREE Complimentary Lagos & Nationwide Express"
        : `${formatCurrency(STANDARD_DELIVERY_FEE, currency)} Standard Nationwide Delivery`
    }`
  );
  lines.push(``);
  lines.push(
    `Hello Voltix VIP Concierge! I want to confirm stock availability at your Ikeja Computer Village hub and receive bank payment / Paystack link. Thank you!`
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};
