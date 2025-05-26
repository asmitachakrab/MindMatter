// backend/controllers/therapyController.js

export const getTherapySuggestions = async (req, res) => {
  try {
    const { moodText } = req.body;

    if (!moodText || moodText.trim() === '') {
      return res.status(400).json({ message: "Mood text is required." });
    }

    // Basic mock therapy suggestions based on mood text content
    const lowerText = moodText.toLowerCase();

    let suggestion = "Remember to take care of yourself and do something you enjoy today.";

    if (lowerText.includes("anxious") || lowerText.includes("nervous")) {
      suggestion = "Try deep breathing or mindfulness exercises to calm your mind.";
    } else if (lowerText.includes("sad") || lowerText.includes("down")) {
      suggestion = "Reach out to a friend or take a walk in nature—it can help lift your mood.";
    } else if (lowerText.includes("angry") || lowerText.includes("frustrated")) {
      suggestion = "Pause and try journaling your thoughts—it helps process intense emotions.";
    } else if (lowerText.includes("happy") || lowerText.includes("excited")) {
      suggestion = "Keep doing what makes you feel good—celebrate the positive moments!";
    }

    res.status(200).json({ therapy: suggestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate therapy suggestion", error: error.message });
  }
};
