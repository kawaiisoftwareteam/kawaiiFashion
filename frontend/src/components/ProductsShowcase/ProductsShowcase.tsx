"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const updateArrows = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
      
      updateArrows();
      const timer = setTimeout(updateArrows, 100);
      
      return () => {
        grid.removeEventListener("scroll", updateArrows);
        window.removeEventListener("resize", updateArrows);
        clearTimeout(timer);
      };
    }
  }, [activeFilter, homepageProducts]);

  const handleScroll = (direction: "left" | "right") => {
    if (gridRef.current) {
      const { clientWidth } = gridRef.current;
      const scrollAmount = clientWidth * 0.8;
      gridRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

      {/* Product Cards Grid Wrapper */}
      <div className={styles.gridContainer}>
        {/* Left Arrow Button */}
        <button
          className={`${styles.scrollArrow} ${styles.scrollArrowLeft} ${showLeftArrow ? styles.scrollArrowActive : ""}`}
          onClick={() => handleScroll("left")}
          aria-label="Scroll left"
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
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Product Cards Grid */}
        <div className={styles.productGrid} ref={gridRef}>
          {homepageProducts
            .filter((p) => activeFilter === "all" || p.category === activeFilter)
            .map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => setSelectedProduct(product)}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
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
                  {/* Hover Video */}
                  <video
                    src={product.category === "cleanser" || product.category === "toner" ? "/cleanser_use.mp4" : "/serum_use.mp4"}
                    loop
                    muted
                    playsInline
                    className={`${styles.cardVideo} ${hoveredProductId === product.id ? styles.cardVideoActive : ""}`}
                    ref={(el) => {
                      if (el) {
                        if (hoveredProductId === product.id) {
                          el.play().catch(() => {});
                        } else {
                          el.pause();
                          el.currentTime = 0;
                        }
                      }
                    }}
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

        {/* Right Arrow Button */}
        <button
          className={`${styles.scrollArrow} ${styles.scrollArrowRight} ${showRightArrow ? styles.scrollArrowActive : ""}`}
          onClick={() => handleScroll("right")}
          aria-label="Scroll right"
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
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
