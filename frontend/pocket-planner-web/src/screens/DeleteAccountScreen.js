import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function DeleteAccountScreen() {

  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await api.delete(`/users/${user.id}`);

      localStorage.clear();

      alert("Account deleted successfully");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Failed to delete account");
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
    <h1 style={pageTitle}>⚠ Delete Account</h1>

    <p style={pageSubtitle}>
      This action is permanent and cannot be undone.
    </p>

    <div style={card}>
      <div style={warningBox}>
        <h2 style={{ marginTop: 0, color: "#DC2626" }}>
          Warning
        </h2>

        <p>
          Deleting your account will permanently remove your access to Pocket Planner.
        </p>

        <p>
          Your expenses, budgets and reports will remain stored for history.
        </p>

        <p style={{ marginBottom: 0 }}>
          Type <strong>CONFIRM</strong> below to continue.
        </p>
      </div>

      <label style={label}>Confirmation</label>

      <input
        type="text"
        placeholder="Type CONFIRM"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        style={inputStyle}
      />

      <button
        style={{
          ...deleteButton,
          opacity: confirmText === "CONFIRM" ? 1 : 0.55,
          cursor:
            confirmText === "CONFIRM"
              ? "pointer"
              : "not-allowed",
        }}
        disabled={confirmText !== "CONFIRM"}
        onClick={handleDelete}
      >
        🗑 Delete Account
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

const container = {
  maxWidth: "700px",
  margin: "0 auto",
};

const pageTitle = {
  color: "#DC2626",
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

const warningBox = {
  background: "#FEF2F2",
  border: "2px solid #FECACA",
  borderRadius: "16px",
  padding: "20px",
  color: "#7F1D1D",
  marginBottom: "25px",
};

const label = {
  display: "block",
  marginBottom: "8px",
  color: "#14532D",
  fontWeight: "600",
  fontSize: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "25px",
  border: "2px solid #FECACA",
  borderRadius: "14px",
  background: "#FFFDFD",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const deleteButton = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg,#DC2626,#EF4444)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 12px 28px rgba(220,38,38,.25)",
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

export default DeleteAccountScreen;