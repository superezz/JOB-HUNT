const express = require("express");
const router = express.Router();

// TEMP basic analyzer
router.post("/analyze", (req, res) => {
  const { description } = req.body;

  const skills = [
    "react",
    "node",
    "mongodb",
    "docker",
    "aws",
    "python",
    "java",
    "next.js",
  ];

  const found = skills.filter(skill =>
    description.toLowerCase().includes(skill)
  );

  res.json({ skills: found });
});

module.exports = router;