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
    <div className="loginbody">
      <div className="left">
        <div className="logo">
          <img src="CWCP-LOGO.svg" alt="logo" />
        </div>
        <h2>City Wide Concern Portal</h2>
        <p>Keeping communities safe and connected</p>
      </div>

      <div className="right">
        <div className="login-box">
          <h2>Moderator Log In</h2>

          <label>USERNAME/EMAIL</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
