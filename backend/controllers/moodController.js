import Mood from '../models/Mood.js';

// Submit or update mood for a user on a specific date
export const submitMood = async (req, res) => {
  const userId = req.user.id;
  const { moodScore, moodText } = req.body;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let mood = await Mood.findOne({ user: userId, date: today });

    if (mood) {
      mood.moodScore = moodScore;
      mood.moodText = moodText;
      await mood.save();
    } else {
      mood = new Mood({
        user: userId,
        date: today,
        moodScore,
        moodText,
      });
      await mood.save();
    }

    res.status(200).json({ message: 'Mood saved successfully', mood });
  } catch (error) {
    console.error('Error in submitMood:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get mood entries for the logged-in user
export const getMoods = async (req, res) => {
  const userId = req.user.id;

  try {
    const moods = await Mood.find({ user: userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    console.error('Error in getMoods:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
