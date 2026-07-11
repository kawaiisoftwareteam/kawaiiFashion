"use client";

import React from "react";
import styles from "./ReviewsDrawer.module.css";

interface Review {
  author: string;
  date: string;
  rating: number;
  title: string;
  text: string;
}

const dummyReviews: Review[] = [
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

interface ReviewsDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ReviewsDrawer({ isOpen, onToggle, onClose }: ReviewsDrawerProps) {
  return (
    <>
      {/* Reviews Drawer Backdrop */}
      <div
        className={`${styles.drawerOverlay} ${isOpen ? styles.drawerOverlayOpen : ""}`}
        onClick={onClose}
      />

      {/* Reviews Slide-out Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        {/* Floating Reviews Badge (Triggers / moves with drawer) */}
        <button
          className={styles.reviewsBadge}
          onClick={onToggle}
          aria-label={isOpen ? "Close Reviews" : "Open Reviews"}
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
            onClick={onClose}
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
    </>
  );
}
