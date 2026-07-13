"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./UpcomingSection.module.css";

interface UpcomingProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  releaseSchedule: string;
}

const upcomingProducts: UpcomingProduct[] = [
  {
    id: "upcoming_sakura",
    name: "Sakura Soothing Mist",
    tagline: "Calm & Balance",
    description: "An ultra-fine hydration mist infused with fresh cherry blossom distillate and centella asiatica. Instantly calms redness, balances oil-water levels, and sets makeup with a dewy glow.",
    price: 24,
    image: "/product_cleanser.png",
    releaseSchedule: "Releasing Autumn 2026",
  },
  {
    id: "upcoming_yuzu",
    name: "Yuzu Glow Ampoule",
    tagline: "Revitalize & Energize",
    description: "A highly concentrated vitamin ampoule containing 70% cold-pressed Yuzu extract and stabilized vitamin C. Fades pigmentation, boosts cellular energy, and awakens dull complexions.",
    price: 45,
    image: "/product_serum.png",
    releaseSchedule: "Releasing Winter 2026",
  },
];

interface UpcomingSectionProps {
  onNotifySubscribed: (productName: string) => void;
}

export default function UpcomingSection({ onNotifySubscribed }: UpcomingSectionProps) {
  const [notifyFormId, setNotifyFormId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleNotifyToggle = (productId: string) => {
    setNotifyFormId(productId);
    setEmail("");
  };

  const handleNotifySubmit = (e: React.FormEvent, productName: string) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    onNotifySubscribed(productName);
    setNotifyFormId(null);
    setEmail("");
  };

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.tagline}>Future Collections</span>
        <h2 className={styles.title}>Coming Soon to Kawaii Beauty</h2>
        <p className={styles.subtitle}>
          Here is a sneak peek at what our laboratory has been working on. Sign up for exclusive early access and launch day notifications.
        </p>
      </div>

      <div className={styles.grid}>
        {upcomingProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <span className={styles.badge}>COMING SOON</span>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className={styles.productImage}
              />
              <div className={styles.releaseBadge}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{product.releaseSchedule}</span>
              </div>
            </div>

            <div className={styles.info}>
              <h3 className={styles.productTitle}>{product.name}</h3>
              <p className={styles.taglineText}>{product.tagline}</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.footer}>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>Est. Price: ${product.price.toFixed(2)}</span>
                </div>
                {notifyFormId === product.id ? (
                  <form
                    className={styles.notifyForm}
                    onSubmit={(e) => handleNotifySubmit(e, product.name)}
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.notifyInput}
                      required
                      autoFocus
                    />
                    <button type="submit" className={styles.notifySubmitBtn}>
                      <span>Notify Me</span>
                    </button>
                  </form>
                ) : (
                  <button
                    className={styles.notifyToggleBtn}
                    onClick={() => handleNotifyToggle(product.id)}
                  >
                    <span>Keep Me Posted</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
