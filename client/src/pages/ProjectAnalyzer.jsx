import { useState } from "react";
import api from "../services/api";

export default function ProjectAnalyzer() {
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);

  const analyzeProject = async () => {
    try {
      const res = await api.post("/project/analyze", {
        description,
      });

      setSkills(res.data.skills);
    } catch {
      alert("Error analyzing project");
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
          Analyze
        </button>

        {/* Output */}
        <div className="mt-4">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="inline-block bg-green-200 px-2 py-1 rounded mr-2 mt-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
