const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  type: {
    type: String,
    enum: ['multiple-choice', 'fill-blank', 'true-false', 'matching'],
    required: true
  },
  correctAnswer: String,
  options: [String],
  explanation: String,
  difficulty: Number
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true
  },
  category: String,
  questions: [QuestionSchema],
  duration: Number,
  passingScore: {
    type: Number,
    default: 70
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);
