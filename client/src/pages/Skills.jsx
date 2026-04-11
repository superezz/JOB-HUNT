import { useEffect, useState } from "react";
import api from "../services/api";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await api.get(
        `/user/skills/${localStorage.getItem("email")}`,
      );
      setSkills(res.data.skills);
    };

    fetchSkills();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Your Skills 🚀</h2>

        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-green-200 px-3 py-1 m-1 inline-block rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
