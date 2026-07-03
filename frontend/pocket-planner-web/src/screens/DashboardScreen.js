import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import PieChartComponent from "../components/PieChartComponent";
function DashboardScreen() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
  const [dashboard, setDashboard] = useState({
  totalBudget: 0,
  totalExpenses: 0,
  remainingBalance: 0,
});
const [latestBudget, setLatestBudget] = useState(null);
const [allExpenses, setAllExpenses] = useState([]);
const [recentExpenses, setRecentExpenses] = useState([]);
useEffect(() => {
  fetchDashboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
const fetchDashboard = async () => {
  try {
   const dashboardResponse = await api.get(`/dashboard?userId=${userId}`);
const expenseResponse = await api.get(`/expenses?userId=${userId}`);
const budgetResponse = await api.get(`/budgets/latest?userId=${userId}`);
setLatestBudget(budgetResponse.data);
setDashboard(dashboardResponse.data);
setAllExpenses(expenseResponse.data);
setRecentExpenses(expenseResponse.data.slice(-5).reverse());
  } catch (error) {
    console.log(error);
  }
};
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyExpenses = allExpenses.filter((expense) => {
  const expenseDate = new Date(expense.date);
  return (
    expenseDate.getMonth() === currentMonth &&
    expenseDate.getFullYear() === currentYear
  );
});

const monthlyTotal = monthlyExpenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);
  return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
  <Sidebar />

  <main
    style={{
      ...mainContent,
     background: "#F8FAFC",
color: "#111827",
 marginLeft: isMobile ? "0" : "250px",
marginTop: isMobile ? "70px" : "0",
padding: isMobile ? "15px" : "30px",
      transition: "0.3s",
    }}
  >
        <header style={{ marginBottom: "30px" }}>
          <h1
  style={{
    color: "#111827",
    margin: "0 0 5px",
  }}
>
            Welcome Back 👋
          </h1><p
  style={{
    color: "#6B7280",
    margin: 0,
  }}
>
          
            Track your expenses and manage your budget.
          </p>
        </header>

        <div style={summaryGrid}>
         <SummaryCard
  label="Total Budget"
  value={`₹${dashboard.totalBudget}`}
/>

<SummaryCard
  label="Total Expenses"
  value={`₹${dashboard.totalExpenses}`}
/>

<SummaryCard
  label="Balance Left"
  value={`₹${dashboard.remainingBalance}`}
/>

   </div>

        <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827"
  }}
>
          <h2
  style={{
    ...sectionTitle,
    color: "#111827",
  }}
>
  Budget Usage
</h2>
          <div
  style={{
    ...progressTrack,
    background: "#E5E7EB",
  }}
>
            <div
  style={{
    ...progressValue,
    width: `${
      dashboard.totalBudget > 0
        ? Math.min(
            (dashboard.totalExpenses / dashboard.totalBudget) * 100,
            100
          )
        : 0
    }%`,
    background:
      dashboard.totalBudget > 0 &&
      dashboard.totalExpenses / dashboard.totalBudget >= 0.8
        ? "#EF4444" // Red
        : dashboard.totalBudget > 0 &&
          dashboard.totalExpenses / dashboard.totalBudget >= 0.5
        ? "#F59E0B" // Orange
        : "#22C55E", // Green
  }}
/>
</div>
          <p
  style={{
    margin: "10px 0 0",
    color: "#6B7280",
  }}
>
           ₹{dashboard.totalExpenses} of ₹{dashboard.totalBudget} used      </p>
        </section>
 <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
  <h2
  style={{
    ...sectionTitle,
    color: "#111827",
  }}
>
  Monthly Insights
</h2>
  <div style={overviewGrid}>
    <div>
      <p
  style={{
    ...overviewLabel,
    color: "#6B7280",
  }}
>Expenses Logged</p>
      <h3>{recentExpenses.length}</h3>
    </div>

    <div>
      <p
  style={{
    ...overviewLabel,
    color: "#6B7280",
  }}
>Average Expense</p>
      <h3>
        ₹
        {recentExpenses.length > 0
          ? Math.round(
              dashboard.totalExpenses / recentExpenses.length
            )
          : 0}
      </h3>
    </div>

    <div>
      <p
  style={{
    ...overviewLabel,
    color: "#6B7280"
  }}
>Largest Expense</p>
      <h3>
        ₹
        {recentExpenses.length > 0
          ? Math.max(
              ...recentExpenses.map(e => Number(e.amount))
            )
          : 0}
      </h3>
    </div>
  </div>
</section>

      
      <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
 <h2
  style={{
    ...sectionTitle,
    color: "#111827",
  }}
>
  Savings Goal
</h2>
 <p>
  Goal: <strong>₹{latestBudget?.savingsGoal || 0}</strong>
</p>
  <div
  style={{
    ...progressTrack,
    background: "#E5E7EB",
  }}
>
    <div
      style={{
        ...progressValue,
        width: `${
  latestBudget?.savingsGoal
    ? Math.min(
        (dashboard.remainingBalance / latestBudget.savingsGoal) * 100,
        100
      )
    : 0
}%`,
        background: "#22C55E",
      }}
    />
  </div>

  <p style={{ marginTop: "15px" }}>
  Current Savings: <strong>₹{dashboard.remainingBalance}</strong>
