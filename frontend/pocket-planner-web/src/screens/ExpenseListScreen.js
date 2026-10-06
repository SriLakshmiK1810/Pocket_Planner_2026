import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../services/api";
function ExpenseListScreen() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
const [sortBy, setSortBy] = useState("Newest");
const [budget,setBudget]=useState(0);
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
useEffect(() => {
  fetchExpenses();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const fetchExpenses = async () => {
  try {
    const expenseRes = await api.get(`/expenses?userId=${userId}`);
setExpenses(expenseRes.data);
    // Fetch expenses
    // const expenseRes = await api.get(`/expenses?userId=${userId}`);
const budgetRes = await api.get(`/budgets/latest?userId=${userId}`);
console.log("Latest Budget:", budgetRes.data);

if (budgetRes.data) {
  setBudget(Number(budgetRes.data.amount));
}
  } catch (err) {
    console.log(err);
  }
};
const displayedExpenses = [...expenses]
  .filter((expense) => {
    if (filterCategory === "All") return true;
    return expense.category === filterCategory;
  })
  
  .sort((a, b) => {
  switch (sortBy) {
    case "Newest":
      return new Date(b.date) - new Date(a.date);

    case "Oldest":
      return new Date(a.date) - new Date(b.date);

    case "Highest":
      return b.amount - a.amount;

    case "Lowest":
      return a.amount - b.amount;

    case "Payment":
      return a.paymentMode.localeCompare(b.paymentMode);

    case "Type":
      return a.expenseType.localeCompare(b.expenseType);

    case "Category":
      return a.category.localeCompare(b.category);

    case "Title":
      return a.title.localeCompare(b.title);

    default:
      return 0;
  }
});
const totalSpent = expenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);

const remaining = budget - totalSpent;

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

      {/* Header */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "25px",
  }}
>
  <div>
  <h1
    style={{
      margin: 0,
      color: "#14532D",
      fontSize: "36px",
      fontWeight: "700",
    }}
  >
    Expense List
  </h1>

  <p
    style={{
      color: "#64748B",
      marginTop: "6px",
      fontSize: "17px",
    }}
  >
    View, filter and manage all your expenses.
  </p>
</div>

  <div style={summaryCard}>
    <div style={summaryItem}>
      <span>Total Budget</span>
      <h3>₹{budget}</h3>
    </div>

    <div style={summaryItem}>
      <span>Spent</span>
      <h3 style={{ color: "#EF4444" }}>₹{totalSpent}</h3>
    </div>

    <div style={summaryItem}>
      <span>Remaining</span>
      <h3 style={{ color: remaining >= 0 ? "#22C55E" : "#EF4444" }}>
        ₹{remaining}
      </h3>
    </div>
  </div>
</div>
<div style={filterContainer}>
  <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
  style={selectStyle}
>
    <option value="All">All Categories</option>
    <option value="Food">Food</option>
    <option value="Shopping">Shopping</option>
    <option value="Medical">Medical</option>
    <option value="Travel">Travel</option>
    <option value="Bills">Bills</option>
    <option value="Others">Others</option>
  </select>

  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={selectStyle}
>
  <option value="Newest">Newest Date</option>
  <option value="Oldest">Oldest Date</option>
  <option value="Highest">Highest Amount</option>
  <option value="Lowest">Lowest Amount</option>
  <option value="Payment">Payment Mode (A-Z)</option>
  <option value="Type">Expense Type (Need/Want)</option>
  <option value="Category">Category (A-Z)</option>
  <option value="Title">Title (A-Z)</option>
</select>
</div>
        {expenses.length === 0 ? (
          <div style={emptyState}>
            <h3 style={{ margin: 0 }}>No Expenses Added Yet</h3>
          </div>
        ) : (
          <div style={tableCard}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#EFF6FF" }}>
                  <th style={tableHead}>Title</th>
                  <th style={tableHead}>Category</th>
<th style={tableHead}>Payment</th>
<th style={tableHead}>Type</th>
<th style={tableHead}>Amount</th>
<th style={tableHead}>Date</th>
<th style={tableHead}>Actions</th>
                </tr>
                

              </thead>
              <tbody>
                {displayedExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td style={tableCell}>{expense.title}</td>
                    <td style={tableCell}>{expense.category}</td>

<td
  style={{
    ...tableCell,
    textAlign: "center",
    verticalAlign: "middle",
    width: "140px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      fontWeight: "600",
      fontSize: "15px",
      color: "#374151",
    }}
  >
    {expense.paymentMode === "Cash" && "Cash"}
    {expense.paymentMode === "UPI" && "UPI"}
    {expense.paymentMode === "Card" && "Card"}
  </div>
</td>

<td style={tableCell}>
  <span
    style={{
      padding: "8px 14px",
fontSize: "15px",
fontWeight: "700",
borderRadius: "20px",
      borderRadius: "15px",
      color: "#fff",
      backgroundColor:
        expense.expenseType === "Need"
          ? "#22C55E"
          : "#F59E0B",
      fontWeight: "bold",
    }}
  >
    {expense.expenseType}
  </span>
</td>

<td style={tableCell}>₹{expense.amount}</td>

<td style={tableCell}>{expense.date}</td>
                    <td style={tableCell}>
                      <button style={editBtn}>Edit</button>
                      <button
  style={deleteBtn}
  onClick={async () => {
    try {
      await api.delete(`/expenses/${expense.id}`);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  }}
>
  Delete
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
);
}



const tableCard = {
  background: "#FFFFFF",
  borderRadius: "24px",
  overflowX: "auto",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};

const emptyState = {
  background: "#FFFFFF",
  padding: "45px",
  borderRadius: "24px",
  textAlign: "center",
  color: "#64748B",
  fontSize: "18px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};

const tableHead = {
  padding: "18px",
  textAlign: "center",
  color: "#14532D",
  background: "#DCFCE7",
  fontWeight: "700",
  fontSize: "16px",
};
const tableCell = {
  padding: "18px",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
  fontWeight: "500",
  fontSize: "15px",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  textAlign: "center",
};
const editBtn = {
  background: "#22C55E",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
  marginRight: "10px",
};
const deleteBtn = {
  background: "#EF4444",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  fontWeight: "700",
  cursor: "pointer",
};
// const selectStyle = {
//   padding: "10px 14px",
//   border: "1px solid #D1D5DB",
//   borderRadius: "8px",
//   backgroundColor: "#fff",
//   fontSize: "14px",
//   cursor: "pointer",
//   minWidth: "180px",
// };
const summaryCard = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  background: "#FFFFFF",
  padding: "22px 30px",
  borderRadius: "22px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};
const summaryItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "130px",
  color: "#14532D",
  fontWeight: "700",
  fontSize: "17px",
};
const filterContainer = {
  display: "flex",
  gap: "18px",
  marginBottom: "30px",
  flexWrap: "wrap",
};
const selectStyle = {
  padding: "14px 18px",
  border: "2px solid #D1FAE5",
  borderRadius: "14px",
  background: "#F9FFFB",
  color: "#14532D",
  fontWeight: "600",
  fontSize: "16px",
  cursor: "pointer",
};
export default ExpenseListScreen;
