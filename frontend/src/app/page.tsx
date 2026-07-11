"use client";

import { useState } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import ProductsShowcase from "../components/ProductsShowcase/ProductsShowcase";
import ReviewsDrawer from "../components/ReviewsDrawer/ReviewsDrawer";
import Toast from "../components/Toast/Toast";
import styles from "./page.module.css";

export default function Home() {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (productName: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // prevent opening details modal
    }
    setCartCount((prev) => prev + 1);
    setCartFeedback(true);
    setToastMessage(`Added ${productName} to Cart!`);

    // Reset jiggle animation
    setTimeout(() => {
      setCartFeedback(false);
    }, 600);

    // Auto-dismiss toast
    setTimeout(() => {
      setToastMessage((prev) => (prev === `Added ${productName} to Cart!` ? null : prev));
    }, 3000);
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
