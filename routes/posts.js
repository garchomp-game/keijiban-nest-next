const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [Comment]
    });
    res.json(posts);
  } catch (err) {
    console.error('Error getting posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment]
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    console.error('Error getting post:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content and author are required' });
    }
    
    const newPost = await Post.create({
      title,
      content,
      author
    });
    
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ message: err.message });
  }
});

// Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const { text, author } = req.body;
    
    if (!text || !author) {
      return res.status(400).json({ message: 'Text and author are required' });
    }
    
    const newComment = await Comment.create({
      text,
      author,
      postId: post.id
    });
    
    const updatedPost = await Post.findByPk(post.id, {
      include: [Comment]
    });
    
    res.status(201).json(updatedPost);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
