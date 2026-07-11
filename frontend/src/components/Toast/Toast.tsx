"use client";

import React from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toastBody}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.toastIcon}
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{message}</span>
      </div>
      <button className={styles.toastClose} onClick={onClose}>
        &times;
      </button>
    </div>
  );
}
