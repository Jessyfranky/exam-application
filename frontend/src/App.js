import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import Dashboard from "./pages/Dashboard.js";
import ExamPage from "./pages/ExamPage.js";
import DarkModeToggle from "./components/DarkModeToggle.js";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </Router>
  );
}

export default App;
