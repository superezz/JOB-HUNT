import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      // ✅ Show popup
      setSuccess(true);

      // auto hide after 2 sec
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-pink-200">
      {/* ✅ Popup */}
      {success && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✅ Login Successful
        </div>
      )}

      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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
          Login
        </button>
      </div>
    </div>
  );
}
