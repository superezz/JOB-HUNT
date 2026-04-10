const { GoogleGenAI } = require("@google/genai");

// Uses GEMINI_API_KEY from .env automatically
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.analyzeProjectAI = async (description) => {
  try {
    const prompt = `
Analyze this project and extract:

- technologies
- tools
- skills

Return ONLY JSON:

{
  "technologies": [],
  "tools": [],
  "skills": []
}

Project:
${description}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    let text = response.text;

    // 🔥 clean markdown if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    console.log("✅ AI RESPONSE:", text);

    return JSON.parse(text);
  } catch (err) {
    console.error("❌ AI ERROR:", err.message);

    return {
      technologies: [],
      tools: [],
      skills: [],
      error: "AI failed",
    };
  }
};