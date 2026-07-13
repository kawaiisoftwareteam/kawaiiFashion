"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import styles from "./PreorderSection.module.css";

interface PreorderProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  releaseDate: string;
}

const preorderProducts: PreorderProduct[] = [
  {
    id: "preorder_eyecream",
    name: "Matcha Peptide Eye Cream",
    tagline: "Brighten & Depuff",
    description: "Formulated with pure Uji Matcha extract and active tripeptides, this luxury cooling eye cream melts into the skin to fade dark circles, reduce puffiness, and smooth fine lines.",
    price: 38,
    image: "/product_mask.png",
    releaseDate: "August 15, 2026",
  },
  {
    id: "preorder_milk",
    name: "Hokkaido Milk Whipped Cream",
    tagline: "Ultra Hydration & Restore",
    description: "A rich whipped moisturizer utilizing fresh Hokkaido organic milk lipids, ceramides, and beta-glucan to soothe dry skin and lock in moisture for 48 hours.",
    price: 48,
    image: "/product_cream.png",
    releaseDate: "September 1, 2026",
  },
];

interface PreorderSectionProps {
  onPreorderAdded: (productName: string) => void;
}

export default function PreorderSection({ onPreorderAdded }: PreorderSectionProps) {
  const { addToCart } = useCart();

  const handlePreorder = (product: PreorderProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isPreorder: true,
      availableDate: product.releaseDate,
    });
    onPreorderAdded(product.name);
  };

  return (
    <section className={styles.preorderSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.tagline}>Limited Release</span>
        <h2 className={styles.title}>Secure Your Pre-Order</h2>
        <p className={styles.subtitle}>
          Be the first to experience our newest luxury formulations. Hand-crafted in small batches and shipped directly on release day.
        </p>
      </div>

      <div className={styles.grid}>
        {preorderProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <span className={styles.badge}>PRE-ORDER</span>
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Ships: {product.releaseDate}</span>
              </div>
            </div>

            <div className={styles.info}>
              <h3 className={styles.productTitle}>{product.name}</h3>
              <p className={styles.taglineText}>{product.tagline}</p>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.footer}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                <button
                  className={styles.preorderBtn}
                  onClick={() => handlePreorder(product)}
                >
                  <span>Pre-order Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
