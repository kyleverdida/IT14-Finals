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

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.timestamp) newErrors.timestamp = true;
    if (!formData.photo) newErrors.photo = true;
    if (!formData.area) newErrors.area = true;
    if (!formData.severity) newErrors.severity = true;
    if (!formData.description.trim()) newErrors.description = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    formData.title.trim() &&
    formData.timestamp &&
    formData.photo &&
    formData.area &&
    formData.severity &&
    formData.description.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

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
      data.append("image", formData.photo);
      data.append("area", formData.area);
      data.append("severity", formData.severity);
      data.append("description", formData.description);

      await axios.post(`${import.meta.env.VITE_API_URL}/post`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Concern submitted successfully!");
      if (onClose) onClose();

      setPreview(null);
      setFormData({
        title: "",
        timestamp: new Date().toISOString().split("T")[0],
        photo: null,
        area: "",
        severity: "",
        description: "",
        approved: false,
      });
      setErrors({});
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
              name="title"
              className={`concern-title-input ${errors.title ? "error-field" : ""}`}
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
              name="timestamp"
              className={`date-input ${errors.timestamp ? "error-field" : ""}`}
              value={formData.timestamp}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="calendar-icon">
          <img src="../calendar-icon.svg" alt="Calendar Icon" />
        </div>
      </div>
      <p className="label date-label">Date</p>

      {/* Upload Photo */}
      <div
        className={`upload-photo ${errors.photo ? "error-field" : ""}`}
        onClick={() => document.getElementById("photo-input")?.click()}
      >
        <div className="border-overlay" />
        <div className="upload-photo-content">
          <p className="upload-photo-text">
            {formData.photo ? formData.photo.name : "-- No File Selected --"}
          </p>
        </div>
        <div className="upload-icon">
          <img src="../upload-icon.svg" alt="Upload Icon" />
        </div>
        <input
          id="photo-input"
          className="hidden-file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <p className="label upload-photo-label">Upload Photo</p>

      {/* Area & Severity */}
      <div className="field-row">
        <div className="field-group">
          <p className="label select-area-label">Select Area</p>
          <div className="select-area">
            <div className="border-overlay" />
            <select
              name="area"
              className={`select-area-select ${errors.area ? "error-field" : ""}`}
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
              name="severity"
              className={`severity-select ${errors.severity ? "error-field" : ""}`}
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
          name="description"
          className={`description-textarea ${errors.description ? "error-field" : ""}`}
          placeholder="Describe the concern in detail..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <p className="label description-label">Description</p>

      {/* Submit */}
      <button
        type="submit"
        className="submit-concern"
        disabled={!isFormValid}
      >
        <p>Submit Concern</p>
      </button>
    </form>
  );
};

export default Form;