</p>

<p style={{ marginTop: "10px" }}>
  {dashboard.remainingBalance >= (latestBudget?.savingsGoal || 0)
    ? "🎉 Congratulations! You reached your savings goal."
    : `₹${((latestBudget?.savingsGoal || 0) - dashboard.remainingBalance).toFixed(0)} more to reach your goal.`}
</p>
</section>
<section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color:  "#111827",
  }}
>
  <h2
  style={{
    ...sectionTitle,
    color: "#111827",
  }}
>
  Quick Actions
</h2>
  <div style={quickGrid}>
    <button
      style={{
  ...quickCard,
  background: "#EEF4FF",
  color:  "#111827",
}}
      onClick={() => navigate("/add-expense")}
    >
      <h3>Manual Entry</h3>
      <p>Add an expense manually</p>
    </button>

    <button
      style={{
  ...quickCard,
  background: "#EEF4FF",
  color: "#111827",
}}
      onClick={() => navigate("/scan-bill")}
    >
      <h3>Scan Bill</h3>
      <p>Auto detect amount & category</p>
    </button>
  </div>
</section>
        <div
  style={{
    ...detailsGrid,
    gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr",
  }}
>
          <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
            <h2
  style={{
    ...sectionTitle,
    color:  "#111827",
  }}
>
  Recent Expenses
</h2>
            {recentExpenses.length === 0 ? (
              <p>No expenses added yet</p>
            ) : (
              recentExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  label={`${expense.category} - ${expense.title}`}
                  value={`₹${expense.amount}`}
                />
              ))
            )}
          </section>

          <div style={{ display: "grid", gap: "20px" }}>
           <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
              <h2
  style={{
    ...sectionTitle,
    color: "#111827",
  }}
>
  Quick Stats
</h2>
              <p>Food: 35%</p>
              <p>Travel: 25%</p>
              <p style={{ marginBottom: 0 }}>Shopping: 40%</p>
            </section>
            <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
              <h2
  style={{
    ...sectionTitle,
    color:  "#111827",
  }}
>
  Recent Activity
</h2>
              <p>🍔 Food Expense Added</p>
              <p>🚕 Travel Expense Added</p>
              <p style={{ marginBottom: 0 }}>💰 Budget Updated</p>
            </section>
          </div>
        </div>
        <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
  <h2
  style={{
    ...sectionTitle,
    color:  "#111827",
  }}
>
 Expense Breakdown
</h2>
  <PieChartComponent
  expenses={allExpenses}
  darkMode={false}
/>
</section>
        <section
  style={{
    ...sectionCard,
    background: "#FFFFFF",
    color: "#111827",
  }}
>
  <h2
  style={{
    ...sectionTitle,
    color:  "#111827",
  }}
>
  Tip of the day
</h2>
<p style={{ color: "#4B5563", marginBottom: "10px" }}>
  "Track every rupee today to build a stronger financial future tomorrow."
</p>

  <p
  style={{
    color: "#6B7280",
    margin: 0,
  }}
>
    Small daily savings can make a big difference over time.
  </p>
</section>
      </main>
    </div>
  );
}

function SummaryCard({ label, value }) {
  

  return (
    <div
      style={{
        ...summaryCard,
        background: "#FFFFFF",
        color: "#111827",
      }}
    >
     <p
  style={{
    ...cardLabel,
    color: "#6B7280",
  }}
>
  {label}
</p>
      <h2
  style={{
    ...cardValue,
    color: "#111827",
  }}
>
  {value}
</h2>
    </div>
  );
}


function ExpenseItem({ label, value }) {
  

  return (
    <div
  style={{
  ...expenseItem,
  color: "#374151",
  borderBottom: "1px solid #E5E7EB",

  }}
>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "20px",
  minWidth: 0,
  boxSizing: "border-box",
  overflowX: "hidden",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: window.innerWidth < 768
    ? "1fr"
    : "repeat(3, 1fr)",
  gap: "20px",
};
const summaryCard = {
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  width: "100%",
  boxSizing: "border-box"
};
const expenseItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
  padding: "14px 0",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
};


const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr",
  gap: "20px",
};

const progressTrack = {
  width: "100%",
  height: "15px",
  background: "#E5E7EB",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "15px",
};

const progressValue = {
  height: "100%",
  borderRadius: "20px",
};

const cardLabel = {
  color: "#6B7280",
  margin: "0 0 10px",
};

const cardValue = {
  color: "#111827",
  margin: 0,
};

const sectionTitle = {
  color: "#111827",
  margin: "0 0 15px",
};


const overviewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "30px",
  marginTop: "25px",
};
const overviewLabel = {
  color: "#6B7280",
  marginBottom: "5px",
  fontSize: "14px",
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};
const quickCard = {
  width: "100%",
  padding: "25px",
  border: "none",
  borderRadius: "18px",
  background: "#EEF4FF",
  cursor: "pointer",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  color: "#111827",
  fontSize: "16px",
};
const sectionCard = {
  background: "#FFFFFF",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  marginBottom: "25px",
  width: "100%",
  boxSizing: "border-box",
};
export default DashboardScreen;
