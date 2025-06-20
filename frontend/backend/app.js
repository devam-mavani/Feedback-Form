const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const surveyRoutes = require('./routes/survey');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/survey', surveyRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Mongo Error:', err));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
