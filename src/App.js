import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
          <div className=" bg-white shadow-lg rounded-lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
