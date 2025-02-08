import React, { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";

const QuizCard = () => {
  const {
    questions,
    currentQuestionIndex,
    score,
    handleAnswer,
    isQuizCompleted,
  } = useQuizContext();

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  if (isQuizCompleted) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>Your final score: {score}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>; 
  }

  const { question, options, correctAnswer } = currentQuestion;

  const handleOptionSelect = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === correctAnswer;
    handleAnswer(isCorrect); 
  };

  return (
    <div className="quiz-card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="score">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default QuizCard;
