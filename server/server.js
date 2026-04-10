require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect Database
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Port Fix (IMPORTANT)
const PORT = process.env.PORT || 5001;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ❌ Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Server Error" });
});