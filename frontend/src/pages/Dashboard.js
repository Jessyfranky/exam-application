import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/api.js";
import examQuestions from "../data/questions.js";
import "../styles/global.css";

const subjectsList = ["English", "Maths", "Chemistry", "History", "Biology"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectError, setSubjectError] = useState("");
  const [subjectSelectionCompleted, setSubjectSelectionCompleted] = useState(false);
  const [calculatedScores, setCalculatedScores] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      navigate("/login");
      return;
    }
    // Fetch profile info (if available from your API)
    fetchUserData(user._id, token)
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user data:", err));

    // Check if subjects have been selected
    const storedSubjects = JSON.parse(localStorage.getItem("selectedSubjects"));
    if (storedSubjects) {
      // Ensure English is included
      setSelectedSubjects(storedSubjects.filter((s) => s !== "English"));
    } else {
      setSelectedSubjects(["English"]);
    }

    // Calculate scores if exam answers exist
    const examAnswers = JSON.parse(localStorage.getItem("examAnswers"));
    if (examAnswers) {
      const scores = {};
      Object.keys(examAnswers).forEach((subject) => {
        const subjectQuestions = examQuestions[subject] || [];
        const subjectUserAnswers = examAnswers[subject];
        let correctCount = 0;
        subjectQuestions.forEach((q) => {
          if (subjectUserAnswers && subjectUserAnswers[q.id] === q.correctAnswer) {
            correctCount++;
          }
        });
        scores[subject] = correctCount;
      });
      setCalculatedScores(scores);
    }
  }, [navigate]);

  const handleToggleSubject = (subject) => {
    // English is compulsory
    if (subject === "English") return;
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if (selectedSubjects.length < 2) {
      setSubjectError("Please select at least 2 additional subjects (English is compulsory).");
      return;
    }
    const finalSubjects = ["English", ...selectedSubjects];
    localStorage.setItem("selectedSubjects", JSON.stringify(finalSubjects));
    setSubjectSelectionCompleted(true);
  };

  const handleTakeExam = () => {
    navigate("/exam");
  };

  const handleRetakeExam = () => {
    localStorage.removeItem("examAnswers");
    localStorage.removeItem("selectedSubjects");
    setCalculatedScores({});
    setSubjectSelectionCompleted(false);
    setSelectedSubjects(["English"]);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      {/* User Profile Section */}
      {userData ? (
        <div className="profile-section">
          <p>Welcome, {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <hr />

      {/* Exam Section */}
      {Object.keys(calculatedScores).length > 0 ? (
        <div className="score-section">
          <h3>Your Exam Scores</h3>
          {Object.keys(calculatedScores).map((subject) => (
            <div key={subject} className="score-item">
              <h4>{subject}</h4>
              <p>
                Score: {calculatedScores[subject]} / {examQuestions[subject].length}
              </p>
            </div>
          ))}
          <button onClick={handleRetakeExam}>Retake Exam</button>
        </div>
      ) : subjectSelectionCompleted ? (
        <div className="exam-ready-section">
          <h3>Selected Subjects</h3>
          <div className="subject-list">
            {["English", ...selectedSubjects].map((subject) => (
              <div key={subject} className="subject-item">
                {subject}
              </div>
            ))}
          </div>
          <button onClick={handleTakeExam}>Take Exam</button>
        </div>
      ) : (
        <div className="subject-selection-section">
          <h3>Select Subjects for Your Exam</h3>
          <p>
            English is compulsory. Please select at least 2 additional subjects from:{" "}
            {subjectsList.filter((s) => s !== "English").join(", ")}.
          </p>
          <form onSubmit={handleSubjectSubmit}>
            <ul className="subject-list" style={{ justifyContent: "center" }}>
              {subjectsList.map((subject) => (
                <li key={subject} className="subject-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={subject === "English" || selectedSubjects.includes(subject)}
                      onChange={() => handleToggleSubject(subject)}
                      disabled={subject === "English"}
                    />
                    {subject} {subject === "English" && "(Compulsory)"}
                  </label>
                </li>
              ))}
            </ul>
            {subjectError && <p className="error">{subjectError}</p>}
            <button type="submit">Save Subjects</button>
          </form>
        </div>
      )}

      <hr />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
