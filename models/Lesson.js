const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
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
  category: {
    type: String,
    enum: ['Grammar', 'Vocabulary', 'Listening', 'Speaking', 'Reading', 'Writing', 'Pronunciation'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  examples: [{
    english: String,
    translation: String,
    audioUrl: String
  }],
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  videoUrl: String,
  estimatedDuration: Number,
  difficulty: {
    type: Number,
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', LessonSchema);
