import { useEffect, useState } from "react";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState("");

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

            {/* MATCHED */}
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

            {/* MISSING */}
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

            {/* APPLY */}
            <button className="mt-4 w-full bg-black text-white p-2 rounded">
              Apply
            </button>

            {/* GENERATE RESUME */}
            <button
              onClick={async () => {
                try {
                  const email = localStorage.getItem("email");

                  const res = await api.post("/resume/generate", {
                    email,
                    jobId: job.id,
                  });

                  setResume(res.data.resume);
                } catch (err) {
                  console.log(err);
                  alert("Failed to generate resume");
                }
              }}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
            >
              Generate Resume
            </button>

            {/* ✅ DOWNLOAD PDF (FIXED) */}
            <button
              onClick={async () => {
                try {
                  const email = localStorage.getItem("email");

                  const res = await fetch(
                    "http://localhost:5001/api/resume/download",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email,
                        jobId: job.id,
                      }),
                    },
                  );

                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);

                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "resume.pdf";
                  a.click();
                } catch (err) {
                  console.log(err);
                  alert("Download failed");
                }
              }}
              className="mt-2 w-full bg-green-500 text-white p-2 rounded"
            >
              Download Resume
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {resume && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] md:w-[600px] rounded-xl shadow-xl max-h-[80vh] overflow-y-auto animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center">
              Generated Resume 📄
            </h2>

            <pre className="text-sm whitespace-pre-wrap">{resume}</pre>

            <button
              onClick={() => setResume("")}
              className="mt-4 w-full bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
