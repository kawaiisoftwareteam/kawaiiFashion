"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ProductsShowcase from "../components/ProductsShowcase/ProductsShowcase";
import PreorderSection from "../components/PreorderSection/PreorderSection";
import UpcomingSection from "../components/UpcomingSection/UpcomingSection";
import ReviewsDrawer from "../components/ReviewsDrawer/ReviewsDrawer";
import Toast from "../components/Toast/Toast";
import { useCart } from "../context/CartContext";
import styles from "./page.module.css";

const standardProducts = [
  {
    id: "serum",
    name: "Rice Ferment Brightening Serum",
    price: 36,
    image: "/product_serum.png",
  },
  {
    id: "cream",
    name: "Camellia Nourishing Cream",
    price: 42,
    image: "/product_cream.png",
  },
  {
    id: "cleanser",
    name: "Peach Blossom Cleansing Oil",
    price: 28,
    image: "/product_cleanser.png",
  },
  {
    id: "mask",
    name: "Matcha Green Tea Clay Mask",
    price: 34,
    image: "/product_mask.png",
  },
];

export default function Home() {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const { addToCart, cartCount } = useCart();

  const triggerToast = (message: string) => {
    setCartFeedback(true);
    setToastMessage(message);

    // Reset jiggle animation
    setTimeout(() => {
      setCartFeedback(false);
    }, 600);

    // Auto-dismiss toast
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleAddToCart = (productName: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // prevent opening details modal
    }
    
    const found = standardProducts.find((p) => p.name === productName);
    if (found) {
      addToCart({
        id: found.id,
        name: found.name,
        price: found.price,
        image: found.image,
      });
      triggerToast(`Added ${productName} to Cart!`);
    }
  };

  const handlePreorderAdded = (productName: string) => {
    triggerToast(`Pre-ordered ${productName}! Added to Cart.`);
  };

  const handleNotifySubscribed = (productName: string) => {
    triggerToast(`Subscribed! We'll notify you when ${productName} drops.`);
  };

  return (
    <div className={styles.container}>
      {/* Header and Navigation */}
      <Header
        cartCount={cartCount}
        cartFeedback={cartFeedback}
        onOpenReviews={() => setIsReviewsOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* Product Showcase Catalog */}
      <ProductsShowcase onAddToCart={handleAddToCart} />

      {/* Preorder Section */}
      <PreorderSection onPreorderAdded={handlePreorderAdded} />

      {/* Upcoming Section */}
      <UpcomingSection onNotifySubscribed={handleNotifySubscribed} />

      {/* Slide-out Customer Reviews Drawer */}
      <ReviewsDrawer
        isOpen={isReviewsOpen}
        onToggle={() => setIsReviewsOpen(!isReviewsOpen)}
        onClose={() => setIsReviewsOpen(false)}
      />

      {/* Temporary slide-in Toast Notification alerts */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
