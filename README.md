Exam Application is a web-based platform that allows students to register, log in, select exam subjects (with English being compulsory), take exams subject by subject, and view their scores on a dashboard. The application features a modern, responsive user interface with a dark mode toggle and smooth animations.

Features

- User Registration & Login:
  - New users can register and then log in to verify their account.
  
- Subject Selection:
  - After logging in, users select their exam subjects (English is compulsory plus at least 2 additional subjects).
  - Selected subjects are displayed horizontally on the dashboard.
  
- Exam Interface:
  - Exams are taken one subject at a time.
  - Each subject consists of 10 questions.
  - A 3-second countdown starts before each subject exam begins.
  - Questions are displayed one at a time in a clear, spaced-out layout.
  - After answering a subject’s questions, a green tick animation displays before moving to the next subject.
  
- Dashboard:
  - Displays the user’s profile information and exam scores for each subject.
  - If the exam was taken previously, a “Retake Exam” button is available.
  - A Logout button is provided.
  
- Dark Mode Toggle:
  - Easily switch between light and dark themes with a toggle button.

Tech Stack

- Frontend: 
  - React, React Router, Axios  
  - CSS (with custom properties for theming, responsive design, and animations)
  
- Backend:
  - Node.js, Express, MongoDB (Mongoose)  
  - JWT for authentication, bcryptjs for password hashing
 
  Installation and Setup

 Backend

1. Navigate to the backend folder:**
   ```bash
   cd exam-app-backend
Install dependencies:
bash
Copy
Edit
npm install
Create a .env file in the backend root with:
env
Copy
Edit
MONGO_URI=mongodb://127.0.0.1:27017/examdb
JWT_SECRET=your_secret_key
PORT=5000
Start the backend server:
bash
Copy
Edit
npm run dev
The backend will run on http://localhost:5000.
Frontend
Navigate to the frontend folder:
bash
Copy
Edit
cd exam-app-frontend
Install dependencies:
bash
Copy
Edit
npm install
Start the frontend application:
bash
Copy
Edit
npm start
The frontend will open in your browser at http://localhost:3000.
Usage
Registration & Login:

Register a new account via the Registration page.
After registration, log in to verify your account (an informational message is shown on the Login page).
Dashboard:

After login, your profile is displayed.
You can then select exam subjects (English is compulsory; choose at least 2 more).
Once you save your subject choices, a horizontal list of selected subjects is shown.
Click "Take Exam" to begin.
Exam Interface:

A 3-second countdown will start before the exam for each subject begins.
Questions for each subject are displayed one at a time with clearly spaced options.
After answering each question, click "Next Question". On the last question of a subject, click "Submit Subject".
A green tick animation (3 seconds) will display upon subject submission before automatically moving to the next subject.
After all subjects are completed, your answers are saved and you are navigated back to the Dashboard.
Viewing Scores:

On the Dashboard, your exam scores for each subject are calculated and displayed.
If exam scores already exist, you can click "Retake Exam" to start over.
Dark Mode:

Use the dark mode toggle button in the top-right corner to switch between light and dark themes.
Logout:

Click "Logout" on the Dashboard to end your session.
Contributing
Feel free to fork the repository and submit pull requests if you have suggestions, improvements, or bug fixes.

License
This project is licensed under the MIT License.
