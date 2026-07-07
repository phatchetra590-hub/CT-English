const express = require('express');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all lessons by level
router.get('/by-level/:level', async (req, res) => {
  try {
    const lessons = await Lesson.find({ level: req.params.level });
    res.json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get lesson by category
router.get('/by-category/:category', async (req, res) => {
  try {
    const lessons = await Lesson.find({ category: req.params.category });
    res.json({
      success: true,
      count: lessons.length,
      lessons
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark lesson as completed
router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const { score, timeSpent } = req.body;
    
    let progress = await Progress.findOne({
      userId: req.userId,
      lessonId: req.params.id
    });

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        lessonId: req.params.id
      });
    }

    progress.completed = true;
    progress.score = score || 0;
    progress.timeSpent = timeSpent || 0;
    progress.completedAt = new Date();
    progress.xpEarned = Math.floor((score || 0) / 10) * 10;
    
    await progress.save();

    res.json({
      success: true,
      message: 'Lesson marked as completed',
      xpEarned: progress.xpEarned,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's lesson progress
router.get('/user/progress/:lessonId', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.userId,
      lessonId: req.params.lessonId
    });

    res.json({
      success: true,
      progress: progress || { completed: false, score: 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
