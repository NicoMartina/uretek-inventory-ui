import { useState } from "react";

interface JobFormProps {
  onSubmit: () => void;
}

export default function JobForm({ onSubmit }: JobFormProps) {
  const [presupuestoNumber, setPresupuestoNumber] = useState("");
  const [jobDate, setJobDate] = useState("");
  const [notes, setNotes] = useState("");
  const [mixTotal, setMixTotal] = useState<number>(0);
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!presupuestoNumber || !jobDate) {
      alert("Porfavor rellenar presupuesto y fecha de trabajo");
      return;
    }

    await fetch(
      "https://uretek-inventory-spring-production.up.railway.app/api/jobs",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presupuestoNumber,
          jobDate,
          notes,
          mixTotal,
          clientName,
          status,
        }),
      }
    );
    onSubmit();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
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

      <textarea
        placeholder="Nombre del Cliente"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="w-full border p-2 rounded-lg mb-3"
      />

      <input
        type="text"
        placeholder="Estado del Trabajo"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
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
