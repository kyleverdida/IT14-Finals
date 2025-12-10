import React from "react";

export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <p className="stat-value">{value}</p>
      <p className="stat-title">{title}</p>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </div>
  );
}
