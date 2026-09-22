import { useState, useEffect } from "react";
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);
  const isoTank = items.find((item: any) => item.name === "ISO Tank A");
  const resinaTank = items.find((item: any) => item.name === "Resina Tank B");
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
            <div className="bg-white rounded-2xl p-6 shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
