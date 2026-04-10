const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateResumeAI = async (user, job) => {
  try {
    const prompt = `
Generate a professional ATS-friendly resume.

Name: ${user.name}
Email: ${user.email}

Skills:
${user.skills?.join(", ") || ""}

Projects:
${user.projects.map(p => p.description).join("\n")}

Target Job:
${job.title} at ${job.company}

Job Skills:
${job.skills.join(", ")}

Instructions:
- Highlight relevant skills
- Use bullet points
- ATS optimized
- Keep concise

Return plain text.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;

  } catch (err) {
    console.error("❌ Resume AI error:", err.message);
    return "Failed to generate resume";
  }
};