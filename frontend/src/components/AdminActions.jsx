export default function AdminActions({ sweet, onUpdate, onDelete }) {
  return (
    <div>
      <button onClick={() => onUpdate(sweet._id)}>Edit</button>
      <button onClick={() => onDelete(sweet._id)}>Delete</button>
    </div>
  );
}
