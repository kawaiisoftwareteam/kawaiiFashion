"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import styles from "./FamilyCollections.module.css";

interface CurationDepartment {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  filterType: "category" | "collection";
  filterKey: string | string[];
  linkUrl: string;
  badgeTextColor: string;
}

const departments: CurationDepartment[] = [
  {
    id: "gadgets",
    name: "Smart Gadgets",
    tagline: "Beauty & Life Tech",
    description: "Ultrasonic EMS sculpting wands, nano-ionic facial steamers & smart hydrogen generators.",
    image: "/product_gadget_steamer.png",
    bgGradient: "linear-gradient(180deg, #FAFAF7 0%, #F5F0EB 100%)",
    accentColor: "#CF3642",
    glowColor: "rgba(207, 54, 66, 0.12)",
    filterType: "category",
    filterKey: "gadgets",
    linkUrl: "/category/gadgets",
    badgeTextColor: "#FFFFFF"
  },
  {
    id: "waters",
    name: "Alkaline & Pure Waters",
    tagline: "Volcanic Alpine Hydration",
    description: "Mt. Fuji ionized alkaline water pH 9.5+, bio-active volcanic minerals & alpine spring purity.",
    image: "/product_alkaline_water.png",
    bgGradient: "linear-gradient(180deg, #FAFAF7 0%, #F0F6F8 100%)",
    accentColor: "#026F98",
    glowColor: "rgba(2, 111, 152, 0.12)",
    filterType: "category",
    filterKey: ["alkaline-water", "drinking-water"],
    linkUrl: "/category/alkaline-water",
    badgeTextColor: "#FFFFFF"
  },
  {
    id: "chocolate",
    name: "Artisanal Chocolates",
    tagline: "Nama Ganache & Cocoa Luxury",
    description: "Handmade Kyoto Uji matcha Nama ganache, 72% single-origin dark cacao truffles & candied yuzu bark.",
    image: "/product_chocolate.png",
    bgGradient: "linear-gradient(180deg, #FAFAF7 0%, #F7F3ED 100%)",
    accentColor: "#78350F",
    glowColor: "rgba(120, 53, 15, 0.12)",
    filterType: "category",
    filterKey: "chocolate",
    linkUrl: "/category/chocolate",
    badgeTextColor: "#FFFFFF"
  },
  {
    id: "skincare",
    name: "Skincare Rituals",
    tagline: "Ladies, Men & Baby Care",
    description: "Fermented rice brightening serums, cold-pressed camellia creams, and gentle botanical cleansers.",
    image: "/collection_ladies.png",
    bgGradient: "linear-gradient(180deg, #FAFAF7 0%, #FDF4F5 100%)",
    accentColor: "#CF3642",
    glowColor: "rgba(207, 54, 66, 0.12)",
    filterType: "collection",
    filterKey: ["ladies-care", "men-care", "baby-care", "glass-skin-routine"],
    linkUrl: "/collections",
    badgeTextColor: "#FFFFFF"
  }
];

export default function FamilyCollections() {
  const [activeTab, setActiveTab] = useState<string>("gadgets");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const activeDept = departments.find((d) => d.id === activeTab) || departments[0];

  // Filter products by the current department
  const filteredProducts = products.filter((product) => {
    if (activeDept.filterType === "category") {
      if (Array.isArray(activeDept.filterKey)) {
        return activeDept.filterKey.includes(product.category);
      }
      return product.category === activeDept.filterKey;
    }
    if (activeDept.filterType === "collection") {
      if (Array.isArray(activeDept.filterKey)) {
        return product.collections.some((col) => (activeDept.filterKey as string[]).includes(col));
      }
      return product.collections.includes(activeDept.filterKey as string);
    }
    return false;
  }).slice(0, 4);

  const sectionStyles = {
    "--section-bg": activeDept.bgGradient,
    "--accent-theme-color": activeDept.accentColor,
    "--badge-text-color": activeDept.badgeTextColor,
    "--glow-color": activeDept.glowColor,
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
        <span className={styles.tagline}>Curated Lifestyle Departments</span>
        <h2 className={styles.title}>The Japanese Collections</h2>
        <p className={styles.subtitle}>
          Explore specialized Japanese curations: precision smart gadgets, Mt. Fuji alkaline hydration, artisanal Nama chocolates, and moisture-rich skincare rituals.
        </p>
      </div>

      {/* Demographic Cards Grid Selector */}
      <div className={styles.demographicGrid}>
        {departments.map((dept) => {
          const isActive = dept.id === activeTab;
          return (
            <Link
              key={dept.id}
              href={dept.linkUrl}
              className={`${styles.demoCard} ${isActive ? styles.demoCardActive : ""}`}
              style={{ "--card-accent": dept.accentColor } as React.CSSProperties}
              onMouseEnter={() => setActiveTab(dept.id)}
            >
              <div className={styles.cardBgWrapper}>
                <Image
                  src={dept.image}
                  alt={dept.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <h3 className={styles.demoCardTitle}>
                  {dept.name}
                  {isActive && <span className={styles.cardActiveIndicator} />}
                </h3>
                <p className={styles.demoCardDesc}>{dept.description}</p>
                <span className={styles.exploreLink}>
                  Explore Department →
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
            Featuring <span className={styles.themeColoredText}>{activeDept.name}</span>
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <span className={styles.productsCount}>
              Showing {filteredProducts.length} Premium Picks
            </span>
            <Link
              href={activeDept.linkUrl}
              className={styles.viewFullPageBtn}
            >
              View Full Department →
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
                    <strong>
                      {selectedProduct.category === "gadgets"
                        ? "Specs & Materials:"
                        : ["alkaline-water", "drinking-water", "chocolate"].includes(selectedProduct.category)
                        ? "Ingredients & Source:"
                        : "Key Ingredients:"}
                    </strong>
                    <p>{selectedProduct.ingredients}</p>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <strong>
                      {selectedProduct.category === "gadgets"
                        ? "How to Operate:"
                        : ["alkaline-water", "drinking-water", "chocolate"].includes(selectedProduct.category)
                        ? "Serving & Ritual:"
                        : "How to Use:"}
                    </strong>
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
