import React, { useState } from "react";
import "./customalert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <div className="custom-alert-header">
          <span className="alert-icon">📢</span>
          Citywide Concern Portal
        </div>
        <div className="custom-alert-body">
          {message}
        </div>
        <button className="custom-alert-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;