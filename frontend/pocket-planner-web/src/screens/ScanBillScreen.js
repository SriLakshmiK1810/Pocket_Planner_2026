import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useState } from "react";
function ScanBillScreen() {
    const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [expenseData, setExpenseData] = useState({
  title: "",
  amount: "",
  category: "",
  date: "",
  paymentMode: "UPI",
  expenseType: "Need",
});
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
const handleScan = async () => {
  if (!image) {
    alert("Capture a bill first");
    return;
  }

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await api.post(
      "/expenses/scan",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

   setExpenseData(prev => ({
  ...prev,
  ...response.data,
}));

  } catch (error) {
    console.error(error);
    alert("Scanning failed");
  }
};
const handleSave = async () => {
  try {
    console.log(expenseData);
    await api.post(`/expenses?userId=${userId}`, {
  ...expenseData,
  amount: Number(expenseData.amount),
});
    alert("Expense saved successfully!");

    setExpenseData({
      title: "",
      amount: "",
      category: "",
      date: "",
      paymentMode: "UPI",
      expenseType: "Need",
    });

    setImage(null);
    setPreview(null);

  } catch (err) {
  console.log(err.response?.status);
  console.log(err.response?.data);
  console.log(expenseData);
}
};
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={mainContent}>
        <div style={card}>
          <h1>📷 Scan Bill</h1>

          <p>
            Upload or capture your bill. The app will automatically extract:
          </p>

          <ul>
            <li>💰 Amount</li>
            <li>🏷 Category</li>
            <li>📅 Date</li>
            <li>🏪 Merchant Name</li>
          </ul>

          <input
  type="file"
  accept="image/*"
  capture="environment"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }}
/>
{preview && (
  <img
    src={preview}
    alt="Bill Preview"
    style={{
      width: "100%",
      maxHeight: "400px",
      objectFit: "contain",
      marginTop: "20px",
      borderRadius: "10px",
      border: "1px solid #ddd",
    }}
  />
)}

          <br />
          <br />

          <button
  style={buttonStyle}
  onClick={handleScan}
>
  🔍 Scan Bill
</button>
{expenseData.title && (
  <div style={reviewCard}>
    <h2 style={{ marginBottom: "20px", color: "#2563EB" }}>
      📄 Extracted Expense Details
    </h2>

    <div style={field}>
      <label style={label}>Title</label>
      <input
        style={input}
        value={expenseData.title}
        onChange={(e) =>
          setExpenseData({ ...expenseData, title: e.target.value })
        }
      />
    </div>

    <div style={field}>
      <label style={label}>Amount</label>
      <input
        style={input}
        type="number"
        value={expenseData.amount}
        onChange={(e) =>
          setExpenseData({ ...expenseData, amount: e.target.value })
        }
      />
    </div>

    <div style={field}>
      <label style={label}>Category</label>
      <select
        style={input}
        value={expenseData.category}
        onChange={(e) =>
          setExpenseData({ ...expenseData, category: e.target.value })
        }
      >
        <option>Food</option>
        <option>Shopping</option>
        <option>Medical</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Others</option>
      </select>
    </div>

    <div style={field}>
      <label style={label}>Date</label>
      <input
        style={input}
        type="date"
        value={expenseData.date}
        onChange={(e) =>
          setExpenseData({ ...expenseData, date: e.target.value })
        }
      />
    </div>

    <div style={field}>
      <label style={label}>Payment Mode</label>
      <select
        style={input}
        value={expenseData.paymentMode}
        onChange={(e) =>
          setExpenseData({ ...expenseData, paymentMode: e.target.value })
        }
      >
        <option>UPI</option>
        <option>Cash</option>
        <option>Card</option>
      </select>
    </div>

    <div style={field}>
      <label style={label}>Expense Type</label>
      <select
        style={input}
        value={expenseData.expenseType}
        onChange={(e) =>
          setExpenseData({ ...expenseData, expenseType: e.target.value })
        }
      >
        <option>Need</option>
        <option>Want</option>
      </select>
    </div>

    <button
      style={saveButton}
      onClick={handleSave}
    >
      ✅ Confirm & Save
    </button>
  </div>
)}        </div>
      </main>
    </div>
  );
}

const mainContent = {
  flex: 1,
  padding: "35px",
  background: "#F8FAFC",
};

const card = {
  maxWidth: "700px",
  margin: "40px auto",
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};

const buttonStyle = {
  padding: "12px 25px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};
const reviewCard = {
  marginTop: "30px",
  background: "#F9FAFB",
  border: "1px solid #E5E7EB",
  borderRadius: "15px",
  padding: "25px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px",
};

const label = {
  fontWeight: "600",
  marginBottom: "6px",
  color: "#374151",
};

const input = {
  padding: "12px",
  border: "1px solid #D1D5DB",
  borderRadius: "8px",
  fontSize: "15px",
};

const saveButton = {
  width: "100%",
  padding: "14px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
};

export default ScanBillScreen;