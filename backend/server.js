import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import moodsRoutes from "./routes/moodsRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import therapyRoutes from "./routes/therapyRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodsRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/therapy", therapyRoutes);
app.use("/api/forum", forumRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the MindMatter backend API");
});

// Error handling middleware (optional, improves error messages)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
