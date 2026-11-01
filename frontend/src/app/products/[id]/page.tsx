"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, brands, categories } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import styles from "../../category/[slug]/Category.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.categoryPage} style={{ padding: "100px 24px", textAlign: "center" }}>
        <h1 className={styles.categoryTitle}>Product Not Found</h1>
        <p className={styles.categoryDescription} style={{ margin: "0 auto 30px" }}>
          We could not find the product you requested.
        </p>
        <Link href="/#shop" className={styles.pillLink} style={{ display: "inline-block" }}>
          ← Back to All Products
        </Link>
      </div>
    );
  }

  const brand = brands.find((b) => b.id === product.brandId);
  const category = categories.find((c) => c.id === product.category);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      isPreorder: product.isPreorder,
      availableDate: product.availableDate,
    });
  };

  const isBeverageOrFood = ["alkaline-water", "drinking-water", "chocolate"].includes(product.category);

  return (
    <div className={styles.categoryPage} style={{ padding: "60px 24px 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} style={{ marginBottom: 30 }} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/category/${category.id}`}>{category.name}</Link>
              <span>/</span>
            </>
          )}
          <span>{product.name}</span>
        </nav>

        <div className={styles.modalLayout} style={{ background: "#FFF", padding: 40, borderRadius: 16, border: "1px solid rgba(140, 136, 132, 0.15)" }}>
          <div className={styles.modalImageWrapper} style={{ minHeight: 400 }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div>
            {product.badge && <span className={styles.modalBadge}>{product.badge}</span>}
            {brand && (
              <div style={{ marginBottom: 8 }}>
                <Link
                  href={`/brands/${brand.id}`}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: brand.accentColor,
                    textDecoration: "none",
                  }}
                >
                  {brand.name}
                </Link>
              </div>
            )}
            <h1 className={styles.modalTitle} style={{ fontSize: 32 }}>
              {product.name}
            </h1>
            <div className={styles.ratingRow} style={{ marginBottom: 14 }}>
              <span className={styles.stars}>{"★".repeat(product.rating || 5)}</span>
              <span className={styles.reviewCount}>
                {product.rating || 5}.0 • {product.reviewsCount} customer reviews
              </span>
            </div>
            <div className={styles.modalPrice} style={{ fontSize: 28, margin: "14px 0 20px" }}>
              ${product.price.toFixed(2)}
            </div>

            <p className={styles.modalDesc} style={{ fontSize: 16 }}>
              {product.description}
            </p>

            <div className={styles.metaBlock}>
              <strong>
                {product.category === "gadgets"
                  ? "Specs & Materials:"
                  : isBeverageOrFood
                  ? "Ingredients & Source:"
                  : "Key Ingredients:"}
              </strong>
              <p>{product.ingredients}</p>
            </div>

            <div className={styles.metaBlock}>
              <strong>
                {product.category === "gadgets"
                  ? "How to Operate:"
                  : isBeverageOrFood
                  ? "Serving & Ritual:"
                  : "How to Use:"}
              </strong>
              <p>{product.usage}</p>
            </div>

            <button
              type="button"
              className={styles.modalAddBtn}
              onClick={handleAddToCart}
            >
              {product.isPreorder ? "Pre-order Now" : "Add to Cart"} • ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
