import type { Item } from "../types";
import { useState } from "react";

interface RestockFormProps {
  items: Item[];
  onSubmit: () => void;
}

export default function RestockForm({ items, onSubmit }: RestockFormProps) {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async () => {
    if (!selectedItemId || amount <= 0) {
      alert("Please selelct an item and enter a valid amount.");
      return;
    }
    const item = items.find((item) => item.id === selectedItemId);
    if (!item) {
      alert("Selected item not found.");
      return;
    }
    await fetch(`http://localhost:8080/api/items/${selectedItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        currentStock: item.currentStock + amount,
      }),
    });
    onSubmit();
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4"> Restock</h3>

      <select
        value={selectedItemId}
        onChange={(e) => setSelectedItemId(e.target.value)}
        className="w-full border p-2 rounded-lg mb-3"
      >
        <option value=""> Select Item</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount (kg)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full border p-2 rounded-lg mb-3"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
      >
        ReStock
      </button>
    </div>
  );
}
