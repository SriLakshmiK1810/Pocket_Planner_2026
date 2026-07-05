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

      <main className="page-content" >
        <h1>Settings</h1>

        <div className="page-card">        

          <h2>Notifications</h2>

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

          <h2>Currency</h2>

          <select
  style={{
  ...selectStyle,
  background: "#FFFFFF",
  color: "#111827",
  border: "1px solid #D1D5DB",
}}
  
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

          <hr />

          <h2>About</h2>

          <p>
            Pocket Planner helps you manage budgets,
            expenses and savings goals efficiently.
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

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  marginTop: "15px",
};

const buttonStyle = {
  marginTop: "30px",
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default SettingsScreen;