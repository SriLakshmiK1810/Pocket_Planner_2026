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

          <h2 style={{ margin: 0, color: "#60A5FA" }}>
            💰 Pocket Planner
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
        <h2 style={{ color: "#60A5FA" }}>
          💰 Pocket Planner
        </h2>

        <div style={userCardStyle}>
          <p style={{ margin: 0, color: "#D1D5DB" }}>
            Hello 👋
          </p>

          <h3 style={{ margin: "5px 0 0" }}>
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
    >
      {text}
    </Link>
  );
}

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "250px",
  height: "100vh",
  background: "#111827",
  color: "#fff",
  padding: "20px",
  transition: "0.3s",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
};

const mobileHeader = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "60px",
  background: "#111827",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "0 15px",
  zIndex: 1100,
};

const menuButton = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: "24px",
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
  background: "#1F2937",
  padding: "15px",
  borderRadius: "15px",
  marginBottom: "30px",
};

const linkStyle = {
  display: "block",
  color: "#D1D5DB",
  textDecoration: "none",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
};

const logoutStyle = {
  width: "100%",
  padding: "12px",
  background: "#EF4444",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Sidebar;