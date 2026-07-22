"use client";

import Hero from "../components/Hero/Hero";
import ProductsShowcase from "../components/ProductsShowcase/ProductsShowcase";
import FamilyCollections from "../components/FamilyCollections/FamilyCollections";
import PreorderSection from "../components/PreorderSection/PreorderSection";
import UpcomingSection from "../components/UpcomingSection/UpcomingSection";
import BrandStory from "../components/BrandStory/BrandStory";
import FaqSection from "../components/FaqSection/FaqSection";
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
      <Hero />
      <ProductsShowcase />
      <FamilyCollections />
      <PreorderSection onPreorderAdded={handlePreorderAdded} />
      <UpcomingSection onNotifySubscribed={handleNotifySubscribed} />
      <BrandStory />
      <FaqSection />
    </>
  );
}

