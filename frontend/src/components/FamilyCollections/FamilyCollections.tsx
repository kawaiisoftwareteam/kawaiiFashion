"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import styles from "./FamilyCollections.module.css";

interface Demographic {
  id: string;
  name: string;
  description: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  collectionTag: string;
  badgeTextColor: string;
}

const demographics: Demographic[] = [
  {
    id: "ladies",
    name: "Ladies' Luxury",
    description: "Premium glowing serums & lifting creams formulated with Sakura & Camellia blossom extracts.",
    image: "/collection_ladies.png",
    bgGradient: "linear-gradient(180deg, #FDF7F8 0%, #FAECEF 100%)",
    accentColor: "#CF3642",
    glowColor: "rgba(243, 222, 223, 0.4)",
    collectionTag: "ladies-care",
    badgeTextColor: "#FFFFFF"
  },
  {
    id: "men",
    name: "Men's Care",
    description: "Oil-control foaming washes & matte moisturizers enriched with Uji Matcha & charcoal.",
    image: "/collection_men.png",
    bgGradient: "linear-gradient(180deg, #F0F4F5 0%, #E6ECEF 100%)",
    accentColor: "#026F98",
    glowColor: "rgba(2, 111, 152, 0.15)",
    collectionTag: "men-care",
    badgeTextColor: "#FFFFFF"
  },
  {
    id: "baby",
    name: "Baby & Kids",
    description: "Ultra-soothing, tear-free washes & barrier balms containing gentle organic milk lipids.",
    image: "/collection_baby.png",
    bgGradient: "linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 100%)",
    accentColor: "#D4AF37",
    glowColor: "rgba(212, 175, 55, 0.15)",
    collectionTag: "baby-care",
    badgeTextColor: "#FFFFFF"
  }
];

export default function FamilyCollections() {
  const [activeTab, setActiveTab] = useState<string>("ladies");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const activeDemo = demographics.find((d) => d.id === activeTab) || demographics[0];

  // Filter products by the current collection
  const filteredProducts = products.filter((product) =>
    product.collections.includes(activeDemo.collectionTag)
  );

  const sectionStyles = {
    "--section-bg": activeDemo.bgGradient,
    "--accent-theme-color": activeDemo.accentColor,
    "--badge-text-color": activeDemo.badgeTextColor,
    "--glow-color": activeDemo.glowColor,
  } as React.CSSProperties;

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // prevent modal trigger
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className={styles.sectionContainer} style={sectionStyles} id="family-collections">
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.tagline}>Curated For Everyone</span>
        <h2 className={styles.title}>The Family Collections</h2>
        <p className={styles.subtitle}>
          Discover specialized, dermatologist-tested beauty and skin wellness routines crafted specifically for Men, Ladies, and Babies.
        </p>
      </div>

      {/* Demographic Cards Grid Selector */}
      <div className={styles.demographicGrid}>
        {demographics.map((demo) => {
          const isActive = demo.id === activeTab;
          return (
            <Link
              key={demo.id}
              href={`/collections/${demo.collectionTag}`}
              className={`${styles.demoCard} ${isActive ? styles.demoCardActive : ""}`}
              style={{ "--card-accent": demo.accentColor } as React.CSSProperties}
              onMouseEnter={() => setActiveTab(demo.id)}
            >
              <div className={styles.cardBgWrapper}>
                <Image
                  src={demo.image}
                  alt={demo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.demoCardTitle}>
                  {demo.name}
                  {isActive && <span className={styles.cardActiveIndicator} />}
                </h3>
                <p className={styles.demoCardDesc}>{demo.description}</p>
                <span className={styles.exploreLink}>
                  View Full Page →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Active Line Products Area */}
      <div className={styles.productsDisplayArea}>
        <div className={styles.productsSectionHeader}>
          <h3 className={styles.productsSectionTitle}>
            Featuring <span className={styles.themeColoredText}>{activeDemo.name}</span> Essentials
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span className={styles.productsCount}>
              Showing {filteredProducts.length} Premium Formulations
            </span>
            <Link
              href={`/collections/${activeDemo.collectionTag}`}
              className={styles.viewFullPageBtn}
            >
              View Full Page →
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} h-product`}
              itemScope
              itemType="https://schema.org/Product"
              onClick={() => setSelectedProduct(product)}
            >
              <div className={styles.productImageWrapper}>
                {product.badge && <span className={styles.cardBadge}>{product.badge}</span>}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className={`${styles.cardImage} u-photo`}
                  itemProp="image"
                />
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className={styles.cardImageHover}
                />
                <button
                  className={styles.quickAddBtn}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <span>Quick Add</span>
                </button>
              </div>

              <div className={styles.productInfo}>
                <div className={styles.cardRating}>
                  <span className={styles.cardStars}>{"★".repeat(Math.round(product.rating))}</span>
                  <span className={styles.cardReviewsCount}>({product.reviewsCount})</span>
                </div>
                <h4 className={`${styles.cardTitle} p-name`} itemProp="name">
                  {product.name}
                </h4>
                <p className={`${styles.cardTagline} p-description`} itemProp="description">
                  {product.tagline}
                </p>
                <span
                  className={`${styles.cardPrice} p-price`}
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="priceCurrency" content="USD" />
                  $<span itemProp="price">{product.price.toFixed(2)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelectedProduct(null)}
              aria-label="Close details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className={styles.modalLayout}>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className={styles.modalDetails}>
                {selectedProduct.badge && (
                  <span className={styles.modalBadge}>{selectedProduct.badge}</span>
                )}
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                <div className={styles.modalRating}>
                  <span className={styles.cardStars}>{"★".repeat(Math.round(selectedProduct.rating))}</span>
                  <span className={styles.modalReviewsCount}>
                    {selectedProduct.rating.toFixed(1)} • {selectedProduct.reviewsCount} reviews
                  </span>
                </div>
                <div className={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</div>

                <p className={styles.modalDesc}>{selectedProduct.description}</p>

                <div className={styles.modalMetaInfo}>
                  <div className={styles.modalMetaItem}>
                    <strong>Key Ingredients:</strong>
                    <p>{selectedProduct.ingredients}</p>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <strong>How to Use:</strong>
                    <p>{selectedProduct.usage}</p>
                  </div>
                </div>

                <button
                  className={styles.modalAddBtn}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
