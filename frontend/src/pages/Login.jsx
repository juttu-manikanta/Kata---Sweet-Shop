import { useState } from "react";
import { login } from "../services/authService";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { setUser } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);
      setUser(res.user);
      nav("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={submit}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue</p>

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

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.switch}>
          Not registered? <Link to="/register">Create an account</Link>
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
    marginTop: "10px",
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
