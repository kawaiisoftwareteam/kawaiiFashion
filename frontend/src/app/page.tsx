"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const dummyReviews = [
  {
    author: "Sakura T.",
    date: "2 days ago",
    rating: 5,
    title: "Deeply Hydrating!",
    text: "This moisturizer has completely saved my skin this winter. It has a beautiful rich texture that melts in without being sticky.",
  },
  {
    author: "Hana K.",
    date: "1 week ago",
    rating: 5,
    title: "The Glow is Real",
    text: "The routine is incredibly gentle. My redness is gone, and my skin feels plumper and more radiant than ever.",
  },
  {
    author: "Yuki S.",
    date: "2 weeks ago",
    rating: 5,
    title: "Amazing Quality",
    text: "Minimalist skincare at its finest. A little goes a long way, and the scent is natural and soothing.",
  },
  {
    author: "Mei L.",
    date: "3 weeks ago",
    rating: 4,
    title: "Beautiful Texture",
    text: "Love the mist! It refreshes my skin during mid-day. Very hydrating, but wish the bottle was slightly larger.",
  },
];

export default function Home() {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Promo Announcement Bar */}
      <div className={styles.promoBar}>
        Free standard shipping on purchases with a subtotal of $50 and over
      </div>

      {/* Header / Navigation */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <span className={styles.logoAccent}>K</span>AWAII BEAUTY
          </div>
          <span className={styles.logoSub}>collection</span>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            Our Story
          </a>
          <a href="#" className={styles.navLink}>
            Kawaii Beauty Routine
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
          <button className={styles.iconButton} aria-label="Shopping Cart">
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
            <span className={styles.badge}>0</span>
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <main className={`${styles.heroBanner} fade-in`}>
        {/* Desktop Background Image */}
        <div className={styles.bannerBg}>
          <Image
            src="/kawaii_beauty_landscape.png"
            alt="Premium Kawaii Beauty skincare collection background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
          <div className={styles.bannerOverlay} />
        </div>

        {/* Banner Content Wrapper */}
        <div className={styles.bannerContentWrapper}>
          <div className={styles.bannerContent}>
            <span className={styles.tagline}>Dry skin? Not for long.</span>
            <h1 className={styles.headline}>
              Discover <span className={styles.highlight}>Kawaii Beauty secrets</span> for deeply moisturized skin
            </h1>
            <p className={styles.description}>
              Inspired by centuries-old Japanese rituals, our moisture-rich formulas combine natural botanicals with advanced skincare technology to restore your skin's natural, healthy glow.
            </p>
            <div className={styles.ctaGroup}>
              <a href="#" className={styles.primaryCta}>
                <span>Shop Now</span>
              </a>
              <a href="#" className={styles.secondaryCta}>
                Explore Routine
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile-only Image (Stacked under content on mobile screens) */}
        <div className={styles.mobileImageContainer}>
          <div className={styles.mobileImageWrapper}>
            <Image
              src="/kawaii_beauty_landscape.png"
              alt="Premium Kawaii Beauty skincare collection"
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
            />
          </div>
        </div>
      </main>

      {/* Reviews Drawer Backdrop */}
      <div
        className={`${styles.drawerOverlay} ${isReviewsOpen ? styles.drawerOverlayOpen : ""}`}
        onClick={() => setIsReviewsOpen(false)}
      />

      {/* Reviews Slide-out Drawer */}
      <div className={`${styles.drawer} ${isReviewsOpen ? styles.drawerOpen : ""}`}>
        {/* Floating Reviews Badge (Triggers / moves with drawer) */}
        <button
          className={styles.reviewsBadge}
          onClick={() => setIsReviewsOpen(!isReviewsOpen)}
          aria-label={isReviewsOpen ? "Close Reviews" : "Open Reviews"}
        >
          <span>★</span> Reviews
        </button>

        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div>
            <h2 className={styles.drawerTitle}>Customer Reviews</h2>
            <div className={styles.ratingSummary}>
              <span className={styles.ratingNumber}>4.9</span>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.reviewCount}>Based on 148 reviews</span>
            </div>
          </div>
          <button
            className={styles.drawerClose}
            onClick={() => setIsReviewsOpen(false)}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Reviews List */}
        <div className={styles.reviewsList}>
          {dummyReviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <div className={styles.reviewMeta}>
                <span className={styles.reviewAuthor}>{review.author}</span>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewStars}>{"★".repeat(review.rating)}</div>
              <h3 className={styles.reviewItemTitle}>{review.title}</h3>
              <p className={styles.reviewItemText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
