import React, { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../styles/dashboard.css';
import MoodInput from '../components/MoodInput'; 

const GemsOverlay = ({ onClose, streak }) => {
  const targetStreak = streak < 7 ? 7 : streak < 14 ? 14 : 30;

  return (
    <div className="overlay">
      <div className="overlay-box">
        <h2>💎 Gems</h2>
        <p>Wanna get more gems?</p>
        <p>Complete a {targetStreak}-day streak!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const StreakOverlay = ({ onClose, currentDay }) => {
  const daysInMonth = 30;
  const loggedDays = Array.from({ length: currentDay }, (_, i) => i + 1);

  return (
    <div className="overlay">
      <div className="overlay-box">
        <h2>🔥 Your Streak</h2>
        <div className="streak-days">
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return (
              <div key={day} className={`day-box ${loggedDays.includes(day) ? 'lit' : ''}`}>
                {day}
              </div>
            );
          })}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [streak, setStreak] = useState(0);
  const [gems, setGems] = useState(1000);
  const [moodData, setMoodData] = useState([]);
  const [showGemsOverlay, setShowGemsOverlay] = useState(false);
  const [showStreakOverlay, setShowStreakOverlay] = useState(false);
  const [showMoodInput, setShowMoodInput] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStreak(1);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleMoodSubmit = ({ mood, comment }) => {
    const newEntry = {
      day: moodData.length + 1,
      mood,
      comment,
    };

    setMoodData(prevData => [...prevData, newEntry]);
    setShowMoodInput(false);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-gems" onClick={() => setShowGemsOverlay(true)}>💎 {gems}</div>
        <div className="header-center"></div>
        <div className="header-streak" onClick={() => setShowStreakOverlay(true)}>🔥 D{streak}</div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>WELCOME TO YOUR DASHBOARD!</h2>
          <h3>Your progress at a glance</h3>
        </div>

        <button
          className="log-mood-btn"
          onClick={() => setShowMoodInput(true)}
        >
          Log Today's Mood
        </button>

        <div className="progress-box">
          {moodData.length === 0 ? (
            <div className="empty-progress-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={[{ day: '', mood: 0 }]}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="day" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
              <p className="empty-text">GET STARTED TO SEE PROGRESS</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={moodData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>

      {/* Overlays */}
      {showGemsOverlay && (
        <GemsOverlay onClose={() => setShowGemsOverlay(false)} streak={streak} />
      )}
      {showStreakOverlay && (
        <StreakOverlay onClose={() => setShowStreakOverlay(false)} currentDay={streak} />
      )}
      {showMoodInput && (
        <div className="overlay">
          <div className="overlay-content">
            <button
              className="close-btn"
              onClick={() => setShowMoodInput(false)}
            >
              ❌
            </button>
            <MoodInput
              onClose={() => setShowMoodInput(false)}
              onMoodSubmit={handleMoodSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
