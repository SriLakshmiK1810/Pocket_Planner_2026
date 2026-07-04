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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={mainContent}>
        <div style={card}>
          <h1>💰 Set Budget</h1>

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

        <div style={card}>
          <h2>Previous Budget Details</h2>

          {budgetHistory.length === 0 ? (
            <p style={{ color: "#6B7280" }}>No previous budgets found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "500px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#EFF6FF" }}>
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
  padding: "12px",
  textAlign: "left",
  color: "#374151",
};

const tableCell = {
  padding: "12px",
  borderTop: "1px solid #E5E7EB",
  color: "#4B5563",
};
const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const row = {
  display: "flex",
  gap: "20px",
};

const inputGroup = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  marginBottom: "8px",
  fontWeight: "600",
  color: "#374151",
  fontSize: "15px",
};

const input = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const card = {
  maxWidth: "650px",
  margin: "40px auto",
  background: "#fff",
  padding: "35px",
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const buttonStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
};
export default BudgetScreen;