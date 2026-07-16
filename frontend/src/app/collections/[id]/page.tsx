"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections, products, Product } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import styles from "../Collections.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CollectionDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { addToCart, triggerToast, setIsCartOpen } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const collection = collections.find((c) => c.id === id);
  if (!collection) {
    return (
      <div className={styles.pageContainer} style={{ textAlign: "center" }}>
        <h1 className={styles.pageTitle}>Collection Not Found</h1>
        <p className={styles.pageSubtitle}>We couldn't find the skincare routine you were looking for.</p>
        <Link href="/collections" className={styles.exploreButton} style={{ marginTop: "24px" }}>
          Back to all collections
        </Link>
      </div>
    );
  }

  const collectionProducts = products.filter((p) => p.collections.includes(id));

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

  const handleBuyKit = () => {
    if (collectionProducts.length === 0) return;
    
    collectionProducts.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        isPreorder: product.isPreorder,
        availableDate: product.availableDate
      });
    });

    triggerToast(`Added complete ${collection.name} Kit to Cart!`);
    setIsCartOpen(true);
  };

  const kitTotalPrice = collectionProducts.reduce((acc, p) => acc + p.price, 0);

  return (
    <div style={{ ["--accent-color" as any]: collection.accentColor }}>
      {/* Collection Hero Header */}
      <div className={styles.detailHeader} style={{ background: collection.bgGradient }}>
        <div className={styles.detailHeaderContent}>
          <div className={styles.detailHeaderText}>
            <span className={styles.backLinkWrapper}>
              <Link href="/collections" className={styles.backLink}>
                ← All Collections
              </Link>
            </span>
            <h1 style={{ marginTop: "16px" }}>{collection.name}</h1>
            <span className={styles.collectionSubtitle}>{collection.subtitle}</span>
            <p>{collection.description}</p>
            <div className={styles.ctaGroup}>
              <a href="#featured-products" className={styles.primaryCta}>
                <span>Shop Now</span>
              </a>
              {collectionProducts.length > 0 && (
                <button className={styles.secondaryCta} onClick={handleBuyKit}>
                  Buy Entire Kit
                </button>
              )}
            </div>
          </div>
          
          {collection.image && (
            <div className={styles.detailHeaderImageWrapper}>
              <Image
                src={collection.image}
                alt={`${collection.name} banner`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.pageContainer}>
        {/* Step by Step Routine Guide */}
        <h2 className={styles.pageTitle} style={{ textAlign: "center", fontSize: "28px", marginBottom: "32px", fontFamily: "var(--font-serif)" }}>
          The Step-by-Step Routine
        </h2>
        
        <div className={styles.routineFlow}>
          {collection.steps.map((stepText, idx) => {
            const parts = stepText.split(":");
            const title = parts[0];
            const desc = parts.slice(1).join(":");
            return (
              <div key={idx} className={styles.routineStep}>
                <span className={styles.stepBadge}>{idx + 1}</span>
                <span className={styles.stepText}>{title}</span>
                <p style={{ fontSize: "14px", color: "var(--color-stone)", marginTop: "6px", lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Collection Products list */}
        <h2 id="featured-products" className={styles.pageTitle} style={{ textAlign: "center", fontSize: "28px", marginTop: "80px", marginBottom: "32px", fontFamily: "var(--font-serif)" }}>
          Featured Routine Products
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
          {collectionProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "var(--color-white)",
                border: "1px solid rgba(140, 136, 132, 0.12)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.01)"
              }}
              onClick={() => setSelectedProduct(product)}
            >
              <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                {product.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "var(--color-ink)",
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
                  sizes="(max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: "12px", color: "var(--color-stone)" }}>
                  {product.tagline}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px" }}>
                  <span style={{ fontWeight: "700", color: "var(--color-ink)", fontSize: "15px" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    style={{
                      backgroundColor: "var(--color-crimson)",
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

        {/* Buy Entire Kit Panel */}
        {collectionProducts.length > 0 && (
          <div className={styles.kitActionWrapper}>
            <h3 className={styles.kitActionTitle}>Get the Complete Routine Kit</h3>
            <p className={styles.kitActionSubtitle}>
              Experience the synergistic power of all {collectionProducts.length} steps together for maximum results.
            </p>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--color-ink)", marginBottom: "24px" }}>
              Total Kit Price: ${kitTotalPrice.toFixed(2)}
            </div>
            <button className={styles.buyKitBtn} onClick={handleBuyKit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              Add Routine Kit to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--color-white)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "850px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
              animation: "fadeIn 0.3s ease"
            }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-ink)",
                zIndex: 10
              }}
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "450px" }}>
              <div style={{ position: "relative", minHeight: "350px", width: "100%" }}>
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {selectedProduct.badge && (
                  <span
                    style={{
                      backgroundColor: "var(--color-crimson)",
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
                  ${selectedProduct.price.toFixed(2)}
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
                    backgroundColor: "var(--color-crimson)",
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
