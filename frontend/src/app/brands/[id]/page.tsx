"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands, products, Product } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { formatPrice } from "../../../lib/currency";
import styles from "../Brands.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BrandDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const brand = brands.find((b) => b.id === id);
  if (!brand) {
    return (
      <div className={styles.pageContainer} style={{ textAlign: "center" }}>
        <h1 className={styles.pageTitle}>Brand Not Found</h1>
        <p className={styles.pageSubtitle}>We couldn&apos;t find the brand you were looking for.</p>
        <Link href="/brands" className={styles.exploreLink} style={{ marginTop: "24px" }}>
          Back to all brands
        </Link>
      </div>
    );
  }

  const brandProducts = products.filter((p) => p.brandId === id);

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isPreorder: product.isPreorder,
      availableDate: product.availableDate
    });
  };

  return (
    <div style={{ "--brand-color": brand.accentColor } as React.CSSProperties}>
      {/* Brand Hero Header */}
      <div className={styles.detailHeader} style={{ background: brand.bgGradient }}>
        <div className={styles.detailHeaderContent}>
          <div>
            <span className={styles.exploreLink} style={{ color: "var(--brand-color)", marginBottom: "16px" }}>
              <Link href="/brands" style={{ textDecoration: "none", color: "inherit" }}>
                ← All Brands
              </Link>
            </span>
            <h1 className={styles.brandTitle}>{brand.name}</h1>
            <p className={styles.pageSubtitle} style={{ margin: "0 0 24px 0", textAlign: "left" }}>
              {brand.description}
            </p>
          </div>
          <div className={styles.philosophyBox}>
            <strong>Our Philosophy</strong>
            <p style={{ marginTop: "8px" }}>{brand.philosophy}</p>
          </div>
        </div>
      </div>

      {/* Brand Products Grid */}
      <div className={styles.pageContainer}>
        <h2 className={styles.sectionTitle}>Shop the Collection</h2>

        {brandProducts.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-stone)" }}>
            No products are currently available in this brand&apos;s collection. Check back soon!
          </p>
        ) : (
          <div className={styles.productsGrid}>
            {brandProducts.map((product) => (
              <div
                key={product.id}
                className={styles.brandCard} // Reuse styles from Brands.module.css
                style={{ cursor: "pointer", padding: "16px" }}
                onClick={() => setSelectedProduct(product)}
              >
                <div style={{ position: "relative", width: "100%", height: "220px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                  {product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: product.isPreorder ? "var(--color-ink)" : "var(--brand-color)",
                        color: "var(--color-white)",
                        fontSize: "9px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        padding: "4px 8px",
                        borderRadius: "10px",
                        zIndex: 3
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
                  {product.rating > 0 && (
                    <div style={{ display: "flex", gap: "4px", fontSize: "12px", color: "gold" }}>
                      {"★".repeat(Math.round(product.rating))}
                      <span style={{ color: "var(--color-stone)", marginLeft: "2px" }}>({product.reviewsCount})</span>
                    </div>
                  )}
                  <h3 style={{ fontSize: "16px", fontWeight: "600", fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--color-stone)", lineHeight: 1.4 }}>
                    {product.tagline}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px" }}>
                    <span style={{ fontWeight: "700", color: "var(--color-ink)", fontSize: "15px" }}>
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      style={{
                        backgroundColor: "var(--brand-color)",
                        color: "var(--color-white)",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "2px",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      {product.isPreorder ? "Pre-order" : "Quick Add"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
              <div style={{ position: "relative", width: "100%", minHeight: "320px", borderRadius: "12px", overflow: "hidden" }}>
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {selectedProduct.badge && (
                  <span
                    style={{
                      backgroundColor: "var(--brand-color)",
                      color: "var(--color-white)",
                      padding: "4px 8px",
                      fontSize: "9px",
                      fontWeight: "700",
                      borderRadius: "10px",
                      width: "fit-content",
                      textTransform: "uppercase"
                    }}
                  >
                    {selectedProduct.badge}
                  </span>
                )}
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: "700", lineHeight: 1.2 }}>
                  {selectedProduct.name}
                </h2>
                <div style={{ display: "flex", gap: "6px", color: "gold", fontSize: "14px" }}>
                  {"★".repeat(Math.round(selectedProduct.rating))}
                  <span style={{ color: "var(--color-stone)", marginLeft: "4px" }}>({selectedProduct.reviewsCount} reviews)</span>
                </div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "var(--color-ink)" }}>
                  {formatPrice(selectedProduct.price)}
                </div>
                <p style={{ fontSize: "14px", color: "var(--color-stone)", lineHeight: 1.6 }}>
                  {selectedProduct.description}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", marginTop: "12px" }}>
                  <div>
                    <strong>Key Ingredients:</strong>
                    <p style={{ color: "var(--color-stone)", marginTop: "2px" }}>{selectedProduct.ingredients}</p>
                  </div>
                  <div>
                    <strong>How to Use:</strong>
                    <p style={{ color: "var(--color-stone)", marginTop: "2px" }}>{selectedProduct.usage}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  style={{
                    backgroundColor: "var(--brand-color)",
                    color: "var(--color-white)",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "30px",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginTop: "20px",
                    width: "100%"
                  }}
                >
                  {selectedProduct.isPreorder ? "Pre-order Now" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
