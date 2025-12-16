import React, { useState } from "react";
import "./cards.css";
import { useLocation } from "react-router-dom";
import CustomAlert from "../Custom Alert/customalert.jsx";
import RejectionModal from "../Rejection Modal/rejectionmodal.jsx";     // Add this import

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

const formatAreaName = (area) => {
  if (!area) return "";
  return area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Cards = ({
  _id,
  title,
  area,
  description,
  status,
  severity,
  photo,
  rejection_reason
}) => {
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false); // Add this state
  const severityClass = getSeverityColor(severity);
  const API_URL = import.meta.env.VITE_API_URL;

  const rejectionReason = rejection_reason || "";


  const imageSrc = photo
    ? `${photo}`
    : "https://placehold.co/600x400?text=No+Image";

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const closeAlert = () => {
    setAlertMessage(null);
    // window.location.reload();
  };

  const handleAPIAction = async (url, method, successMsg, errorMsg, body = null) => {
    try {
      const options = { method };
      if (body) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(body);
      }

      const res = await fetch(url, options);
      if (res.ok) {
        showAlert(successMsg);
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert(`Error: ${err.message || err.errorMessage || errorMsg}`);
      }
    } catch (err) {
      showAlert("⚠️ Network error.");
      console.error(err);
    }
  };

  const handleApprove = () =>
    handleAPIAction(
      `${API_URL}/approve/${_id}`,
      "PUT",
      "✅ Approved!",
      "Failed to approve post"
    );

  const handleReject = () => {
    setShowRejectionModal(true); // Show modal instead of immediate rejection
  };

  const handleRejectConfirm = (reason) => {
    setShowRejectionModal(false);
    handleAPIAction(
      `${API_URL}/reject/${_id}`,
      "PUT",
      "❌ Rejected!",
      "Failed to reject post",
      { reason } // <-- this must be an object
    );
  };


  const handleRejectCancel = () => {
    setShowRejectionModal(false);
  };



  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(`${API_URL}/status/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      showAlert(`🔁 Status changed to "${newStatus}"`);
    } else {
      showAlert("Failed to change status");
    }
  };

  const renderButtons = () => {
    // If rejected, show reason regardless of page
    if (status === "resolved") return null;
    if (status === "rejected") {
      return (
        <div className="cards-rejection-info">
          <label>Rejection Reason:</label>
          <textarea
            className="cards-rejection-textarea"
            value={rejectionReason}
            readOnly
            rows={4}
          />
        </div>
      );
    }

    // Otherwise, show buttons only on dashboard
    if (location.pathname !== "/dashboard") return null;

    return (
      <div className="mod-buttons">
        <button
          className="btn approve"
          onClick={() => handleChangeStatus("resolved")}
        >
          Resolved
        </button>

        <button className="btn reject" onClick={handleReject}>
          Reject
        </button>

        <select
          className="status-dropdown"
          value={status}
          onChange={(e) => handleChangeStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>
    );
  };



  return (
    <>
      {alertMessage && (
        <CustomAlert message={alertMessage} onClose={closeAlert} />
      )}

      {showRejectionModal && (
        <RejectionModal
          onConfirm={handleRejectConfirm}
          onCancel={handleRejectCancel}
        />
      )}

      <div className="card-wrapper">
        <div className={`card ${severityClass}`}>
          <div className="card-image">
            <img src={imageSrc} alt={title} />
            <div className="severity-bar"></div>
          </div>

          <div className="card-body">
            <div className="card-header">
              <h3>{title}</h3>

              {/* Status Tag */}
              <span className={`status-tag status-${status?.toLowerCase()}`}>
                {status}
              </span>

              {/* NEW Severity Tag */}
              <span className={`severity-tag severity-${severityClass}`}>
                {severity}
              </span>
            </div>

            {/* Area */}
            <p className="info-line">
              <span className="info-label">Area:</span> {formatAreaName(area)}
            </p>

            {/* Description - directly under Area, no box */}
            <p className="comment-plain">
              <strong>Description:</strong> {description}
            </p>

            {renderButtons()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;