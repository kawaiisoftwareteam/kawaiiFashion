"use client";

import React from "react";
import Link from "next/link";
import { collections } from "../../data/products";
import styles from "./Collections.module.css";

export default function CollectionsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.pageTitle}>Skincare Collections</h1>
        <p className={styles.pageSubtitle}>
          Achieve your skin goals with our curated routines. Each collection is designed to solve a specific concern using synergistic Japanese skincare products.
        </p>
      </div>

      <div className={styles.collectionsList}>
        {collections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            className={styles.collectionCard}
            style={{
              background: col.bgGradient,
              ["--accent-color" as any]: col.accentColor
            }}
          >
            <div className={styles.collectionInfo}>
              <span className={styles.collectionSubtitle}>{col.subtitle}</span>
              <h2>{col.name}</h2>
              <p className={styles.collectionDesc}>{col.description}</p>
              
              <span className={styles.exploreButton}>
                Explore Routine & Shop Kit
              </span>
            </div>

            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", padding: "30px", borderRadius: "16px", backdropFilter: "blur(5px)", border: "1px solid rgba(255,255,255,0.4)" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", color: "var(--color-ink)" }}>
                Routine Overview
              </h3>
              <div className={styles.stepsPreviewList}>
                {col.steps.map((step, idx) => (
                  <div key={idx} className={styles.stepPreviewItem}>
                    <span className={styles.stepPreviewNumber}>{idx + 1}</span>
                    <span>{step.split(":")[0]}</span> {/* Show only the step title in preview */}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
