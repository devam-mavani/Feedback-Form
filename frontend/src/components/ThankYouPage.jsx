import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">Thank you for your feedback!</h1>
    </div>
  );
};

export default ThankYouPage;