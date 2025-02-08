import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);


  const fetchQuizData = async () => {
    try {
      const response = await axios.get("/Uw5CrX");
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizCompleted(false);
    setTimeLeft(30);
    fetchQuizData(); 
  };
    const moveToNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsQuizCompleted(true);
      }
    };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        score,
        isQuizCompleted,
        fetchQuizData,
        handleAnswer,
        resetQuiz,
        moveToNextQuestion,
        timeLeft,
        setTimeLeft, 
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
