import { useState, useEffect } from "react";
import type { Item, Job } from "./types";
import JobForm from "./components/JobForm";
import RestockForm from "./components/RestockForm";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("https://uretek-inventory-spring-production.up.railway.app/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
    fetch("https://uretek-inventory-spring-production.up.railway.app/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const isoTank = items.find((item: Item) => item.name === "ISO");
  const resinaTank = items.find((item: Item) => item.name === "Resina");

  const [showJobForm, setShowJobForm] = useState(false);
  const [showrestockForm, setShowRestockForm] = useState(false);

  const lowStockItems = items.filter(
    (item: Item) => item.currentStock < item.minimumStock
  );
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-orange-500"> Uretek</h1>
          <p className="text-gray-400  text-sm">Inventory</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800">Dashboard</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                Agregar Trabajo
              </button>
              <button
                onClick={() => setShowRestockForm(true)}
                className="bg-green-500  text-white px-4 py-2 rounded-xl font-bold"
              >
                Agregar Stock
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div
              className={`bg-white  rounded-2xl p-6 shadow-md border border-slate-100${
                isoTank && isoTank.currentStock < isoTank.minimumStock
                  ? "border-l-4 border-l-red-500"
                  : ""
              }`}
            >
              <p className="text-gray-400 text-sm uppercase font-bold">
                Tanque ISO
              </p>
              <p className="text-4xl font-black mt-2">
                {" "}
                {isoTank?.currentStock}
              </p>
              <p className="text-gray-400 text-sm mt-1">kilos en stock</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <p className="text-gray-400 text-sm uppercase font-bold">
                Tanque Resina
              </p>
              <p className="text-4xl font-black mt-2">
                {" "}
                {resinaTank?.currentStock}
              </p>
              <p className="text-gray-400 text-sm mt-1">kilos en stock</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 border-l-red-500">
              <p className="text-gray-400 text-sm uppercase font-bold">
                Stock Bajo
              </p>
              <p className="text-4xl font-black mt-2 text-red-500">
                {lowStockItems.length}
              </p>
            </div>
          </div>
        </div>
        {showJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center  justify-center z-50">
            <div className="bg-white rounded-2xl  p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black"> Ingresar Trabajo</h3>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-400 text-xl "
                >
                  x
                </button>
              </div>
              <JobForm
                onSubmit={() => {
                  fetch(
                    "https://uretek-inventory-spring-production.up.railway.app/api/items"
                  )
                    .then((res) => res.json())
                    .then((data) => setItems(data));
                  fetch(
                    "https://uretek-inventory-spring-production.up.railway.app/api/jobs"
                  )
                    .then((res) => res.json())
                    .then((data) => setJobs(data));
                }}
              />
            </div>
          </div>
        )}
        {showrestockForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-black"> Ingresar Stock</h3>
                <button
                  onClick={() => setShowRestockForm(false)}
                  className="text-gray-400 text-xl"
                >
                  x
                </button>
              </div>
              <RestockForm
                items={items}
                onSubmit={() => {
                  fetch(
                    "https://uretek-inventory-spring-production.up.railway.app/api/items"
                  )
                    .then((res) => res.json())
                    .then((data) => setItems(data));
                }}
              />
            </div>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">All Items</h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Name
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Category
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Stock
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Unit
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Min Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: Item) => (
                  <tr
                    key={item.id}
                    className={`border-t ${
                      item.currentStock < item.minimumStock
                        ? "bg-red-50 text-red-700"
                        : ""
                    }`}
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 font-bold">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="p-4">{item.unit}</td>
                    <td className="p-4">{item.minimumStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Trabajos</h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Fecha
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Presupuesto #
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Nombre del Cliente
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Estado del Trabajo
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Mix Total
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    ISO
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Resina
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job: Job) => (
                  <tr key={job.id} className={"border-t"}>
                    <td className="p-4">
                      {new Date(job.jobDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">{job.presupuestoNumber}</td>
                    <td className="p-4">{job.clientName}</td>
                    <td className="p-4 font-bold">{job.status}</td>
                    <td className="p-4 font-bold">
                      {Number(job.mixTotal).toFixed(2)}
                    </td>
                    <td className="p-4 font-bold">
                      {(job.mixTotal * 0.63).toFixed(2)}
                    </td>
                    <td className="p-4 font-bold">
                      {(job.mixTotal * 0.37).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
