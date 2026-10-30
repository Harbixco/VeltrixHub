// Concierge contact & currency helpers
export const WHATSAPP_NUMBER = "2348087098270";

export const formatNaira = (val) => `₦${Math.round(val || 0).toLocaleString()}`;

export const generateWhatsAppCheckoutUrl = ({
  cart = [],
  customerInfo = {},
  cartSubtotal = 0,
  amountToFreeShipping = 0,
}) => {
  const lines = [
    `✨ *NEW SHOPEASE FASHION & BEAUTY ORDER*`,
    `---------------------------------------`,
  ];

  if (customerInfo.fullName && customerInfo.fullName.trim()) {
    lines.push(
      `*Customer Details:*`,
      `• Name: ${customerInfo.fullName}`,
      `• Phone: ${customerInfo.phone || "Not provided"}`,
      `• Delivery: ${customerInfo.address ? `${customerInfo.address}, ${customerInfo.city || ""}` : "To be confirmed"}`,
      ``
    );
  } else {
    lines.push(`*Customer:* Direct Website Shopper`, ``);
  }

  lines.push(`*Curated Order Items:*`);

  cart.forEach((item, idx) => {
    const colorText = item.selectedColor ? ` / ${item.selectedColor.name}` : "";
    const sizeText = item.selectedSize ? ` / Size: ${item.selectedSize}` : "";
    lines.push(`${idx + 1}. *${item.name}*${colorText}${sizeText}`);
    lines.push(
      `   Qty: ${item.quantity} × ${formatNaira(item.price)} = ${formatNaira(
        item.price * item.quantity
      )}`
    );
  });

  lines.push(`---------------------------------------`);
  lines.push(`💵 *Subtotal:* ${formatNaira(cartSubtotal)}`);
  lines.push(
    `🚚 *Delivery:* ${
      amountToFreeShipping === 0
        ? "FREE Complimentary Express Delivery"
        : "₦4,500 Standard Nationwide Delivery"
    }`
  );
  lines.push(``);
  lines.push(`Hello! I want to finalize this order. Please confirm availability and send payment / account details. Thank you!`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};
