const axios = require("axios");

// ===============================
// 🔥 SIMPLE SKILL EXTRACTOR
// ===============================
const extractSkillsFromJD = (text = "") => {
  const skills = [
    "react",
    "node.js",
    "mongodb",
    "docker",
    "aws",
    "python",
    "java",
    "next.js",
  ];

  return skills.filter((skill) =>
    text.toLowerCase().includes(skill)
  );
};

// ===============================
// 🔥 ADZUNA JOBS
// ===============================
exports.fetchAdzunaJobs = async (query) => {
  try {
    if (!process.env.ADZUNA_APP_ID) return [];

    const res = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_API_KEY,
          what: query,
          results_per_page: 10,
        },
      }
    );

    return res.data.results.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company.display_name,
      description: job.description,
      skills: extractSkillsFromJD(job.description),
    }));
  } catch (err) {
    console.log("❌ Adzuna error");
    return [];
  }
};

// ===============================
// 🔥 REMOTIVE JOBS (FREE)
// ===============================
exports.fetchRemotiveJobs = async () => {
  try {
    const res = await axios.get(
      "https://remotive.com/api/remote-jobs"
    );

    return res.data.jobs.slice(0, 10).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      description: job.description,
      skills: extractSkillsFromJD(job.description),
    }));
  } catch (err) {
    console.log("❌ Remotive error");
    return [];
  }
};