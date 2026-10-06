import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function BudgetScreen() {
  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

  const [budget, setBudget] = useState({
    amount: "",
    period: "Monthly",
    startDate: "",
    endDate: "",
    savingsGoal: ""   // Better to keep it inside budget
  });
  const [budgetHistory, setBudgetHistory] = useState([]);

const fetchBudgetHistory = async () => {
  try {
    const response = await api.get(`/budgets?userId=${userId}`);
    setBudgetHistory(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchBudgetHistory();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  const calculateEndDate = (startDate, period) => {
  if (!startDate) return "";

  const date = new Date(startDate);
  switch (period) {
    case "Daily":
      return date.toISOString().split("T")[0];

    case "Weekly":
      date.setDate(date.getDate() + 6);
      return date.toISOString().split("T")[0];

    case "Monthly":
      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );
      return lastDay.toISOString().split("T")[0];

    default:
      return "";
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  await api.post(`/budgets?userId=${userId}`, {
  amount: Number(budget.amount),
  period: budget.period,
  startDate: budget.startDate,
  endDate: budget.endDate,
  savingsGoal: Number(budget.savingsGoal)
});

    alert("Budget saved successfully!");
fetchBudgetHistory();
    setBudget({
    amount: "",
    period: "Monthly",
    startDate: "",
    endDate: "",
    savingsGoal: ""
});

  } catch (err) {
  console.log(err.response?.status);
  console.log(err.response?.data);
  console.log(err);
  alert("Failed to save budget");
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
      <div style={cardStyle}>
          <h1
  style={{
    color: "#14532D",
    fontSize: "34px",
    fontWeight: "700",
    marginBottom: "8px",
  }}
>
  Set Budget
</h1>

<p
  style={{
    color: "#64748B",
    fontSize: "17px",
    marginBottom: "25px",
  }}
>
  Plan your spending and achieve your savings goals.
</p>

          <form onSubmit={handleSubmit} style={formStyle}>

  <div style={inputGroup}>
    <label style={label}>Budget Amount</label>
    <input
      type="number"
      placeholder="Enter budget amount"
      value={budget.amount}
      onChange={(e) =>
        setBudget({ ...budget, amount: e.target.value })
      }
      style={input}
    />
  </div>

  <div style={row}>
    <div style={{ flex: 1 }}>
      <label style={label}>Budget Period</label>
      <select
  value={budget.period}
  onChange={(e) => {
    const period = e.target.value;
    setBudget({
      ...budget,
      period,
      endDate: calculateEndDate(budget.startDate, period),
    });
  }}
  style={input}
>
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
      </select>
    </div>

    <div style={{ flex: 1 }}>
      <label style={label}>Start Date</label>
      <input
  type="date"
  value={budget.startDate}
  onChange={(e) => {
    const startDate = e.target.value;
    setBudget({
      ...budget,
      startDate,
      endDate: calculateEndDate(startDate, budget.period),
    });
  }}
  style={input}
/>
    </div>
  </div>

  <div style={inputGroup}>
    <label style={label}>End Date</label>
    <input
      type="date"
      value={budget.endDate}
      onChange={(e) =>
        setBudget({ ...budget, endDate: e.target.value })
      }
      style={input}
    />
  </div>

  <div style={inputGroup}>
    <label style={label}>Monthly Savings Goal</label>
    <input
        type="number"
        placeholder="e.g. 10000"
        value={budget.savingsGoal}
        onChange={(e) =>
            setBudget({
                ...budget,
                savingsGoal: e.target.value,
            })
        }
        style={input}
    />
    <small style={{ color: "#6B7280", marginTop: "5px" }}>
        Your target amount to save this month.
    </small>
</div>
  <button type="submit" style={buttonStyle}>
    💾 Save Budget
  </button>

</form>
               </div>

        <div style={cardStyle}>
          <h2
  style={{
    color: "#15803D",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  }}
>
  Previous Budget Details
</h2>

          {budgetHistory.length === 0 ? (
            <p style={{ color: "#6B7280" }}>No previous budgets found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "500px", borderCollapse: "collapse" }}>
                <thead>
  <tr style={{ background: "#DCFCE7" }}>
                    <th style={tableHead}>Amount</th>
                    <th style={tableHead}>Period</th>
                    <th style={tableHead}>Start Date</th>
                    <th style={tableHead}>End Date</th>
                    <th style={tableHead}>Savings Goal</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetHistory.map((item) => (
                    <tr key={item.id}>
                      <td style={tableCell}>₹{item.amount}</td>
                      <td style={tableCell}>{item.period}</td>
                      <td style={tableCell}>{item.startDate}</td>
                      <td style={tableCell}>{item.endDate}</td>
                      <td style={tableCell}>₹{item.savingsGoal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );


}
const tableHead = {
  padding: "15px",
  textAlign: "left",
  background: "#DCFCE7",
  color: "#14532D",
  fontWeight: "700",
  fontSize: "16px",
};
const tableCell = {
  padding: "14px",
  borderTop: "1px solid #E5E7EB",
  color: "#374151",
  fontSize: "16px",
  fontWeight: "500",
};
// const mainContent = {
//   flex: 1,
//   padding: "35px",
//   background: "#F8FAFC",
// };

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const row = {
  display: "flex",
  gap: "20px",
};
const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "24px",
  padding: "30px",
  marginBottom: "30px",
  boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
  border: "1px solid #E5E7EB",
};
const inputGroup = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  marginBottom: "10px",
  fontWeight: "700",
  color: "#14532D",
  fontSize: "17px",
};
const input = {
  width: "100%",
  padding: "15px 18px",
  border: "2px solid #D1FAE5",
  borderRadius: "14px",
  background: "#F9FFFB",
  color: "#14532D",
  fontSize: "17px",
  fontWeight: "600",
  outline: "none",
  boxSizing: "border-box",
};

// const card = {
//   maxWidth: "650px",
//   margin: "40px auto",
//   background: "#fff",
//   padding: "35px",
//   borderRadius: "20px",
//   boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
// };

const buttonStyle = {
  marginTop: "18px",
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "14px",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 12px 30px rgba(21,128,61,.25)",
};
export default BudgetScreen;