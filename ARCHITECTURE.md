# 🎯 CT-English Architecture Overview

## What is This App?

**CT-English** is an AI-powered English learning platform that:
- Teaches English from A1 (Beginner) to C2 (Advanced)
- Uses AI to improve grammar, vocabulary, and pronunciation
- Tracks user progress with XP and streaks
- Personalizes learning paths

---

## Technology Stack

### Backend
```
Node.js + Express.js
       ↓
   MongoDB (Database)
       ↓
  OpenAI API (AI Tutor)
       ↓
   JWT (Authentication)
```

### Frontend (To be built)
```
React.js
   ↓
UI Components
   ↓
API Calls to Backend
```

---

## Folder Structure

```
CT-English/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Configuration (secrets)
├── config/
│   └── socket.js         # Real-time connections
├── models/
│   ├── User.js           # User schema
│   ├── Lesson.js         # Lesson schema
│   ├── Vocabulary.js     # Vocabulary schema
│   ├── Quiz.js           # Quiz schema
│   ├── Progress.js       # User progress
│   └── UserProgress.js   # Quiz results
├── routes/
│   ├── auth.js           # Login/Register
│   ├── user.js           # User profile
│   ├── lessons.js        # Lesson endpoints
│   ├── vocabulary.js     # Vocabulary endpoints
│   ├── quiz.js           # Quiz endpoints
│   ├── aiChat.js         # AI tutor endpoints
│   ├── pronunciation.js  # Pronunciation endpoints
│   └── progress.js       # Progress tracking
├── middleware/
│   └── auth.js           # JWT verification
└── seeds/
    └── seedData.js       # Database seeding
```

---

## How It Works

### 1. User Registration
```
User enters email & password
         ↓
  Validate input
         ↓
  Hash password
         ↓
  Save to MongoDB
         ↓
  Generate JWT token
         ↓
  Send token to frontend
```

### 2. User Learning
```
User selects lesson
         ↓
  Backend sends lesson content
         ↓
  User completes lesson
         ↓
  Send score & time spent
         ↓
  Backend calculates XP
         ↓
  Update user progress
         ↓
  Show results
```

### 3. AI Chat (Grammar Correction)
```
User types message
         ↓
  Send to OpenAI API
         ↓
  OpenAI corrects & explains
         ↓
  Send response back
         ↓
  Display to user
```

### 4. Progress Tracking
```
User completes lessons
         ↓
  Backend stores progress
         ↓
  Calculate statistics
         ↓
  Update dashboard
         ↓
  Show achievements
```

---

## Database Schema

### User Collection
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "proficiencyLevel": "A1",
  "learningGoal": "Travel",
  "totalXP": 250,
  "streak": 5,
  "badges": ["First Lesson", "Week Warrior"],
  "subscriptionPlan": "free",
  "createdAt": "2024-07-07T..."
}
```

### Lesson Collection
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Present Tense Verbs",
  "level": "A1",
  "category": "Grammar",
  "content": "The present tense...",
  "examples": [
    {
      "english": "I eat breakfast",
      "translation": "Je mange le petit déjeuner"
    }
  ],
  "estimatedDuration": 15,
  "difficulty": 3
}
```

### Vocabulary Collection
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "word": "hello",
  "definition": "A greeting word",
  "partOfSpeech": "noun",
  "level": "A1",
  "examples": [
    {
      "sentence": "Hello, how are you?",
      "translation": "Bonjour, comment allez-vous?"
    }
  ],
  "synonyms": ["hi", "hey"],
  "category": "Greetings"
}
```

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/add-xp` - Add experience points
- `GET /api/user/stats` - Get statistics

### Lessons
- `GET /api/lessons/by-level/:level` - Get lessons by level
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/:id/complete` - Mark complete

### Vocabulary
- `GET /api/vocabulary/by-level/:level` - Get vocab by level
- `GET /api/vocabulary/search/:keyword` - Search vocabulary
- `GET /api/vocabulary/daily/practice` - Daily practice words

### Quiz
- `GET /api/quiz` - Get all quizzes
- `POST /api/quiz/:id/submit` - Submit answers

### AI Features
- `POST /api/ai-chat/chat` - Chat with AI tutor
- `POST /api/ai-chat/correct-grammar` - Grammar correction

### Progress
- `GET /api/progress/dashboard` - User dashboard
- `GET /api/progress/stats` - Detailed statistics

---

## Features Included

✅ User authentication (JWT)
✅ Lesson management
✅ Vocabulary practice
✅ Quiz system
✅ Progress tracking
✅ AI tutor (OpenAI integration)
✅ Grammar correction
✅ Pronunciation guide
✅ Gamification (XP, streaks, badges)
✅ Real-time features (Socket.io ready)

---

## What's Missing (Next Steps)

- React.js frontend
- Mobile app (React Native)
- Video lessons
- Live group sessions
- User community features
- Admin dashboard

---

## How to Extend

### Add New Feature
1. Create model in `models/`
2. Create routes in `routes/`
3. Add middleware if needed
4. Test with Postman

### Example: Add Achievement System
```javascript
// models/Achievement.js
const AchievementSchema = new Schema({
  name: String,
  description: String,
  requirement: Number,
  icon: String
});

// routes/achievements.js
router.get('/my-achievements', authMiddleware, async (req, res) => {
  // Get user achievements
});
```

---

## Security Notes

✅ Passwords are hashed with bcrypt
✅ JWT tokens for authentication
✅ Environment variables for secrets
✅ CORS enabled
✅ Input validation

---

**Happy Building! 🚀**
