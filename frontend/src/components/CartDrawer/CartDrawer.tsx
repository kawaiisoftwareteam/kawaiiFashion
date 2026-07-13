"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const shipping = cartSubtotal >= 50 ? 0 : 5.0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />

      {/* Cart Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        {/* Drawer Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Your Shopping Bag ({cartCount})</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Drawer Body/Content */}
        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>Your bag is empty</h3>
              <p className={styles.emptySubtitle}>
                Looks like you haven't added any products yet. Let's find some premium formulas for you!
              </p>
              <button className={styles.shopBtn} onClick={onClose}>
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                  {item.isPreorder && (
                    <span className={styles.preorderBadge}>
                      Pre-order (Ships {item.availableDate})
                    </span>
                  )}
                  <div className={styles.qtyRow}>
                    <div className={styles.qtySelector}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Subtotals */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping === 0 && (
              <div className={`${styles.summaryRow} ${styles.summaryRowActive}`}>
                <span>Free Shipping Reward</span>
                <span>-$5.00 Applied</span>
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className={styles.checkoutBtn} onClick={onClose}>
              <span>Proceed to Checkout</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
