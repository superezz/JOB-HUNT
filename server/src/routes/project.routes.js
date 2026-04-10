const express = require("express");
const router = express.Router();

const { analyzeProjectAI } = require("../services/ai.service");
const User = require("../models/User");

router.post("/analyze", async (req, res) => {
  try {
    const { description, email } = req.body;

    // ❗ Safety check
    if (!description || !email) {
      return res.status(400).json({ error: "Missing data" });
    }

    // 🧠 AI analyze
    const aiResult = await analyzeProjectAI(description);

    // 🔍 Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 💾 Save project
    user.projects.push({
      description,
      techStack: aiResult.technologies || [],
      extractedSkills: aiResult.skills || [],
    });

    await user.save();

    // ✅ Send response
    res.json(aiResult);

  } catch (err) {
    console.error("❌ SAVE ERROR:", err.message);
    res.status(500).json({ error: "Failed to analyze & save" });
  }
});

module.exports = router;