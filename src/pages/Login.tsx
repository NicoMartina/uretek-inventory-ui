import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(
      "https://uretek-inventory-spring-production.up.railway.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl  shadow-sm border border-slate-100 w-full max-w-sm">
        <h1 className="text-2xl font-black text-slate-800 mb-600"> Uretek</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-4 py-2 mb-3 text-sm"
        />
        <input
          type="password"
          placeholder="Contrasena"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-4  py-2  mb-3 text-sm"
        />
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-bold hover:bg-orange-600"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
