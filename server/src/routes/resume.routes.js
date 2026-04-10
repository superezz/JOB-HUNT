const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jobs = require("../data/jobs");
const { generateResumeAI } = require("../services/resume.service");

router.post("/generate", async (req, res) => {
  try {
    const { email, jobId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const job = jobs.find(j => j.id === jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const resume = await generateResumeAI(user, job);

    res.json({ resume });

  } catch (err) {
    console.error("❌ Resume route error:", err.message);
    res.status(500).json({ error: "Resume generation failed" });
  }
});

module.exports = router;