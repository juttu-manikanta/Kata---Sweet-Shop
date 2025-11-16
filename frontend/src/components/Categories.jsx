export default function Categories({ selected, onChange }) {
  const items = ["All", "Dry","Wet","Sugar Free", "Special", "Box", "Festival"];

  return (
    <div style={styles.container}>
      {items.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          style={{
            ...styles.button,
            background: selected === c ? "#d35400" : "#fff",
            color: selected === c ? "#fff" : "#333",
            borderColor: selected === c ? "#d35400" : "#ccc",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  button: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "14px",
    background: "#fff",
  }
};
