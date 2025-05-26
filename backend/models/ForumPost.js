// backend/models/ForumPost.js

import mongoose from "mongoose";

const forumPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);
export default ForumPost;