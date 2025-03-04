import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register API
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Exam Submission API
export const submitExam = async (userId, answers) => {
  try {
    const response = await axios.post(`${API_URL}/exam/submit`, { userId, answers });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Fetch User Data API (for Dashboard)
export const fetchUserData = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
