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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={mainContent}>
        <div style={card}>
          <h1>🔒 Change Password</h1>

          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            style={inputStyle}
            placeholder="Enter current password"
          />

          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={inputStyle}
            placeholder="Enter new password"
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={inputStyle}
            placeholder="Confirm new password"
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
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
};

const card = {
  maxWidth: "550px",
  margin: "40px auto",
  background: "#fff",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
};

const cancelButton = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  background: "#E5E7EB",
  color: "#111827",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ChangePasswordScreen;