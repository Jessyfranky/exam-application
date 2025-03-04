import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default DarkModeToggle;
