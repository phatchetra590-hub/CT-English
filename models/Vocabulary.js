const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    lowercase: true
  },
  definition: {
    type: String,
    required: true
  },
  partOfSpeech: {
    type: String,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun'],
    required: true
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true
  },
  examples: [{
    sentence: String,
    translation: String
  }],
  synonyms: [String],
  antonyms: [String],
  audioUrl: String,
  imageUrl: String,
  etymology: String,
  mnemonicTip: String,
  category: String,
  difficulty: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
