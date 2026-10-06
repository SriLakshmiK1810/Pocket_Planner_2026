import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ChangePasswordScreen() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await api.put(`/users/${user.id}/change-password`, {
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      alert("Password changed successfully. Please log in again.");
localStorage.removeItem("user");
localStorage.removeItem("isLoggedIn");
navigate("/login");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data || "Failed to change password"
      );
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
  <div style={container}>
    <h1 style={pageTitle}>Change Password</h1>

    <p style={pageSubtitle}>
      Keep your account secure by updating your password regularly.
    </p>

    <div style={card}>
      <label style={label}>Current Password</label>

      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Enter current password"
        style={inputStyle}
      />

      <label style={label}>New Password</label>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        style={inputStyle}
      />

      <label style={label}>Confirm New Password</label>

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        style={inputStyle}
      />

      <button
        style={buttonStyle}
        onClick={handleChangePassword}
      >
        Change Password
      </button>

      <button
        style={cancelButton}
        onClick={() => navigate("/profile")}
      >
        Cancel
      </button>
    </div>
  </div>
</main>
    </div>
  );
}

// const mainContent = {
//   flex: 1,
//   padding: "35px",
//   background: "#F8FAFC",
// };

// const card = {
//   maxWidth: "550px",
//   margin: "40px auto",
//   background: "#fff",
//   padding: "35px",
//   borderRadius: "20px",
//   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
// };

const container = {
  maxWidth: "700px",
  margin: "0 auto",
};

const pageTitle = {
  color: "#14532D",
  fontSize: "40px",
  fontWeight: "700",
  marginBottom: "8px",
};

const pageSubtitle = {
  color: "#64748B",
  fontSize: "17px",
  marginBottom: "30px",
};

const card = {
  background: "#FFFFFF",
  padding: "35px",
  borderRadius: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};

const label = {
  display: "block",
  marginTop: "18px",
  marginBottom: "8px",
  color: "#14532D",
  fontWeight: "600",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  border: "2px solid #BBF7D0",
  borderRadius: "14px",
  background: "#F9FFFB",
  color: "#14532D",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "30px",
  padding: "16px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 12px 28px rgba(21,128,61,.25)",
};

const cancelButton = {
  width: "100%",
  marginTop: "15px",
  padding: "16px",
  background: "#F3F4F6",
  color: "#374151",
  border: "1px solid #D1D5DB",
  borderRadius: "999px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};
export default ChangePasswordScreen;