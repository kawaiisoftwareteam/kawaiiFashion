"use client";

import Hero from "../components/Hero/Hero";
import ProductsShowcase from "../components/ProductsShowcase/ProductsShowcase";
import FamilyCollections from "../components/FamilyCollections/FamilyCollections";
import PreorderSection from "../components/PreorderSection/PreorderSection";
import UpcomingSection from "../components/UpcomingSection/UpcomingSection";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { triggerToast } = useCart();

  const handlePreorderAdded = (productName: string) => {
    triggerToast(`Pre-ordered ${productName}! Added to Cart.`);
  };

  const handleNotifySubscribed = (productName: string) => {
    triggerToast(`Subscribed! We'll notify you when ${productName} drops.`);
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Product Showcase Catalog */}
      <ProductsShowcase />

      {/* Family Collections (Men, Ladies, Baby) */}
      <FamilyCollections />

      {/* Preorder Section */}
      <PreorderSection onPreorderAdded={handlePreorderAdded} />

      {/* Upcoming Section */}
      <UpcomingSection onNotifySubscribed={handleNotifySubscribed} />
    </>
  );
}
