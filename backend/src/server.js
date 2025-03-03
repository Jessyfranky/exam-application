import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import Question from "./models/Question.js";
import questions from "./data/questions.js";
import examRoutes from "./routes/examRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/examdb"; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to Local MongoDB"))
.catch(err => console.error(" MongoDB Connection Error:", err));

app.use("/api/exam", examRoutes);

const seedDatabase = async () => {
    try {
      const count = await Question.countDocuments();
      if (count === 0) {
        await Question.insertMany(questions);
        console.log(" Questions added to the database.");
      } else {
        console.log("Questions already exist.");
      }
    } catch (error) {
      console.error(" Error seeding database:", error);
    }
  };
  
  seedDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
