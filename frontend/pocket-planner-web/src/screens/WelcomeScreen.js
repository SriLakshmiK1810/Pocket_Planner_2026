import { useNavigate } from "react-router-dom";
function WelcomeScreen() {
  const navigate = useNavigate();
  

  return (
    <div style={container}>
      <div style={{ fontSize: "90px", marginBottom: "20px" }}>
  💰
</div>

<h1 style={title}>PocketPlanner</h1>
      <h2 style={tagline}>
  Spend Mindfully, Save Intentionally
</h2>

      <p style={description}>
  Manage your expenses, set budgets, track your savings,
  and build better financial habits.
</p>

<h3 style={{ color: "#2563EB", marginBottom: "15px" }}>
  Why PocketPlanner?
</h3>

<div
  style={{
    ...featureBox,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
  <p>✅ Track Daily Expenses</p>
  <p>✅ Set Monthly Budgets</p>
  <p>✅ Monitor Your Savings</p>
  <p>✅ 100% Private & Secure</p>
  <p>✅ Designed for Indian Households 🇮🇳</p>
</div>

      {/* <div
  style={{
    ...featureBox,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
        <p>💰 Smart Budget Management</p>
        <p>📊 Expense Tracking</p>
        <p>🎯 Savings Goals</p>
        <p>🔒 100% Private</p>
        <p>🇮🇳 Designed for Indian Households</p>
      </div> */}

      <button
        style={primaryButton}
        onClick={() => navigate("/register")}
      >
        Get Started
      </button>

      <button
        style={secondaryButton}
        onClick={() => navigate("/login")}
      >
        I Already Have an Account
      </button>
      <p
  style={{
    marginTop: "40px",
    color: "#9CA3AF",
    fontSize: "14px",
  }}
>
  Version 1.0 • PocketPlanner
</p>
    </div>
  );
}

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#F8FAFC",
  padding: "20px",
  textAlign: "center",
};

const title = {
  fontSize: "clamp(32px, 8vw, 48px)",
  color: "#2563EB",
  marginBottom: "10px",
};

const tagline = {
  color: "#374151",
  marginBottom: "20px",
};

const description = {
  maxWidth: "500px",
  color: "#6B7280",
  marginBottom: "30px",
};

const featureBox = {
  width: "100%",
  maxWidth: "500px",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  marginBottom: "30px",
  lineHeight: "2",
};
const primaryButton = {
  width: "min(250px, 100%)",
  padding: "14px",
  background: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  marginBottom: "15px",
};

const secondaryButton = {
  width: "min(250px, 100%)",
  padding: "14px",
  background: "white",
  color: "#2563EB",
  border: "2px solid #2563EB",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export default WelcomeScreen;