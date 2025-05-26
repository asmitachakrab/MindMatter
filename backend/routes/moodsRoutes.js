// backend/routes/moodsRoutes.js

import express from "express";
import { getMoods, submitMood } from "../controllers/moodController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMoods);
router.post("/", protect, submitMood);

export default router;
