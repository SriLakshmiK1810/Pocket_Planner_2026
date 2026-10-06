import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import logo from "../assets/logo.jpeg";
function LoginScreen() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blobTop} />
      <div style={styles.blobBottom} />

      <div
        style={{
          ...styles.container,
          flexDirection: isMobile ? "column" : "row",
          padding: isMobile ? "28px 22px" : "42px",
          gap: isMobile ? "28px" : "42px",
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
  <div style={styles.headerBlock}>
    <img
      src={logo}
      alt="Pocket Planner Logo"
      style={styles.logoImage}
    />

    <h1
      style={{
        ...styles.title,
        fontSize: isMobile ? "40px" : "54px",
      }}
    >
      Welcome Back to <span style={{ color: "#15803D" }}>Pocket Planner</span>
    </h1>
  </div>

  <p style={styles.subtitle}>Continue your financial journey with ease.</p>

  <div style={styles.featureBox}>
    <div style={styles.feature}>💰 Expenses</div>
    <div style={styles.feature}>📊 Analytics</div>
    <div style={styles.feature}>🎯 Savings</div>
  </div>
</div>

        {/* Right Section */}
        <div
          style={{
            ...styles.right,
            width: isMobile ? "100%" : "340px",
          }}
        >
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Login</h2>

            <p style={styles.cardText}>
              Sign in to continue managing your finances.
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button style={styles.primaryButton} onClick={handleLogin}>
              Login
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/register")}
            >
              Create New Account
            </button>

            <p style={styles.linkText}>
              Don't have an account?{" "}
              <Link to="/register" style={styles.link}>
                Register
              </Link>
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
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "#DDE8D8",
    top: "-70px",
    left: "-70px",
  },

  blobBottom: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "#E6F4EA",
    bottom: "-80px",
    right: "-80px",
  },

  container: {
    width: "100%",
    maxWidth: "1120px",
    background: "#FFFFFF",
    borderRadius: "28px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.10)",
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    boxSizing: "border-box",
  },

  left: {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
},

  right: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  headerBlock: {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "18px",
},

logoImage: {
  width: "170px",
  height: "170px",
  objectFit: "contain",
  marginBottom: "14px",
},

  title: {
    color: "#0F172A",
    fontWeight: "800",
    lineHeight: 1.05,
    marginBottom: "12px",
  },

  subtitle: {
    color: "#166534",
    fontWeight: "700",
    fontSize: "17px",
    marginBottom: "22px",
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
    padding: "28px",
    boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
  },

  cardTitle: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: "10px",
  },

  cardText: {
    color: "#64748B",
    textAlign: "center",
    marginBottom: "20px",
    lineHeight: 1.6,
  },

  input: {
    width: "100%",
    padding: "15px 16px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "1px solid #CBD5E1",
    background: "#F8FAFC",
    color: "#111827",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  primaryButton: {
    width: "100%",
    padding: "15px",
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
    padding: "15px",
    background: "#FFFFFF",
    color: "#15803D",
    border: "2px solid #15803D",
    borderRadius: "999px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "18px",
  },

  linkText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: "14px",
  },

  link: {
    color: "#15803D",
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default LoginScreen;