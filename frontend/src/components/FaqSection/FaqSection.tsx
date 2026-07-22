"use client";

import React from "react";
import styles from "./FaqSection.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Kawaii Beauty and what products do you offer?",
    answer: "Kawaii Beauty is an online e-commerce destination offering premium skincare, cosmetics, and beauty collections. We curate high-quality formulations designed to target dehydration, build barrier resilience, and restore your skin's natural radiance. From hydrating serums and nourishing moisturizers to specialized collections for men, women, and babies, we make it easy to find complete skincare routines tailored to every skin type."
  },
  {
    question: "How can I track my order once it has been placed?",
    answer: "Once your order is processed and shipped, you will receive a confirmation email containing a tracking number and a link to trace your package. You can use this tracking number on our website's tracking page or directly on the carrier's portal to see real-time updates on your shipment's journey."
  },
  {
    question: "What is your return and exchange policy?",
    answer: "We want you to love your Kawaii Beauty purchase. We offer a 30-day return policy for unused and unopened products in their original packaging. If you receive a damaged or incorrect item, please contact our support team immediately, and we will issue a replacement or full refund."
  },
  {
    question: "How do pre-orders work and when will they ship?",
    answer: "Pre-orders allow you to secure upcoming or limited-release items before they officially launch. The estimated shipping date is listed on the product page. If your order contains both standard items and pre-order items, the entire package will ship together once the pre-order items are in stock. If you need standard items sooner, we recommend placing separate orders."
  },
  {
    question: "What payment methods do you accept on the website?",
    answer: "To provide a seamless checkout experience, Kawaii Beauty accepts all major credit and debit cards including Visa, Mastercard, American Express, and Discover. We also support modern digital wallets like Apple Pay and Google Pay for secure, one-click transactions."
  },
  {
    question: "Are Kawaii Beauty products safe for sensitive skin types?",
    answer: "Yes, safety and skin health are our top priorities. Many of our curated products are dermatologist-tested, hypoallergenic, and formulated with clean, gentle ingredients. We offer dedicated collections for sensitive skin, including our pediatrician-tested Baby & Kids collection, which is completely fragrance-free and designed for delicate skin barriers."
  }
];

export default function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading" id="faq">
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Help & Information</span>
        <h2 id="faq-heading" className={styles.title}>
          Frequently Asked Questions
        </h2>
        <p className={styles.subtitle}>
          Learn more about Japanese beauty philosophy, our ingredients, and building your ideal moisture routine.
        </p>

        <div className={styles.accordionGroup}>
          {faqData.map((item, index) => (
            <details key={index} className={styles.disclosure} name="faq-accordion">
              <summary className={styles.summary}>
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.iconWrapper}>
                  <svg
                    className={styles.chevron}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className={styles.content}>
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
