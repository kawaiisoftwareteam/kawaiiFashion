"use client";

import React, { useState } from "react";
import Link from "next/link";
import { brands, collections } from "../../data/products";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Left Side: Brand Logo and Description */}
        <div className={styles.brandPanel}>
          <Link href="/" className={styles.logo}>
            <div>
              <span className={styles.logoAccent}>K</span>AWAII BEAUTY
            </div>
            <span className={styles.logoSub}>collection</span>
          </Link>
          <p className={styles.brandDesc}>
            Time-honored Japanese skincare secrets meets modern clean beauty science. Handpicked premium formulations designed to target dehydration, build barrier resilience, and restore your natural, glass-like radiance.
          </p>
          {/* Social Icons */}
          <div className={styles.socialList}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="12" y1="2" y2="8"/>
                <line x1="12" x2="6" y1="2" y2="8"/>
                <path d="M12 2v20"/>
                <path d="M4 12h16"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link Columns */}
        <div className={styles.linkColumns}>
          <div className={styles.linkColumn}>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/#shop">Shop All</Link></li>
              <li><Link href="/#new-arrivals">New Arrivals</Link></li>
              <li><Link href="/#shop">Best Sellers</Link></li>
              <li><a href="#">Special Offers</a></li>
              <li><a href="#">skincare Blog</a></li>
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3>Brands</h3>
            <ul>
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link href={`/brands/${brand.id}`}>{brand.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkColumn}>
            <h3>Collections</h3>
            <ul>
              {collections.map((col) => (
                <li key={col.id}>
                  <Link href={`/collections/${col.id}`}>{col.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter Column */}
        <div className={styles.newsletterPanel}>
          <h3>Subscribe</h3>
          <p>Join the Kawaii Club to receive beauty tips, early access to releases, and 15% off your first purchase.</p>
          <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
            <input
              type="email"
              required
              placeholder="your.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.subscribeInput}
            />
            <button type="submit" className={styles.subscribeBtn}>
              {subscribed ? "Subscribed!" : "Join"}
            </button>
          </form>
          {subscribed && (
            <span className={styles.successMessage}>
              Check your inbox for your 15% discount code!
            </span>
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} Kawaii Beauty. All rights reserved.
        </span>
        
        {/* Payment Badges */}
        <div className={styles.paymentBadges}>
          {/* Visa */}
          <svg className={styles.paymentIcon} viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.5"/>
            <path d="M13.2 8.5h-1.8L9.6 15.5h1.8l1.8-7zM20.2 8.5h-1.7c-.5 0-.9.3-1.1.7l-3 6.3h1.9l.4-.9h2.3l.2.9h1.7l-1.7-7zM18.8 13.2h-1.4l.7-2 .7 2zM9.4 8.5H6.2l-.2.8c1.3.3 2.1.8 2.6 1.4L7.5 15.5h1.9l2.8-7H9.4zM27.2 8.5h-1.7l-1.3 4.2-.6-3.5c-.1-.5-.4-.7-.9-.7h-2.1v.6c.4.1.9.3 1.2.5l1.6 5.4h1.9l2.9-6.5z" fill="#1A1F71"/>
          </svg>

          {/* Mastercard */}
          <svg className={styles.paymentIcon} viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.5"/>
            <circle cx="14.5" cy="12" r="5.5" fill="#EB001B"/>
            <circle cx="21.5" cy="12" r="5.5" fill="#F79E1B" fillOpacity="0.8"/>
          </svg>

          {/* Amex */}
          <svg className={styles.paymentIcon} viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="3" fill="#0070CD"/>
            <path d="M8.2 14.5l-.6-1.5H5l-.6 1.5H3.6l2.1-5h1l2.1 5H8.2zm-1.8-3.1l.6 1.5h-1.1l.5-1.5zM12.8 14.5v-3.7l-1.3 3.7h-.6l-1.3-3.7v3.7H8.8v-5h1.2l1.2 3.4 1.2-3.4H13.6v5h-.8zm5.2-1.5h-2.1v.7h2.3v.8H15v-5h3v.8h-2.1v1.1h2.1v.8h-2.1v.8h2.3v.8zm4.4-1.8l1.1 1.8h-1l-.9-1.5H21v1.5h-.8v-5h1.8c.8 0 1.3.4 1.3 1.1s-.4.9-.8 1.1zm-1.4-.7h.9c.4 0 .6-.2.6-.5s-.2-.5-.6-.5H21v1zM28.2 14.5h-.8v-5h.8v5zm4.8 0v-.8H31l2.1-3.4v-.8H29.6v.8H32L29.9 13.7v.8h3.1z" fill="#FFFFFF"/>
          </svg>

          {/* Apple Pay */}
          <svg className={styles.paymentIcon} viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="3" fill="#000000"/>
            <path d="M11.5 10.8c0-1 .8-1.5 1.2-1.8-.5-.7-1.2-.8-1.5-.8-.7-.1-1.4.4-1.8.4-.4 0-.9-.4-1.5-.4-.8 0-1.5.5-1.9 1.2-.9 1.5-.2 3.8.6 5 1 .7 1.4 1 2 .1.4-.6.9-.6 1.5-.6.6 0 1 .6 1.5.6.6 0 1.2-.4 1.6-1.1.5-.8.7-1.5.7-1.6 0 0-1.3-.5-1.3-1.9z" fill="#FFFFFF"/>
            <path d="M10.6 8.3c.4-.5.6-1.1.5-1.7-.5 0-1.1.3-1.5.8-.3.3-.6.9-.5 1.5.6 0 1.1-.3 1.5-.8z" fill="#FFFFFF"/>
            <path d="M16.5 10h1.8c1.1 0 1.8.6 1.8 1.6s-.7 1.6-1.8 1.6h-.8v1.7h-1V10zm1.8 2.3c.5 0 .8-.2.8-.7s-.3-.7-.8-.7h-.8v1.4h.8zM23.2 11.5c-.6 0-1.1.2-1.3.5v-.4h-1v3.3h1v-.4c.2.3.7.5 1.3.5.9 0 1.7-.7 1.7-1.7s-.8-1.7-1.7-1.7zm-.2 2.6c-.5 0-.9-.3-.9-.9s.4-.9.9-.9.9.3.9.9-.4.9-.9.9zM25.2 16.5c.3.5.7.7 1.1.7.5 0 .8-.3.9-.7l1.3-3.8h-1.1l-.8 2.5-.8-2.5h-1.1l1.5 3.8z" fill="#FFFFFF"/>
          </svg>

          {/* Google Pay */}
          <svg className={styles.paymentIcon} viewBox="0 0 36 24" width="36" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="24" rx="3" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.5"/>
            <path d="M11.5 12c0-.4-.05-.8-.13-1.2H7.96v2.3h2c-.2.7-.8 1.2-1.5 1.2-1.1 0-1.9-.9-1.9-2s.8-2 1.9-2c.5 0 1 .2 1.3.5l.9-.9c-.6-.5-1.4-.8-2.2-.8-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6c2.1 0 3.6-1.5 3.6-3.6z" fill="#4285F4"/>
            <path d="M15.5 10h1.8c1.1 0 1.8.6 1.8 1.6s-.7 1.6-1.8 1.6h-.8v1.7h-1V10zm1.8 2.3c.5 0 .8-.2.8-.7s-.3-.7-.8-.7h-.8v1.4h.8zM22.2 11.5c-.6 0-1.1.2-1.3.5v-.4h-1v3.3h1v-.4c.2.3.7.5 1.3.5.9 0 1.7-.7 1.7-1.7s-.8-1.7-1.7-1.7zm-.2 2.6c-.5 0-.9-.3-.9-.9s.4-.9.9-.9.9.3.9.9-.4.9-.9.9zM24.2 16.5c.3.5.7.7 1.1.7.5 0 .8-.3.9-.7l1.3-3.8h-1.1l-.8 2.5-.8-2.5h-1.1l1.5 3.8z" fill="#5F6368"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}
