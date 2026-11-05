"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirm) {
      setError("Please fill in all fields to create your account.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("kb_member_email", email.trim());
        window.localStorage.setItem(
          "kb_member_name",
          `${firstName.trim()} ${lastName.trim()}`
        );
      }
    }, 1400);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.visual} aria-hidden="true">
        <div className={styles.visualGlow} />
        <div className={styles.visualBrand}>
          <span className={styles.visualBrandAccent}>K</span>AWAII MART
        </div>
        <div className={styles.visualCopy}>
          <p className={styles.visualEyebrow}>Join the house</p>
          <h2 className={styles.visualTitle}>Begin your member journey.</h2>
          <p className={styles.visualText}>
            Create an account for early drops, personalised routines, and a quieter way to shop
            Japanese beauty &amp; care.
          </p>
        </div>
        <div className={styles.visualMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Perks</span>
            <span className={styles.metaValue}>Early access drops</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Care</span>
            <span className={styles.metaValue}>Concierge support</span>
          </div>
        </div>
      </aside>

      <div className={styles.panel}>
        <div className={styles.card}>
          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className={styles.successTitle}>Welcome, {firstName}</h1>
              <p className={styles.successText}>
                Your Kawaii Mart member account is ready. Explore the collection whenever you like.
              </p>
              <button type="button" className={styles.homeLink} onClick={() => router.push("/")}>
                Start shopping
              </button>
            </div>
          ) : (
            <>
              <p className={styles.eyebrow}>Create account</p>
              <h1 className={styles.title}>Join as a member</h1>
              <p className={styles.subtitle}>
                A few details and you&apos;re part of the atelier.
              </p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {error ? <div className={styles.error}>{error}</div> : null}

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="reg-first">First name</label>
                    <div className={styles.inputShell}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        id="reg-first"
                        className={styles.input}
                        type="text"
                        autoComplete="given-name"
                        placeholder="Aiko"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="reg-last">Last name</label>
                    <div className={styles.inputShell}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <input
                        id="reg-last"
                        className={styles.input}
                        type="text"
                        autoComplete="family-name"
                        placeholder="Tanaka"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="reg-email">Email</label>
                  <div className={styles.inputShell}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      id="reg-email"
                      className={styles.input}
                      type="email"
                      autoComplete="email"
                      placeholder="aiko@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="reg-password">Password</label>
                  <div className={styles.inputShell}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="reg-password"
                      className={`${styles.input} ${styles.inputWithToggle}`}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.togglePw}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                          <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                          <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                          <path d="m2 2 20 20" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="reg-confirm">Confirm password</label>
                  <div className={styles.inputShell}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="reg-confirm"
                      className={styles.input}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>
                </div>

                <label className={styles.check}>
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  I agree to the Terms &amp; Privacy Policy
                </label>

                <button type="submit" className={styles.submit} disabled={loading}>
                  {loading ? <span className={styles.spinner} /> : null}
                  <span>{loading ? "Creating…" : "Create account"}</span>
                </button>
              </form>

              <div className={styles.divider}>or continue with</div>

              <div className={styles.socialRow}>
                <button type="button" className={styles.socialBtn} aria-label="Continue with Google">
                  <GoogleIcon />
                  Google
                </button>
                <button type="button" className={styles.socialBtn} aria-label="Continue with Apple">
                  <AppleIcon />
                  Apple
                </button>
              </div>

              <p className={styles.switch}>
                Already a member?
                <Link href="/login">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.8 3.8 14.6 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1-.2-1.5H12z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.3-3.4zM14.5 6.3c.6-.7 1-1.7.9-2.7-0.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.2z" />
    </svg>
  );
}
