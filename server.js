const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const lessonRoutes = require('./routes/lessons');
const quizRoutes = require('./routes/quiz');
const vocabularyRoutes = require('./routes/vocabulary');
const pronunciationRoutes = require('./routes/pronunciation');
const aiChatRoutes = require('./routes/aiChat');
const progressRoutes = require('./routes/progress');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ct-english')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

require('./config/socket')(io);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/pronunciation', pronunciationRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/progress', progressRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 CT-English API is live!`);
});

module.exports = app;
