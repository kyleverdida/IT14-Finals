import React, { useState } from "react";
import axios from "axios";
import "./form.css";

const Form = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    timestamp: new Date().toISOString().split("T")[0],
    photo: null,
    area: "",
    severity: "",
    description: "",
    approved: false,
  });

  const [preview, setPreview] = useState(null); // for live image preview

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file)); // generate preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return alert("Title is required");
    if (!formData.photo) return alert("Photo is required");

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(formData.photo.type)) {
      return alert("Invalid file type");
    }
    if (formData.photo.size === 0) return alert("File is empty");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("timestamp", formData.timestamp);
      data.append("image", formData.photo); // must match backend
      data.append("area", formData.area);
      data.append("severity", formData.severity);
      data.append("description", formData.description);

      await axios.post(`${import.meta.env.VITE_API_URL}/post`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Concern submitted successfully!");
      if (onClose) onClose();
      setPreview(null); // clear preview after submit
      setFormData({
        title: "",
        timestamp: new Date().toISOString().split("T")[0],
        photo: null,
        area: "",
        severity: "",
        description: "",
        approved: false,
      });
    } catch (error) {
      if (error.response) alert(error.response.data.error || "Upload failed");
      else alert("Upload failed. Please try again.");
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

      {/* Image Preview */}
      {preview && (
        <div className="image-preview">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px", marginBottom: "10px" }}
          />
        </div>
      )}

      {/* Upload Photo */}
      <div
        className="upload-photo"
        onClick={() => document.getElementById("photo-input")?.click()}
      >
        <div className="border-overlay" />
        <div className="upload-photo-content">
          <p className="upload-photo-text">
            {formData.photo ? formData.photo.name : "-- No File Selected --"}
          </p>
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
      <p className="label upload-photo-label">Upload Photo</p>

      {/* Select Area & Severity */}
      <div className="field-row">
        <div className="field-group">
          <p className="label select-area-label">Select Area</p>
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
        </div>

        <div className="field-group">
          <p className="label severity-label">Severity</p>
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
        </div>
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
    </form>
  );
};

export default Form;
