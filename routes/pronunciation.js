const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get pronunciation guide for a word
router.get('/guide/:word', async (req, res) => {
  try {
    const { word } = req.params;
    
    // Placeholder data - In production, integrate with real IPA database
    const guides = {
      'hello': {
        word: 'hello',
        ipa: '/həˈloʊ/',
        phonetic: 'huh-LOH',
        breakdown: [
          { sound: 'h', description: 'like in "hat"' },
          { sound: 'ə', description: 'like in "about"' },
          { sound: 'ˈ', description: 'stress marker' },
          { sound: 'l', description: 'like in "list"' },
          { sound: 'oʊ', description: 'like in "go"' }
        ],
        tips: [
          'Emphasize the second syllable (LOH)',
          'Keep the first vowel short and light',
          'End with a clear "oh" sound'
        ]
      },
      'pronunciation': {
        word: 'pronunciation',
        ipa: '/prəˌnʌnsiˈeɪʃən/',
        phonetic: 'pruh-NUN-see-AY-shun',
        breakdown: [
          { sound: 'pr', description: 'blend of p and r' },
          { sound: 'ə', description: 'like in "about"' },
          { sound: 'ˈnʌn', description: 'stressed NUN' },
          { sound: 'si', description: 'like in "see"' },
          { sound: 'ˈeɪʃən', description: 'stressed AY-shun' }
        ],
        tips: [
          'Stress the second and fourth syllables',
          'Practice the "sh" sound clearly',
          'This word is commonly mispronounced - take your time'
        ]
      }
    };

    const guide = guides[word.toLowerCase()] || {
      word,
      message: 'Guide not available yet. Try other words like "hello" or "pronunciation"'
    };

    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Practice pronunciation exercise
router.post('/exercise', authMiddleware, async (req, res) => {
  try {
    const { referenceWord, level } = req.body;

    // Placeholder analysis - In production, integrate with actual speech-to-text API
    const analysis = {
      word: referenceWord,
      accuracy: 85,
      clarity: 82,
      fluency: 75,
      overall: 81,
      feedback: [
        '✓ Good pronunciation overall',
        '→ Try to emphasize the stressed syllable more',
        '→ Slightly slower pace would be better'
      ],
      nextSteps: `Practice with similar words like "world", "work", "word"`,
      encouragement: 'Great effort! Keep practicing daily for better results.'
    };

    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
