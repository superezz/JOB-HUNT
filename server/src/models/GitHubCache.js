const mongoose = require("mongoose");

const githubCacheSchema = new mongoose.Schema({
  repoUrl: {
    type: String,
    unique: true,
  },
  technologies: [String],
  tools: [String],
  skills: [String],
  resumePoints: [String],
});

module.exports = mongoose.model("GitHubCache", githubCacheSchema);