import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import QuestionsPage from './components/QuestionsPage';
import ThankYouPage from './components/ThankYouPage';

const App = () => {
  const [sessionId, setSessionId] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage setSessionId={setSessionId} />} />
        <Route path="/questions" element={<QuestionsPage sessionId={sessionId} />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;