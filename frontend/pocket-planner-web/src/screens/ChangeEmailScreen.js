import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function ChangeEmailScreen() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleChangeEmail = async () => {
    if (!password || !newEmail) {
      alert("Please fill all fields");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await api.put(
        `/users/${user.id}/change-email`,
        {
          password,
          newEmail,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Email updated successfully!");

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert(error.response?.data || "Failed to update email");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <div className="page-card">
        
          <h1>Change Email</h1>

          <label>New Email</label>

          <input
            type="email" placeholder="example@gmail.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={inputStyle}
          />

          <label>Current Password</label>

          <input
            type="password"
            value={password} placeholder="Atleast 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            style={buttonStyle}
            onClick={handleChangeEmail}
          >
            Update Email
          </button>

          <button
            style={cancelButton}
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>
        </main>
      </div>
    
  );
}


// const card = {
//   maxWidth: "550px",
//   margin: "40px auto",
//   background: "#fff",
//   padding: "35px",
//   borderRadius: "20px",
//   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
// };

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
};

const cancelButton = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  background: "#E5E7EB",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

export default ChangeEmailScreen;