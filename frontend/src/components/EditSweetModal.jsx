// src/components/EditSweetModal.jsx
import { useState } from "react";

export default function EditSweetModal({ sweet, onClose, onSave }) {
  const [form, setForm] = useState({
    name: sweet.name || "",
    category: sweet.category || "",
    price: sweet.price || 0,
    quantity: sweet.quantity || 0,
    image: sweet.image || "",
  });

  const save = () => {
    onSave(form);
  };

  return (
    <div style={overlay}>
      <div style={box}>
        <h3 style={{ marginTop: 0 }}>Edit Sweet</h3>

        <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input style={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
        <input style={input} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="Price" />
        <input style={input} type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} placeholder="Quantity" />
        <input style={input} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL (optional)" />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button type="button" onClick={save} style={saveBtn}>Save</button>
          <button type="button" onClick={onClose} style={cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
};
const box = { width: 360, background: "#fff", padding: 18, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" };
const input = { width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ddd" };
const saveBtn = { flex: 1, padding: 10, background: "#27ae60", color: "#fff", border: "none", borderRadius: 8 };
const cancelBtn = { flex: 1, padding: 10, background: "#bdc3c7", color: "#222", border: "none", borderRadius: 8 };
