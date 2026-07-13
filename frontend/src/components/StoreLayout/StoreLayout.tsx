"use client";

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ReviewsDrawer from "../ReviewsDrawer/ReviewsDrawer";
import CartDrawer from "../CartDrawer/CartDrawer";
import Toast from "../Toast/Toast";
import { useCart } from "../../context/CartContext";
import styles from "./StoreLayout.module.css";

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  const {
    isCartOpen,
    setIsCartOpen,
    isReviewsOpen,
    setIsReviewsOpen,
    cartFeedback,
    toastMessage,
    setToastMessage,
    cartCount
  } = useCart();

  return (
    <div className={`${styles.container} ${isCartOpen ? styles.containerCartOpen : ""}`}>
      <div className={`${styles.mainContent} ${isCartOpen ? styles.mainContentCartOpen : ""}`}>
        {/* Header and Navigation */}
        <Header
          cartCount={cartCount}
          cartFeedback={cartFeedback}
          onOpenReviews={() => setIsReviewsOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Slide-out Customer Reviews Drawer */}
      <ReviewsDrawer
        isOpen={isReviewsOpen}
        onToggle={() => setIsReviewsOpen(!isReviewsOpen)}
        onClose={() => setIsReviewsOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Temporary slide-in Toast Notification alerts */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
