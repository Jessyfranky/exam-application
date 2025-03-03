import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get questions for selected subjects
router.get("/questions", async (req, res) => {
  try {
    const { subjects } = req.query; // Subjects will be passed as a query parameter
    if (!subjects) return res.status(400).json({ message: "Subjects are required." });

    const subjectArray = subjects.split(","); // Convert "Maths,English" to an array
    const questions = await Question.find({ subject: { $in: subjectArray } });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Submit answers
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body; // Expecting { questionId: "userAnswer" }
    if (!answers) return res.status(400).json({ message: "Answers are required." });

    let score = 0;
    let total = Object.keys(answers).length;

    // Check answers
    for (const questionId in answers) {
      const question = await Question.findById(questionId);
      if (question && question.correctAnswer === answers[questionId]) {
        score++;
      }
    }

    // Calculate performance
    const percentage = (score / total) * 100;
    let remark = percentage >= 75 ? "Excellent" : percentage >= 50 ? "Good" : "Needs Improvement";

    res.json({ score, total, percentage, remark });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
