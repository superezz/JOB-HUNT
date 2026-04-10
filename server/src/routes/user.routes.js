const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { aggregateSkills } = require("../utils/skillAggregator");

router.get("/skills/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const skills = aggregateSkills(user.projects);

    res.json({ skills });

  } catch (err) {
    console.error("❌ SKILL ERROR:", err.message);
    res.status(500).json({ error: "Failed to get skills" });
  }
});

module.exports = router;