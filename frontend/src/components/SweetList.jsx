import SweetCard from "./SweetCard";

export default function SweetList({ sweets, onPurchase }) {
  return (
    <div>
      {sweets.map((s) => (
        <SweetCard key={s._id} sweet={s} onPurchase={onPurchase} />
      ))}
    </div>
  );
}
