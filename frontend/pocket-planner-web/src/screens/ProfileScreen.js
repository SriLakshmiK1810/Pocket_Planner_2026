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

    const response = await api.put(
      `/users/${user.id}`,
      updatedUser
    );

    localStorage.setItem("user", JSON.stringify(response.data));

    alert("Profile Updated Successfully!");
  } catch (error) {
    console.log(error);
    alert("Failed to update profile");
  }
};


  return (
    <div className="app-layout">
  <Sidebar />

  <main className="page-content">
    <h1>My Profile</h1>
    <div className="page-card">

        {/* <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "600px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
          }}
        > */}
          <label>Full Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />
          <label>Phone Number</label>

<input
  type="tel"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
  style={inputStyle}
  placeholder="Enter phone number"
/>

<label>Date of Birth</label>

<input
  type="date"
  value={dateOfBirth}
  onChange={(e) => setDateOfBirth(e.target.value)}
  style={inputStyle}
/>



          <button
            onClick={handleSave}
            style={buttonStyle}
          >
            Save Changes
          </button>
                </div>

        {/* Account Details */}
        <div className="page-card">
        {/* <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "600px",
            marginTop: "25px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        > */}
          <h2>Account Details</h2>

          <p><strong>Account ID:</strong> {JSON.parse(localStorage.getItem("user"))?.id}</p>

          <p><strong>Account Type:</strong> USER</p>

          <p><strong>Email:</strong> {email}</p>

          <p><strong>Savings Goal:</strong> ₹{JSON.parse(localStorage.getItem("user"))?.savingsGoal || 0}</p>
        </div>

        {/* Manage Account */}
        <div className="page-card">
        {/* <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            maxWidth: "600px",
            marginTop: "25px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        > */}
          <h2>Manage Account</h2>

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
            Export My Data
          </button>

          <button style={deleteButton}
            onClick={() => navigate("/delete-account")}
            > Delete Account
</button>
        </div>

        {/* Logout */}
        <button
          style={logoutButton}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 Logout
        </button>

      </main>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  boxSizing: "border-box",
};

const buttonStyle = {
  background:
    "linear-gradient(135deg,#2563EB,#3B82F6)",
  color: "#fff",
  border: "none",
  padding: "14px 25px",
  borderRadius: "12px",
  cursor: "pointer",
};
const actionButton = {
  width: "100%",
  padding: "14px",
  marginBottom: "12px",
  background: "#F3F4F6",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  cursor: "pointer",
  textAlign: "left",
  fontSize: "16px",
};

const deleteButton = {
  ...actionButton,
  background: "#FEE2E2",
  color: "#DC2626",
};

const logoutButton = {
  marginTop: "25px",
  width: "100%",
maxWidth: "600px",
  padding: "15px",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
};
export default ProfileScreen;