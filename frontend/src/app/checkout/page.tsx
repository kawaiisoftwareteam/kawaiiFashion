"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
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

  const { cartItems, cartCount, cartSubtotal, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
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
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className={styles.successTitle}>Order Placed!</h1>
        <p className={styles.successMessage}>
          Thank you for your order, {fullName}! We've sent a receipt confirmation to <strong>{email}</strong>.
          Your premium skincare items are being prepared for shipping.
        </p>
        <div className={styles.orderBadge}>ORDER NO: {orderNumber}</div>
        <div>
          <Link href="/" className={styles.shopBtn}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
        <Link href="/" className={styles.backLink}>
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Shop</span>
        </Link>

        <h1 className={styles.pageTitle}>Secure Checkout</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Your bag is currently empty</h2>
            <p className={styles.emptySubtitle}>
              Please add items to your cart from our shop before checking out.
            </p>
            <Link href="/" className={styles.shopBtn}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Left side: Checkout Forms */}
            <form onSubmit={handleSubmit} className={styles.formPanel}>
              <div>
                <h2 className={styles.formGroupTitle}>Shipping Address</h2>
                <div className={styles.formGrid}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      className={styles.inputField}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Yuki Tanaka"
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      className={styles.inputField}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yuki@kawaiibeauty.com"
                    />
                  </div>
                  <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                    <label htmlFor="address">Address</label>
                    <input
                      id="address"
                      type="text"
                      required
                      className={styles.inputField}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="1-2-3 Minato-ku"
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
                      placeholder="105-0011"
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h2 className={styles.formGroupTitle}>Payment Details</h2>
                <div className={styles.formGrid}>
                  <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input
                      id="cardName"
                      type="text"
                      required
                      className={styles.inputField}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="YUKI TANAKA"
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
                      placeholder="•••• •••• •••• ••••"
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
                  <span>Pay & Place Order • ${total.toFixed(2)}</span>
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
                        <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
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
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              {shipping === 0 && (
                <div className={`${styles.summaryRow} ${styles.summaryRowActive}`}>
                  <span>Free Shipping Reward</span>
                  <span>-$5.00 Applied</span>
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
