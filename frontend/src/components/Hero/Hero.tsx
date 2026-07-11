import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
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
  );
}
