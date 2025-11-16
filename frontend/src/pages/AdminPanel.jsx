// src/pages/AdminPanel.jsx
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
  purchaseSweet,
  searchSweets
} from "../services/sweetService";
import { pushToast } from "../components/Toast";
import EditSweetModal from "../components/EditSweetModal";
import useAuth from "../hooks/useAuth";

export default function AdminPanel() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selected, setSelected] = useState(null); // for edit
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await getSweets();
      setSweets(list);
    } catch (err) {
      pushToast({ type: "error", title: "Load failed", message: err?.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (data) => {
    try {
      await createSweet(data);
      pushToast({ type: "success", title: "Added", message: "Sweet added" });
      load();
    } catch (err) {
      pushToast({ type: "error", title: "Add failed", message: err?.response?.data?.message || err.message });
    }
  };

  const onEditSave = async (form) => {
    try {
      await updateSweet(selected._id, form);
      pushToast({ type: "success", title: "Saved", message: "Sweet updated" });
      setSelected(null);
      load();
    } catch (err) {
      pushToast({ type: "error", title: "Update failed", message: err?.response?.data?.message || err.message });
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this sweet?")) return;
    try {
      await deleteSweet(id);
      pushToast({ type: "success", title: "Deleted", message: "Sweet removed" });
      load();
    } catch (err) {
      pushToast({ type: "error", title: "Delete failed", message: err?.response?.data?.message || err.message });
    }
  };

  const onRestock = async (id) => {
    const amt = Number(prompt("Restock amount", "10"));
    if (!amt || amt <= 0) return;
    try {
      await restockSweet(id, amt);
      pushToast({ type: "success", title: "Restocked", message: `+${amt}` });
      load();
    } catch (err) {
      pushToast({ type: "error", title: "Restock failed", message: err?.response?.data?.message || err.message });
    }
  };

  const onSearch = async () => {
    try {
      const res = await searchSweets(query);
      setSweets(res);
    } catch (err) {
      pushToast({ type: "error", title: "Search failed", message: err?.response?.data?.message || err.message });
    }
  };

  const categories = useMemo(() => ["All", ...Array.from(new Set(sweets.map(s => s.category)))], [sweets]);
  const filtered = sweets.filter(s => (categoryFilter === "All" || s.category === categoryFilter));

  return (
    <div>
      <Navbar />
      <div style={wrap}>
        <div style={headerRow}>
          <h2 style={{ margin: 0 }}>Admin Inventory Manager</h2>
          <div>
            <button onClick={load} style={btn}>Refresh</button>
            <button onClick={() => setSelected({ name: "", category: "", price: 0, quantity: 0 })} style={{ ...btn, background: "#27ae60", marginLeft: 8 }}>+ Add</button>
          </div>
        </div>

        <div style={controls}>
          <input placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} style={searchInput} />
          <button onClick={onSearch} style={btnSmall}>Search</button>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={select}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <div style={{ marginLeft: "auto", color: "#666", alignSelf: "center" }}>
            Signed in as <strong>{user?.email}</strong>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Category</th>
                <th style={th}>Price</th>
                <th style={th}>Qty</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s._id}>
                  <td style={td}>{s.name}</td>
                  <td style={td}>{s.category}</td>
                  <td style={td}>₹{s.price}</td>
                  <td style={td}>{s.quantity}</td>
                  <td style={td}>
                    <button style={actionBtn} onClick={() => setSelected(s)}>Edit</button>
                    <button style={{ ...actionBtn, background: "#f39c12" }} onClick={() => onRestock(s._id)}>+Restock</button>
                    <button style={{ ...actionBtn, background: "#e74c3c" }} onClick={() => onDelete(s._id)}>Delete</button>
                    <button style={{ ...actionBtn, background: "#2ecc71" }} onClick={async () => { try { await purchaseSweet(s._id); pushToast({ type: "success", title: "Purchased", message: "1 item bought" }); load(); } catch (err) { pushToast({ type: "error", title: "Buy failed", message: err?.response?.data?.message || err.message }); } }}>Buy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <div style={{ marginTop: 12 }}>Loading...</div>}
          {!loading && filtered.length === 0 && <div style={{ marginTop: 12, color: "#666" }}>No sweets found</div>}
        </div>
      </div>

      {selected && <EditSweetModal sweet={selected} onClose={() => setSelected(null)} onSave={(f) => {
        if (!selected._id) {
          onAdd(f);
          setSelected(null);
          return;
        }
        onEditSave(f);
      }} />}

    </div>
  );
}

/* styles */
const wrap = { padding: "24px 36px" };
const headerRow = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 };
const btn = { padding: "8px 12px", borderRadius: 8, border: "none", background: "#3498db", color: "#fff", cursor: "pointer" };
const btnSmall = { padding: "8px 10px", borderRadius: 8, border: "none", background: "#2980b9", color: "#fff", cursor: "pointer", marginLeft: 8 };
const controls = { display: "flex", gap: 8, alignItems: "center", marginBottom: 12 };
const searchInput = { padding: 10, borderRadius: 8, border: "1px solid #ddd", width: 260 };
const select = { padding: 10, borderRadius: 8, border: "1px solid #ddd" };
const table = { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" };
const th = { textAlign: "left", padding: "12px 16px", background: "#f7f7f7", borderBottom: "1px solid #eee" };
const td = { padding: "12px 16px", borderBottom: "1px solid #f1f1f1" };
const actionBtn = { marginRight: 8, padding: "6px 10px", borderRadius: 6, border: "none", background: "#3498db", color: "#fff", cursor: "pointer" };
