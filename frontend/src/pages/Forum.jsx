import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/api/forum').then((res) => setPosts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/forum', { content });
    setPosts([...posts, res.data]);
    setContent('');
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Community Forum</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something..."
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <button type="submit">Post</button>
        </form>
        <ul>
          {posts.map((post) => (
            <li key={post._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
              <strong>{post.user?.username || 'Anonymous'}:</strong> {post.content}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ForumPage;
