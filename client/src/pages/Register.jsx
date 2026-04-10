import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/register", form);
      alert(res.data.message);
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-pink-200">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 rounded-lg bg-white/70 outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 rounded-lg bg-white/70 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded-lg bg-white/70 outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          Register
        </button>
      </div>
    </div>
  );
}
