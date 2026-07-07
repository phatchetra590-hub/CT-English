const express = require('express');
const Quiz = require('../models/Quiz');
const UserProgress = require('../models/UserProgress');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({
      success: true,
      count: quizzes.length,
      quizzes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get quiz by level
router.get('/by-level/:level', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ level: req.params.level });
    res.json({
      success: true,
      count: quizzes.length,
      quizzes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Submit quiz answers
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let correctCount = 0;
    const answersWithCorrection = answers.map((answer, index) => {
      const isCorrect = answer.answer === quiz.questions[index].correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: index,
        answer: answer.answer,
        isCorrect
      };
    });

    const score = (correctCount / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    const userProgress = new UserProgress({
      userId: req.userId,
      quizId: req.params.id,
      score: Math.round(score),
      answers: answersWithCorrection,
      timeTaken
    });

    await userProgress.save();

    res.json({
      success: true,
      message: passed ? 'Quiz passed! 🎉' : 'Quiz failed. Try again!',
      score: Math.round(score),
      passed,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's quiz history
router.get('/user/history', authMiddleware, async (req, res) => {
  try {
    const history = await UserProgress.find({ userId: req.userId }).populate('quizId');
    res.json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
