import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const WelcomePage = ({ setSessionId }) => {
  const navigate = useNavigate();

  const startSurvey = () => {
    const session = uuidv4();
    setSessionId(session);
    navigate('/questions');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Survey</h1>
      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-800" onClick={startSurvey}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;