# 📚 Adding Content to CT-English

## Overview

The app backend is ready, but we need to add **Lessons, Vocabulary, and Quizzes** to the database.

You can add content in 2 ways:

1. **Using API Endpoints** (Manual)
2. **Using Seed Data Script** (Automatic)

---

## Method 1: Add Content via API (Simple)

### Add a Lesson

**Step 1:** Get your token by logging in

**Step 2:** Use Postman or curl to add a lesson:

```bash
curl -X POST http://localhost:5000/api/admin/lessons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Present Tense Verbs",
    "description": "Learn how to use present tense in English",
    "level": "A1",
    "category": "Grammar",
    "content": "The present tense is used for actions happening now or regular habits. Formula: Subject + Verb + Object",
    "examples": [
      {
        "english": "I eat breakfast every morning",
        "translation": "Je mange le petit déjeuner chaque matin",
        "audioUrl": ""
      },
      {
        "english": "She plays soccer on weekends",
        "translation": "Elle joue au football le week-end",
        "audioUrl": ""
      }
    ],
    "estimatedDuration": 15,
    "difficulty": 3
  }'
```

### Add Vocabulary

```bash
curl -X POST http://localhost:5000/api/admin/vocabulary \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "word": "hello",
    "definition": "A greeting word used to start a conversation",
    "partOfSpeech": "noun",
    "level": "A1",
    "examples": [
      {
        "sentence": "Hello, how are you?",
        "translation": "Bonjour, comment allez-vous?"
      }
    ],
    "synonyms": ["hi", "hey", "greetings"],
    "category": "Greetings",
    "difficulty": 1
  }'
```

### Add Quiz

```bash
curl -X POST http://localhost:5000/api/admin/quizzes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Basic Greetings Quiz",
    "description": "Test your knowledge of English greetings",
    "level": "A1",
    "category": "Greetings",
    "duration": 10,
    "passingScore": 70,
    "questions": [
      {
        "question": "What do you say when you meet someone?",
        "type": "multiple-choice",
        "options": ["Hello", "Goodbye", "Thanks", "Please"],
        "correctAnswer": "Hello",
        "explanation": "Hello is the standard greeting when meeting someone",
        "difficulty": 1
      },
      {
        "question": "True or False: 'Good night' is used as a greeting",
        "type": "true-false",
        "options": ["True", "False"],
        "correctAnswer": "False",
        "explanation": "'Good night' is used when saying goodbye before sleep",
        "difficulty": 1
      }
    ]
  }'
```

---

## Method 2: Seed Data Script (Better)

### Step 1: Create seed file

Create `seeds/seedData.js`:

```javascript
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Vocabulary = require('../models/Vocabulary');
const Quiz = require('../models/Quiz');

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ct-english');
    
    // Clear existing data
    await Lesson.deleteMany({});
    await Vocabulary.deleteMany({});
    await Quiz.deleteMany({});
    
    console.log('Database cleared');
    
    // Add A1 Level Lessons
    const a1Lessons = [
      {
        title: 'Hello World - Greetings',
        description: 'Learn basic English greetings',
        level: 'A1',
        category: 'Grammar',
        content: 'Basic greetings used in daily conversation',
        examples: [
          {
            english: 'Hello, nice to meet you',
            translation: 'Bonjour, ravi de vous rencontrer'
          }
        ],
        estimatedDuration: 10,
        difficulty: 1
      },
      {
        title: 'Present Simple Tense',
        description: 'Learn about present simple tense',
        level: 'A1',
        category: 'Grammar',
        content: 'Use for regular actions and facts',
        examples: [
          {
            english: 'I eat breakfast every day',
            translation: 'Je mange le petit déjeuner chaque jour'
          }
        ],
        estimatedDuration: 15,
        difficulty: 2
      }
    ];
    
    await Lesson.insertMany(a1Lessons);
    console.log('✅ Added A1 lessons');
    
    // Add A1 Vocabulary
    const a1Vocab = [
      {
        word: 'hello',
        definition: 'A greeting word',
        partOfSpeech: 'noun',
        level: 'A1',
        examples: [
          { sentence: 'Hello, how are you?', translation: 'Bonjour, comment allez-vous?' }
        ],
        synonyms: ['hi', 'hey'],
        category: 'Greetings',
        difficulty: 1
      },
      {
        word: 'goodbye',
        definition: 'A farewell expression',
        partOfSpeech: 'noun',
        level: 'A1',
        examples: [
          { sentence: 'Goodbye, see you later', translation: 'Au revoir, à plus tard' }
        ],
        synonyms: ['bye', 'farewell'],
        category: 'Greetings',
        difficulty: 1
      }
    ];
    
    await Vocabulary.insertMany(a1Vocab);
    console.log('✅ Added A1 vocabulary');
    
    // Add Quiz
    const quizzes = [
      {
        title: 'A1 Greetings Quiz',
        level: 'A1',
        category: 'Greetings',
        duration: 5,
        questions: [
          {
            question: 'What do you say when meeting someone?',
            type: 'multiple-choice',
            options: ['Hello', 'Goodbye', 'Thanks', 'Please'],
            correctAnswer: 'Hello',
            explanation: 'Hello is the standard greeting',
            difficulty: 1
          }
        ]
      }
    ];
    
    await Quiz.insertMany(quizzes);
    console.log('✅ Added quizzes');
    
    console.log('\n✅ Database seeding completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedData();
```

### Step 2: Run the seed script

```bash
node seeds/seedData.js
```

You should see:
```
✅ MongoDB connected
✅ Added A1 lessons
✅ Added A1 vocabulary
✅ Added quizzes
✅ Database seeding completed!
```

---

## Sample Data for All Levels

### A1 Level (Beginner) - 50 words
- hello, goodbye, yes, no, please, thank you
- I, you, he, she, it, we, they
- eat, drink, sleep, walk, run
- apple, water, bread, milk

### A2 Level (Elementary) - 150 words
- Add past tense words
- Add common phrases
- Family vocabulary
- Food and drinks

### B1 Level (Pre-Intermediate) - 250 words
- Business vocabulary
- Travel expressions
- Complex structures

### B2 Level (Intermediate) - 400 words
- Professional terms
- Advanced grammar
- Idioms

### C1 Level (Advanced) - 500 words
- Academic vocabulary
- Technical terms
- Literary expressions

### C2 Level (Mastery) - 600+ words
- Expert level vocabulary
- Nuanced expressions
- Cultural references

---

## How to Expand

To add more content:

1. Create lessons with different topics
2. Add vocabulary for each level
3. Create quizzes to test knowledge
4. Organize by category (Grammar, Vocabulary, etc.)

**That's it! Your CT-English app is now ready to use!** 🎉
