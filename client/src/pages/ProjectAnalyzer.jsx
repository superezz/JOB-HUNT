import { useState, useEffect } from "react";
import api from "../services/api";

export default function ProjectAnalyzer() {
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

  const [result, setResult] = useState(null);
  const [allSkills, setAllSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  // =============================
  // 🔥 LOAD SKILLS ON PAGE LOAD
  // =============================
  useEffect(() => {
    fetchSkills();
  }, []);

  // =============================
  // 🔥 ANALYZE PROJECT
  // =============================
  const analyzeProject = async () => {
    if (!description.trim()) return alert("Enter project description");

    try {
      setLoading(true);
      setResult(null);

      const res = await api.post("/project/analyze", {
        description,
        email: localStorage.getItem("email"),
      });

      setResult(res.data);
      await fetchSkills();
    } catch (err) {
      console.log(err);
      alert("Error analyzing project");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // 🔥 ANALYZE GITHUB
  // =============================
  const analyzeGithub = async () => {
    if (githubLoading) return;
    if (!repoUrl.trim()) return alert("Enter GitHub URL");

    try {
      setGithubLoading(true);
      setResult(null);

      const res = await api.post("/github/analyze", {
        repoUrl,
        email: localStorage.getItem("email"),
      });

      setResult(res.data);
      await fetchSkills();
    } catch (err) {
      console.log(err);
      alert("GitHub analysis failed");
    } finally {
      setGithubLoading(false);
    }
  };

  // =============================
  // 🔥 FETCH USER SKILLS
  // =============================
  const fetchSkills = async () => {
    try {
      const res = await api.get(
        `/user/skills/${localStorage.getItem("email")}`,
      );
      setAllSkills(res.data.skills || []);
    } catch (err) {
      console.log("Skill fetch error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 p-4">
      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Project Analyzer 🚀
        </h2>

        {/* ================= PROJECT INPUT ================= */}
        <textarea
          placeholder="Project description..."
          className="w-full p-3 rounded-lg mb-3 bg-white/70 outline-none"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={analyzeProject}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-black"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Project"}
        </button>

        {/* ================= GITHUB INPUT ================= */}
        <input
          placeholder="GitHub Repo URL"
          className="w-full p-3 mt-4 rounded-lg bg-white/70 outline-none"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          onClick={analyzeGithub}
          disabled={githubLoading}
          className={`w-full p-3 rounded-lg mt-2 text-white ${
            githubLoading ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {githubLoading ? "Analyzing..." : "Analyze GitHub Repo (AI)"}
        </button>

        {/* ================= RESULT ================= */}
        {result && (
          <div className="mt-4 text-sm">
            {/* 🔥 STATUS BADGE (FINAL FIX) */}
            <div className="text-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  result.source === "global-cache"
                    ? "bg-indigo-200 text-indigo-800"
                    : result.source === "cache"
                      ? "bg-purple-200 text-purple-800"
                      : result.source === "fallback"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                }`}
              >
                {result.source === "global-cache"
                  ? "🌍 Global Cache"
                  : result.source === "cache"
                    ? "⚡ Cached Result"
                    : result.source === "fallback"
                      ? "⚠️ Fallback Mode"
                      : "🤖 AI Generated"}
              </span>
            </div>

            {/* TECHNOLOGIES */}
            <h3 className="font-bold">Technologies:</h3>
            {result.technologies?.map((t, i) => (
              <span
                key={i}
                className="bg-blue-200 px-2 py-1 m-1 inline-block rounded"
              >
                {t}
              </span>
            ))}

            {/* TOOLS */}
            <h3 className="font-bold mt-3">Tools:</h3>
            {result.tools?.map((t, i) => (
              <span
                key={i}
                className="bg-yellow-200 px-2 py-1 m-1 inline-block rounded"
              >
                {t}
              </span>
            ))}

            {/* SKILLS */}
            <h3 className="font-bold mt-3">Skills:</h3>
            {result.skills?.map((s, i) => (
              <span
                key={i}
                className="bg-green-200 px-2 py-1 m-1 inline-block rounded"
              >
                {s}
              </span>
            ))}

            {/* RESUME POINTS */}
            {result.resumePoints?.length > 0 && (
              <>
                <h3 className="font-bold mt-3">Resume Points:</h3>
                <ul className="list-disc ml-5">
                  {result.resumePoints.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* ================= TOTAL SKILLS ================= */}
        {allSkills.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold">Your Total Skills:</h3>

            {allSkills.map((s, i) => (
              <span
                key={i}
                className="bg-pink-200 px-2 py-1 m-1 inline-block rounded"
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
