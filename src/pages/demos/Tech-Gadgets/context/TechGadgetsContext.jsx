import { createContext, useContext, useState, useEffect, useMemo } from "react";

const TechGadgetsContext = createContext(null);

export function TechGadgetsProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mobilex_cart");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("mobilex_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, cartItemId: product.id }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const updateCartQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => (item.cartItemId || item.id) !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          (item.cartItemId || item.id) === cartItemId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    }
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <TechGadgetsContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQty,
        cartSubtotal,
        totalCartCount,
        isCartOpen,
        setIsCartOpen,
        activeModalProduct,
        setActiveModalProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </TechGadgetsContext.Provider>
  );
}

export function useTechGadgets() {
  const context = useContext(TechGadgetsContext);
  if (!context) {
    // Return safe fallback values so standalone renders or nested children don't throw uncaught errors
    return {
      cart: [],
      addToCart: () => {},
      updateCartQty: () => {},
      cartSubtotal: 0,
      totalCartCount: 0,
      isCartOpen: false,
      setIsCartOpen: () => {},
      activeModalProduct: null,
      setActiveModalProduct: () => {},
      toastMessage: null,
      showToast: () => {},
    };
  }
  return context;
}

