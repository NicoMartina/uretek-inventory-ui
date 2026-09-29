import type { Item } from "../types";
import { useState } from "react";

interface JobFormProps {
  items: Item[];
  onSubmit: () => void;
}

export default function JobForm({ items, onSubmit }: JobFormProps) {
  const [presupuestoNumber, setPresupuestoNumber] = useState("");
  const [jobDate, setJobDate] = useState("");
  const [notes, setNotes] = useState("");
  const [materialUsed, setMaterialUsed] = useState<
    { item_id: string; quantity_used: number }[]
  >([]);
  const [mixTotal, setMixTotal] = useState<number>(0);

  const handleSubmit = async () => {
    if (!presupuestoNumber || !jobDate) {
      alert("Porfavor rellenar presupuesto y fecha de trabajo");
      return;
    }
    const isoItem = items.find((item) => item.name === "ISO Tank A");
    const resinaItem = items.find((item) => item.name === "Resina Tank B");

    const materials = [
      { item_id: isoItem?.id, quantity_used: mixTotal * 0.63 },
      { item_id: resinaItem?.id, quantity_used: mixTotal * 0.37 },
    ];
    await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuesto_number: presupuestoNumber,
        job_date: jobDate,
        notes,
        materials_used: materials,
      }),
    });
    onSubmit();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lh font-bold mb-4"> Log a Job</h3>

      <input
        type="text"
        placeholder="Presupuesto #"
        value={presupuestoNumber}
        onChange={(e) => setPresupuestoNumber(e.target.value)}
        className="w-full border p-2 rounded-lg mb-3"
      />

      <input
        type="date"
        value={jobDate}
        onChange={(e) => setJobDate(e.target.value)}
        className="w-full border p-2 rounded-lg mb-3"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border p-2 rounded-lg mb-3"
      />
      <input
        type="number"
        placeholder="Mix Total (kg)"
        value={mixTotal}
        onChange={(e) => setMixTotal(Number(e.target.value))}
        className="w-full border p-2 rounded-lg mb-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold"
      >
        {" "}
        Agregar
      </button>
    </div>
  );
}
