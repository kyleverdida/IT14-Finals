import React, { useState } from "react";
import axios from "axios";
import "./form.css";

export default function Form({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    photo: null,
    area: "",
    severity: "",
    description: "",
  });

  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.photo) {
      alert("Title and photo are required");
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      await axios.post(`${import.meta.env.VITE_API_URL}/post`, data);
      alert("Concern submitted successfully");
      onClose?.();
    } catch (err) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="concern-form" onSubmit={handleSubmit}>
      <header className="form-header">
        <h2>Submit a New Concern</h2>
        <p>Report issues to help improve the community.</p>
      </header>

      <div className="grid">
        <div className="field full">
          <label>Concern Title</label>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Palm Incident" />
        </div>

        <div className="field">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <div className="field">
          <label>Area</label>
          <select name="area" value={formData.area} onChange={handleChange}>
            <option value="">Select area</option>
            <option value="apokon">Apokon</option>
            <option value="bincungan">Bincungan</option>
            <option value="magugpo-poblacion">Magugpo Poblacion</option>
          </select>
        </div>

        <div className="field">
          <label>Severity</label>
          <select name="severity" value={formData.severity} onChange={handleChange}>
            <option value="">Select severity</option>
            <option value="inconvenient">Inconvenient</option>
            <option value="hazard">Hazard</option>
            <option value="life-threatening">Life-threatening</option>
          </select>
        </div>

        <div className="field full">
          <label>Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Describe the issue in detail" />
        </div>
      </div>

      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      <button className="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Concern"}
      </button>
    </form>
  );
}
