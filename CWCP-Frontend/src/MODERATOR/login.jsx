import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password,
      });

      // Login successful
      setMessage(res.data.message);
      console.log("Admin info:", res.data.admin);

      // Optionally, store login info or redirect:
      // localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.errorMessage || "Login failed");
    }
  };

  return (
    <div className="mod-login">
      <div className="login-container">
        {/* Background elements - Desktop only */}
        <div className="bg-left"></div>
        <div className="white-bg-left"></div>
        <div className="bg-green"></div>
        
        {/* Decorative Circles - Desktop only */}
        <div className="design-moon">
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 638 583">
            <circle cx="359.5" cy="304.5" r="278" />
            <circle cx="278.5" cy="278.5" r="278" />
          </svg>
        </div>

        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-image-container">
            <img
              src="/CWCP-LOGO.svg"
              alt="City Logo"
              className="logo-image"
            />
            <div className="text-republic">
              <p>REPUBLIC OF THE PHILIPPINES</p>
              <p>PROVINCE OF DAVAO DEL NORTE</p>
              <p>CITY OF TAGUM</p>
            </div>
          </div>
          <h1 className="text-portal-title">CITY WIDE CONCERN PORTAL</h1>
          <p className="text-tagline">
            KEEPING COMMUNITIES SAFE AND CONNECTED!
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2 className="login-title">Hello!</h2>
          <p className="login-subtitle">CWCP Moderator Login</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label htmlFor="username">USERNAME/EMAIL</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Email Address/Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>



            {message && <p className="login-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;