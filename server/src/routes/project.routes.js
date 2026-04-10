const express = require("express");
const router = express.Router();

const { analyzeProjectAI } = require("../services/ai.service");

router.post("/analyze", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    const result = await analyzeProjectAI(description);

    res.json(result);
  } catch (err) {
    console.error("❌ AI ERROR:", err.message);
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;