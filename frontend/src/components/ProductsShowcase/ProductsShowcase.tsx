"use client";

import React, { useState } from "react";
import Image from "next/image";
import { products, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import styles from "./ProductsShowcase.module.css";

export default function ProductsShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  // Filter out preorder products and non-core categories for the main featured homepage list
  const mainCategories = ["cleanser", "serum", "moisturizer", "mask"];
  const homepageProducts = products.filter(
    (p) => !p.isPreorder && !p.releaseSchedule && mainCategories.includes(p.category)
  );

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // prevent opening details modal
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <section className={styles.showcaseSection} id="shop">
      <div className={styles.showcaseHeaderWrapper}>
        <span className={styles.showcaseTagline}>Curated For You</span>
        <h2 className={styles.showcaseTitle}>Best of Kawaii Beauty</h2>
        <p className={styles.showcaseSubtitle}>
          Handpicked premium formulations designed to target dehydration, build skin resilience, and restore your natural, glass-like radiance.
        </p>

        {/* Filter Categories */}
        <div className={styles.filterTabs}>
          {["all", "cleanser", "serum", "moisturizer", "mask"].map((cat) => (
            <button
              key={cat}
              className={`${styles.filterTab} ${activeFilter === cat ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1) + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className={styles.productGrid}>
        {homepageProducts
          .filter((p) => activeFilter === "all" || p.category === activeFilter)
          .map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={styles.productImageWrapper}>
                {product.badge && <span className={styles.cardBadge}>{product.badge}</span>}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className={styles.cardImage}
                />
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} alternate view`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
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
                  <span className={styles.cardStars}>{"★".repeat(product.rating)}</span>
                  <span className={styles.cardReviewsCount}>({product.reviewsCount})</span>
                </div>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <p className={styles.cardTagline}>{product.tagline}</p>
                <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
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
                  <span className={styles.cardStars}>{"★".repeat(selectedProduct.rating)}</span>
                  <span className={styles.modalReviewsCount}>
                    {selectedProduct.rating}.0 • {selectedProduct.reviewsCount} customer reviews
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
