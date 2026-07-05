import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useState, useEffect, useRef } from "react";
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
const fileInputRef = useRef(null);

useEffect(() => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    fileInputRef.current?.click();
  }
}, []);
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
const compressImage = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const maxWidth = 1600;
      const scale = Math.min(1, maxWidth / img.width);

      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => resolve(new File([blob], "bill.jpg", { type: "image/jpeg" })),
        "image/jpeg",
        0.7
      );
    };
  });

const handleScan = async () => {
  
  if (!image) {
    alert("Capture a bill first");
    return;
  }

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await api.post("/expenses/scan", formData);

   setExpenseData(prev => ({
  ...prev,
  ...response.data,
}));

  } catch (error) {
  console.error("Scan error:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Scanning failed");
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
    <div className="app-layout">
        <Sidebar />

      <main className="page-content" style={mainContent}>
        <div style={card}>
          <h1>📷 Scan Bill</h1>

          <p>
            Upload or capture your bill. The app will automatically extract:
          </p>

        
          <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  capture="environment"
  onChange={async (e) => {
  const file = e.target.files[0];

  if (file) {
    const compressedFile = await compressImage(file);
    setImage(compressedFile);
    setPreview(URL.createObjectURL(compressedFile));
  }
}}
  className="bill-file-input"
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