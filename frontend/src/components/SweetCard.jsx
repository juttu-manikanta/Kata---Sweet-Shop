export default function SweetCard({ sweet, onPurchase }) {
  const isOut = sweet.quantity === 0;

  return (
    <div style={styles.card}>
      <span style={styles.badge}>{sweet.category}</span>

      <img
        src={sweet.image || "https://via.placeholder.com/200"}
        alt={sweet.name}
        style={styles.image}
      />

      <h3 style={styles.title}>{sweet.name}</h3>
      <p style={styles.price}>₹{sweet.price}</p>

      <p style={{ color: isOut ? "#e74c3c" : "#27ae60" }}>
        {isOut ? "Out of stock" : `${sweet.quantity} in stock`}
      </p>

      <button
        disabled={isOut}
        onClick={() => onPurchase(sweet._id)}
        style={{
          ...styles.btn,
          background: isOut ? "#999" : "#d35400",
          cursor: isOut ? "not-allowed" : "pointer",
        }}
      >
        Buy
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    width: "230px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "0.3s ease",
    cursor: "pointer",
  },
  badge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#3498db",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "0.3s ease",
  },
  title: {
    fontWeight: "700",
    marginTop: "10px",
  },
  price: {
    fontSize: "18px",
    margin: "6px 0",
    color: "#2c3e50",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 20px",
    borderRadius: "22px",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    transition: "0.3s ease",
  }
};

// Hover animation
styles.card[':hover'] = {
  transform: "scale(1.05)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};
