"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/auth.module.css";

interface AuthContainerProps {
  initialMode?: "login" | "register";
}

export default function AuthContainer({ initialMode = "login" }: AuthContainerProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        setMode(window.location.pathname.includes("/register") ? "register" : "login");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const switchMode = (newMode: "login" | "register") => {
    if (newMode === mode) return;
    setMode(newMode);
    if (typeof window !== "undefined") {
      const targetUrl = newMode === "register" ? "/register" : "/login";
      window.history.pushState({ mode: newMode }, "", targetUrl);
    }
  };

  // --- LOGIN STATE ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // --- REGISTER STATE ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // --- FORGOT PASSWORD MODAL ---
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please enter both email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim())) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    if (loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoginSuccess(true);
      if (rememberMe && typeof window !== "undefined") {
        window.localStorage.setItem("kb_member_email", loginEmail.trim());
      }
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1100);
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");

    if (!firstName.trim() || !lastName.trim() || !regEmail.trim() || !regPassword || !regConfirm) {
      setRegError("Please fill in all fields to create your account.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      setRegError("Please enter a valid email address.");
      return;
    }

    if (regPassword.length < 8) {
      setRegError("Password must be at least 8 characters.");
      return;
    }

    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setRegError("Please accept the terms & privacy policy.");
      return;
    }

    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      setRegSuccess(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("kb_member_email", regEmail.trim());
        window.localStorage.setItem("kb_member_name", `${firstName.trim()} ${lastName.trim()}`);
      }
      setTimeout(() => {
        router.push("/");
      }, 2200);
    }, 1300);
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      return;
    }
    setForgotLoading(true);
    setTimeout(() => {
      setForgotLoading(false);
      setForgotSent(true);
    }, 1000);
  };

  return (
    <div className={styles.authWrapper}>
      {/* =========================================================================
          DESKTOP DUAL SLIDING SPLIT LAYOUT (Screens >= 961px)
          ========================================================================= */}
      <div className={styles.desktopContainer}>
        {/* Dark Visual Atelier Panel (Glides between left and right) */}
        <aside
          className={`${styles.visualPanel} ${mode === "register" ? styles.visualPanelRegister : ""}`}
          aria-label="Kawaii Mart Atelier Access"
        >
          {/* Layered bespoke Japanese beauty imagery with smooth crossfades */}
          <div className={styles.visualImageLayer} aria-hidden="true">
            <div
              className={`${styles.visualBgImage} ${styles.visualBgImageLogin} ${
                mode === "login" ? styles.activeImage : styles.inactiveImage
              }`}
            />
            <div
              className={`${styles.visualBgImage} ${styles.visualBgImageRegister} ${
                mode === "register" ? styles.activeImage : styles.inactiveImage
              }`}
            />
            <div className={styles.visualVignette} />
          </div>

          {/* Top Brand Header */}
          <div className={styles.visualBrandRow}>
            <div className={styles.visualBrand}>
              <span className={styles.brandDot} />
              KAWAII MART
            </div>
          </div>

          {/* Center Copy with smooth content shift */}
          <div className={styles.visualContent}>
            <p className={styles.visualEyebrow}>
              {mode === "login" ? "Member Access" : "Join The Atelier"}
            </p>
            <h2 className={styles.visualTitle}>
              {mode === "login" ? (
                <>
                  Welcome back to <span className={styles.titleGradient}>the house.</span>
                </>
              ) : (
                <>
                  Begin your member <span className={styles.titleGradient}>journey.</span>
                </>
              )}
            </h2>
          </div>

          <div className={styles.visualBottomSpacer} />
        </aside>

        {/* White Form Panel (Glides in counter-direction) */}
        <main
          className={`${styles.formPanel} ${mode === "register" ? styles.formPanelRegister : ""}`}
        >
          <div className={styles.card}>
            {loginSuccess || regSuccess ? (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <CheckIcon />
                </div>
                <h1 className={styles.successTitle}>
                  {loginSuccess ? "You're in" : `Welcome, ${firstName || "Member"}`}
                </h1>
                <p className={styles.successText}>
                  {loginSuccess
                    ? "Welcome back. Your atelier member space is ready. Redirecting…"
                    : "Your Kawaii Mart member account is ready. Redirecting to collections…"}
                </p>
                <button
                  type="button"
                  className={styles.homeActionBtn}
                  onClick={() => router.push("/")}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div
                className={`${styles.cardTrack} ${
                  mode === "register" ? styles.cardTrackRegister : ""
                }`}
              >
                {/* --- SLIDE 1: LOGIN FORM --- */}
                <div className={styles.cardSlide}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrowChip}>SIGN IN</span>
                    <h1 className={styles.title}>Enter your account</h1>
                    <p className={styles.subtitle}>
                      Access saved pieces, order history, and member offers.
                    </p>
                  </div>

                  <form className={styles.form} onSubmit={handleLoginSubmit} noValidate>
                    {loginError && <div className={styles.error}>{loginError}</div>}

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="desktop-login-email">
                        Email
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <MailIcon />
                        </span>
                        <input
                          id="desktop-login-email"
                          className={styles.input}
                          type="email"
                          autoComplete="email"
                          placeholder="admin@lullaby.bd"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="desktop-login-password">
                        Password
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <LockIcon />
                        </span>
                        <input
                          id="desktop-login-password"
                          className={`${styles.input} ${styles.inputWithToggle}`}
                          type={showLoginPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.togglePw}
                          aria-label={showLoginPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowLoginPassword((v) => !v)}
                        >
                          {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.options}>
                      <label className={styles.check}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className={styles.forgotBtn}
                        onClick={() => {
                          setForgotOpen(true);
                          setForgotSent(false);
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button type="submit" className={styles.submit} disabled={loginLoading}>
                      {loginLoading && <span className={styles.spinner} />}
                      <span>{loginLoading ? "Signing in…" : "SIGN IN"}</span>
                    </button>
                  </form>

                  <div className={styles.divider}>or continue with</div>

                  <div className={styles.socialRow}>
                    <button type="button" className={styles.socialBtn}>
                      <GoogleIcon />
                      Google
                    </button>
                    <button type="button" className={styles.socialBtn}>
                      <AppleIcon />
                      Apple
                    </button>
                  </div>

                  <p className={styles.switchPrompt}>
                    New to Kawaii Mart?
                    <button
                      type="button"
                      className={styles.switchLink}
                      onClick={() => switchMode("register")}
                    >
                      Create account
                    </button>
                  </p>
                </div>

                {/* --- SLIDE 2: REGISTER FORM --- */}
                <div className={styles.cardSlide}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrowChip}>CREATE ACCOUNT</span>
                    <h1 className={styles.title}>Join as a member</h1>
                    <p className={styles.subtitle}>
                      A few details and you&apos;re part of the atelier.
                    </p>
                  </div>

                  <form className={styles.form} onSubmit={handleRegisterSubmit} noValidate>
                    {regError && <div className={styles.error}>{regError}</div>}

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="desktop-reg-first">
                          First name
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <UserIcon />
                          </span>
                          <input
                            id="desktop-reg-first"
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
                        <label className={styles.label} htmlFor="desktop-reg-last">
                          Last name
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <UserIcon />
                          </span>
                          <input
                            id="desktop-reg-last"
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
                      <label className={styles.label} htmlFor="desktop-reg-email">
                        Email
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <MailIcon />
                        </span>
                        <input
                          id="desktop-reg-email"
                          className={styles.input}
                          type="email"
                          autoComplete="email"
                          placeholder="aiko@email.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="desktop-reg-pw">
                          Password
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <LockIcon />
                          </span>
                          <input
                            id="desktop-reg-pw"
                            className={`${styles.input} ${styles.inputWithToggle}`}
                            type={showRegPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Min. 8 chars"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className={styles.togglePw}
                            onClick={() => setShowRegPassword((v) => !v)}
                          >
                            {showRegPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </button>
                        </div>
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="desktop-reg-confirm">
                          Confirm
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <LockIcon />
                          </span>
                          <input
                            id="desktop-reg-confirm"
                            className={styles.input}
                            type={showRegPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Repeat password"
                            value={regConfirm}
                            onChange={(e) => setRegConfirm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      I agree to the Terms &amp; Privacy Policy
                    </label>

                    <button type="submit" className={styles.submit} disabled={regLoading}>
                      {regLoading && <span className={styles.spinner} />}
                      <span>{regLoading ? "Creating account…" : "CREATE ACCOUNT"}</span>
                    </button>
                  </form>

                  <div className={styles.divider}>or continue with</div>

                  <div className={styles.socialRow}>
                    <button type="button" className={styles.socialBtn}>
                      <GoogleIcon />
                      Google
                    </button>
                    <button type="button" className={styles.socialBtn}>
                      <AppleIcon />
                      Apple
                    </button>
                  </div>

                  <p className={styles.switchPrompt}>
                    Already a member?
                    <button
                      type="button"
                      className={styles.switchLink}
                      onClick={() => switchMode("login")}
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =========================================================================
          RESPONSIVE MOBILE VIEW (Screens <= 960px)
          ========================================================================= */}
      <div className={styles.mobileContainer}>
        {/* Mobile Visual Header */}
        <div className={styles.mobileVisual}>
          <div className={styles.visualImageLayer} aria-hidden="true">
            <div
              className={`${styles.visualBgImage} ${
                mode === "login" ? styles.visualBgImageLogin : styles.visualBgImageRegister
              } ${styles.activeImage}`}
            />
            <div className={styles.visualVignette} />
          </div>

          <div className={styles.mobileVisualCopy}>
            <p className={styles.mobileVisualEyebrow}>
              {mode === "login" ? "Kawaii Mart Atelier" : "Member Journey"}
            </p>
            <h2 className={styles.mobileVisualTitle}>
              {mode === "login" ? (
                <>
                  Welcome back to <span className={styles.titleGradient}>the house.</span>
                </>
              ) : (
                <>
                  Begin your member <span className={styles.titleGradient}>journey.</span>
                </>
              )}
            </h2>
          </div>
        </div>

        {/* Segmented Switcher Tab */}
        <div className={styles.mobileTabWrapper}>
          <div className={styles.mobileTabTrack}>
            <div
              className={`${styles.mobileTabPill} ${
                mode === "register" ? styles.mobileTabPillRegister : ""
              }`}
            />
            <button
              type="button"
              className={`${styles.mobileTabBtn} ${mode === "login" ? styles.mobileTabBtnActive : ""}`}
              onClick={() => switchMode("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`${styles.mobileTabBtn} ${
                mode === "register" ? styles.mobileTabBtnActive : ""
              }`}
              onClick={() => switchMode("register")}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Mobile Form Carousel */}
        <div className={styles.mobileFormWrapper}>
          <div className={styles.card}>
            {loginSuccess || regSuccess ? (
              <div className={styles.successCard}>
                <div className={styles.successIcon}>
                  <CheckIcon />
                </div>
                <h1 className={styles.successTitle}>
                  {loginSuccess ? "You're in" : `Welcome, ${firstName || "Member"}`}
                </h1>
                <p className={styles.successText}>
                  {loginSuccess
                    ? "Welcome back. Redirecting to shop…"
                    : "Your account is ready. Redirecting…"}
                </p>
                <button
                  type="button"
                  className={styles.homeActionBtn}
                  onClick={() => router.push("/")}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div
                className={`${styles.cardTrack} ${
                  mode === "register" ? styles.cardTrackRegister : ""
                }`}
              >
                {/* Mobile Login Form */}
                <div className={styles.cardSlide}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrowChip}>SIGN IN</span>
                    <h1 className={styles.title}>Enter your account</h1>
                    <p className={styles.subtitle}>Access saved pieces and orders.</p>
                  </div>

                  <form className={styles.form} onSubmit={handleLoginSubmit} noValidate>
                    {loginError && <div className={styles.error}>{loginError}</div>}

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="mobile-login-email">
                        Email
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <MailIcon />
                        </span>
                        <input
                          id="mobile-login-email"
                          className={styles.input}
                          type="email"
                          placeholder="admin@lullaby.bd"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="mobile-login-pw">
                        Password
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <LockIcon />
                        </span>
                        <input
                          id="mobile-login-pw"
                          className={`${styles.input} ${styles.inputWithToggle}`}
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.togglePw}
                          onClick={() => setShowLoginPassword((v) => !v)}
                        >
                          {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <div className={styles.options}>
                      <label className={styles.check}>
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className={styles.forgotBtn}
                        onClick={() => {
                          setForgotOpen(true);
                          setForgotSent(false);
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button type="submit" className={styles.submit} disabled={loginLoading}>
                      {loginLoading && <span className={styles.spinner} />}
                      <span>{loginLoading ? "Signing in…" : "SIGN IN"}</span>
                    </button>
                  </form>

                  <div className={styles.divider}>or continue with</div>

                  <div className={styles.socialRow}>
                    <button type="button" className={styles.socialBtn}>
                      <GoogleIcon />
                      Google
                    </button>
                    <button type="button" className={styles.socialBtn}>
                      <AppleIcon />
                      Apple
                    </button>
                  </div>
                </div>

                {/* Mobile Register Form */}
                <div className={styles.cardSlide}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrowChip}>CREATE ACCOUNT</span>
                    <h1 className={styles.title}>Join as a member</h1>
                    <p className={styles.subtitle}>Join the Kawaii Mart atelier.</p>
                  </div>

                  <form className={styles.form} onSubmit={handleRegisterSubmit} noValidate>
                    {regError && <div className={styles.error}>{regError}</div>}

                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="mobile-reg-first">
                          First name
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <UserIcon />
                          </span>
                          <input
                            id="mobile-reg-first"
                            className={styles.input}
                            type="text"
                            placeholder="Aiko"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="mobile-reg-last">
                          Last name
                        </label>
                        <div className={styles.inputShell}>
                          <span className={styles.leadingIcon}>
                            <UserIcon />
                          </span>
                          <input
                            id="mobile-reg-last"
                            className={styles.input}
                            type="text"
                            placeholder="Tanaka"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="mobile-reg-email">
                        Email
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <MailIcon />
                        </span>
                        <input
                          id="mobile-reg-email"
                          className={styles.input}
                          type="email"
                          placeholder="aiko@email.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="mobile-reg-pw">
                        Password
                      </label>
                      <div className={styles.inputShell}>
                        <span className={styles.leadingIcon}>
                          <LockIcon />
                        </span>
                        <input
                          id="mobile-reg-pw"
                          className={`${styles.input} ${styles.inputWithToggle}`}
                          type={showRegPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className={styles.togglePw}
                          onClick={() => setShowRegPassword((v) => !v)}
                        >
                          {showRegPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      I agree to the Terms &amp; Privacy Policy
                    </label>

                    <button type="submit" className={styles.submit} disabled={regLoading}>
                      {regLoading && <span className={styles.spinner} />}
                      <span>{regLoading ? "Creating account…" : "CREATE ACCOUNT"}</span>
                    </button>
                  </form>

                  <div className={styles.divider}>or continue with</div>

                  <div className={styles.socialRow}>
                    <button type="button" className={styles.socialBtn}>
                      <GoogleIcon />
                      Google
                    </button>
                    <button type="button" className={styles.socialBtn}>
                      <AppleIcon />
                      Apple
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          FORGOT PASSWORD MODAL OVERLAY
          ========================================================================= */}
      {forgotOpen && (
        <div className={styles.modalBackdrop} onClick={() => setForgotOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setForgotOpen(false)}
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            <span className={styles.eyebrow}>PASSWORD RECOVERY</span>
            <h2 className={styles.title} style={{ fontSize: "1.65rem", marginTop: "0.25rem" }}>
              Reset your password
            </h2>
            <p className={styles.subtitle} style={{ marginBottom: "1.5rem" }}>
              Enter your registered email address and we&apos;ll send you instructions to reset your
              password.
            </p>

            {forgotSent ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div className={styles.successIcon} style={{ width: 52, height: 52 }}>
                  <CheckIcon />
                </div>
                <p style={{ fontWeight: 600, color: "#111827", marginBottom: "0.5rem" }}>
                  Reset link sent!
                </p>
                <p style={{ fontSize: "0.88rem", color: "#6b7280", marginBottom: "1.25rem" }}>
                  Please check your inbox at <strong>{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  className={styles.submit}
                  onClick={() => setForgotOpen(false)}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <div className={styles.field} style={{ marginBottom: "1.25rem" }}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputShell}>
                    <span className={styles.leadingIcon}>
                      <MailIcon />
                    </span>
                    <input
                      className={styles.input}
                      type="email"
                      required
                      placeholder="admin@lullaby.bd"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className={styles.submit} disabled={forgotLoading}>
                  {forgotLoading && <span className={styles.spinner} />}
                  <span>{forgotLoading ? "Sending link…" : "SEND RESET LINK"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   CLEAN LUXURY ICONS
   ========================================================================= */

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.91.04-2.02.61-2.67 1.37-.58.67-1.08 1.76-.94 2.81 1.02.08 2.04-.49 2.67-1.25z" />
    </svg>
  );
}
