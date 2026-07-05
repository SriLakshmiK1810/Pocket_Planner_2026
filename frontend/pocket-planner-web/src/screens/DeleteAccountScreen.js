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

     <main className="page-content">
      <div className="page-card">
          <h1 style={{ color: "#DC2626" }}>
            ⚠ Delete Account
          </h1>

          <p>
            Deleting your account will disable access permanently.
          </p>

          <p>
            Your expenses, budgets and reports will be preserved for history.
          </p>

          <p>
            Type <strong>CONFIRM</strong> to continue.
          </p>

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
              opacity: confirmText === "CONFIRM" ? 1 : 0.5,
              cursor:
                confirmText === "CONFIRM"
                  ? "pointer"
                  : "not-allowed",
            }}
            disabled={confirmText !== "CONFIRM"}
            onClick={handleDelete}
          >
            Delete Account
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

const inputStyle = {
  width: "100%",
  padding: "14px",
  margin: "20px 0",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
};

const deleteButton = {
  width: "100%",
  padding: "14px",
  background: "#DC2626",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
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

export default DeleteAccountScreen;