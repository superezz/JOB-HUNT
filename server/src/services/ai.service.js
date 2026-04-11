const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 🔥 CLEAN JSON SAFELY
const cleanJSON = (text) => {
  try {
    if (!text) return null;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.log("❌ JSON PARSE ERROR:", text);
    return null;
  }
};

// 🔥 SAFE AI CALL (NO CRASH)
const safeAICall = async (prompt) => {
  try {
    console.log("🔥 AI CALL STARTED");

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // ✅ stable model
      contents: prompt,
    });

    console.log("✅ AI RESPONSE RECEIVED");

    const text = response.text;

    return cleanJSON(text);
  } catch (err) {
    console.error("❌ AI CALL ERROR:", err.message);

    if (err.message.includes("429")) return "QUOTA_EXCEEDED";

    return null;
  }
};

// ===============================
// 🔥 PROJECT ANALYZER
// ===============================
exports.analyzeProjectAI = async (description) => {
  const prompt = `
Analyze this project:

${description}

Return JSON:
{
  "technologies": [],
  "tools": [],
  "skills": []
}
`;

  const data = await safeAICall(prompt);

  if (data === "QUOTA_EXCEEDED") {
    return {
      technologies: ["JavaScript"],
      tools: ["Git"],
      skills: ["Web Development"],
      source: "fallback",
    };
  }

  return (
    data || {
      technologies: ["JavaScript"],
      tools: ["Git"],
      skills: ["Web Development"],
      source: "fallback",
    }
  );
};

// ===============================
// 🔥 GITHUB ANALYZER (FIXED)
// ===============================
exports.analyzeGitHubWithAI = async ({ readme, packageJson }) => {
  const prompt = `
Analyze GitHub project.

IMPORTANT:
- Keep response short
- Max 5 items per list

README:
${readme?.slice(0, 800)}

PACKAGE.JSON:
${packageJson?.slice(0, 300)}

Return JSON:
{
  "technologies": [],
  "tools": [],
  "skills": [],
  "resumePoints": []
}
`;

  const data = await safeAICall(prompt);

  if (data === "QUOTA_EXCEEDED") {
    return {
      technologies: ["React", "Next.js"],
      tools: ["Git", "Vercel"],
      skills: ["Frontend Development"],
      resumePoints: [
        "Built modern frontend applications",
        "Used scalable architecture",
      ],
      source: "fallback",
    };
  }

  return (
    data || {
      technologies: ["React"],
      tools: ["Git"],
      skills: ["Web Development"],
      resumePoints: ["Built a full-stack application"],
      source: "fallback",
    }
  );
};