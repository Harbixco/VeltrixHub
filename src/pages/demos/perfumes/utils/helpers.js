// Luxury Perfume Concierge contact & currency helpers
export const WHATSAPP_NUMBER = "2348087098270";

export const formatNaira = (val) => `₦${Math.round(val || 0).toLocaleString()}`;

/**
 * Generates an official receipt-style WhatsApp pre-filled order URL for a single perfume product.
 * Formatted cleanly as an official haute parfumerie invoice / order receipt.
 */
export const generateSingleProductWhatsAppUrl = ({
  product,
  size = null,
  concentration = null,
  qty = 1,
  city = "Victoria Island, Lagos",
}) => {
  if (!product) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const chosenSize =
    typeof size === "string"
      ? size
      : size || (product.sizes ? product.sizes[0] : "100ml Extrait");

  const chosenConcentration =
    concentration || product.concentration || "Extrait de Parfum (35% Oil)";

  const unitPrice = product.price || 0;
  const subtotal = unitPrice * qty;

  const lines = [
    `Hello AuraScents! 👋 I would like to order the following from your website:`,
    `------------------------------------`,
    `🛍️ Item: ${product.name} (Size: ${chosenSize}, Conc: ${chosenConcentration})`,
    `🔢 Qty: ${qty}`,
    `💰 Price: ${formatNaira(subtotal)}`,
    `------------------------------------`,
    `📦 Subtotal: ${formatNaira(subtotal)}`,
    `📍 Delivery City: ${city}`,
    `Please confirm availability and bank details!`,
  ];

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};

/**
 * Generates an official receipt-style WhatsApp checkout URL for multiple fragrances in cart.
 */
export const generateWhatsAppCheckoutUrl = ({
  cart = [],
  customerInfo = {},
  cartSubtotal = 0,
  amountToFreeShipping = 0,
}) => {
  if (cart.length === 0) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const deliveryCity =
    customerInfo.city || customerInfo.address || "Victoria Island, Lagos";

  const lines = [
    `Hello AuraScents! 👋 I would like to order the following from your website:`,
    `------------------------------------`,
  ];

  cart.forEach((item, index) => {
    const sizeStr = item.selectedSize || "100ml Extrait";
    const itemSubtotal = (item.price || 0) * (item.quantity || 1);
    lines.push(
      `🛍️ Item ${index + 1}: ${item.name} (Size: ${sizeStr})\n🔢 Qty: ${item.quantity || 1}\n💰 Price: ${formatNaira(itemSubtotal)}`
    );
    if (index < cart.length - 1) {
      lines.push(`- - - - - - - - - - - - - - - - - -`);
    }
  });

  lines.push(`------------------------------------`);
  lines.push(`📦 Subtotal: ${formatNaira(cartSubtotal)}`);
  lines.push(
    `🚚 Shipping: ${
      amountToFreeShipping === 0
        ? "FREE (Express Delivery)"
        : "Standard Dispatch (₦3,500)"
    }`
  );
  lines.push(`📍 Delivery City: ${deliveryCity}`);

  if (customerInfo.fullName) {
    lines.push(`👤 Client: ${customerInfo.fullName}`);
  }
  if (customerInfo.phone) {
    lines.push(`📞 Phone: ${customerInfo.phone}`);
  }

  lines.push(`Please confirm availability and bank details!`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};

