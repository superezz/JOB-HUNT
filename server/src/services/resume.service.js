const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateResumeAI = async (user, job) => {
  try {
    const prompt = `
Create a ONE-PAGE professional ATS-friendly resume.

STRICT RULES:
- Maximum 250–300 words
- No long paragraphs
- Use bullet points
- Keep it concise and clean
- Focus on relevant skills for the job

FORMAT:

------------------------
Name
Email

SUMMARY (2-3 lines)

SKILLS
• Skill 1
• Skill 2

PROJECTS (Max 2 projects)
Project Title
• Point
• Point

------------------------

USER DETAILS:
Name: ${user.name}
Email: ${user.email}

Skills:
${user.skills?.join(", ") || ""}

Projects:
${user.projects?.map((p) => `- ${p.description}`).join("\n") || ""}

TARGET JOB:
${job.title} at ${job.company}

JOB SKILLS:
${job.skills.join(", ")}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    // ✅ FIX: correct way to get text
    let text = response.text;

    // ✅ SAFETY CLEANUP (important)
    if (!text) {
      return "Resume generation failed";
    }

    // remove weird formatting if any
    text = text.replace(/```/g, "").trim();

    return text;
  } catch (err) {
    console.error("❌ Resume AI error:", err.message);
    return "Failed to generate resume";
  }
};
