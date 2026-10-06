import { useState } from "react";
import Sidebar from "../components/Sidebar";

function WishlistScreen() {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
const wishlistKey = `wishlist_${userId}`;
 const [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem(wishlistKey)) || []
);

  const handleAdd = () => {
    if (!itemName || !price || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName,
      price,
      reason,
      addedDate: new Date().toLocaleDateString(),
    };

    const updatedWishlist = [...wishlist, newItem];

    setWishlist(updatedWishlist);

   localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));

    setItemName("");
    setPrice("");
    setReason("");
  };

  const handleDelete = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

   localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
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
          <div style={pageCard}>
  <h1
    style={{
      color: "#14532D",
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "8px",
    }}
  >
    Wishlist
  </h1>

  <p
    style={{
      color: "#64748B",
      marginBottom: "30px",
      fontSize: "17px",
    }}
  >
    Save items you wish to buy and make smarter spending decisions.
  </p>

  <input
    placeholder="Item Name"
    value={itemName}
    onChange={(e) => setItemName(e.target.value)}
    style={inputStyle}
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    style={inputStyle}
  />

  <textarea
    placeholder="Why do you want this?"
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    style={textAreaStyle}
  />

  <button
    onClick={handleAdd}
    style={buttonStyle}
  >
    ➕ Add to Wishlist
  </button>
</div>
<div style={pageCard}>
  <h2 style={sectionTitle}>My Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>No items added.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "650px",
  }}
>
             <thead>
  <tr style={{ background: "#DCFCE7" }}>
    <th style={tableHead}>Item</th>
    <th style={tableHead}>Price</th>
    <th style={tableHead}>Reason</th>
    <th style={tableHead}>Added</th>
    <th style={tableHead}>Action</th>
  </tr>
</thead>

              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.id}>
                    <td style={tableCell}>{item.itemName}</td>
                    <td style={tableCell}>₹{item.price}</td>
                    <td style={tableCell}>{item.reason}</td>
                    <td style={tableCell}>{item.addedDate}</td>
                    <td style={tableCell}>
                      <button
                        style={deleteBtn}
                        onClick={() =>
                          handleDelete(item.id)
                        }
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
        </div>

        <div style={pageCard}>
  <h2 style={sectionTitle}>Think Before You Buy</h2>

  <ul
    style={{
      color: "#4B5563",
      lineHeight: "2",
      fontSize: "16px",
      paddingLeft: "20px",
    }}
  >
    <li>Do I really need this?</li>
    <li>Can it wait a few days?</li>
    <li>Will buying this affect my savings goal?</li>
  </ul>
</div>
      </main>
    </div>
  );
}


const pageCard = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "28px",
  marginBottom: "25px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 16px 36px rgba(15,23,42,.08)",
};
const sectionTitle = {
  color: "#15803D",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "22px",
};

const inputStyle = {
  width: "100%",
  padding: "15px 18px",
  marginBottom: "18px",
  border: "1px solid #D1FAE5",
  borderRadius: "14px",
  background: "#F9FFFB",
  fontSize: "16px",
  color: "#14532D",
  fontWeight: "500",
  boxSizing: "border-box",
};

const textAreaStyle = {
  width: "100%",
  height: "110px",
  padding: "15px 18px",
  marginBottom: "20px",
  border: "1px solid #D1FAE5",
  borderRadius: "14px",
  background: "#F9FFFB",
  fontSize: "16px",
  color: "#14532D",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "#15803D",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "999px",
  fontSize: "17px",
  fontWeight: "700",
  cursor: "pointer",
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

const tableHead = {
  padding: "18px",
  background: "#DCFCE7",
  color: "#14532D",
  textAlign: "center",
  fontWeight: "700",
  fontSize: "16px",
};

const tableCell = {
  padding: "18px",
  textAlign: "center",
  borderBottom: "1px solid #E5E7EB",
  color: "#374151",
  fontSize: "15px",
  fontWeight: "500",
};

export default WishlistScreen;