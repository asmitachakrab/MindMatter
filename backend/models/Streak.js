// backend/models/Streak.js

import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  lastEntryDate: {
    type: Date,
  },
  streakHistory: [
    {
      date: Date,
    },
  ],
  gems: {
    type: Number,
    default: 0,
  },
});

const Streak = mongoose.model("Streak", streakSchema);
export default Streak;