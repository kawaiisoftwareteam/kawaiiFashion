"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/currency";
import styles from "../checkout/checkout.module.css";

export default function CartPage() {
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  const shippingCost = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 5.99;
  const grandTotal = cartSubtotal + shippingCost;

  return (
    <div className={styles.checkoutPage} style={{ padding: "60px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 className={styles.title} style={{ fontSize: 36, marginBottom: 8, textAlign: "center" }}>
        Your Shopping Bag
      </h1>
      <p style={{ textAlign: "center", color: "var(--color-stone)", marginBottom: 40, fontFamily: "var(--font-sans)" }}>
        {cartCount === 0
          ? "Your shopping bag is empty."
          : `You have ${cartCount} ${cartCount === 1 ? "item" : "items"} in your bag.`}
      </p>

      {cartCount === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ marginBottom: 24, fontSize: 16, color: "var(--color-stone)" }}>
            Explore our curated Japanese skincare, mountain spring waters, and artisanal chocolates.
          </p>
          <Link
            href="/#shop"
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-crimson)",
              color: "#FFF",
              padding: "14px 32px",
              borderRadius: 4,
              textDecoration: "none",
              fontWeight: 700,
              fontFamily: "var(--font-sans)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 40 }}>
          {/* Items List */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: 20,
                    backgroundColor: "#FFF",
                    borderRadius: 12,
                    border: "1px solid rgba(140, 136, 132, 0.15)",
                  }}
                >
                  <div style={{ position: "relative", width: 80, height: 80, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", fontFamily: "var(--font-serif)" }}>
                      {item.name}
                    </h3>
                    <div style={{ fontSize: 14, color: "var(--color-crimson)", fontWeight: 700, fontFamily: "var(--font-sans)" }}>
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid rgba(140, 136, 132, 0.3)",
                        background: "#FFF",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, fontFamily: "var(--font-sans)", minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "1px solid rgba(140, 136, 132, 0.3)",
                        background: "#FFF",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--color-stone)",
                      cursor: "pointer",
                      fontSize: 18,
                      padding: 6,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div
            style={{
              backgroundColor: "#FFF",
              padding: 30,
              borderRadius: 16,
              border: "1px solid rgba(140, 136, 132, 0.15)",
              height: "fit-content",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, fontFamily: "var(--font-serif)" }}>
              Order Summary
            </h2>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, fontFamily: "var(--font-sans)" }}>
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 14, fontFamily: "var(--font-sans)" }}>
              <span>Estimated Shipping</span>
              <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
            </div>

            {cartSubtotal < 50 && (
              <div style={{ fontSize: 12, color: "var(--color-crimson)", marginBottom: 16, fontFamily: "var(--font-sans)" }}>
                Add {formatPrice(50 - cartSubtotal)} more for free tracked shipping!
              </div>
            )}

            <hr style={{ border: "none", borderTop: "1px solid rgba(140, 136, 132, 0.15)", margin: "16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, fontSize: 18, fontWeight: 700, fontFamily: "var(--font-sans)" }}>
              <span>Total</span>
              <span style={{ color: "var(--color-crimson)" }}>{formatPrice(grandTotal)}</span>
            </div>

            <Link
              href="/checkout"
              style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "var(--color-crimson)",
                color: "#FFF",
                padding: "16px",
                borderRadius: 4,
                textDecoration: "none",
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
