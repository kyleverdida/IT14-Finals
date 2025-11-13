import React from "react";
import "./cards.css";
import { useLocation } from "react-router-dom";

const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case "life-threatening":
    case "critical":
      return "critical";
    case "hazard":
    case "high":
      return "high";
    case "inconvenient":
    case "medium":
    case "low":
      return "low";
    default:
      return "neutral";
  }
};

const Cards = ({ _id, title, area, comment, status, severity, timestamp, photo, approved }) => {
  const location = useLocation();
  const severityClass = getSeverityColor(severity);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_URL_UPLOAD = import.meta.env.VITE_API_URL_UPLOAD;
  const imageSrc = photo ? `${API_URL_UPLOAD}/${photo}` : "https://placehold.co/600x400?text=No+Image";

  const handleAPIAction = async (url, method, successMsg, errorMsg) => {
    try {
      const res = await fetch(url, { method });
      if (res.ok) {
        alert(successMsg);
        location.reload();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Error: ${err.message || err.errorMessage || errorMsg}`);
      }
    } catch (err) {
      alert("⚠️ Network error.");
      console.error(err);
    }
  };

  const handleApprove = () => handleAPIAction(`${API_URL}/approve/${_id}`, "PUT", "✅ Approved!", "Failed to approve post");
  const handleReject = () => handleAPIAction(`${API_URL}/reject/${_id}`, "PUT", "❌ Rejected!", "Failed to reject post");
  const handleDelete = () => {
    if (confirm("⚠️ Delete this post permanently?")) {
      handleAPIAction(`${API_URL}/delete/${_id}`, "DELETE", "🗑️ Deleted!", "Failed to delete post");
    }
  };

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(`${API_URL}/status/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      alert(`🔁 Status changed to "${newStatus}"`);
      location.reload();
    } else {
      alert("Failed to change status");
    }
  };

  const renderButtons = () => {
    if (location.pathname === "/dashboard") {
      return (
        <div className="mod-buttons">
          {!approved ? (
            <button className="btn approve" onClick={handleApprove}>Approve</button>
          ) : (
            <button className="btn reject" onClick={handleReject}>Reject</button>
          )}
          <button className="btn delete" onClick={handleDelete}>Delete</button>

          <select className="status-dropdown" value={status} onChange={(e) => handleChangeStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`card ${severityClass}`}>
      <div className="card-image">
        <img src={imageSrc} alt={title} />
        <div className="severity-bar"></div>
      </div>

      <div className="card-body">
        <div className="card-header">
          <h3>{title}</h3>
          <span className={`status-tag status-${status?.toLowerCase()}`}>{status}</span>
        </div>

        <p className="card-area">{area}</p>

        <div className="meta">
          <span>Severity: {severity}</span>
          <span>Reported: {new Date(timestamp).toLocaleDateString()}</span>
        </div>

        <p className="comment"><strong>Comment:</strong> {comment}</p>

        {renderButtons()}
      </div>
    </div>
  );
};

export default Cards;
