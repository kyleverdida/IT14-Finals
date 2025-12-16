import React, { useState } from "react";
import "./rejectionmodal.css";
import CustomAlert from "../Custom Alert/customalert"; // Add this import

const RejectionModal = ({ onConfirm, onCancel }) => {
  const [reason, setReason] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Add this state

  const handleSubmit = () => {
    if (reason.trim()) {
      onConfirm(reason);
    } else {
      setShowAlert(true); // Show custom alert instead of native alert
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <CustomAlert 
          message="Please provide a reason for rejection" 
          onClose={closeAlert} 
        />
      )}
      
      <div className="rejection-modal-overlay">
        <div className="rejection-modal-box">
          <div className="rejection-modal-header">
            <span className="rejection-icon">⚠️</span>
            <h2>Reject Concern</h2>
          </div>
          
          <div className="rejection-modal-body">
            <p>Please provide a reason for rejecting this concern:</p>
            <textarea
              className="rejection-textarea"
              placeholder="Enter rejection reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="5"
              autoFocus
            />
          </div>
          
          <div className="rejection-modal-footer">
            <button className="rejection-btn cancel" onClick={onCancel}>
              Cancel
            </button>
            <button className="rejection-btn confirm" onClick={handleSubmit}>
              Confirm Rejection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectionModal;