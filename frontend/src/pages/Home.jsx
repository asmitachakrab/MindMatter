import React, { useState } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth check
  const [showPrompt, setShowPrompt] = useState(false);

  const handleFormClick = () => {
    if (!isLoggedIn) {
      setShowPrompt(true);
    } else {
      navigate('/mood');
    }
  };

  const handleRegister = () => {
    setShowPrompt(false);
    navigate('/register');
  };

  const handleLogin = () => {
    setShowPrompt(false);
    navigate('/login');
  };

  return (
    <div className="home-wrapper">
      {/* HEADER */}
      <header className="home-header">
        <div className="left-section">
          <h1>MindMatter</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/forum">Forum</a>
            <a href="/therapy">Therapy Tips</a>
          </nav>
        </div>
        <div className="right-section">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>

      {/* INTRO */}
      <main className="intro-section">
        <h2>Discover your mental health score</h2>
        <p>Want to find mental peace?</p>
        <p>Our platform offers a range of features and functionalities aimed at promoting mental wellness, including personalized therapy sessions, mood tracking tools, progress charts and analysis, and community support forums.</p>
        <button className="form-btn" onClick={handleFormClick}>Tell us what you're feeling</button>

        {showPrompt && (
          <div className="login-prompt">
            <p>Please register to continue.</p>
            <button onClick={handleRegister}>Register</button>
            <p>Already registered? <button className="login-inline-btn" onClick={handleLogin}>Login</button></p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>📧 Contact us at: <a href="mailto:support@mindmatter.org">support@mindmatter.org</a></p>
        <p>© 2025 MindMatter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
