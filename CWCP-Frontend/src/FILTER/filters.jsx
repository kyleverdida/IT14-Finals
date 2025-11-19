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
                <option value="apokon">Apokon</option>
                <option value="bincungan">Bincungan</option>
                <option value="busaon">Busaon</option>
                <option value="canocotan">Canocotan</option>
                <option value="cuambogan">Cuambogan</option>
                <option value="la-filipina">La Filipina</option>
                <option value="liboganon">Liboganon</option>
                <option value="madaum">Madaum</option>
                <option value="magdum">Magdum</option>
                <option value="mankilam">Mankilam</option>
                <option value="new-balamban">New Balamban</option>
                <option value="nueva-fuerza">Nueva Fuerza</option>
                <option value="pagsabangan">Pagsabangan</option>
                <option value="pandapan">Pandapan</option>
                <option value="magugpo-poblacion">Magugpo Poblacion</option>
                <option value="san-agustin">San Agustin</option>
                <option value="san-isidro">San Isidro</option>
                <option value="san-miguel-camp-4">San Miguel (Camp 4)</option>
                <option value="visayan-village">Visayan Village</option>
                <option value="magugpo-east">Magugpo East</option>
                <option value="magugpo-north">Magugpo North</option>
                <option value="magugpo-south">Magugpo South</option>
                <option value="magugpo-west">Magugpo West</option>
              </select>

              <label>Severity:</label>
              <select
                name="severity"
                value={filters?.severity || ""}
                onChange={handleFilterChange}
              >
                <option value="">All Severity</option>
                <option value="inconvenient">Inconvenient</option>
                <option value="hazard">Hazard</option>
                <option value="life-threatening">Life-Threatening</option>
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
