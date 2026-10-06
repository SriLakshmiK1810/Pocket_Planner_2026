import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import logo from "../assets/logo.jpeg";
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
const recentActivities = [
  ...recentExpenses.map((expense) => ({
    id: `expense-${expense.id}`,
    text: `${expense.category} - ${expense.title} added`,
    icon:
      expense.category === "Food"
        ? "🍔"
        : expense.category === "Travel"
        ? "🚕"
        : expense.category === "Shopping"
        ? "🛍️"
        : expense.category === "Medical"
        ? "🏥"
        : expense.category === "Education"
        ? "📚"
        : "💸",
    date: expense.date,
  })),
];

if (latestBudget) {
  recentActivities.push({
    id: "budget",
    text: `Budget set to ₹${latestBudget.amount}`,
    icon: "💰",
    date: latestBudget.createdAt || new Date().toISOString(),
  });
}

recentActivities.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

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
const categoryTotals = allExpenses.reduce((totals, expense) => {
  const category = expense.category || "Others";
  totals[category] = (totals[category] || 0) + Number(expense.amount);
  return totals;
}, {});

const totalSpent = Object.values(categoryTotals).reduce(
  (sum, amount) => sum + amount,
  0
);

const getPercentage = (category) =>
  totalSpent > 0
    ? Math.round(((categoryTotals[category] || 0) / totalSpent) * 100)
    : 0;
return (
  <div
    className="app-layout"
    style={{
      background: "#F4F7F2",
      minHeight: "100vh",
      fontFamily: "Poppins, Arial, sans-serif",
    }}
  >
    <div
  style={{
    position: "fixed",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "#DDE8D8",
    top: "-70px",
    left: "-70px",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "fixed",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "#E6F4EA",
    bottom: "-80px",
    right: "-80px",
    zIndex: 0,
  }}
/>
    <Sidebar />

    <main
  className="page-content"
  style={{
    flex: 1,
    padding: "35px",
    position: "relative",
    zIndex: 1,
  }}
>
      {/* Dashboard Header */}

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          padding: "22px 28px",
          boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <img
            src={logo}
            alt="Pocket Planner"
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "15px",
              objectFit: "contain",
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                color: "#15803D",
                fontWeight: "700",
              }}
            >
              Pocket Planner
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748B",
              }}
            >
              Manage your finances smarter
            </p>
          </div>
        </div>

        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }}
>
  <span
    style={{
      fontSize: "16px",
      color: "#64748B",
      fontWeight: "500",
    }}
  >
    Welcome
  </span>

  <span
    style={{
      fontSize: "28px",
      color: "#15803D",
      fontWeight: "700",
    }}
  >
    {user?.name}
  </span>
</div>
      </div>

      <h1
  style={{
    fontSize: "48px",
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: "8px",
  }}
>
  Welcome Back{" "}
  <span style={{ color: "#15803D" }}>
    {user?.name}
  </span>
</h1>

<p
  style={{
    color: "#166534",
    fontWeight: "600",
    fontSize: "18px",
  }}
>
  
        Track your expenses and manage your budget effortlessly.
      </p>
        

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
      <h3>{monthlyExpenses.length}</h3>
    </div>

    <div>
      <p
  style={{
    ...overviewLabel,
    color: "#6B7280",
  }}
>Average Expense</p>
      <h3>
  ₹{monthlyExpenses.length > 0
    ? Math.round(monthlyTotal / monthlyExpenses.length)
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
  ₹{monthlyExpenses.length > 0
    ? Math.max(...monthlyExpenses.map((e) => Number(e.amount)))
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
              <p>Food: {getPercentage("Food")}%</p>
<p>Travel: {getPercentage("Travel")}%</p>
<p style={{ marginBottom: 0 }}>
  Shopping: {getPercentage("Shopping")}%
</p>
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
              {recentActivities.length === 0 ? (
  <p>No recent activity</p>
) : (
  recentActivities.slice(0, 5).map((activity) => (
    <p key={activity.id}>
      {activity.icon} {activity.text}
    </p>
  ))
)}
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
  style={summaryCard}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow =
      "0 18px 40px rgba(253, 253, 253, 0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 15px 35px rgba(21,128,61,.25)";
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


const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "25px",
};
const summaryCard = {
  background: "#FFFFFF",
  padding: "28px",
  borderRadius: "22px",
  borderTop: "6px solid #15803D",
  boxShadow: "0 15px 35px rgba(15,23,42,0.08)",
  transition: "0.3s",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const progressTrack = {
  width: "100%",
  height: "16px",
  background: "#DCFCE7",
  borderRadius: "20px",
  overflow: "hidden",
  marginTop: "15px",
};
const progressValue = {
  height: "100%",
  borderRadius: "20px",
  background: "#15803D",
};

const cardLabel = {
  color: "#64748B",
  fontWeight: "600",
  marginBottom: "10px",
};

const cardValue = {
  color: "#15803D",
  fontSize: "32px",
  fontWeight: "700",
};
const sectionTitle = {
  color: "#15803D",
  fontSize: "26px",
  fontWeight: "700",
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
  padding: "28px",
  borderRadius: "20px",
  background: "#F0FDF4",
  border: "1px solid #BBF7D0",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "0.3s",
  color: "#14532D",
  fontWeight: "600",
};
const sectionCard = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "24px",
  marginBottom: "25px",
  boxShadow: "0 16px 36px rgba(15,23,42,0.08)",
  border: "1px solid #E5E7EB",
};
export default DashboardScreen;
