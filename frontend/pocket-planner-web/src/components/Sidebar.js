import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => {
      setMobile(window.innerWidth < 768);
    
     if (window.innerWidth >= 768){
      setOpen(false);
    }
  };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      {mobile && (
        <div style={mobileHeader}>
          <button
            style={menuButton}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h2
  style={{
    color: "#15803D",
    marginBottom: "25px",
    fontWeight: "700",
  }}
>
  Pocket Planner
</h2>
        </div>
      )}

      {mobile && open && (
        <div
          style={overlay}
          onClick={() => setOpen(false)}
        />
      )}

      <aside
  className="sidebar"
  style={{
    ...sidebarStyle,
    position: "fixed",
    top: mobile ? "60px" : "0",
    left: mobile ? (open ? "0" : "-270px") : "0",
    height: mobile ? "calc(100vh - 60px)" : "100vh",
    boxShadow: mobile ? "2px 0 10px rgba(0,0,0,0.3)" : "none",
  }}
>
        <h2 style={{ color: "#0e612c" }}>
        Pocket Planner
        </h2>

        <div style={userCardStyle}>
          <p style={{ margin: 0, color: "#15803D" }}>
            Hello 👋
          </p>

          <h3
  style={{
    margin: "5px 0 0",
    color: "#14532D",
  }}
>
            {user.name || "Guest User"}
          </h3>
        </div>

        <nav style={{ flex: 1 }}>
          <MenuLink to="/dashboard" text="Dashboard" close={() => setOpen(false)} />
          <MenuLink to="/add-expense" text="Add Expense" close={() => setOpen(false)} />
          <MenuLink to="/expenses" text="Expense List" close={() => setOpen(false)} />
          <MenuLink to="/budget" text="Budget" close={() => setOpen(false)} />
          <MenuLink to="/wishlist" text="Wishlist" close={() => setOpen(false)} />
          <MenuLink to="/profile" text="Profile" close={() => setOpen(false)} />
          <MenuLink to="/settings" text="Settings" close={() => setOpen(false)} />
        </nav>

        <button style={logoutStyle}>
          Logout
        </button>
      </aside>
    </>
  );
}

function MenuLink({ to, text, close }) {
  return (
    <Link
  to={to}
  style={linkStyle}
  onClick={close}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#1f8f46";
    e.currentTarget.style.color = "#fcfdfc";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#374151";
  }}
>
  {text}
</Link>
  );
}

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "260px",
  height: "100vh",
  background: "#F8FAF5",
  color: "#14532D",
  padding: "24px",
  transition: "0.3s",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #D1E7D3",
  boxShadow: "6px 0 20px rgba(0,0,0,0.05)",
};

const mobileHeader = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "65px",
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "0 20px",
  borderBottom: "1px solid #D1E7D3",
  boxShadow: "0 2px 10px rgba(0,0,0,.05)",
  zIndex: 1100,
};
const menuButton = {
  background: "#DCFCE7",
  border: "none",
  color: "#15803D",
  fontSize: "24px",
  width: "42px",
  height: "42px",
  borderRadius: "10px",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 900,
};

const userCardStyle = {
  background: "#ECFDF5",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "30px",
  border: "1px solid #BBF7D0",
};

const linkStyle = {
  display: "block",
  color: "#374151",
  textDecoration: "none",
  padding: "14px 18px",
  marginBottom: "10px",
  borderRadius: "14px",
  fontWeight: "600",
  transition: "0.3s",
};
const logoutStyle = {
  width: "100%",
  padding: "14px",
  background: "#15803D",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 8px 20px rgba(21,128,61,.2)",
};

export default Sidebar;