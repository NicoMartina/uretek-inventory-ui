import { useState, useEffect } from "react";
import type { Item, Job } from "./types";
import JobForm from "./components/JobForm";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const isoTank = items.find((item: Item) => item.name === "ISO Tank A");
  const resinaTank = items.find((item: Item) => item.name === "Resina Tank B");

  const lowStockItems = items.filter(
    (item: Item) => item.current_stock < item.minimum_stock
  );
  return (
    <div className="flex h-screen bg-gray-100">
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
          <h2 className="text-2xl font-bold  text-gray-800 mb-6">Dashboard</h2>
          <div className="grid grid-cols-3 gap-6">
            <div
              className={`bg-white  rounded-2xl p-6 shadow-sm ${
                isoTank?.current_stock < isoTank?.minimum_stock
                  ? "border-l-4 border-red-500"
                  : ""
              }`}
            >
              <p className="text-gray-400 text-sm uppercase font-bold">
                ISO Tank
              </p>
              <p className="text-4xl font-black mt-2">
                {" "}
                {isoTank?.current_stock}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-gray-400 text-sm uppercase font-bold">
                Resina Tank
              </p>
              <p className="text-4xl font-black mt-2">
                {" "}
                {resinaTank?.current_stock}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm  border-l-4 border-red-500">
              <p className="text-gray-400 text-sm uppercase font-bold">
                Low Stock Alert
              </p>
              <p className="text-4xl font-black mt-2 text-red-500">
                {lowStockItems.length}
              </p>
            </div>
          </div>
        </div>
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
                      item.current_stock < item.minimum_stock
                        ? "bg-red-50 text-red-700"
                        : ""
                    }`}
                  >
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4 font-bold">
                      {item.current_stock} {item.unit}
                    </td>
                    <td className="p-4">{item.unit}</td>
                    <td className="p-4">{item.minimum_stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <JobForm
          items={items}
          onSubmit={() => {
            fetch("http://localhost:3000/jobs")
              .then((res) => res.json())
              .then((data) => setJobs(data));
            fetch("http://localhost:3000/items")
              .then((res) => res.json())
              .then((data) => setItems(data));
          }}
        />

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">All Jobs</h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Presupuesto #
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Date
                  </th>
                  <th className="p-4 text-left text-xs font-bold uppercase text-gray-400">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job: Job) => (
                  <tr key={job.id} className={"border-t"}>
                    <td className="p-4">{job.presupuesto_number}</td>
                    <td className="p-4">
                      {new Date(job.job_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold">{job.notes}</td>
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
