// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Adjust your base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization Header if Token Exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
