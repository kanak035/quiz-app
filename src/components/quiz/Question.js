import React, { useState } from "react";
import { useQuizContext } from "../../context/QuizContext";

const Question = ({ questionData }) => {
  const { handleAnswer, currentQuestionIndex, questions } = useQuizContext();
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!questionData || !questionData.description) {
    return <div className="text-center text-lg w-screen">Loading...</div>;
  }

  const { description, options = [] } = questionData;

  const handleOptionClick = (index) => {
    if (!options[index]) return;

    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOptions.some(
      (index) => options[index]?.is_correct
    );
    handleAnswer(isCorrect);
    setSelectedOptions([]); // Reset selection
  };

  const handleSkipQuestion = () => {
    handleAnswer(false);
    setSelectedOptions([]);
  };

  return (
    <div className="question-container">
      <h2 className="text-2xl font-semibold mb-4">{description}</h2>
      <ul className="space-y-2">
        {options.length > 0 ? (
          options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`border border-gray-300 rounded-lg px-4 py-2 cursor-pointer transition ${
                selectedOptions.includes(index)
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {option?.description || "No description available"}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No options available</li>
        )}
      </ul>

      <div className="mt-4 flex gap-4">
        {selectedOptions.length > 0 && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next ➡"
              : "Submit ✅"}
          </button>
        )}
        <button
          onClick={handleSkipQuestion}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Skip ⏭
        </button>
      </div>
    </div>
  );
};

export default Question;
