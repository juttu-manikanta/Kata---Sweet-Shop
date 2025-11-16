import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SweetCard from "../components/SweetCard";
import Categories from "../components/Categories";
import { getSweets, purchaseSweet } from "../services/sweetService";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getSweets().then((data) => {
      setSweets(data);
      setFiltered(data);
    });
  };

  useEffect(() => {
    let f = sweets;

    if (category !== "All") {
      f = f.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }
    if (search.trim() !== "") {
      f = f.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(f);
  }, [search, category, sweets]);

  const buy = async (id) => {
    await purchaseSweet(id);
    load();
  };

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <div style={{ padding: "20px 40px" }}>
        <Categories selected={category} onChange={setCategory} />

        <h2 style={{ marginTop: "10px" }}>Available Sweets</h2>

        <div style={styles.grid}>
          {filtered.map((s) => (
            <SweetCard key={s._id} sweet={s} onPurchase={buy} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  }
};
