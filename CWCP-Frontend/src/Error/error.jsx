import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

const ErrorPage = () => (
  <div className="error-page">
    <img src="CWCP-LOGO.svg" alt="CWCP Logo" />
    <div>
      <h1>Error</h1>
      <Link to="/">Click here to go back</Link>
    </div>
  </div>
);

export default ErrorPage;
