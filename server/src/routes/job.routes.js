const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jobs = require("../data/jobs");
const { aggregateSkills } = require("../utils/skillAggregator");
const { calculateMatchScore } = require("../utils/matchScore");

router.get("/match/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userSkills = aggregateSkills(user.projects);

    const results = jobs.map(job => {
      const match = calculateMatchScore(userSkills, job.skills);

      return {
        ...job,
        ...match
      };
    });

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Job matching failed" });
  }
});

module.exports = router;