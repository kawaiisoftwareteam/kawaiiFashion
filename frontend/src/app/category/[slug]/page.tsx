"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, products, Product } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import styles from "./Category.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const category = categories.find((c) => c.id === slug);

  // If category is not in pre-defined list, check if there are products with this category
  const categoryProducts = products.filter((p) => p.category === slug);

  if (!category && categoryProducts.length === 0) {
    return (
      <div className={styles.categoryPage} style={{ padding: "100px 24px", textAlign: "center" }}>
        <h1 className={styles.categoryTitle}>Category Not Found</h1>
        <p className={styles.categoryDescription} style={{ margin: "0 auto 30px" }}>
          We could not find the category you were looking for. Explore our full range of Japanese skincare, pristine waters, and artisanal chocolates below.
        </p>
        <Link href="/#shop" className={styles.pillLink} style={{ display: "inline-block" }}>
          ← Back to All Products
        </Link>
      </div>
    );
  }

  const catName = category ? category.name : slug.replace("-", " ").toUpperCase();
  const catTagline = category ? category.tagline : "Curated Japanese Lifestyle";
  const catDesc = category
    ? category.description
    : `Explore our premium collection of authentic ${catName.toLowerCase()} crafted to elevate your daily well-being.`;
  const catAccent = category ? category.accentColor : "#A62B2B";
  const heroImage = category ? category.heroImage : (categoryProducts[0]?.image || "/product_serum.png");

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
      availableDate: product.availableDate,
    });
  };

  return (
    <div
      className={styles.categoryPage}
      style={{
        "--cat-accent": catAccent,
        "--cat-hero-bg": `linear-gradient(135deg, #FFFFFF 0%, ${catAccent}0D 100%)`,
      } as React.CSSProperties}
    >
      {/* Category Hero Header */}
      <section className={styles.heroHeader}>
        <div className={styles.heroContent}>
          <div>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#shop">Shop</Link>
              <span>/</span>
              <span>{catName}</span>
            </nav>
            <span className={styles.categoryTagline}>{catTagline}</span>
            <h1 className={styles.categoryTitle}>{catName}</h1>
            <p className={styles.categoryDescription}>{catDesc}</p>
          </div>

          <div className={styles.heroImageCard}>
            <Image
              src={heroImage}
              alt={catName}
              fill
              sizes="(max-width: 900px) 100vw, 400px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick Category Switcher Bar */}
      <div className={styles.pillsBar}>
        <span className={styles.pillsLabel}>All Categories:</span>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className={`${styles.pillLink} ${c.id === slug ? styles.pillLinkActive : ""}`}
          >
            {c.name}
          </Link>
        ))}
        <Link href="/#shop" className={styles.pillLink}>
          View All Products
        </Link>
      </div>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.productCount}>
            Showing {categoryProducts.length} {categoryProducts.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <div className={styles.productsGrid}>
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className={`${styles.productCard} h-product`}
              onClick={() => setSelectedProduct(product)}
            >
              <div className={styles.cardImageWrapper}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className={styles.cardImage}
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
                <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
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
                <div className={styles.modalPrice}>${selectedProduct.price.toFixed(2)}</div>

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
                  Add to Cart • ${selectedProduct.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
