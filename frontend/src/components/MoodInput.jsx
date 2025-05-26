import React, { useState } from "react";

const questions = [
  "How are you feeling today? (1-10)",                 // q1 (weighted)
  "Did you sleep well last night? (1-10)",             // q2
  "How stressed do you feel? (1-10)",                  // q3 (weighted)
  "How productive was your day? (1-10)",               // q4
  "How connected do you feel with family and others? (1-10)",     // q5
  "How motivated/happy are you feeling today? (1-10)",       // q6 (weighted)
  "Anything specific on your mind?",                   // q7 (text only, for therapy tips)
];

const MoodInput = ({ onMoodSubmit, onClose }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const calculateMoodScore = () => {
    let numericScores = answers.slice(0, 6).map(Number);

    if (numericScores.some(val => isNaN(val) || val < 1 || val > 10)) {
      return null;
    }

    const weights = [2, 1, 2, 1, 1, 2];
    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let weightedSum = numericScores.reduce((sum, val, idx) => sum + val * weights[idx], 0);

    return parseFloat((weightedSum / totalWeight).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const moodScore = calculateMoodScore();

    if (moodScore === null) {
      setError("Please enter valid numbers (1-10) for all questions.");
      return;
    }

    const moodText = answers[6];
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood: moodScore, comment: moodText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setSuccessMsg("Mood submitted successfully!");
        if (onMoodSubmit) onMoodSubmit({ mood: moodScore, comment: moodText });
        if (onClose) onClose();
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="mood-form-wrapper">
      <form className="mood-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", color: "#2e3a59", marginBottom: "0.5rem" }}>Tell us how you are feeling</h2>
        <h4 style={{ color: "#555", margin: "0", padding: "0", lineHeight: "1.2" }}>
          On a scale of 1 to 10:
        </h4>
        <h4 style={{ color: "#777", margin: "0", padding: "0", lineHeight: "1.2", marginBottom: "1rem" }}>1 is the lowest/least, and 10 is the highest/most.</h4>

        {questions.map((q, index) => (
          <div key={index}>
            <label className="mood-label">{q}</label>
            {index === 6 ? (
              <textarea
                className="mood-textarea"
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Write anything you'd like to express..."
              />
            ) : (
              <input
                type="number"
                className="mood-input"
                min="1"
                max="10"
                value={answers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
        {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
        {successMsg && <p style={{ color: "green", marginTop: "0.5rem" }}>{successMsg}</p>}
        <button type="submit" className="btn-green">Submit</button>
      </form>
    </div>
  );
};

export default MoodInput;
