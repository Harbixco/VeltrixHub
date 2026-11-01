import { useState, useEffect, useMemo } from "react";
import SEO from "../../../components/SEO";
import PageTransition from "../../../components/PageTransition";

// Data & Helpers
import {
  HERO_SLIDES,
  DEAL_OF_THE_DAY,
  PERFUMES_CATALOG,
} from "./data";
import { generateWhatsAppCheckoutUrl } from "./utils/helpers";

// Modular UI Components
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import MobileMenuDrawer from "./components/MobileMenuDrawer";
import CategoryFocusView from "./components/CategoryFocusView";
import HeroBanner from "./components/HeroBanner";
import TrustBadges from "./components/TrustBadges";
import CategoryGrid from "./components/CategoryGrid";
import DealOfTheDay from "./components/DealOfTheDay";
import ProductCatalog from "./components/ProductCatalog";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import CheckoutModal from "./components/CheckoutModal";
import PoliciesModal from "./components/PoliciesModal";
import MobileBottomNav from "./components/MobileBottomNav";
import ToastNotification from "./components/ToastNotification";
import VeltrixFloatingCTA from "./components/VeltrixFloatingCTA";

export default function PerfumesDemoPage() {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState("Vault");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dedicated Category Page view state (null = Home full store, "Oud & Oriental" | "Gourmand & Vanilla" | "Floral & Botanical" | "Fresh & Woody Aquatic" | "Attar & Pure Oils")
  const [activeCategoryPage, setActiveCategoryPage] = useState(null);

  // Customer Care & Policy Modal state (null | "faqs" | "authenticity" | "shipping" | "returns" | "storage")
  const [activePolicyModal, setActivePolicyModal] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Hero Carousel State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto rotate carousel every 6 seconds on desktop & mobile
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("aurascents_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      {
        ...DEAL_OF_THE_DAY,
        quantity: 1,
        selectedSize: DEAL_OF_THE_DAY.sizes[0],
        cartItemId: "deal-baccarat-oud-royale-default",
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem("aurascents_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Live Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Card size selection overrides
  const [selectedCardSize, setSelectedCardSize] = useState({});

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PERFUMES_CATALOG.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.brand && item.brand.toLowerCase().includes(q)) ||
        (item.concentration && item.concentration.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.notes &&
          ((item.notes.top && item.notes.top.toLowerCase().includes(q)) ||
            (item.heart && item.heart.toLowerCase().includes(q)) ||
            (item.base && item.base.toLowerCase().includes(q))))
    );
  }, [searchQuery]);

  // Product Quick View modal with multi-image gallery
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalSize, setModalSize] = useState(null);
  const [modalQty, setModalQty] = useState(1);

  // Email Newsletter state
  const [emailInput, setEmailInput] = useState("");

  // Paystack demo checkout modal
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [paystackStep, setPaystackStep] = useState("customer");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "Dr. Babatunde Adeleke",
    email: "babatunde.adeleke@lagos.ng",
    phone: "08086624539",
    address: "Plot 14 Admirality Way, Lekki Phase 1",
    city: "Lagos",
  });
  const [mockTrxRef, setMockTrxRef] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Open modal with item and reset image index
  const openModal = (product) => {
    setActiveModalProduct(product);
    setActiveImageIndex(0);
    setModalSize(product.sizes ? product.sizes[0] : null);
    setModalQty(1);
  };

  // Live countdown timer (08 HRS : 12 MINS : 45 SEC : 30 MSEC)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    mins: 12,
    secs: 45,
    msecs: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, mins, secs, msecs } = prev;
        if (msecs > 0) {
          msecs -= 1;
        } else {
          msecs = 99;
          if (secs > 0) {
            secs -= 1;
          } else {
            secs = 59;
            if (mins > 0) {
              mins -= 1;
            } else {
              mins = 59;
              if (hours > 0) {
                hours -= 1;
              } else {
                hours = 12;
              }
            }
          }
        }
        return { hours, mins, secs, msecs };
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Pagination & items per page (6 items per page)
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products by category
  const displayedProducts = useMemo(() => {
    if (selectedFilterCategory === "All") return PERFUMES_CATALOG;
    return PERFUMES_CATALOG.filter(
      (item) => item.category.toLowerCase() === selectedFilterCategory.toLowerCase()
    );
  }, [selectedFilterCategory]);

  const totalPages = Math.max(1, Math.ceil(displayedProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [displayedProducts, currentPage]);

  const handleSelectCategory = (catKey) => {
    setSelectedFilterCategory(catKey);
    setCurrentPage(1);
  };

  const currentModalImages = useMemo(() => {
    if (!activeModalProduct) return [];
    if (activeModalProduct.gallery && activeModalProduct.gallery.length > 0) {
      return activeModalProduct.gallery;
    }
    return [activeModalProduct.image];
  }, [activeModalProduct]);

  // Cart operations
  const addToCart = (product, size = null, qty = 1) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : "100ml");
    const cartItemId = `${product.id}-${chosenSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedSize: chosenSize,
            quantity: qty,
            cartItemId,
          },
        ];
      }
    });

    showToast(`Added ${qty}x ${product.name} to scent bag!`);
  };

  const updateCartQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
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

  const freeShippingThreshold = 150000;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast("✨ Welcome to The Olfactory Circle! ₦15,000 voucher sent.");
      setEmailInput("");
    }
  };

  const handleOpenPaystack = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setPaystackStep("customer");
    setIsPaystackOpen(true);
  };

  const handlePaystackPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const randomRef = `trx_aura_${Math.floor(100000000 + Math.random() * 900000000)}`;
      setMockTrxRef(randomRef);
      setPaystackStep("success");
    }, 2000);
  };

  return (
    <PageTransition>
      <SEO
        title="AuraScents Parfumerie – Haute Parfumerie Lagos | Niche Fragrances & Pure Attars"
        description="Experience master-crafted Extrait de Parfums, rare Arabian oud, French vanilla gourmands, and 100% pure attar oils in Nigeria with discreet doorstep delivery."
      />

      <div className="bg-[#F6EAE7] text-[#231819] min-h-screen font-body antialiased selection:bg-[#8A4852] selection:text-white pb-20 sm:pb-0">
        {/* 1. TOP ANNOUNCEMENT BAR */}
        <AnnouncementBar setActivePolicyModal={setActivePolicyModal} />

        {/* 2. MAIN NAVBAR */}
        <Navbar
          activeCategoryPage={activeCategoryPage}
          setActiveCategoryPage={setActiveCategoryPage}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          setSelectedFilterCategory={setSelectedFilterCategory}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          totalCartCount={totalCartCount}
          cartSubtotal={cartSubtotal}
          setIsCartOpen={setIsCartOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          openModal={openModal}
          showToast={showToast}
        />

        {/* MOBILE MENU DRAWER */}
        <MobileMenuDrawer
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          activeCategoryPage={activeCategoryPage}
          setActiveCategoryPage={setActiveCategoryPage}
          setSelectedFilterCategory={setSelectedFilterCategory}
          setCurrentPage={setCurrentPage}
          showToast={showToast}
        />

        {/* MAIN BODY: CONDITIONAL CATEGORY FOCUS VIEW OR FULL STORE */}
        {activeCategoryPage ? (
          <CategoryFocusView
            activeCategoryPage={activeCategoryPage}
            setActiveCategoryPage={setActiveCategoryPage}
            setActiveNav={setActiveNav}
            setSelectedFilterCategory={setSelectedFilterCategory}
            openModal={openModal}
            addToCart={addToCart}
            setActivePolicyModal={setActivePolicyModal}
            setExpandedFaq={setExpandedFaq}
          />
        ) : (
          <>
            {/* HERO BANNER */}
            <HeroBanner
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
              touchStartX={touchStartX}
              setTouchStartX={setTouchStartX}
            />

            {/* TRUST BADGES STRIP */}
            <TrustBadges
              setActivePolicyModal={setActivePolicyModal}
              setExpandedFaq={setExpandedFaq}
            />

            {/* OLFACTORY FAMILIES GRID */}
            <CategoryGrid
              setActiveCategoryPage={setActiveCategoryPage}
              setActiveNav={setActiveNav}
              showToast={showToast}
            />

            {/* DEAL OF THE DAY */}
            <DealOfTheDay
              timeLeft={timeLeft}
              addToCart={addToCart}
              openModal={openModal}
            />

            {/* PRODUCT CATALOG */}
            <ProductCatalog
              paginatedProducts={paginatedProducts}
              displayedProducts={displayedProducts}
              selectedFilterCategory={selectedFilterCategory}
              handleSelectCategory={handleSelectCategory}
              selectedCardSize={selectedCardSize}
              setSelectedCardSize={setSelectedCardSize}
              openModal={openModal}
              addToCart={addToCart}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              showToast={showToast}
            />
          </>
        )}

        {/* NEWSLETTER STRIP */}
        <NewsletterSection
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          handleSubscribe={handleSubscribe}
        />

        {/* FOOTER */}
        <Footer
          setActiveCategoryPage={setActiveCategoryPage}
          setActiveNav={setActiveNav}
          setActivePolicyModal={setActivePolicyModal}
          setExpandedFaq={setExpandedFaq}
          showToast={showToast}
        />

        {/* CART DRAWER */}
        <CartDrawer
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          totalCartCount={totalCartCount}
          cart={cart}
          updateCartQty={updateCartQty}
          cartSubtotal={cartSubtotal}
          freeShippingThreshold={freeShippingThreshold}
          amountToFreeShipping={amountToFreeShipping}
          handleOpenPaystack={handleOpenPaystack}
          generateWhatsAppCheckoutUrl={() =>
            generateWhatsAppCheckoutUrl({
              cart,
              customerInfo,
              cartSubtotal,
              amountToFreeShipping,
            })
          }
        />

        {/* QUICK VIEW MODAL */}
        <QuickViewModal
          activeModalProduct={activeModalProduct}
          setActiveModalProduct={setActiveModalProduct}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
          modalSize={modalSize}
          setModalSize={setModalSize}
          modalQty={modalQty}
          setModalQty={setModalQty}
          currentModalImages={currentModalImages}
          addToCart={addToCart}
        />

        {/* CHECKOUT MODAL */}
        <CheckoutModal
          isPaystackOpen={isPaystackOpen}
          setIsPaystackOpen={setIsPaystackOpen}
          paystackStep={paystackStep}
          setPaystackStep={setPaystackStep}
          isProcessingPayment={isProcessingPayment}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          mockTrxRef={mockTrxRef}
          cartSubtotal={cartSubtotal}
          handlePaystackPayment={handlePaystackPayment}
          setCart={setCart}
          showToast={showToast}
        />

        {/* POLICIES MODAL */}
        <PoliciesModal
          activePolicyModal={activePolicyModal}
          setActivePolicyModal={setActivePolicyModal}
          expandedFaq={expandedFaq}
          setExpandedFaq={setExpandedFaq}
        />

        {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
        <MobileBottomNav
          activeCategoryPage={activeCategoryPage}
          setActiveCategoryPage={setActiveCategoryPage}
          setSelectedFilterCategory={setSelectedFilterCategory}
          setIsSearchOpen={setIsSearchOpen}
          totalCartCount={totalCartCount}
          setIsCartOpen={setIsCartOpen}
        />

        {/* TOAST NOTIFICATION */}
        <ToastNotification toastMessage={toastMessage} />

        {/* BUILT BY VELTRIX HUB FLOATING CALL TO ACTION */}
        <VeltrixFloatingCTA />
      </div>
    </PageTransition>
  );
}

