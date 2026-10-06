import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { Player } from "@lottiefiles/react-lottie-player";
import tickAnimation from "../assets/Checklist.json";
function AddExpenseScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
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

  const newAmount = Number(amount);

  try {
    const [budgetRes, expensesRes] = await Promise.all([
      api.get(`/budgets/latest?userId=${userId}`),
      api.get(`/expenses?userId=${userId}`),
    ]);

    const budget = Number(budgetRes.data?.amount || 0);
    const spent = expensesRes.data.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const newTotal = spent + newAmount;
    let message = "";

    if (budget > 0 && newTotal > budget) {
      message = `This expense will exceed your budget by ₹${newTotal - budget}. Do you still want to add it?`;
    } else if (budget > 0 && newTotal >= budget * 0.7) {
      message = `After adding this expense, you will use ${Math.round(
        (newTotal / budget) * 100
      )}% of your budget. This may reduce your savings. Continue?`;
    } else if (expenseType === "Want") {
      message = `This is marked as a Want expense. It may reduce your savings. Do you want to continue?`;
    }

    if (message && !window.confirm(message)) return;

    await api.post(`/expenses?userId=${userId}`, {
  title,
  amount: newAmount,
  category,
  paymentMode,
  expenseType,
  date: new Date().toISOString().split("T")[0],
});

// Show animation
setShowSuccess(true);

// Hide after 2.5 seconds
setTimeout(() => {
  setShowSuccess(false);
}, 2500);

// Clear form
setTitle("");
setAmount("");
setCategory("");
setPaymentMode("UPI");
setExpenseType("Need");
    
  } catch (error) {
    console.error(error);
    alert("Failed to save expense");
  }
};

  return (
    <div
  className="app-layout"
  style={{
    background: "#F4F7F2",
    minHeight: "100vh",
  }}
>
    <Sidebar />

    <main className="page-content">
      <div style={formCard}>
          <h1
  style={{
    margin: "0 0 10px",
    color: "#166534",
    fontSize: "34px",
    fontWeight: "700",
  }}
>
  Add New Expense
</h1>

<p
  style={{
    color: "#6B7280",
    marginBottom: "30px",
  }}
>
  Record your spending and stay on track.
</p>
            

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
<option value="Groceries">Groceries</option>
<option value="Vegetables">Vegetables</option>
<option value="Fruits">Fruits</option>
<option value="Milk">Milk & Dairy</option>
<option value="Snacks">Snacks</option>
<option value="Food">Food & Dining</option>
<option value="Travel">Travel</option>
<option value="Transport">Transport</option>
<option value="Bills">Bills & Utilities</option>
<option value="Medical">Medical</option>
<option value="Education"> Education</option>
<option value="Shopping">Shopping</option>
<option value="Clothing">Clothing</option>
<option value="Electronics">Electronics</option>
<option value="Repair">Repair & Maintenance</option>
<option value="EMI">EMI & Loans</option>
<option value="Festival">Festivals & Gifts</option>
<option value="Others">Others</option>
</select>
<h3
  style={{
    fontSize: "20px",
    fontWeight: "700",
    color: "#14532D",
    marginBottom: "15px",
    marginTop: "10px",
  }}
>
  Payment Mode
</h3>

<h3
  style={{
    fontSize: "20px",
    fontWeight: "700",
    color: "#14532D",
    marginBottom: "15px",
    marginTop: "20px",
  }}
>
  Expense Type
</h3>

<div style={buttonGroup}>
  <button
  type="button"
  style={paymentMode === "Cash" ? activeButton : optionButton}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
  onClick={() => setPaymentMode("Cash")}
>
  Cash
</button>

  <button
    type="button"
    style={paymentMode === "UPI" ? activeButton : optionButton}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform="translateY(-3px)";
    }}
    onMouseLeave={(e)=>{
      e.currentTarget.style.transform="translateY(0)";

    }}
    onClick={()=>setPaymentMode("UPI")}
  >
   UPI
  </button>

  <button
    type="button"
    style={paymentMode === "Card" ? activeButton : optionButton}
    onClick={() => setPaymentMode("Card")}
  >
    💳 Card
  </button>
</div>
<h3
  style={{
    color: "#166534",
    marginBottom: "12px",
  }}
>
  Expense Type
</h3>

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
       {showSuccess && (
  <div style={successOverlay}>
    <div style={successCard}>
      <Player
  src={tickAnimation}
  autoplay
  keepLastFrame
  style={{
    height: "180px",
    width: "180px",
  }}
/>

      <h2 style={{ color: "#15803D" }}>
        Expense Added!
      </h2>

      <p style={{ color: "#64748B" }}>
        Your expense has been saved successfully.
      </p>
    </div>
  </div>
)}

      </main>
    </div>
  );
}



const formCard = {
  maxWidth: "700px",
  margin: "40px auto",
  background: "#FFFFFF",
  padding: "40px",
  borderRadius: "24px",
  border: "1px solid #DCFCE7",
  boxShadow: "0 18px 40px rgba(21,128,61,0.12)",
};

const inputStyle = {
  width: "100%",
  padding: "15px 18px",
  marginBottom: "18px",
  borderRadius: "14px",
  border: "1px solid #BBF7D0",
  background: "#F9FFFB",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle = {
  width: "100%",
  padding: "16px",
  marginTop: "15px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "17px",
  boxShadow: "0 10px 25px rgba(21,128,61,0.25)",
};
const buttonGroup = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
};

const optionButton = {
  flex: 1,
  padding: "16px",
  border: "2px solid #BBF7D0",
  borderRadius: "14px",
  background: "#FFFFFF",
  color: "#14532D",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "700",
  transition: "0.3s",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const activeButton = {
  flex: 1,
  padding: "16px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#FFFFFF",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "700",
  boxShadow: "0 10px 25px rgba(21,128,61,0.3)",
};
const successOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const successCard = {
  background: "#FFFFFF",
  padding: "35px",
  borderRadius: "25px",
  textAlign: "center",
  boxShadow: "0 20px 50px rgba(0,0,0,.2)",
  width: "320px",
};
export default AddExpenseScreen;