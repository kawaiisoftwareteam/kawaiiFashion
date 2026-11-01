"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brands, collections, categories } from "../../data/products";
import styles from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  cartFeedback: boolean;
  onOpenReviews: () => void;
  onOpenCart: () => void;
}

export default function Header({ cartCount, cartFeedback, onOpenCart }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      {/* Promo Announcement Bar */}
      <div className={styles.promoBar}>
        Free standard shipping on purchases with a subtotal of $50 and over
      </div>

      {/* Header / Navigation */}
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <div>
            <span className={styles.logoAccent}>K</span>AWAII BEAUTY
          </div>
          <span className={styles.logoSub}>collection</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/#new-arrivals" className={styles.navLink}>
            New Arrivals
          </Link>
          <Link href="/#shop" className={styles.navLink}>
            Best Sellers
          </Link>
          <div className={styles.navItem}>
            <Link href="/#shop" className={styles.navLink}>
              Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className={`${styles.dropdown} ${styles.categoriesDropdown}`}>
              <div className={styles.dropdownTitle}>Shop by Category</div>
              <div className={styles.dropdownGrid}>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className={styles.dropdownCard}
                    style={{
                      "--brand-hover-bg": `${cat.accentColor}14`,
                      "--brand-hover-color": cat.accentColor,
                    } as React.CSSProperties}
                  >
                    <div
                      className={styles.dropdownCardLogo}
                      style={{ backgroundColor: `${cat.accentColor}18` }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: cat.accentColor,
                        }}
                      />
                    </div>
                    <div className={styles.dropdownCardText}>
                      <span className={styles.dropdownCardName}>{cat.name}</span>
                      <span className={styles.dropdownCardTagline}>{cat.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <Link href="/#shop" className={styles.dropdownFooterLink}>
                  Explore All Categories & Products →
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.navItem}>
            <Link href="/brands" className={styles.navLink}>
              Brands
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className={`${styles.dropdown} ${styles.brandsDropdown}`}>
              <div className={styles.dropdownTitle}>Featured Japanese Brands</div>
              <div className={styles.dropdownGrid}>
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className={styles.dropdownCard}
                    style={{
                      "--brand-hover-bg": brand.accentColorLight,
                      "--brand-hover-color": brand.accentColor,
                    } as React.CSSProperties}
                  >
                    <div className={styles.dropdownCardLogo} style={{ backgroundColor: brand.accentColorLight }}>
                      <Image
                        src={brand.logo}
                        alt=""
                        width={28}
                        height={28}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className={styles.dropdownCardText}>
                      <span className={styles.dropdownCardName}>{brand.name}</span>
                      <span className={styles.dropdownCardTagline}>{brand.tagline}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <Link href="/brands" className={styles.dropdownFooterLink}>
                  Explore All Brands →
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.navItem}>
            <Link href="/collections" className={styles.navLink}>
              Collections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
            <div className={`${styles.dropdown} ${styles.collectionsDropdown}`}>
              <div className={styles.dropdownTitle}>Curated Collections & Routines</div>
              <div className={styles.dropdownGridCols3}>
                {collections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className={styles.collectionDropdownCard}
                    style={{
                      "--col-hover-bg": col.bgGradient,
                      "--col-hover-color": col.accentColor,
                    } as React.CSSProperties}
                  >
                    <span className={styles.dropdownCardSubtitle}>{col.subtitle.split("&")[0].split("•")[0].split("—")[0].trim()}</span>
                    <span className={styles.dropdownCardName}>{col.name}</span>
                    <span className={styles.dropdownCardTagline}>{col.tagline}</span>
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <Link href="/collections" className={styles.dropdownFooterLink}>
                  View All Collections →
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.navItem}>
            <span className={styles.navLink}>
              Family Care
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
            <div className={`${styles.dropdown} ${styles.familyDropdown}`}>
              <div className={styles.dropdownTitle}>Skincare by Family</div>
              <div className={styles.dropdownGridSingle}>
                <Link
                  href="/collections/ladies-care"
                  className={styles.dropdownCard}
                  style={{
                    "--brand-hover-bg": "#FDF7F8",
                    "--brand-hover-color": "#CF3642",
                  } as React.CSSProperties}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Ladies&apos; Luxury</span>
                    <span className={styles.dropdownCardTagline}>Sakura &amp; Camellia glow care</span>
                  </div>
                </Link>
                <Link
                  href="/collections/men-care"
                  className={styles.dropdownCard}
                  style={{
                    "--brand-hover-bg": "#F0F4F5",
                    "--brand-hover-color": "#026F98",
                  } as React.CSSProperties}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Men&apos;s Care</span>
                    <span className={styles.dropdownCardTagline}>Oil-control &amp; shave relief</span>
                  </div>
                </Link>
                <Link
                  href="/collections/baby-care"
                  className={styles.dropdownCard}
                  style={{
                    "--brand-hover-bg": "#FDFBF7",
                    "--brand-hover-color": "#D4AF37",
                  } as React.CSSProperties}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Baby &amp; Kids</span>
                    <span className={styles.dropdownCardTagline}>Ultra-gentle milk &amp; oat care</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/offers" className={styles.navLink}>
            Offers
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <button
            className={`${styles.iconButton} ${cartFeedback ? styles.jiggle : ""}`}
            onClick={onOpenCart}
            aria-label="Shopping Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={styles.badge}>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
