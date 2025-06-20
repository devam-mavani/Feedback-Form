import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSurvey } from '../utils/api';

const questions = [
  { text: 'How satisfied are you with our products?', type: 'rating-5' },
  { text: 'How fair are the prices compared to similar retailers?', type: 'rating-5' },
  { text: 'How satisfied are you with the value for money of your purchase?', type: 'rating-5' },
  { text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating-10' },
  { text: 'What could we do to improve our service?', type: 'text' }
];

const QuestionsPage = ({ sessionId }) => {
  const [current, setCurrent] = useState(0);
  const [inputText, setInputText] = useState('');
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const question = questions[current];
  const range = parseInt(question.type.split('-')[1]);

  const handleAnswer = async (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = answer;
    setAnswers(updatedAnswers);
    setInputText('');

    if (current + 1 === questions.length) {
      const formattedAnswers = updatedAnswers.map((ans, idx) => ({
        questionId: idx,
        answer: ans
      }));

      await submitSurvey(sessionId, formattedAnswers);
      navigate('/thankyou');
    } else {
      setCurrent(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left side - Question Number */}
      <div className="text-gray-800 text-2xl text-right truncate max-w-md sm:max-w-lg md:max-w-xl">
        Question
      </div>
      

      {/* Right side - "Question" text */}
      <div className="text-gray-700 font-semibold text-lg">
        <h2 className="text-xl mb-2">
          {current + 1} / {questions.length}
        </h2>
      </div>
    </div>
  </div>
</nav>


      {/* Question Content */}
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <p className="text-lg text-center mb-4">{question.text}</p>

        {/* Conditional rendering for input type */}
        {question.type === 'text' ? (
          <div className="w-full max-w-md">
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={() => handleAnswer(inputText)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: range }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleAnswer(i + 1)}
                className={`px-4 py-2 ${answers[current] === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded hover:bg-blue-500 hover:text-white`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={current === 0}
            className="px-6 py-2 hover:bg-blue-800 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={current + 1 === questions.length}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
