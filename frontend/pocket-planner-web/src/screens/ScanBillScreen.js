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

      <main
  className="page-content"
  style={{
    background: "#F4F7F2",
    minHeight: "100vh",
    padding: "35px",
    fontFamily: "Poppins, sans-serif",
  }}
>
  <div style={container}>
    <h1 style={pageTitle}>📷 Scan Bill</h1>

    <p style={pageSubtitle}>
      Upload or capture a bill and let Pocket Planner extract the expense details automatically.
    </p>

    <div style={card}>
     <label htmlFor="bill-upload" style={uploadCard}>
  <div style={{ fontSize: "60px" }}>📄</div>

  <h2 style={{ color: "#14532D", margin: "15px 0 10px" }}>
    Upload Your Bill
  </h2>

  <p style={{ color: "#64748B", marginBottom: "25px" }}>
    Click the button below to choose your receipt
  </p>

  <span style={browseButton}>
    📁 Choose Image
  </span>
</label>

<input
  id="bill-upload"
  ref={fileInputRef}
  type="file"
  accept="image/*"
  capture="environment"
  style={{ display: "none" }}
  onChange={async (e) => {
    const file = e.target.files[0];

    if (file) {
      const compressedFile = await compressImage(file);
      setImage(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    }
  }}
/>

      {preview && (
        <img
          src={preview}
          alt="Bill Preview"
          style={previewStyle}
        />
      )}

      <button
        style={buttonStyle}
        onClick={handleScan}
      >
        🔍 Scan Bill
      </button>

      {expenseData.title && (
        <div style={reviewCard}>
          <h2 style={reviewTitle}>
            📄 Extracted Expense Details
          </h2>

          <div style={field}>
            <label style={label}>Title</label>
            <input
              style={input}
              value={expenseData.title}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  title: e.target.value,
                })
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
                setExpenseData({
                  ...expenseData,
                  amount: e.target.value,
                })
              }
            />
          </div>

          <div style={field}>
            <label style={label}>Category</label>

            <select
              style={input}
              value={expenseData.category}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  category: e.target.value,
                })
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
              <option value="Education">Education</option>
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
                setExpenseData({
                  ...expenseData,
                  date: e.target.value,
                })
              }
            />
          </div>

          <div style={field}>
            <label style={label}>Payment Mode</label>

            <select
              style={input}
              value={expenseData.paymentMode}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  paymentMode: e.target.value,
                })
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
                setExpenseData({
                  ...expenseData,
                  expenseType: e.target.value,
                })
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
      )}
    </div>
  </div>
</main>
    </div>
  );
}

const container = {
  maxWidth: "850px",
  margin: "0 auto",
};

const pageTitle = {
  color: "#14532D",
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "8px",
};

const pageSubtitle = {
  color: "#64748B",
  fontSize: "17px",
  marginBottom: "30px",
};

const card = {
  background: "#FFFFFF",
  borderRadius: "24px",
  padding: "35px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};

const previewStyle = {
  width: "100%",
  maxHeight: "450px",
  objectFit: "contain",
  marginTop: "30px",
  borderRadius: "18px",
  border: "2px solid #BBF7D0",
  padding: "15px",
  background: "#F9FFFB",
};
const uploadCard = {
  border: "2px dashed #22C55E",
  borderRadius: "20px",
  background: "#F9FFFB",
  padding: "55px 30px",
  minHeight: "260px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  textAlign: "center",
  cursor: "pointer",
  transition: "0.3s",
};
const browseButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "14px 32px",
  borderRadius: "999px",

  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#fff",

  fontWeight: "700",
  fontSize: "16px",

  boxShadow: "0 10px 25px rgba(21,128,61,.25)",
};
const buttonStyle = {
  width: "100%",
  maxWidth: "320px",
  margin: "30px auto 0",
  display: "block",

  padding: "16px",

  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#fff",

  border: "none",
  borderRadius: "999px",

  fontSize: "17px",
  fontWeight: "700",

  cursor: "pointer",
};

const reviewCard = {
  marginTop: "35px",
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "22px",
  padding: "30px",
  boxShadow: "0 10px 25px rgba(15,23,42,.06)",
};

const reviewTitle = {
  color: "#15803D",
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "25px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "22px",
};

const label = {
  marginBottom: "8px",
  color: "#14532D",
  fontWeight: "600",
  fontSize: "16px",
};

const input = {
  width: "100%",
  padding: "15px",
  border: "2px solid #BBF7D0",
  borderRadius: "14px",
  background: "#F9FFFB",
  color: "#14532D",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const saveButton = {
  width: "100%",
  marginTop: "20px",
  padding: "16px",
  background: "linear-gradient(135deg,#15803D,#22C55E)",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "999px",
  fontWeight: "700",
  fontSize: "17px",
  cursor: "pointer",
  boxShadow: "0 12px 28px rgba(21,128,61,.25)",
};

export default ScanBillScreen;