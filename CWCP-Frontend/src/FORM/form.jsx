import React, { useState } from "react";
import axios from "axios";
import "./form.css";

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    // 👇 Only store date string (no time)
    timestamp: new Date().toISOString().split("T")[0], // "2025-10-06"
    photo: null,
    area: "",
    severity: "",
    description: "",
    approved: false,
  });

  // handle text/select inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file input
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // 👇 Convert to MM/DD/YYYY before sending (optional)
      const formattedDate = new Date(formData.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      data.append("title", formData.title);
      data.append("timestamp", formattedDate); // now sends "10/06/2025"
      data.append("photo", formData.photo);
      data.append("area", formData.area);
      data.append("severity", formData.severity);
      data.append("description", formData.description);

      await axios.post(`${import.meta.env.VITE_API_URL}/post`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Concern submitted successfully!");
      if (onClose) onClose();
    } catch (error) {
      if (error.response) {
        console.error("Error submitting concern:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <form className="form-popup" onSubmit={handleSubmit}>
      <p className="main-title">Submit a New Concern</p>
      <p className="subtitle">
        Help us improve the community by reporting issues you encounter.
      </p>

      {/* Concern Title */}
      <div className="concern-title">
        <div className="border-overlay" />
        <div className="concern-title-content">
          <div className="concern-title-inner">
            <input
              type="text"
              id="title"
              name="title"
              className="concern-title-input"
              placeholder="e.g., Palm Incident"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <p className="label concern-title-label">Concern Title</p>

      {/* Date */}
      <div className="date-field">
        <div className="border-overlay" />
        <div className="date-content">
          <div className="date-inner">
            <input
              type="date"
              id="timestamp"
              name="timestamp"
              className="date-input"
              value={formData.timestamp}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <p className="label date-label">Date</p>
      <div className="calendar-icon">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g clipPath="url(#clip0_1_81)">
            <path
              d="M11.0833 2.33333H2.91667C2.27233 2.33333 1.75 2.85566 1.75 3.5V11.6667C1.75 12.311 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.311 12.25 11.6667V3.5C12.25 2.85566 11.7277 2.33333 11.0833 2.33333Z"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M9.33334 1.16667V3.5"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M4.66666 1.16667V3.5"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M1.75 5.83333H12.25"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_81">
              <rect fill="white" height="14" width="14" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Upload Photo */}
      <div className="upload-photo">
        <div className="border-overlay" />
        <div className="browse-frame" onClick={() => document.getElementById("photo-input")?.click()}>
          <div className="browse-border" />
          <p>Browse Photo</p>
        </div>
        <input
          id="photo-input"
          className="hidden-file-input"
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <p className="no-file-text">
        {formData.photo ? formData.photo.name : "No File Selected"}
      </p>
      <p className="label upload-photo-label">Upload Photo</p>

      {/* Select Area */}
      <div className="select-area">
        <div className="border-overlay" />
        <select
          id="area"
          name="area"
          className="select-area-select"
          value={formData.area}
          onChange={handleChange}
        >
          <option value="">-- Choose an Area --</option>
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
      </div>
      <p className="label select-area-label">Select Area</p>
      <div className="select-area-icon">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g>
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </div>

      {/* Severity */}
      <div className="severity">
        <div className="border-overlay" />
        <select
          id="severity"
          name="severity"
          className="severity-select"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="">-- Choose Severity --</option>
          <option value="inconvenient">Inconvenient</option>
          <option value="hazard">Hazard</option>
          <option value="life-threatening">Life-Threatening</option>
        </select>
      </div>
      <p className="label severity-label">Severity</p>
      <div className="severity-icon">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g>
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </div>

      {/* Description */}
      <div className="description">
        <div className="border-overlay" />
        <textarea
          id="description"
          name="description"
          className="description-textarea"
          placeholder="Describe the concern in detail..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <p className="label description-label">Description</p>

      {/* Submit button */}
      <button type="submit" className="submit-concern">
        <p>Submit Concern</p>
      </button>

      {/* Arrow icon in top right */}
      <div className="arrow-right">
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g>
            <path
              d="M3.75 9H14.25"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
            <path
              d="M9 3.75L14.25 9L9 14.25"
              stroke="#1E1E1E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </g>
        </svg>
      </div>
    </form>
  );
};

export default Form;