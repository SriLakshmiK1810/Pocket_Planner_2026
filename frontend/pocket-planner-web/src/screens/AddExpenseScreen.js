import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddExpenseScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
const [expenseType, setExpenseType] = useState("Need");
 const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
  const handleSaveExpense = async () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
  await api.post(`/expenses?userId=${userId}`, {
    title,
    amount: Number(amount),
    category,
    paymentMode,
    expenseType,
    date: new Date().toISOString().split("T")[0],
  });

  alert("Expense Added Successfully!");
} catch (error) {
  console.error(error);
  alert("Failed to save expense");
}
    setTitle("");
    setAmount("");
    setCategory("");
    setPaymentMode("UPI");
setExpenseType("Need");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={mainContent}>
        <div style={formCard}>
          <h1 style={{ margin: "0 0 25px", color: "#111827" }}>
            Add New Expense
          </h1>

          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            style={inputStyle}
          />

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Category</option>
  <option value="Groceries">🛒 Groceries</option>
  <option value="Food">🍔 Food & Dining</option>
  <option value="Travel">🚕 Travel</option>
  <option value="Bills">💡 Bills & Utilities</option>
  <option value="Medical">🏥 Medical</option>
  <option value="Education">📚 Education</option>
  <option value="Shopping">🛍 Shopping</option>
  <option value="EMI">💳 EMI & Loans</option>
  <option value="Festival">🎉 Festivals & Gifts</option>
  <option value="Others">📦 Others</option>
</select>
<h3>Payment Mode</h3>

<div style={buttonGroup}>
  <button
    type="button"
    style={paymentMode === "Cash" ? activeButton : optionButton}
    onClick={() => setPaymentMode("Cash")}
  >
    💵 Cash
  </button>

  <button
    type="button"
    style={paymentMode === "UPI" ? activeButton : optionButton}
    onClick={() => setPaymentMode("UPI")}
  >
    📱 UPI
  </button>

  <button
    type="button"
    style={paymentMode === "Card" ? activeButton : optionButton}
    onClick={() => setPaymentMode("Card")}
  >
    💳 Card
  </button>
</div>
<h3>Expense Type</h3>

<div style={buttonGroup}>
  <button
    type="button"
    style={expenseType === "Need" ? activeButton : optionButton}
    onClick={() => setExpenseType("Need")}
  >
    ✅ Need
  </button>

  <button
    type="button"
    style={expenseType === "Want" ? activeButton : optionButton}
    onClick={() => setExpenseType("Want")}
  >
    ⭐ Want
  </button>
</div>

          <button
            onClick={handleSaveExpense}
            style={btnStyle}
          >
            Save Expense
          </button>
        </div>
      </main>
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
};

const formCard = {
  maxWidth: "650px",
  margin: "40px auto",
  background: "#fff",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  fontSize: "15px",
  boxSizing: "border-box",
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(135deg,#2563EB,#3B82F6)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
};
const buttonGroup = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const optionButton = {
  flex: 1,
  padding: "12px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  background: "#FFFFFF",
  cursor: "pointer",
  fontSize: "15px",
};

const activeButton = {
  flex: 1,
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  background: "#2563EB",
  color: "#FFFFFF",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
};
export default AddExpenseScreen;