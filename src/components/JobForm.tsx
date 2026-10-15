import { useState } from "react";
import type { Job } from "../types";

interface JobFormProps {
  onSubmit: () => void;
  job?: Job;
}

export default function JobForm({ onSubmit, job }: JobFormProps) {
  const [presupuestoNumber, setPresupuestoNumber] = useState(
    job?.presupuestoNumber ?? ""
  );
  const [jobDate, setJobDate] = useState(job?.jobDate ?? "");
  const [notes, setNotes] = useState(job?.notes ?? "");
  const [mixTotal, setMixTotal] = useState<number | "">(job?.mixTotal ?? "");
  const [clientName, setClientName] = useState(job?.clientName ?? "");
  const [status, setStatus] = useState(job?.status ?? "");
  const [quotedAmount, setQuotedAmount] = useState<number | "">(
    job?.quotedAmount ?? ""
  );

  const handleSubmit = async () => {
    if (!presupuestoNumber || !jobDate) {
      alert("Porfavor rellenar presupuesto y fecha de trabajo");
      return;
    }

    const url = job
      ? `https://uretek-inventory-spring-production.up.railway.app/api/jobs/${job.id}`
      : "https://uretek-inventory-spring-production.up.railway.app/api/jobs";

    const method = job ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        presupuestoNumber,
        jobDate,
        notes,
        mixTotal: Number(mixTotal),
        clientName,
        status,
        quotedAmount: Number(quotedAmount),
      }),
    });
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
        placeholder="Monto Presupuestado (kg)"
        value={quotedAmount}
        onChange={(e) => setQuotedAmount(Number(e.target.value))}
        className="w-full border p-2 rounded-lg mb-3"
      />
      <input
        type="number"
        placeholder="Monto Usado (kg)"
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
        {job ? "Guardar" : "Agregar"}
      </button>
    </div>
  );
}
