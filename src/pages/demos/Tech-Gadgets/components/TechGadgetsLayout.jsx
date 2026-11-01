import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import QuickViewModal from "./QuickViewModal";
import ToastNotification from "./ToastNotification";
import MobileBottomNav from "./MobileBottomNav";
import VeltrixFloatingCTA from "./VeltrixFloatingCTA";
import { TechGadgetsProvider, useTechGadgets } from "../context/TechGadgetsContext";

function TechGadgetsLayoutContent({ children }) {
  const {
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
  } = useTechGadgets();

  return (
    <div className="bg-white text-gray-900 min-h-screen font-body antialiased selection:bg-[#FF6B00] selection:text-white flex flex-col justify-between pb-20 sm:pb-0">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* 2. NAVBAR */}
      <Navbar />

      {/* 3. MAIN PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. NEWSLETTER */}
      <NewsletterSection showToast={showToast} />

      {/* 5. FOOTER */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        updateCartQty={updateCartQty}
        cartSubtotal={cartSubtotal}
        totalCartCount={totalCartCount}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          showToast("Order simulated successfully! We will contact you.");
        }}
      />

      {/* Product Details Modal (Active strictly for product details as requested) */}
      <QuickViewModal
        activeProduct={activeModalProduct}
        setActiveProduct={setActiveModalProduct}
        addToCart={addToCart}
        showToast={showToast}
      />

      <ToastNotification toastMessage={toastMessage} />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Built by Veltrix Hub Floating Call to Action */}
      <VeltrixFloatingCTA />
    </div>
  );
}

export default function TechGadgetsLayout({ children }) {
  return (
    <TechGadgetsProvider>
      <TechGadgetsLayoutContent>
        {children}
      </TechGadgetsLayoutContent>
    </TechGadgetsProvider>
  );
}
