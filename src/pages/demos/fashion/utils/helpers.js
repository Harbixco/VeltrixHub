// Concierge contact & currency helpers
export const WHATSAPP_NUMBER = "2348087098270";

export const formatNaira = (val) => `₦${Math.round(val || 0).toLocaleString()}`;

/**
 * Generates an official receipt-style WhatsApp pre-filled order URL for a single product.
 * Formatted exactly as an official e-commerce order receipt.
 */
export const generateSingleProductWhatsAppUrl = ({
  product,
  color = null,
  size = null,
  qty = 1,
  city = "Lekki, Lagos",
}) => {
  if (!product) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const chosenColor =
    typeof color === "string"
      ? color
      : color?.name || (product.colors ? product.colors[0]?.name : "Standard");
  const chosenSize =
    typeof size === "string"
      ? size
      : size || (product.sizes ? product.sizes[0] : "Standard");
  const unitPrice = product.price || 0;
  const subtotal = unitPrice * qty;

  const lines = [
    `Hello! 👋 I would like to order the following from your website:`,
    `------------------------------------`,
    `🛍️ Item: ${product.name} (Size: ${chosenSize}, Color: ${chosenColor})`,
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
 * Generates an official receipt-style WhatsApp checkout URL for multiple items in wardrobe cart.
 */
export const generateWhatsAppCheckoutUrl = ({
  cart = [],
  customerInfo = {},
  cartSubtotal = 0,
  amountToFreeShipping = 0,
}) => {
  if (cart.length === 0) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const deliveryCity =
    customerInfo.city || customerInfo.address || "Ikeja, Lagos";

  const lines = [
    `Hello! 👋 I would like to order the following from your website:`,
    `------------------------------------`,
  ];

  cart.forEach((item) => {
    const colorName = item.selectedColor?.name || item.selectedColor || "Standard";
    const sizeName = item.selectedSize || "Standard";
    const itemTotal = item.price * item.quantity;

    lines.push(
      `🛍️ Item: ${item.name} (Size: ${sizeName}, Color: ${colorName})`,
      `🔢 Qty: ${item.quantity}`,
      `💰 Price: ${formatNaira(itemTotal)}`,
      `------------------------------------`
    );
  });

  lines.push(`📦 Subtotal: ${formatNaira(cartSubtotal)}`);
  if (amountToFreeShipping === 0) {
    lines.push(`🚚 Delivery: FREE Express Delivery (Orders over ₦100,000)`);
  } else {
    lines.push(`🚚 Delivery: Nationwide Express Delivery`);
  }
  lines.push(`📍 Delivery City: ${deliveryCity}`);
  if (customerInfo.fullName && customerInfo.fullName.trim()) {
    lines.push(`👤 Customer Name: ${customerInfo.fullName.trim()}`);
  }
  lines.push(`Please confirm availability and bank details!`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
};
