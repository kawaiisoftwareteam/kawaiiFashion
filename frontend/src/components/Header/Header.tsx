"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brands, collections } from "../../data/products";
import styles from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  cartFeedback: boolean;
  onOpenReviews: () => void;
  onOpenCart: () => void;
}

export default function Header({ cartCount, cartFeedback, onOpenReviews, onOpenCart }: HeaderProps) {
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
              <div className={styles.dropdownTitle}>Japanese Skincare Brands</div>
              <div className={styles.dropdownGrid}>
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className={styles.dropdownCard}
                    style={{
                      ["--brand-hover-bg" as any]: brand.accentColorLight,
                      ["--brand-hover-color" as any]: brand.accentColor,
                    }}
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
              <div className={styles.dropdownTitle}>Curated Skincare Routines</div>
              <div className={styles.dropdownGridCols3}>
                {collections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className={styles.collectionDropdownCard}
                    style={{
                      ["--col-hover-bg" as any]: col.bgGradient,
                      ["--col-hover-color" as any]: col.accentColor,
                    }}
                  >
                    <span className={styles.dropdownCardSubtitle}>{col.subtitle.split("&")[0].split("•")[0].split("—")[0].trim()}</span>
                    <span className={styles.dropdownCardName}>{col.name}</span>
                    <span className={styles.dropdownCardTagline}>{col.tagline}</span>
                  </Link>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <Link href="/collections" className={styles.dropdownFooterLink}>
                  View Routine Builder →
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
                    ["--brand-hover-bg" as any]: "#FDF7F8",
                    ["--brand-hover-color" as any]: "#CF3642",
                  }}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Ladies' Luxury</span>
                    <span className={styles.dropdownCardTagline}>Sakura & Camellia glow care</span>
                  </div>
                </Link>
                <Link
                  href="/collections/men-care"
                  className={styles.dropdownCard}
                  style={{
                    ["--brand-hover-bg" as any]: "#F0F4F5",
                    ["--brand-hover-color" as any]: "#026F98",
                  }}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Men's Care</span>
                    <span className={styles.dropdownCardTagline}>Oil-control & shave relief</span>
                  </div>
                </Link>
                <Link
                  href="/collections/baby-care"
                  className={styles.dropdownCard}
                  style={{
                    ["--brand-hover-bg" as any]: "#FDFBF7",
                    ["--brand-hover-color" as any]: "#D4AF37",
                  }}
                >
                  <div className={styles.dropdownCardText}>
                    <span className={styles.dropdownCardName}>Baby & Kids</span>
                    <span className={styles.dropdownCardTagline}>Ultra-gentle milk & oat care</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <a href="#" className={styles.navLink}>
            Offers
          </a>
          <a href="#" className={styles.navLink}>
            Blog
          </a>
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
