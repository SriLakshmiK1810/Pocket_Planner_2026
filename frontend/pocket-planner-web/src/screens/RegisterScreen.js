import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
function RegisterScreen() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegister = async () => {
  try {
    const response = await api.post("/users/register", {
  name,
  email,
  password,
});

// Save user details after successful registration
localStorage.setItem("user", JSON.stringify(response.data));
localStorage.setItem("isLoggedIn", "true");

alert("Registration Successful!");
navigate("/dashboard");

  } catch (error) {
  const message =
    error.response?.data?.message ||
    error.response?.data ||
    "Registration failed";

  alert(message);
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
        maxWidth: "450px",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        backgroundColor: "#FFFFFF",
      }}
    >
    
      <h1
        style={{
          textAlign: "center",
          color: "#2563EB",
        }}
      >
        Create Account
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={inputStyle}
      />

      <button
        style={buttonStyle}
        onClick={handleRegister}
      >
        Register
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#2563EB",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
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
  background: "#FFFFFF",
  color: "#111827",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563EB",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default RegisterScreen;