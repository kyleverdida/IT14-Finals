import React, { useState } from "react";
import "./filters.css";

const Filter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* 🔹 Open Modal Button */}
      <button className="open-modal-btn" onClick={() => setIsOpen(true)}>
        ☰ Filters
      </button>

      {/* 🔹 Modal Overlay */}
      {isOpen && (
        <div className="modal-overlay-sidebar" onClick={() => setIsOpen(false)}>
          <div
            className="modal-content-sidebar"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="modal-header">
              <h2>Filters</h2>
              <button className="close-btn-sidebar" onClick={() => setIsOpen(false)}>
                ✖
              </button>
            </div>

            <div className="modal-body">
              <label>Area:</label>
              <select
                name="area"
                value={filters?.area || ""}
                onChange={handleFilterChange}
              >
                <option value="">All Areas</option>
                <option value="Purok">Purok</option>
                <option value="Barangay">Barangay</option>
                <option value="CityWide">City Level</option>
              </select>

              <label>Severity:</label>
              <select
                name="severity"
                value={filters?.severity || ""}
                onChange={handleFilterChange}
              >
                <option value="">Department</option>
                <option value="Barangay Development Council">Barangay Development Council</option>
              <option value="Barangay Ecological Solid Waste Management Committee">Barangay Ecological Solid Waste Management Committee</option>
              <option value="Local Council for the Protection of Children">Local Council for the Protection of Children</option>
              <option value="Barangay Peace and Order Committee">Barangay Peace and Order Committee</option>
              <option value="Physical Fitness and Sports Development Council">Physical Fitness and Sports Development Council</option>
              <option value="Barangay Anti-Drug Abuse Council">Barangay Anti-Drug Abuse Council</option>
              <option value="Barangay Health Committee">Barangay Health Committee</option>
              <option value="Barangay Disaster Risk Reduction and Management Committee">Barangay Disaster Risk Reduction and Management Committee</option>
              <option value="Katarungang Pambarangay">Katarungang Pambarangay</option>
              <option value="Other Department">Other Department</option>
              </select>

              <label>Status:</label>
              <select
                name="status"
                value={filters?.status || ""}
                onChange={handleFilterChange}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
