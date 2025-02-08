import React from "react";
import { useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const navigate = useNavigate();

  const startQuizHandler = () => {
    navigate("/quiz"); 
  };

  return (
    <div className="start-quiz-container">
      <h1>Welcome to the Quiz</h1>
      <p>Click below to start the quiz!</p>
      <button onClick={startQuizHandler}>Start Quiz</button>
    </div>
  );
};

export default StartQuiz;
