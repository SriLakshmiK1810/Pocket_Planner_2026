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

      <main className="page-content" style={mainContent}>
        <div style={card}>
          <h1>⭐ Wishlist</h1>

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
            Add to Wishlist
          </button>
        </div>

        <div style={card}>
          <h2>My Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>No items added.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "600px" }}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.id}>
                    <td>{item.itemName}</td>
                    <td>₹{item.price}</td>
                    <td>{item.reason}</td>
                    <td>{item.addedDate}</td>
                    <td>
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

        <div style={card}>
          <h2>💡 Think Before You Buy</h2>

          <ul>
            <li>Do I really need this?</li>
            <li>Can it wait a few days?</li>
            <li>Will buying this affect my savings goal?</li>
          </ul>
        </div>
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
  background: "#fff",
  padding: "25px",
  borderRadius: "15px",
  marginBottom: "25px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
};

const textAreaStyle = {
  width: "100%",
  padding: "12px",
  height: "80px",
  marginBottom: "15px",
};

const buttonStyle = {
  background: "#2563EB",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default WishlistScreen;