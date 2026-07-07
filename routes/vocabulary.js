const express = require('express');
const Vocabulary = require('../models/Vocabulary');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get vocabulary by level
router.get('/by-level/:level', async (req, res) => {
  try {
    const vocab = await Vocabulary.find({ level: req.params.level });
    res.json({
      success: true,
      count: vocab.length,
      vocabulary: vocab
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Search vocabulary
router.get('/search/:keyword', async (req, res) => {
  try {
    const vocab = await Vocabulary.find({
      $or: [
        { word: { $regex: req.params.keyword, $options: 'i' } },
        { definition: { $regex: req.params.keyword, $options: 'i' } }
      ]
    });
    res.json({
      success: true,
      count: vocab.length,
      vocabulary: vocab
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get random vocabulary for daily practice
router.get('/daily/practice', async (req, res) => {
  try {
    const vocab = await Vocabulary.aggregate([{ $sample: { size: 10 } }]);
    res.json({
      success: true,
      count: vocab.length,
      vocabulary: vocab
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get vocabulary by part of speech
router.get('/by-speech/:speech', async (req, res) => {
  try {
    const vocab = await Vocabulary.find({ partOfSpeech: req.params.speech });
    res.json({
      success: true,
      count: vocab.length,
      vocabulary: vocab
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
