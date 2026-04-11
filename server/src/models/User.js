const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skills: [String],

  projects: [
    {
      title: String,
      github: String,
      description: String,
      techStack: [String],
      extractedSkills: [String],
    }
  ],

  applications: [
    {
      jobId: String,
      company: String,
      role: String,
      status: String,
      appliedAt: Date,
    },
  ],

  applyQueue: [
    {
      jobId: String,
      company: String,
      role: String,
    },
  ],

  experience: String,
  education: String,
  location: String,
  expectedSalary: String,
});

module.exports = mongoose.model("User", userSchema);