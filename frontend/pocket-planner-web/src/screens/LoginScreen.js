import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });
    console.log("Logged-in user:", response.data);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data)
    );

    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");

  } catch (error) {
    alert("Invalid Email or Password");
  }
};

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        background: "#FFFFFF",
color: "#111827",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2563EB" }}>
        Pocket Planner
      </h1>

      <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    ...inputStyle,
   background: "#FFFFFF",
color: "#111827",
  }}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    ...inputStyle,
  background: "#FFFFFF",
color: "#111827",
  }}
/>

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#2563EB",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default LoginScreen;