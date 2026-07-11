"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductsShowcase.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  badge?: string;
  tagline: string;
  description: string;
  ingredients: string;
  usage: string;
}

const products: Product[] = [
  {
    id: "serum",
    name: "Rice Ferment Brightening Serum",
    category: "serum",
    price: "$36.00",
    rating: 5,
    reviewsCount: 48,
    image: "/product_serum.png",
    hoverImage: "/product_serum_hover.png",
    badge: "Best Seller",
    tagline: "Hydrate & Illuminate",
    description: "Infused with traditional Japanese Sake extract and Niacinamide, this lightweight serum deeply penetrates to fade dark spots, refine texture, and deliver a translucent, glass-skin glow.",
    ingredients: "Sake Extract (Rice Ferment Filtrate), Niacinamide (5%), Hyaluronic Acid, Licorice Root Extract, Green Tea Extract, Glycerin.",
    usage: "Apply 2-3 drops onto clean, damp skin morning and night. Pat gently until fully absorbed before applying moisturizer."
  },
  {
    id: "cream",
    name: "Camellia Nourishing Cream",
    category: "moisturizer",
    price: "$42.00",
    rating: 5,
    reviewsCount: 36,
    image: "/product_cream.png",
    hoverImage: "/product_cream_hover.png",
    badge: "Award Winner",
    tagline: "Deep Moisture Lock",
    description: "A rich, velvety cream enriched with premium cold-pressed Camellia Japonica seed oil. It wraps the skin in a protective layer of intense moisture, repairing the lipid barrier and softening fine lines.",
    ingredients: "Camellia Japonica Seed Oil, Shea Butter, Squalane, Ceramide NP, Vitamin E, Centella Asiatica (Cica) Extract.",
    usage: "Warm a pea-sized amount between fingertips and press gently into face and neck as the final step of your evening routine."
  },
  {
    id: "cleanser",
    name: "Peach Blossom Cleansing Oil",
    category: "cleanser",
    price: "$28.00",
    rating: 4,
    reviewsCount: 52,
    image: "/product_cleanser.png",
    hoverImage: "/product_cleanser_hover.png",
    badge: "New",
    tagline: "Gentle Makeup Melter",
    description: "A lightweight, water-soluble cleansing oil that effortlessly dissolves waterproof makeup, sunscreen, and excess sebum while preserving skin hydration. Emulsifies into a milky lotion that rinses clean.",
    ingredients: "Peach Kernel Oil, Jojoba Seed Oil, Olive Fruit Oil, Vitamin E, Peach Blossom Extract, Polyglyceryl-10 Dioleate.",
    usage: "Pump 2-3 times onto dry hands and massage over dry face. Add warm water to emulsify, then rinse thoroughly."
  },
  {
    id: "mask",
    name: "Matcha Green Tea Clay Mask",
    category: "mask",
    price: "$34.00",
    rating: 5,
    reviewsCount: 29,
    image: "/product_mask.png",
    hoverImage: "/product_mask_hover.png",
    badge: "Popular",
    tagline: "Pore Purifier",
    description: "A creamy clay mask formulated with Uji Matcha and mineral-rich Kaolin clay. It detoxifies pores, absorbs excess oil, and gently exfoliates without stripping or drying the skin.",
    ingredients: "Uji Matcha (Camellia Sinensis Leaf Powder), Kaolin Clay, Bentonite, Aloe Vera Juice, Panthenol, Allantoin.",
    usage: "Apply an even layer to clean skin, avoiding eyes and lips. Leave on for 10-12 minutes, then rinse with warm water. Use 1-2 times weekly."
  }
];

interface ProductsShowcaseProps {
  onAddToCart: (productName: string, event?: React.MouseEvent) => void;
}

export default function ProductsShowcase({ onAddToCart }: ProductsShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className={styles.showcaseSection}>
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
        {products
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
                  onClick={(e) => onAddToCart(product.name, e)}
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
                <span className={styles.cardPrice}>{product.price}</span>
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
                <div className={styles.modalPrice}>{selectedProduct.price}</div>

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
                    onAddToCart(selectedProduct.name);
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
