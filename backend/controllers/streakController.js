import Streak from '../models/Streak.js';

// Get streak data for the logged-in user
export const getStreak = async (req, res) => {
  const userId = req.user.id;
  try {
    const streak = await Streak.findOne({ user: userId });
    if (!streak) {
      return res.status(404).json({ message: 'Streak data not found' });
    }
    res.json(streak);
  } catch (error) {
    console.error('Error in getStreak:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update streak based on whether mood was logged today
export const updateStreak = async (req, res) => {
  const userId = req.user.id;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = await Streak.findOne({ user: userId });
    if (!streak) {
      // Create a new streak document if none exists
      streak = new Streak({
        user: userId,
        currentStreak: 1,
        longestStreak: 1,
        lastUpdated: today,
        daysLogged: [today],
      });
      await streak.save();
      return res.json(streak);
    }

    // Check if lastUpdated is yesterday or today to increment streak
    const lastUpdated = new Date(streak.lastUpdated);
    lastUpdated.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - lastUpdated.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 0) {
      // Already updated today
      return res.json(streak);
    } else if (diffDays === 1) {
      // Continue streak
      streak.currentStreak += 1;
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
      streak.lastUpdated = today;
      streak.daysLogged.push(today);
    } else {
      // Reset streak if more than one day gap
      streak.currentStreak = 1;
      streak.lastUpdated = today;
      streak.daysLogged = [today];
    }

    await streak.save();
    res.json(streak);
  } catch (error) {
    console.error('Error in updateStreak:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
