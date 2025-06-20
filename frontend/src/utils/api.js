// src/utils/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/survey' });

export const submitSurvey = (sessionId, answers) => {
  return API.post('/submit', { sessionId, answers })
    .then(response => {
      console.log('Survey submitted:', response.data);
    })
    .catch(error => {
      console.error('Error submitting survey:', error);
    });
};
