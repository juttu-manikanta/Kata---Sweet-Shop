import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(form);
      nav("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={submit}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Register to get started</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          style={styles.input}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #d35400, #e67e22)",
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.4s ease",
  },
  title: {
    margin: 0,
    fontWeight: "700",
    fontSize: "26px",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#d35400",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
  },
  switch: {
    textAlign: "center",
    marginTop: "14px",
  },
  error: {
    background: "#e74c3c",
    color: "#fff",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    marginBottom: "12px",
  },
};
