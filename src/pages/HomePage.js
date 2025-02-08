import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";

const HomePage = () => {
  const { fetchQuizData } = useQuizContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-6">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz Game!</h1>
        <p className="text-lg mb-6">
          Test your knowledge with our exciting quiz.
        </p>
        <button
          onClick={() => {
            navigate("/quiz");
          }}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
