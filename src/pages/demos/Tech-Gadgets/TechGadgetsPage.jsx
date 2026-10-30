import SEO from "../../../components/SEO";
import PageTransition from "../../../components/PageTransition";

// Tech-Gadgets Components
import TechGadgetsLayout from "./components/TechGadgetsLayout";
import HeroBanner from "./components/HeroBanner";
import ShopByCategory from "./components/ShopByCategory";
import TopBrandsDeals from "./components/TopBrandsDeals";
import PopularProducts from "./components/PopularProducts";

export default function TechGadgetsPage() {
  const handleShopNow = () => {
    const el = document.getElementById("popular-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition>
      <SEO
        title="MobileX Nigeria – Your World, Connected | Smartphones, Laptops & Gadgets"
        description="Nigeria's premier tech hub for brand-new Apple, Samsung, OnePlus, Xiaomi, and Google gadgets, laptops, powerbanks & earpods. Nationwide delivery."
      />

      <TechGadgetsLayout>
        {/* 1. HERO BANNER (Auto-play, clean typography, verified powerbank) */}
        <HeroBanner onShopNow={handleShopNow} />

        {/* 2. SHOP BY CATEGORY (5 columns with enlarged images) */}
        <ShopByCategory />

        {/* 3. LIMITED TIME DEAL - BEST DEALS ON TOP BRANDS */}
        <TopBrandsDeals />

        {/* 4. POPULAR PRODUCTS (2 rows x 4 columns with pagination) */}
        <PopularProducts />
      </TechGadgetsLayout>
    </PageTransition>
  );
}
