import React, { useEffect, useState } from "react";
import "./statistics-circular.css";

export default function ResolvedIssues() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/resolved/percentage`)
      .then(res => res.json())
      .then(data => setPercentage(Number(data.percentage) || 0));
  }, []);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="stat-card circular-card">
      <div className="circle-wrapper">

        {/* ROTATED SVG ONLY */}
        <svg className="progress-ring" width="140" height="140">
          <circle className="progress-bg" cx="70" cy="70" r={radius} />
          <circle
            className="progress-fill"
            cx="70"
            cy="70"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        {/* TEXT NOT ROTATED */}
        <div className="circle-text">
          <span className="percentage">{percentage}%</span>
          <span className="label">Resolved</span>
        </div>

      </div>

      <p className="stat-footer">Overall resolution rate</p>
    </div>
  );
}
