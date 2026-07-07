const express = require('express');
const Progress = require('../models/Progress');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user's dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const completedLessons = await Progress.countDocuments({
      userId: req.userId,
      completed: true
    });
    const totalXP = user.totalXP;
    const streak = user.streak;

    const lastSevenDays = await Progress.find({
      userId: req.userId,
      completedAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      }
    });

    res.json({
      success: true,
      dashboard: {
        totalXP,
        streak,
        completedLessons,
        lastSevenDaysActivity: lastSevenDays.length,
        currentLevel: user.proficiencyLevel,
        learningGoal: user.learningGoal,
        subscriptionPlan: user.subscriptionPlan,
        memberSince: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get detailed progress statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const allProgress = await Progress.find({ userId: req.userId }).populate('lessonId');
    
    const stats = {
      totalLessons: allProgress.length,
      completedLessons: allProgress.filter(p => p.completed).length,
      averageScore: allProgress.length > 0 
        ? Math.round(allProgress.reduce((sum, p) => sum + (p.score || 0), 0) / allProgress.length)
        : 0,
      totalTimeSpent: Math.round(allProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / 60), // in minutes
      completionRate: allProgress.length > 0 
        ? Math.round((allProgress.filter(p => p.completed).length / allProgress.length) * 100)
        : 0
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get progress by category
router.get('/by-category', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId }).populate('lessonId');
    
    const byCategory = {};
    progress.forEach(p => {
      const category = p.lessonId?.category || 'Other';
      if (!byCategory[category]) {
        byCategory[category] = { total: 0, completed: 0, score: 0 };
      }
      byCategory[category].total++;
      if (p.completed) byCategory[category].completed++;
      byCategory[category].score += p.score || 0;
    });

    res.json({
      success: true,
      progressByCategory: byCategory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
