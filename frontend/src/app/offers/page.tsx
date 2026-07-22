"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import styles from "./Offers.module.css";

interface Offer {
  id: string;
  badge: string;
  badgeType: "crimson" | "gold" | "blue";
  value: string;
  title: string;
  description: string;
  code?: string;
  ctaText: string;
  ctaLink: string;
  productImage: string;
}

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { triggerToast } = useCart();

  const offers: Offer[] = [
    {
      id: "glass-skin-bundle",
      badge: "Best Value Bundle",
      badgeType: "crimson",
      value: "15% OFF",
      title: "The Glass Skin Routine Bundle",
      description: "Get 15% off when you purchase the complete 4-step Glass Skin Routine kit. Includes Peach Blossom Cleansing Oil, Kome Rice Ferment Toner, Rice Ferment Brightening Serum, and Sakura Soothing Mist.",
      code: "GLASSSKIN15",
      ctaText: "Shop Glass Skin Routine",
      ctaLink: "/collections/glass-skin-routine",
      productImage: "/product_serum.png"
    },
    {
      id: "first-glow",
      badge: "Welcome Offer",
      badgeType: "gold",
      value: "10% OFF",
      title: "First-Time Customer Discount",
      description: "New to Kawaii Beauty? Apply this coupon at checkout to save 10% on your entire first purchase of our traditional Japanese skincare lines.",
      code: "KAWAIIFIRST",
      ctaText: "Explore Best Sellers",
      ctaLink: "/#shop",
      productImage: "/product_mask.png"
    },
    {
      id: "free-yuzu-gift",
      badge: "Complimentary Gift",
      badgeType: "crimson",
      value: "FREE GIFT",
      title: "Complimentary Yuzu Lip Balm",
      description: "Receive a free full-size Yuzu Brightening Lip Balm (valued at $14) with any purchase of $75 or more. The gift will be automatically added to your cart at checkout.",
      ctaText: "Browse All Products",
      ctaLink: "/#shop",
      productImage: "/product_cleanser.png"
    },
    {
      id: "free-shipping",
      badge: "Always Available",
      badgeType: "blue",
      value: "FREE SHIPPING",
      title: "Free Tracked Worldwide Shipping",
      description: "Enjoy complimentary tracked international shipping on all orders over $50. No discount code required. Free shipping is automatically applied at checkout.",
      ctaText: "Shop New Arrivals",
      ctaLink: "/#new-arrivals",
      productImage: "/product_cream.png"
    }
  ];

  const handleCopyCode = (code: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(
        () => {
          setCopiedCode(code);
          triggerToast(`Promo code "${code}" copied to clipboard!`);
          setTimeout(() => {
            setCopiedCode(null);
          }, 2500);
        },
        () => {
          triggerToast("Failed to copy code. Please select and copy manually.");
        }
      );
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <h1 className={styles.pageTitle}>Exclusive Offers</h1>
        <p className={styles.pageSubtitle}>
          Discover curated deals, bundles, and seasonal promotions on premium Japanese skincare rituals. Unlock your natural translucency and deep moisture.
        </p>
      </section>

      {/* Offers Grid */}
      <div className={styles.offersGrid}>
        {offers.map((offer) => {
          const badgeClass = 
            offer.badgeType === "crimson"
              ? styles.badgeCrimson
              : offer.badgeType === "gold"
              ? styles.badgeGold
              : styles.badgeBlue;

          const imageBgClass =
            offer.badgeType === "crimson"
              ? styles.bgCrimson
              : offer.badgeType === "gold"
              ? styles.bgGold
              : styles.bgBlue;

          return (
            <div key={offer.id} className={styles.offerCard}>
              {/* Left Side Details */}
              <div className={styles.cardLeftColumn}>
                <div>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.badge} ${badgeClass}`}>
                      {offer.badge}
                    </span>
                    <span className={styles.valueIndicator}>{offer.value}</span>
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {offer.code ? (
                    <div className={styles.couponBox}>
                      <div>
                        <span className={styles.codeLabel}>PROMO CODE</span>
                        <div className={styles.codeText}>{offer.code}</div>
                      </div>
                      <button
                        className={`${styles.copyBtn} ${
                          copiedCode === offer.code ? styles.copyBtnActive : ""
                        }`}
                        onClick={() => handleCopyCode(offer.code!)}
                        aria-label={`Copy code ${offer.code}`}
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className={styles.autoApplyInfo}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Applied automatically at checkout
                    </div>
                  )}

                  <Link
                    href={offer.ctaLink}
                    className={styles.ctaBtn}
                  >
                    <span>{offer.ctaText}</span>
                  </Link>
                </div>
              </div>

              {/* Right Side Visual Image */}
              <div className={styles.imageColumn}>
                <div className={`${styles.imageWrapper} ${imageBgClass}`}>
                  <Image
                    src={offer.productImage}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "contain", padding: "10px" }}
                    className={styles.productImage}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terms and Conditions Section */}
      <section className={styles.termsWrapper}>
        <h2 className={styles.termsTitle}>Terms &amp; Conditions</h2>
        <ul className={styles.termsList}>
          <li>Promo codes cannot be combined with other ongoing sales or discount codes on a single purchase.</li>
          <li>The Free Gift (Yuzu Lip Balm) is subject to stock availability and applies only to orders exceeding $75 subtotal before taxes and shipping.</li>
          <li>Free worldwide shipping applies to standard tracked shipping options on orders exceeding $50 subtotal.</li>
          <li>Offers are subject to change or termination at any time without prior notice.</li>
        </ul>
      </section>
    </div>
  );
}
