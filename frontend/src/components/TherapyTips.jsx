import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/tips', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTips(res.data);
      } catch (error) {
        console.error('Failed to fetch tips');
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="tips-section">
      <h3>Therapy Tips for You</h3>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
