
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
function WelcomeScreen() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.blobTop}></div>
      <div style={styles.blobBottom}></div>

      <div
        style={{
          ...styles.container,
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "30px 24px" : "60px 70px",
        }}
      >
        {/* Left Section */}
        <div
  style={{
    ...styles.left,
    alignItems: "flex-start",
    textAlign: "left",
  }}
>
  {/* Centered Logo + Title */}
  <div style={styles.headerBlock}>
    <img
      src={logo}
      alt="Pocket Planner Logo"
      style={styles.logoImage}
    />

    <h1
      style={{
        ...styles.title,
        fontSize: isMobile ? "40px" : "56px",
      }}
    >
      Welcome to <span style={{ color: "#15803D" }}>Pocket Planner</span>
    </h1>
  </div>

  <p style={styles.subtitle}>
    YOUR PERSONAL BUDGET & EXPENSE MANAGER
  </p>

  <p style={styles.description}>
    Track expenses, manage budgets, monitor savings, and build smarter
    financial habits with a clean and secure personal finance manager.
  </p>

  <div style={styles.featureBox}>
    <div style={styles.feature}>💰 Track Expenses</div>
    <div style={styles.feature}>📅 Monthly Budgets</div>
    <div style={styles.feature}>📊 Smart Analytics</div>
    <div style={styles.feature}>🎯 Savings Goals</div>
  </div>
</div>

        {/* Right Section */}
        <div
          style={{
            ...styles.right,
            width: isMobile ? "100%" : "380px",
          }}
        >
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Get Started</h2>

            <p style={styles.cardText}>
              Create an account or sign in to continue managing your finances.
            </p>

            <button
              style={styles.primaryButton}
              onClick={() => navigate("/register")}
            >
              Create New Account
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/login")}
            >
              Login Existing User
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerText}>OR CONNECT VIA</span>
            </div>

            <div style={styles.socialRow}>
              <button style={styles.socialButton}>Google</button>
              <button style={styles.socialButton}>Apple</button>
            </div>

            <p style={styles.footer}>
              By signing up, you agree to our
              <br />
              Terms of Service & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  
page: {
  minHeight: "100vh",
  background: "#F4F7F2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden",
  fontFamily: "Poppins, Arial, sans-serif",
  padding: "16px",
},


  blobTop: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "#DDE8D8",
    top: "-80px",
    left: "-80px",
    opacity: 0.9,
  },

  blobBottom: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "#E6F4EA",
    bottom: "-100px",
    right: "-100px",
    opacity: 0.9,
  },

  container: {
  width: "100%",
  maxWidth: "1180px",
  minHeight: "88vh",
  background: "#FFFFFF",
  borderRadius: "28px",
  boxShadow: "0 24px 60px rgba(15,23,42,0.10)",
  display: "flex",
  gap: "40px",
  padding: "40px",
  position: "relative",
  zIndex: 1,
  boxSizing: "border-box",
},

 left: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: "560px",
  alignItems: "flex-start",
},
  right: {
  width: "360px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

  logoImage: {
  width: "180px",
  height: "180px",
  objectFit: "contain",
  marginBottom: "14px",
},
headerBlock: {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // centers logo and heading together
  marginBottom: "18px",
},

  subtitle: {
    color: "#166534",
    fontWeight: "700",
    letterSpacing: "1px",
    fontSize: "16px",
    marginBottom: "22px",
  },

  description: {
  color: "#64748B",
  fontSize: "17px",
  lineHeight: 1.7,
  maxWidth: "520px",
  marginBottom: "24px",
},

  featureBox: {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
},

feature: {
  background: "#F8FAF8",
  border: "1px solid #E5E7EB",
  borderRadius: "14px",
  padding: "12px 16px",
  color: "#14532D",
  fontWeight: "600",
  fontSize: "15px",
},

  card: {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "24px",
    padding: "34px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
  },

  cardTitle: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: "12px",
  },

  cardText: {
    color: "#64748B",
    textAlign: "center",
    lineHeight: 1.7,
    marginBottom: "24px",
  },

  primaryButton: {
    width: "100%",
    padding: "16px",
    background: "#15803D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "14px",
  },

  secondaryButton: {
    width: "100%",
    padding: "16px",
    background: "#FFFFFF",
    color: "#15803D",
    border: "2px solid #15803D",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "22px 0",
  },

  dividerText: {
    color: "#94A3B8",
    fontSize: "12px",
    letterSpacing: "1px",
    margin: "0 auto",
  },

  socialRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
  },

  socialButton: {
    flex: 1,
    padding: "14px",
    background: "#FFFFFF",
    border: "1px solid #D1D5DB",
    borderRadius: "14px",
    color: "#0F172A",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    color: "#94A3B8",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: 1.7,
  },
};

export default WelcomeScreen;
