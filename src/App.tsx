import { useState, useEffect } from "react";
import type { Item, Job } from "./types";
import JobForm from "./components/JobForm";
import RestockForm from "./components/RestockForm";

const API = "https://uretek-inventory-spring-production.up.railway.app/api";

const STATUS_STYLES: Record<string, string> = {
  FINALIZADO: "bg-green-100 text-green-700",
  EN_CURSO: "bg-blue-100 text-blue-700",
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  CANCELADO: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS = ["PENDIENTE", "EN_CURSO", "FINALIZADO", "CANCELADO"];

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showRestockForm, setShowRestockForm] = useState(false);

  const fetchAll = () => {
    fetch(`${API}/items`)
      .then((r) => r.json())
      .then(setItems);
    fetch(`${API}/jobs`)
      .then((r) => r.json())
      .then(setJobs);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const isoTank = items.find((i) => i.name === "ISO");
  const resinaTank = items.find((i) => i.name === "Resina");
  const lowStockItems = items.filter((i) => i.currentStock < i.minimumStock);

  const handleStatusChange = (jobId: string, newStatus: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    fetch(`${API}/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...job, status: newStatus }),
    })
      .then((r) => r.json())
      .then((updated) =>
        setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)))
      );
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Thin sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-5 gap-6">
        {/* Logo mark */}
        <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-sm">U</span>
        </div>
        {/* Nav icons */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Dashboard icon */}
          <button
            className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group"
            title="Dashboard"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          {/* Jobs icon */}
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-700 hover:text-white transition-colors"
            title="Trabajos"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
          {/* Stock icon */}
          <button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-700 hover:text-white transition-colors"
            title="Stock"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Dashboard</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Uretek Argentina — Inventario
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowJobForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors"
            >
              + Agregar Trabajo
            </button>
            <button
              onClick={() => setShowRestockForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors"
            >
              + Agregar Stock
            </button>
          </div>
        </div>

        {/* Stock cards */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div
            className={`bg-white rounded-2xl p-6 shadow-sm border ${
              isoTank && isoTank.currentStock < isoTank.minimumStock
                ? "border-l-4 border-l-red-500 border-slate-100"
                : "border-slate-100"
            }`}
          >
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
              Tanque ISO
            </p>
            <p className="text-4xl font-black mt-2 text-slate-800">
              {isoTank?.currentStock.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mt-1">kg en stock</p>
          </div>
          <div
            className={`bg-white rounded-2xl p-6 shadow-sm border ${
              resinaTank && resinaTank.currentStock < resinaTank.minimumStock
                ? "border-l-4 border-l-red-500 border-slate-100"
                : "border-slate-100"
            }`}
          >
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
              Tanque Resina
            </p>
            <p className="text-4xl font-black mt-2 text-slate-800">
              {resinaTank?.currentStock.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400 mt-1">kg en stock</p>
          </div>
          <div
            className={`bg-white rounded-2xl p-6 shadow-sm border ${
              lowStockItems.length > 0
                ? "border-l-4 border-l-red-500 border-slate-100"
                : "border-slate-100"
            }`}
          >
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
              Stock Bajo
            </p>
            <p
              className={`text-4xl font-black mt-2 ${
                lowStockItems.length > 0 ? "text-red-500" : "text-slate-800"
              }`}
            >
              {lowStockItems.length}
            </p>
            <p className="text-sm text-gray-400 mt-1">items bajo mínimo</p>
          </div>
        </div>

        {/* Jobs table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Trabajos</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {jobs.length} trabajos registrados
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Presupuesto #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Mix Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase text-slate-400 tracking-wider">
                    ISO (kg)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase text-slate-400 tracking-wider">
                    Resina (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job: Job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(job.jobDate).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-medium text-slate-700">
                      {job.presupuestoNumber}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {job.clientName}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job.id, e.target.value)
                        }
                        className={`text-xs font-bold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-300 ${
                          STATUS_STYLES[job.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-right font-medium text-slate-700">
                      {Number(job.mixTotal).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-slate-600">
                      {(job.mixTotal * 0.63).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-slate-600">
                      {(job.mixTotal * 0.37).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Job modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800">
                Ingresar Trabajo
              </h3>
              <button
                onClick={() => setShowJobForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <JobForm
              onSubmit={() => {
                fetchAll();
                setShowJobForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Restock modal */}
      {showRestockForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800">
                Ingresar Stock
              </h3>
              <button
                onClick={() => setShowRestockForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <RestockForm
              items={items}
              onSubmit={() => {
                fetchAll();
                setShowRestockForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
