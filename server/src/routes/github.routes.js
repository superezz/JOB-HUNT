const express = require("express");
const router = express.Router();

const GitHubCache = require("../models/GitHubCache");
const { getRepoData } = require("../services/github.service");
const { analyzeGitHubWithAI } = require("../services/ai.service");
const { extractSkillsFromRepo } = require("../utils/githubSkillExtractor");
const User = require("../models/User");

router.post("/analyze", async (req, res) => {
  try {
    const { repoUrl, email } = req.body;

    if (!repoUrl || !email) {
      return res.status(400).json({ error: "Repo URL and email required" });
    }

    const user = await User.findOne({ email });

    // ===============================
    // 🌍 GLOBAL CACHE CHECK
    // ===============================
    const globalCache = await GitHubCache.findOne({ repoUrl });

    if (globalCache) {
      console.log("🌍 GLOBAL CACHE HIT");

      return res.json({
        technologies: globalCache.technologies,
        tools: globalCache.tools,
        skills: globalCache.skills,
        resumePoints: globalCache.resumePoints,
        source: "global-cache",
      });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ===============================
    // 🔍 CACHE CHECK
    // ===============================
    const existingProject = user.projects.find(
      (p) => p.github === repoUrl
    );

    if (existingProject) {
      console.log("⚡ CACHE HIT");

      return res.json({
        technologies: existingProject.techStack,
        tools: [],
        skills: existingProject.extractedSkills,
        resumePoints: [],
        source: "cache",
      });
    }

    // ===============================
    // 📦 FETCH REPO DATA
    // ===============================
    const repoData = await getRepoData(repoUrl);

    if (!repoData) {
      return res.status(400).json({ error: "Invalid repo" });
    }

    let result;

    // ===============================
    // 🤖 TRY AI
    // ===============================
    const aiResult = await analyzeGitHubWithAI(repoData);

    if (aiResult.source === "fallback") {
      console.log("⚠️ Using fallback");

      const skills = extractSkillsFromRepo(repoData);

      result = {
        technologies: skills,
        tools: [],
        skills,
        resumePoints: [],
        source: "fallback",
      };
    } else {
      result = {
        ...aiResult,
        source: "ai",
      };
    }

    // ===============================
    // 💾 SAVE TO DB
    // ===============================
    user.projects.push({
      github: repoUrl,
      description: repoData.readme?.slice(0, 200),
      techStack: result.technologies,
      extractedSkills: result.skills,
    });

    await user.save();

    // ===============================
    // 💾 SAVE TO GLOBAL CACHE
    // ===============================
    await GitHubCache.create({
      repoUrl,
      technologies: result.technologies,
      tools: result.tools,
      skills: result.skills,
      resumePoints: result.resumePoints,
    });

    res.json(result);

  } catch (err) {
    console.error("❌ GitHub Route Error:", err.message);
    res.status(500).json({ error: "GitHub analysis failed" });
  }
});

module.exports = router;