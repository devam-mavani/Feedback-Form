// backend/routes/survey.js
const express = require('express');
const router = express.Router();
const Response = require('../models/Response.js');

// Save entire survey at once
router.post('/submit', async (req, res) => {
  const { sessionId, answers } = req.body;
  console.log("Received survey:", { sessionId, answers });

  try {
    const response = new Response({ sessionId, answers });
    await response.save();
    console.log("Survey saved");
    res.status(200).json({ message: 'Survey saved' });
  } catch (error) {
    console.error("Error saving survey:", error);
    res.status(500).json({ message: 'Failed to save survey', error });
  }
});

module.exports = router;
