"use client";

import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  cartFeedback: boolean;
  onOpenReviews: () => void;
}

export default function Header({ cartCount, cartFeedback, onOpenReviews }: HeaderProps) {
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
          <a href="#" className={styles.navLink}>
            Our Story
          </a>
          <a href="#" className={styles.navLink} onClick={(e) => { e.preventDefault(); onOpenReviews(); }}>
            Kawaii Beauty Reviews
          </a>
          <a href="#" className={styles.navLink}>
            Shop All
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
          </a>
          <a href="#" className={styles.navLink}>
            Shop Brands
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
          <Link
            href="/cart"
            className={`${styles.iconButton} ${cartFeedback ? styles.jiggle : ""}`}
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
          </Link>
        </div>
      </div>
    </header>
  );
}
