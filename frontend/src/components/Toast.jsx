// src/components/Toast.jsx
import { useEffect, useState } from "react";

let pushFn = null;

export function pushToast(toast) {
  if (pushFn) pushFn(toast);
}

export default function ToastPortal() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    pushFn = (t) => {
      const id = Date.now();
      setToasts((s) => [...s, { id, ...t }]);
      setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), (t.duration || 3000));
    };
    return () => {
      pushFn = null;
    };
  }, []);

  return (
    <div style={container}>
      {toasts.map((t) => (
        <div key={t.id} style={{ ...toastStyle, ...(t.type === "error" ? toastError : toastSuccess) }}>
          {t.title && <div style={toastTitle}>{t.title}</div>}
          <div>{t.message}</div>
        </div>
      ))}
    </div>
  );
}

const container = {
  position: "fixed",
  right: 20,
  top: 20,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: 320,
};

const toastStyle = {
  background: "#fff",
  padding: "12px 14px",
  borderRadius: 8,
  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
  borderLeft: "4px solid #2ecc71",
  color: "#222",
};

const toastSuccess = { borderLeftColor: "#27ae60" };
const toastError = { borderLeftColor: "#e74c3c" };
const toastTitle = { fontWeight: 700, marginBottom: 6 };
