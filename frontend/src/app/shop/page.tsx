"use client";

import React, { useState } from "react";
import Image from "next/image";
import { products, categories, Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/currency";
import styles from "../category/[slug]/Category.module.css";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const filteredProducts = products.filter(
    (p) => !p.isPreorder && !p.releaseSchedule && (activeCategory === "all" || p.category === activeCategory)
  );

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className={styles.categoryPage}>
      {/* Shop Hero */}
      <section className={styles.heroHeader} style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F5EFEB 100%)" }}>
        <div className={styles.heroContent}>
          <span className={styles.categoryBadge}>The Full Vault</span>
          <h1 className={styles.categoryTitle}>Curated Japanese Living</h1>
          <p className={styles.categoryDescription}>
            Explore our complete catalogue of Japanese beauty rituals, mountain alkaline waters, matcha chocolate confections, and precision morning grooming tools.
          </p>

          <div className={styles.metaStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{filteredProducts.length}</span>
              <span className={styles.statLabel}>Available Pieces</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Tokyo Authentic</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>Direct</span>
              <span className={styles.statLabel}>Air Shipment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Filter */}
      <div className={styles.navPillsWrapper}>
        <div className={styles.navPills}>
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`${styles.pillLink} ${activeCategory === "all" ? styles.pillLinkActive : ""}`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`${styles.pillLink} ${activeCategory === c.id ? styles.pillLinkActive : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} h-product`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={styles.imageContainer}>
                {product.badge && (
                  <span className={styles.badge}>{product.badge}</span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={styles.cardImage}
                />
                <button
                  type="button"
                  className={styles.quickAddBtn}
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Quick Add
                </button>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.ratingRow}>
                  <span className={styles.stars}>{"★".repeat(product.rating || 5)}</span>
                  <span className={styles.reviewCount}>({product.reviewsCount})</span>
                </div>
                <h2 className={styles.cardTitle}>{product.name}</h2>
                <p className={styles.cardTagline}>{product.tagline}</p>
                <span className={styles.cardPrice}>{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div>
                {selectedProduct.badge && (
                  <span className={styles.modalBadge}>{selectedProduct.badge}</span>
                )}
                <h2 className={styles.modalTitle}>{selectedProduct.name}</h2>
                <div className={styles.ratingRow} style={{ marginBottom: "12px" }}>
                  <span className={styles.stars}>{"★".repeat(selectedProduct.rating || 5)}</span>
                  <span className={styles.reviewCount}>
                    {selectedProduct.rating || 5}.0 • {selectedProduct.reviewsCount} customer reviews
                  </span>
                </div>
                <div className={styles.modalPrice}>{formatPrice(selectedProduct.price)}</div>

                <p className={styles.modalDesc}>{selectedProduct.description}</p>

                <div className={styles.metaBlock}>
                  <strong>
                    {selectedProduct.category === "gadgets"
                      ? "Specs & Materials:"
                      : ["alkaline-water", "drinking-water", "chocolate"].includes(selectedProduct.category)
                      ? "Ingredients & Source:"
                      : "Key Ingredients:"}
                  </strong>
                  <p>{selectedProduct.ingredients}</p>
                </div>

                <div className={styles.metaBlock}>
                  <strong>
                    {selectedProduct.category === "gadgets"
                      ? "How to Operate:"
                      : ["alkaline-water", "drinking-water", "chocolate"].includes(selectedProduct.category)
                      ? "Serving & Ritual:"
                      : "How to Use:"}
                  </strong>
                  <p>{selectedProduct.usage}</p>
                </div>

                <button
                  type="button"
                  className={styles.modalAddBtn}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart • {formatPrice(selectedProduct.price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
