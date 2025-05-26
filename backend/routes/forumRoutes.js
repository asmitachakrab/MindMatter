// backend/routes/forumRoutes.js

import express from "express";
import { getAllPosts, createPost } from "../controllers/forumController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all forum posts
router.get("/", protect, getAllPosts);

// Create a new forum post
router.post("/", protect, createPost);

export default router;
