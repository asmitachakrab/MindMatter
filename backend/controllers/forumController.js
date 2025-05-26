import ForumPost from '../models/ForumPost.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPost = new ForumPost({ user: userId, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating forum post', error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find().populate('user', 'username').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};
