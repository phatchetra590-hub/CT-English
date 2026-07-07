const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// AI Chat conversation
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, level, topic } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const systemPrompt = `You are an AI English tutor helping students learn English at ${level || 'intermediate'} level. 
    Topic: ${topic || 'general conversation'}. 
    Provide corrections gently, explain grammar when needed, and encourage the student. Keep responses concise and friendly.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const assistantMessage = response.data.choices[0].message.content;

    res.json({
      success: true,
      message: assistantMessage,
      level,
      topic
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
});

// Grammar correction
router.post('/correct-grammar', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a grammar checker. Correct the text and explain the mistakes clearly.' },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      max_tokens: 300
    });

    const correction = response.data.choices[0].message.content;

    res.json({
      success: true,
      original: text,
      correction,
      feedback: 'Grammar checked successfully'
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Vocabulary suggestion
router.post('/suggest-vocabulary', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Suggest better vocabulary or synonyms for the given text to make it more professional or interesting.' },
        { role: 'user', content: text }
      ],
      temperature: 0.5,
      max_tokens: 250
    });

    const suggestions = response.data.choices[0].message.content;

    res.json({
      success: true,
      original: text,
      suggestions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
