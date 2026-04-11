const express = require("express");
const router = express.Router();

const User = require("../models/User");
const {
  fetchAdzunaJobs,
  fetchRemotiveJobs,
} = require("../services/job.service");
const { aggregateSkills } = require("../utils/skillAggregator");
const { calculateMatchScore } = require("../utils/matchScore");
const { autoApplyJobs } = require("../services/apply.service");

router.get("/match/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userSkills = aggregateSkills(user.projects);

    // ===============================
    // 🔥 FETCH REAL JOBS
    // ===============================
    const adzunaJobs = await fetchAdzunaJobs("developer");
    const remotiveJobs = await fetchRemotiveJobs();

    const allJobs = [...adzunaJobs, ...remotiveJobs];

    // ===============================
    // 🔥 MATCH LOGIC
    // ===============================
    const results = allJobs.map((job) => {
      const match = calculateMatchScore(userSkills, job.skills);

      return {
        ...job,
        ...match,
      };
    });

    res.json(results);
  } catch (err) {
    console.error("❌ Job matching error:", err.message);
    res.status(500).json({ error: "Job matching failed" });
  }
});

// GET APPLICATIONS
router.get("/applications/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    res.json({
      applications: user.applications || [],
      queue: user.applyQueue || [],
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ADD TO APPLY QUEUE
router.post("/queue", async (req, res) => {
  try {
    const { email, job } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // prevent duplicates
    const exists = user.applyQueue.find(
      (j) => j.jobId === job.id
    );

    if (exists) {
      return res.json({ message: "Already in queue" });
    }

    user.applyQueue.push({
      jobId: job.id,
      company: job.company,
      role: job.title,
    });

    await user.save();

    res.json({ message: "Added to queue ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Queue failed" });
  }
});

router.post("/auto-apply", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await autoApplyJobs(user);

    res.json({ message: "Auto Apply Done ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Auto apply failed" });
  }
});

module.exports = router;
