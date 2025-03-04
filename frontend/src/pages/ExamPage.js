import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import examQuestions from "../data/questions.js";
import "../styles/global.css";

const ExamPage = () => {
  const navigate = useNavigate();
  // Get selected subjects from localStorage and remove duplicates
  const storedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];
  const subjects = [...new Set(storedSubjects)];
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Structure: { subject: { questionId: selectedOption, ... }, ... }
  const [answers, setAnswers] = useState({});
  // Timer: 10 minutes (600 seconds) per subject
  const [timeLeft, setTimeLeft] = useState(600);
  // Exam state
  const [examStarted, setExamStarted] = useState(false);
  const [subjectSubmitted, setSubjectSubmitted] = useState(false);

  const currentSubject = subjects[currentSubjectIndex];
  const questions = examQuestions[currentSubject] || [];

  // Start a 3-second countdown when subject changes
  useEffect(() => {
    setExamStarted(false);
    setTimeLeft(600);
    let countdown = 3;
    const countdownTimer = setInterval(() => {
      countdown -= 1;
      if (countdown <= 0) {
        clearInterval(countdownTimer);
        setExamStarted(true);
      }
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, [currentSubjectIndex]);

  // Timer for each subject
  useEffect(() => {
    if (!examStarted) return;
    if (timeLeft <= 0) {
      handleSubjectSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, examStarted]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [currentSubject]: {
        ...prev[currentSubject],
        [questionId]: option,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Subject complete, trigger green tick and move to next subject
      handleSubjectSubmit();
    }
  };

  const handleSubjectSubmit = () => {
    setSubjectSubmitted(true);
    setTimeout(() => {
      setSubjectSubmitted(false);
      setCurrentQuestionIndex(0);
      if (currentSubjectIndex < subjects.length - 1) {
        setCurrentSubjectIndex(currentSubjectIndex + 1);
      } else {
        // All subjects completed: save answers and navigate back to Dashboard
        localStorage.setItem("examAnswers", JSON.stringify(answers));
        navigate("/dashboard");
      }
    }, 3000); // 3-second green tick animation
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Before exam starts, show countdown message (3-second countdown)
  if (!examStarted) {
    return (
      <div className="container exam-container">
        <h2>{currentSubject} Exam</h2>
        <p>Starting in 3 seconds...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container exam-container">
        <h2>{currentSubject} Exam</h2>
        <p>No questions available for {currentSubject}.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container exam-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{currentSubject} Exam</h2>
        <div className="timer" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Horizontal list of selected subjects */}
      <div className="subject-list">
        {subjects.map((sub, idx) => (
          <div
            key={sub}
            className="subject-item"
            style={{ opacity: idx === currentSubjectIndex ? 1 : 0.5 }}
          >
            {sub}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", textAlign: "left" }}>
        <h3>Question {currentQuestionIndex + 1} of {questions.length}</h3>
        <p style={{ marginBottom: "1rem" }}>{currentQuestion.question}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {currentQuestion.options.map(option => (
            <label key={option} className="option" style={{ padding: "0.5rem", background: "#f1f1f1", borderRadius: "6px" }}>
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                onChange={() => handleAnswerChange(currentQuestion.id, option)}
                checked={answers[currentSubject] && answers[currentSubject][currentQuestion.id] === option}
                style={{ marginRight: "0.5rem" }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {subjectSubmitted && <div className="green-tick">&#10004;</div>}
      <button onClick={handleNextQuestion} style={{ marginTop: "1rem" }}>
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Subject"}
      </button>
    </div>
  );
};

export default ExamPage;
