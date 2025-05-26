// backend/routes/streakRoutes.js

import express from "express";
import { updateStreak, getStreak } from "../controllers/streakController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Route: POST /api/streak/update
router.post("/update", protect, updateStreak);

// Route: GET /api/streak
router.get("/", protect, getStreak);

export default router;
