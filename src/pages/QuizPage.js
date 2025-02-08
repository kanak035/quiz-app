import React, { useState, useEffect, useCallback } from "react";
import { useQuizContext } from "../context/QuizContext";
import Question from "../components/quiz/Question";
import { Result } from "../components/quiz/Result";

const QuizPage = () => {
  const {
    questions = [],
    currentQuestionIndex,
    score,
    isQuizCompleted,
    handleAnswer,
    moveToNextQuestion,
  } = useQuizContext();

  const totalQuestions = questions.length;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [skippedQuestions, setSkippedQuestions] = useState(0);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) {
      handleAnswer(false);
      setSkippedQuestions((prev) => prev + 1);
    } else {
      handleAnswer(selectedAnswer);
    }
    setSelectedAnswer(null);
    moveToNextQuestion();
  }, [selectedAnswer, handleAnswer, moveToNextQuestion]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNext]);

  useEffect(() => {
    setTimeLeft(15);
  }, [currentQuestionIndex]);

  if (!questions || totalQuestions === 0) {
    return (
      <div className="w-screen flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-2xl text-gray-700 font-semibold animate-pulse">
          Loading Questions...
        </p>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <Result
        score={score}
        totalQuestions={totalQuestions}
        skipped={skippedQuestions}
      />
    );
  }

  return (
    <div className="w-screen quiz-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </h2>
          <p className="text-lg font-bold text-red-500">⏳ {timeLeft}s</p>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Quiz Time! 🚀
        </h1>

        <Question
          questionData={questions[currentQuestionIndex]}
          onOptionSelect={setSelectedAnswer}
          handleNext={handleNext}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
        />
      </div>
    </div>
  );
};

export default QuizPage;
