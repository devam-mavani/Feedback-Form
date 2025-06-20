// backend/models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  answers: [
    {
      questionId: Number,
      answer: mongoose.Schema.Types.Mixed, // Supports rating or text
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);
