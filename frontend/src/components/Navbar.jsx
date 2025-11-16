// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar({ search, setSearch }) {
  const { user, logout } = useAuth();
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <header style={nav}>
      <Link to="/" style={logo}>Kata</Link>

      <div style={{ flex: 1, marginInline: 20 }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div style={right}>
        <button onClick={() => setDark(!dark)} style={iconBtn}>{dark ? "☀️" : "🌙"}</button>
        {user?.role === "admin" && <Link to="/admin" style={adminLink}>Admin</Link>}
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>{user.email}</span>
            <button onClick={logout} style={logoutBtn}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={loginBtn}>Login</Link>
        )}
      </div>
    </header>
  );
}

const nav = { display: "flex", alignItems: "center", padding: "12px 24px", background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0, zIndex: 1000 };
const logo = { fontSize: 22, fontWeight: 700, textDecoration: "none", color: "#d35400" };
const right = { display: "flex", alignItems: "center", gap: 8 };
const adminLink = { padding: "6px 10px", borderRadius: 6, textDecoration: "none", background: "#f39c12", color: "#fff" };
const loginBtn = { padding: "6px 10px", borderRadius: 6, background: "#3498db", color: "#fff", textDecoration: "none" };
const logoutBtn = { padding: "6px 10px", borderRadius: 6, background: "#e74c3c", color: "#fff", border: "none", cursor: "pointer" };
const iconBtn = { background: "transparent", border: "none", fontSize: 18, cursor: "pointer" };
