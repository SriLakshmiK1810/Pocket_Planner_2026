import { useState } from "react";
import Sidebar from "../components/Sidebar";

function SettingsScreen() {

const [notifications, setNotifications] = useState(
  localStorage.getItem("notifications") !== "false"
);

const [currency, setCurrency] = useState(
  localStorage.getItem("currency") || "INR"
);
  const handleSave = () => {
  localStorage.setItem("notifications", notifications);
  localStorage.setItem("currency", currency);

  alert("Settings saved successfully!");
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
      <h1
  style={{
    color: "#14532D",
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "10px",
  }}
>
  ⚙️ Settings
</h1>

<p
  style={{
    color: "#64748B",
    fontSize: "17px",
    marginBottom: "30px",
  }}
>
  Customize your Pocket Planner experience.
</p>

        <div style={pageCard}>        

          <h2 style={sectionTitle}>Notifications</h2>

          <div style={row}>
            <span>🔔 Enable Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />
          </div>

          <hr />

          <h2 style={sectionTitle}>Currency</h2>
<select
  style={selectStyle}
  
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value)
            }
          >
            <option value="INR">₹ Indian Rupee</option>
            <option value="USD">$ US Dollar</option>
            <option value="EUR">€ Euro</option>
            <option value="GBP">£ Pound</option>
          </select>

          <hr
  style={{
    border: "none",
    borderTop: "1px solid #E5E7EB",
    margin: "28px 0",
  }}
/>

          <h2 style={sectionTitle}>About</h2>

          <p
  style={{
    color: "#4B5563",
    fontSize: "16px",
    lineHeight: "1.8",
  }}
>
  Pocket Planner helps you manage budgets, expenses,
  savings goals and your daily finances efficiently.
</p>

          <button
            style={buttonStyle}
            onClick={handleSave}
          >
            Save Settings
          </button>

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
//   maxWidth: "700px",
//   background: "#fff",
//   padding: "35px",
//   borderRadius: "20px",
//   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
// };


const pageCard = {
  background: "#FFFFFF",
  borderRadius: "24px",
  padding: "30px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
  maxWidth: "850px",
};

const sectionTitle = {
  color: "#15803D",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "18px",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "22px 0",
  fontSize: "17px",
  fontWeight: "600",
  color: "#14532D",
};

const selectStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "14px",
  border: "2px solid #BBF7D0",
  background: "#F9FFFB",
  color: "#14532D",
  fontSize: "16px",
  fontWeight: "600",
  outline: "none",
};

const buttonStyle = {
  marginTop: "35px",
  width: "100%",
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
export default SettingsScreen;