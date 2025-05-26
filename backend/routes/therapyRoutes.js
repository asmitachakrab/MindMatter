// backend/routes/therapyRoutes.js

import express from "express";
import { getTherapySuggestions } from "../controllers/therapyController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all therapy suggestions for the logged-in user
router.get("/", protect, getTherapySuggestions);

export default router;