import { useState } from "react";
import api from "../services/api";

export default function ProjectAnalyzer() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeProject = async () => {
    try {
      setLoading(true);

      const res = await api.post("/project/analyze", {
        description,
      });

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Error analyzing project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Project Analyzer 🚀
        </h2>

        <textarea
          placeholder="Paste your project description..."
          className="w-full p-3 rounded-lg mb-4 bg-white/70 outline-none"
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={analyzeProject}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* OUTPUT */}
        {result && (
          <div className="mt-4 text-sm">
            <h3 className="font-bold">Technologies:</h3>
            {result.technologies?.map((t, i) => (
              <span
                key={i}
                className="bg-blue-200 px-2 py-1 m-1 inline-block rounded"
              >
                {t}
              </span>
            ))}

            <h3 className="font-bold mt-3">Tools:</h3>
            {result.tools?.map((t, i) => (
              <span
                key={i}
                className="bg-yellow-200 px-2 py-1 m-1 inline-block rounded"
              >
                {t}
              </span>
            ))}

            <h3 className="font-bold mt-3">Skills:</h3>
            {result.skills?.map((s, i) => (
              <span
                key={i}
                className="bg-green-200 px-2 py-1 m-1 inline-block rounded"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
