import React, { useState } from "react";
import axios from "axios";
import "./form.css";

const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleModal = () => setIsOpen(!isOpen);

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
      setIsOpen(false);
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
    <div>
      <button onClick={toggleModal} className="report-btn">
        Submit Concern
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>✖</button>
            <h2>Submit a New Concern</h2>
            <p className="modal-subtitle">
              Help us improve the community by reporting issues you encounter.
            </p>

            <form className="form-grid" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-group full-width">
                <label htmlFor="title">Concern Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., Palm Accident"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Timestamp */}
              <div className="form-group">
                <label htmlFor="timestamp">Date</label>
                <input
                  type="date"
                  id="timestamp"
                  name="timestamp"
                  value={formData.timestamp}
                  onChange={handleChange}
                />
              </div>

              {/* Upload */}
              <div className="form-group">
                <label htmlFor="photo">Upload Photo</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Area */}
              <div className="form-group">
                <label htmlFor="area">Select Area</label>
                <select
                  id="area"
                  name="area"
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

              {/* Severity */}
              <div className="form-group">
                <label htmlFor="severity">Severity</label>
                <select
                  id="severity"
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                >
                  <option value="">-- Choose Severity --</option>
                  <option value="inconvenient">Inconvenient</option>
                  <option value="hazard">Hazard</option>
                  <option value="life-threatening">Life-Threatening</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the concern in detail..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Concern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;