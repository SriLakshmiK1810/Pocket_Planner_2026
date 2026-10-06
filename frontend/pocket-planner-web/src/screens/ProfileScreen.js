import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  
const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setName(user.name || "");
    setEmail(user.email || "");
    setPhoneNumber(user.phoneNumber || "");
    setDateOfBirth(user.dateOfBirth || "");
  }
}, []);
const handleSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...user,
      name,
      email,
      phoneNumber,
      dateOfBirth,
    };

    console.log("Sending:", updatedUser);

    const response = await api.put(`/users/${user.id}`, updatedUser);

    console.log("Response:", response.data);

    localStorage.setItem("user", JSON.stringify(response.data));

    setName(response.data.name);
    setEmail(response.data.email);
    setPhoneNumber(response.data.phoneNumber || "");
    setDateOfBirth(response.data.dateOfBirth || "");

    alert("Profile Updated Successfully!");
  } catch (error) {
    console.log("Error:", error.response?.data || error);
    alert("Failed to update profile");
  }
};


  return (
    <div className="app-layout">
  <Sidebar />

 <main
  className="page-content"
  style={{
    background: "#F4F7F2",
    minHeight: "100vh",
    padding: "35px",
    fontFamily: "Poppins, sans-serif",
  }}
>
  <div style={profileContainer}>
    <h1 style={pageTitle}>👤 My Profile</h1>

    <p style={pageSubtitle}>
      View and manage your personal account information.
    </p>

    {/* Personal Information */}
    <div style={profileCard}>
      <h2 style={sectionTitle}>Personal Information</h2>

      <div style={formGrid}>
        <div>
          <label style={label}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={label}>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={label}>Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <button onClick={handleSave} style={buttonStyle}>
        Save Changes
      </button>
    </div>

    {/* Account Details */}
    <div style={profileCard}>
      <h2 style={sectionTitle}>Account Details</h2>

      <div style={detailsGrid}>
        <div>
          <span style={detailLabel}>Account ID</span>
          <p>{JSON.parse(localStorage.getItem("user"))?.id}</p>
        </div>

        <div>
          <span style={detailLabel}>Account Type</span>
          <p>USER</p>
        </div>

        <div>
          <span style={detailLabel}>Email</span>
          <p>{email}</p>
        </div>

        <div>
          <span style={detailLabel}>Savings Goal</span>
          <p>
            ₹{JSON.parse(localStorage.getItem("user"))?.savingsGoal || 0}
          </p>
        </div>
      </div>
    </div>

    {/* Manage Account */}
    <div style={profileCard}>
      <h2 style={sectionTitle}>Manage Account</h2>

      <div style={buttonGrid}>
        <button
          style={actionButton}
          onClick={() => navigate("/change-password")}
        >
          🔒 Change Password
        </button>

        <button
          style={actionButton}
          onClick={() => navigate("/change-email")}
        >
          📧 Change Email
        </button>

        <button style={actionButton}>
          📥 Export My Data
        </button>

        <button
          style={deleteButton}
          onClick={() => navigate("/delete-account")}
        >
          🗑 Delete Account
        </button>
      </div>
    </div>

    <button
      style={logoutButton}
      onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}
    >
      🚪 Logout
    </button>
  </div>
</main>
    </div>
  );
}


const profileCard = {
  background: "#FFFFFF",
  padding: "30px",
  borderRadius: "22px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
  marginBottom: "25px",
};

const logoutButton = {
  marginTop: "30px",
  width: "100%",
  maxWidth: "750px",
  padding: "16px",
  background: "#EF4444",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 12px 28px rgba(239,68,68,.25)",
};

const profileContainer = {
  maxWidth: "900px",
  margin: "0 auto",
};

const pageTitle = {
  color: "#14532D",
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "8px",
};

const pageSubtitle = {
  color: "#64748B",
  fontSize: "17px",
  marginBottom: "30px",
};

const sectionTitle = {
  color: "#15803D",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "22px",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "22px",
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
};

const detailLabel = {
  display: "block",
  color: "#64748B",
  fontWeight: "600",
  marginBottom: "6px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#14532D",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  border: "2px solid #BBF7D0",
  borderRadius: "14px",
  background: "#F9FFFB",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
};

const buttonStyle = {
  marginTop: "28px",
  width: "220px",
  padding: "15px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "15px",
};

const actionButton = {
  padding: "15px",
  border: "1px solid #BBF7D0",
  borderRadius: "14px",
  background: "#F0FDF4",
  color: "#14532D",
  fontWeight: "600",
  cursor: "pointer",
};

const deleteButton = {
  ...actionButton,
  background: "#FEF2F2",
  border: "1px solid #FECACA",
  color: "#DC2626",
};


export default ProfileScreen;