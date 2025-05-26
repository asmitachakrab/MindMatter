import React, { useState, useEffect } from 'react';

const StreakBadge = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.streak) setStreak(user.streak);
  }, []);

  return (
    <div className="streak-badge">
      🔥 Daily Streak: <strong>{streak} day{streak !== 1 ? 's' : ''}</strong>
    </div>
  );
};

export default StreakBadge;
