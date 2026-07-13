"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header/Header";
import ReviewsDrawer from "../../components/ReviewsDrawer/ReviewsDrawer";
import Toast from "../../components/Toast/Toast";
import { useCart } from "../../context/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

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

  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerToast = (message: string) => {
    setCartFeedback(true);
    setToastMessage(message);
    setTimeout(() => setCartFeedback(false), 600);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullName || !address || !city || !zip || !cardNumber || !cardExpiry || !cardCvc) {
      alert("Please fill in all checkout fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
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
      <div className={styles.cartContainer} style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className={styles.spinner} style={{ borderTopColor: "var(--color-crimson)", width: 40, height: 40 }}></div>
      </div>
    );
  }

  // Calculate pricing values
  const shipping = cartSubtotal >= 50 ? 0 : 5.0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  if (isSuccess) {
    return (
      <>
        <Header
          cartCount={0}
          cartFeedback={false}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />
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
            Thank you for your purchase, {fullName}! We've sent a confirmation invoice email to <strong>{email}</strong>.
            Your package will begin preparing shortly.
          </p>
          <div className={styles.orderBadge}>ORDER NO: {orderNumber}</div>
          <div>
            <Link href="/" className={styles.shopBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
        <ReviewsDrawer
          isOpen={isReviewsOpen}
          onToggle={() => setIsReviewsOpen(!isReviewsOpen)}
          onClose={() => setIsReviewsOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        cartFeedback={cartFeedback}
        onOpenReviews={() => setIsReviewsOpen(true)}
      />

      <div className={styles.cartContainer}>
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

        <h1 className={styles.cartTitle}>Your Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Your bag is currently empty</h2>
            <p className={styles.emptySubtitle}>
              Looks like you haven't added anything to your cart yet. Let's find some premium formulas for you!
            </p>
            <Link href="/" className={styles.shopBtn}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* Left side: Items & Checkout form */}
            <div>
              <div className={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImageWrapper}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="100px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                      {item.isPreorder && (
                        <span className={styles.preorderBadge}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="1" y="3" width="15" height="13"></rect>
                            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                            <circle cx="5.5" cy="18.5" r="2.5"></circle>
                            <circle cx="18.5" cy="18.5" r="2.5"></circle>
                          </svg>
                          Pre-order (Ships {item.availableDate})
                        </span>
                      )}
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantitySelector}>
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

                      <button
                        className={styles.removeBtn}
                        onClick={() => {
                          removeFromCart(item.id);
                          triggerToast(`Removed ${item.name} from bag.`);
                        }}
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide-out / Slide-down Checkout section */}
              {isCheckoutOpen && (
                <section className={styles.checkoutSection}>
                  <form onSubmit={handleCheckoutSubmit}>
                    <h2 className={styles.formGroupTitle}>Shipping details</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                          id="fullName"
                          type="text"
                          className={styles.inputField}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Yuki Tanaka"
                          required
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          className={styles.inputField}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yuki@kawaiibeauty.com"
                          required
                        />
                      </div>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label htmlFor="address">Address</label>
                        <input
                          id="address"
                          type="text"
                          className={styles.inputField}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="1-2-3 Minato-ku"
                          required
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="city">City</label>
                        <input
                          id="city"
                          type="text"
                          className={styles.inputField}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Tokyo"
                          required
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="zip">Postal Code</label>
                        <input
                          id="zip"
                          type="text"
                          className={styles.inputField}
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="105-0011"
                          required
                        />
                      </div>
                    </div>

                    <h2 className={styles.formGroupTitle}>Payment Info</h2>
                    <div className={styles.formGrid}>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label htmlFor="cardName">Cardholder Name</label>
                        <input
                          id="cardName"
                          type="text"
                          className={styles.inputField}
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="YUKI TANAKA"
                          required
                        />
                      </div>
                      <div className={`${styles.inputWrapper} ${styles.fullWidth}`}>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          id="cardNumber"
                          type="text"
                          className={styles.inputField}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="cardExpiry">Expiration Date</label>
                        <input
                          id="cardExpiry"
                          type="text"
                          className={styles.inputField}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor="cardCvc">Security Code (CVC)</label>
                        <input
                          id="cardCvc"
                          type="password"
                          className={styles.inputField}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={styles.placeOrderBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className={styles.spinner}></div>
                          <span>Processing Payment...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay & Place Order • ${total.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </form>
                </section>
              )}
            </div>

            {/* Right side: Summary */}
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Summary</h2>

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
                  <span>Promo Shipping Reward</span>
                  <span>-$5.00 Applied</span>
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {!isCheckoutOpen ? (
                <button
                  className={styles.checkoutBtn}
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  <span>Proceed to Checkout</span>
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
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              ) : (
                <button
                  className={styles.checkoutBtn}
                  style={{ background: "transparent", color: "var(--color-stone)", border: "1px solid #f0f0ed" }}
                  onClick={() => setIsCheckoutOpen(false)}
                >
                  <span>Modify Items</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <ReviewsDrawer
        isOpen={isReviewsOpen}
        onToggle={() => setIsReviewsOpen(!isReviewsOpen)}
        onClose={() => setIsReviewsOpen(false)}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}
