import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the external CSS
import { useDispatch } from "react-redux"; // Import useDispatch for Redux
import { loginSuccess } from "../features/auth/authSlice"; // Import the loginSuccess action

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Save the JWT token to localStorage
        console.log("Token stored:", data.token); // Debugging token storage
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user details

        // Dispatch an action to update the authentication state
        dispatch(loginSuccess(data.user)); // Dispatch loginSuccess action
        console.log("Authentication state updated in Redux"); // Debugging state update

        // Call handleLogin to update the authentication state in App.js
        handleLogin();

        navigate("/"); // Redirect to the home page after login
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        setError(
          errorData.message || "Invalid email or password. Please try again."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
