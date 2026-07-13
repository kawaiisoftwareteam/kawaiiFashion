"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brands } from "../../data/products";
import styles from "./Brands.module.css";

export default function BrandsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.pageTitle}>Shop Japanese Brands</h1>
        <p className={styles.pageSubtitle}>
          Discover the unique philosophies and premium formulations behind our hand-selected collection of traditional and modern Japanese beauty labels.
        </p>
      </div>

      <div className={styles.brandsGrid}>
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brands/${brand.id}`}
            className={styles.brandCard}
            style={{
              ["--brand-color" as any]: brand.accentColor,
              ["--brand-gradient" as any]: `linear-gradient(90deg, ${brand.accentColor}, ${brand.accentColor}dd)`
            }}
          >
            <div>
              <div className={styles.brandHeader}>
                <div
                  className={styles.brandLogoWrapper}
                  style={{ backgroundColor: brand.accentColorLight }}
                >
                  {/* Logo Image */}
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover", padding: "8px" }}
                  />
                </div>
                <h2 className={styles.brandName}>{brand.name}</h2>
              </div>
              <p className={styles.brandDesc}>{brand.description}</p>
            </div>
            
            <span className={styles.exploreLink}>
              Explore Brand Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
