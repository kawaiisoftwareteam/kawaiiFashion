import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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

      {/* Floating Reviews Badge */}
      <div className={styles.reviewsBadge}>
        <span>★</span> Reviews
      </div>
    </div>
  );
}
