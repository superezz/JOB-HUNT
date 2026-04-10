import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const email = localStorage.getItem("email");

      const res = await api.get(`/jobs/match/${email}`);

      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Job Matches 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition"
          >
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>

            <p className="mt-2 text-green-600 font-bold">Match: {job.score}%</p>

            <div className="mt-2">
              <p className="text-sm font-semibold">Matched:</p>
              {job.matched.map((s, i) => (
                <span
                  key={i}
                  className="bg-green-200 px-2 py-1 m-1 inline-block rounded"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold">Missing:</p>
              {job.missing.map((s, i) => (
                <span
                  key={i}
                  className="bg-red-200 px-2 py-1 m-1 inline-block rounded"
                >
                  {s}
                </span>
              ))}
            </div>

            <button className="mt-4 w-full bg-black text-white p-2 rounded">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
