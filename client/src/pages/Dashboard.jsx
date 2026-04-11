import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");

      const res = await api.get(`/jobs/applications/${email}`);
      setApplications(res.data.applications || []);
      setQueue(res.data.queue || []);
    };

    fetchData();
  }, []);

  const total = applications.length;
  const interview = applications.filter((a) => a.status === "Interview").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard 🚀</h1>

      <div className="bg-yellow-100 p-4 rounded-xl shadow mb-4 text-center">
        <h2 className="font-bold">Apply Queue</h2>
        <p className="text-2xl">{queue.length}</p>
      </div>

      <button
        onClick={async () => {
          const email = localStorage.getItem("email");

          await api.post("/jobs/auto-apply", { email });

          alert("Auto Apply Started 🚀");
          window.location.reload(); // refresh dashboard
        }}
        className="bg-green-500 text-white p-3 rounded w-full mb-4"
      >
        Auto Apply (Safe Mode)
      </button>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h2 className="font-bold">Applications</h2>
          <p className="text-2xl">{total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <h2 className="font-bold">Interviews</h2>
          <p className="text-2xl">{interview}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <h2 className="font-bold">Rejected</h2>
          <p className="text-2xl">{rejected}</p>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-4">Your Applications</h2>

        {applications.map((app, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <div>
              <p className="font-semibold">{app.role}</p>
              <p className="text-sm text-gray-500">{app.company}</p>
            </div>

            {/* 🔥 ADD THIS BUTTON HERE */}
            <button
              onClick={async () => {
                const email = localStorage.getItem("email");

                await api.post("/jobs/auto-apply", { email });

                alert("Auto Apply Started 🚀");
              }}
              className="bg-green-500 text-white p-3 rounded mt-4 w-full"
            >
              Auto Apply (Safe Mode)
            </button>

            <span
              className={`px-3 py-1 rounded text-sm ${
                app.status === "Applied"
                  ? "bg-blue-200"
                  : app.status === "Interview"
                    ? "bg-green-200"
                    : "bg-red-200"
              }`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
