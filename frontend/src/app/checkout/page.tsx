"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/currency";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const { cartItems, cartSubtotal, clearCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullName || !address || !city || !zip || !cardNumber || !cardExpiry || !cardCvc) {
      alert("Please fill in all details to place order.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderNo = `KB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNo);
      clearCart();
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!mounted) {
    return (
      <div className={styles.checkoutContainer} style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className={styles.spinner} style={{ borderTopColor: "var(--color-crimson)", width: 40, height: 40 }}></div>
      </div>
    );
  }

  const shipping = cartSubtotal >= 50 ? 0 : 5.0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  if (isSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className={styles.successTitle}>Arigatou Gozaimasu!</h1>
        <p className={styles.successText}>
          Your order has been officially received and dispatched directly to our Tokyo logistics atelier.
        </p>
        <div className={styles.orderNumberCard}>
          Order Number: <strong>#{orderNumber}</strong>
        </div>
        <p className={styles.successEmailNotice}>
          A confirmation receipt alongside tracking credentials has been sent to <strong>{email}</strong>.
        </p>
        <Link href="/" className={styles.returnHomeBtn}>
          Return to Sanctuary Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Secure Checkout</h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Shopping Bag</span>
          <span>/</span>
          <span className={styles.activeBreadcrumb}>Payment</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Your shopping bag is empty.</p>
          <Link href="/" className={styles.returnHomeBtn} style={{ marginTop: "1rem" }}>
            Explore Curations
          </Link>
        </div>
      ) : (
        <div className={styles.checkoutGrid}>
          {/* Left side: Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>1</span>
                Contact Information
              </h2>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sora.takahashi@ginza.jp"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>2</span>
                Shipping Address
              </h2>
              <div className={styles.inputGrid}>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    className={styles.inputField}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sora Takahashi"
                  />
                </div>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                  <label htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    type="text"
                    required
                    className={styles.inputField}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="6-10-1 Ginza, Chuo-ku"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    required
                    className={styles.inputField}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Tokyo"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="zip">Postal Code</label>
                  <input
                    id="zip"
                    type="text"
                    required
                    className={styles.inputField}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="104-0061"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>3</span>
                Payment Method
              </h2>
              <div className={styles.paymentSecurityBadge}>
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
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>End-to-end 256-Bit Encrypted TLS Connection</span>
              </div>
              <div className={styles.inputGrid}>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    id="cardName"
                    type="text"
                    required
                    className={styles.inputField}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Sora Takahashi"
                  />
                </div>
                <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    required
                    className={styles.inputField}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    maxLength={19}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cardExpiry">Expiration Date</label>
                  <input
                    id="cardExpiry"
                    type="text"
                    required
                    className={styles.inputField}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="cardCvc">CVC</label>
                  <input
                    id="cardCvc"
                    type="password"
                    required
                    className={styles.inputField}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="•••"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={styles.placeOrderBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Pay & Place Order • {formatPrice(total)}</span>
              )}
            </button>
          </form>

          {/* Right side: Summary Card */}
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.itemCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <div className={styles.itemMeta}>
                      <span>Qty: {item.quantity}</span>
                      <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    {item.isPreorder && (
                      <span className={styles.preorderLabel}>
                        Pre-order (Ships {item.availableDate})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Estimated Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>

            {shipping === 0 && (
              <div className={`${styles.summaryRow} ${styles.summaryRowActive}`}>
                <span>Free Shipping Reward</span>
                <span>-{formatPrice(5)} Applied</span>
              </div>
            )}

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
