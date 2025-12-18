
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

        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="logo-section">
            <div className="logo-image-container">
              <img
                src="/cwcp-city-logo.svg"
                alt="City Logo"
                className="login-logo-image"
              />
              <div className="text-republic">
                <p>REPUBLIC OF THE PHILIPPINES</p>
                <p>PROVINCE OF DAVAO DEL NORTE</p>
                <p>CITY OF TAGUM</p>
              </div>
            </div>

            <h1 className="text-portal-title">
              CANOCOTAN CONCERN PORTAL
            </h1>

            <p className="text-tagline">
              KEEPING COMMUNITIES SAFE AND CONNECTED!
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="login-card">
            <h2 className="login-title">Hello!</h2>
            <p className="login-subtitle">BCCP Moderator Login</p>

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
                placeholder="Email Address / Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Login</button>

              {message && (
                <p className="login-message">{message}</p>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;