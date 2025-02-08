import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../../context/QuizContext";

export const Result = ({ score, totalQuestions, skipped }) => {
  const navigate = useNavigate();
  const { resetQuiz } = useQuizContext(); 

  const correctAnswers = score;
  const wrongAnswers = totalQuestions  - skipped; 
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-96 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Quiz Completed!
        </h2>

        <p className="text-lg font-semibold text-gray-700 mb-2">
          Your Score: <span className="text-blue-600">{score}</span>
        </p>

        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-800">
          <p className="font-medium">
            Total Questions: <span className="font-bold">{totalQuestions}</span>
          </p>
          <p className="font-medium text-green-600">
            Correct Answers: <span className="font-bold">{correctAnswers}</span>
          </p>
          <p className="font-medium text-red-600">
            Wrong Answers: <span className="font-bold">{wrongAnswers}</span>
          </p>
          <p className="font-medium text-yellow-600">
            Skipped Questions: <span className="font-bold">{skipped}</span>
          </p>
          <p className="font-medium text-indigo-600">
            Score Percentage: <span className="font-bold">{percentage}%</span>
          </p>

          <div className="w-full bg-gray-200 rounded-full mt-3">
            <div
              className="h-4 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => {
              resetQuiz();
              navigate("/quiz");
            }}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            🔄 Restart Quiz
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            🏠 Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};
