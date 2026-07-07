# 🚀 CT-English - Setup & Installation Guide

## Quick Start (5 Minutes)

### Prerequisites
Before you start, install these:
1. **Node.js** - Download from [nodejs.org](https://nodejs.org)
2. **MongoDB** - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
3. **Git** - Download from [git-scm.com](https://git-scm.com)

### Step 1: Clone the Repository

```bash
git clone https://github.com/phatchetra590-hub/CT-English.git
cd CT-English
```

### Step 2: Install Dependencies

```bash
npm install
```

This downloads all required libraries (~5 minutes).

### Step 3: Setup Environment Variables

Create a file named `.env` in the root folder with:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ct-english
JWT_SECRET=your_secret_key_12345
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-key-here
CLIENT_URL=http://localhost:3000
```

**Get OpenAI Key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up (free trial available)
3. Create an API key
4. Paste it in `.env`

### Step 4: Start MongoDB

**On Windows:**
```bash
mongod
```

**On Mac/Linux:**
```bash
mongod --dbpath ~/data/db
```

Keep this running in a terminal.

### Step 5: Start the Server

Open a new terminal and run:

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
📚 CT-English API is live!
```

### Step 6: Test the API

Open your browser or use [Postman](https://www.postman.com/downloads/):

```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2024-07-07T..."
}
```

---

## Common Issues & Solutions

### Issue: "MongoDB not found"
**Solution:** 
- Make sure MongoDB is installed and running
- Check if `mongod` process is active

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: "Port 5000 already in use"
**Solution:**
Change PORT in `.env` to 5001 or another number

### Issue: "OpenAI API error"
**Solution:**
- Check if your API key is correct
- Ensure you have credits in OpenAI account
- Try a different key

---

## API Endpoints to Test

### 1. Register User

**URL:** `POST http://localhost:5000/api/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "proficiencyLevel": "A1",
  "learningGoal": "Travel"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "proficiencyLevel": "A1"
  }
}
```

### 2. Login User

**URL:** `POST http://localhost:5000/api/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get User Profile

**URL:** `GET http://localhost:5000/api/user/profile`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Chat with AI

**URL:** `POST http://localhost:5000/api/ai-chat/chat`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:**
```json
{
  "message": "Hello, how are you?",
  "level": "A1",
  "topic": "greetings"
}
```

### 5. Get Lessons by Level

**URL:** `GET http://localhost:5000/api/lessons/by-level/A1`

### 6. Get Vocabulary

**URL:** `GET http://localhost:5000/api/vocabulary/by-level/A1`

### 7. Get Daily Vocabulary Practice

**URL:** `GET http://localhost:5000/api/vocabulary/daily/practice`

### 8. Check Grammar

**URL:** `POST http://localhost:5000/api/ai-chat/correct-grammar`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

**Body:**
```json
{
  "text": "I go to school yesterday"
}
```

---

## Next: Add Content to Database

To add lessons and vocabulary, see the **SEEDING_DATA.md** file.

---

## Troubleshooting Commands

```bash
# Check if MongoDB is running
mongo

# Stop the server
Ctrl + C

# Clear npm cache
npm cache clean --force

# Reset everything
rm -rf node_modules package-lock.json
npm install
```

---

## Need Help?

- Check error messages carefully
- Google the error message
- Check [CT-English Issues](https://github.com/phatchetra590-hub/CT-English/issues)
- Ask on Stack Overflow

**Happy Learning! 🎉**
