const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, bio, learningGoal, proficiencyLevel, dailyGoal, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        bio,
        learningGoal,
        proficiencyLevel,
        dailyGoal,
        preferences,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add XP and update streak
router.post('/add-xp', authMiddleware, async (req, res) => {
  try {
    const { xpPoints } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.totalXP += xpPoints || 10;
    user.lastActivityDate = new Date();
    
    // Update streak logic
    if (!user.lastActivityDate) {
      user.streak = 1;
    } else {
      const lastActivity = new Date(user.lastActivityDate);
      const today = new Date();
      const daysDifference = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (daysDifference === 0) {
        // Same day, don't increment
      } else if (daysDifference === 1) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'XP added successfully',
      totalXP: user.totalXP,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      stats: {
        totalXP: user.totalXP,
        streak: user.streak,
        level: user.proficiencyLevel,
        learningGoal: user.learningGoal,
        totalBadges: user.badges.length,
        subscriptionPlan: user.subscriptionPlan,
        joinDate: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
