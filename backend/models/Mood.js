// backend/models/Mood.js

import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moodScore: {
    type: Number,
    required: true,
  },
  moodText: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
    unique: false,
  },
});

const Mood = mongoose.model("Mood", moodSchema);
export default Mood;
