import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./statistics.css";

export default function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API URL
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    fetch(`${API_URL}/stats`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading statistics...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  if (!stats) return null;

  // Transform byArea data for donut chart
  const donutData = stats.byArea?.map((item, index) => ({
    name: item.area,
    value: item.count,
    color: getAreaColor(index)
  })) || [];

  // Use existing byStatus data for bar chart
  const statusData = stats.byStatus || [];

  // Calculate stats from API data
  const resolvedCount = stats.byStatus?.find(s => s.status.toLowerCase() === "resolved")?.count || 0;
  const pendingCount = stats.byStatus?.find(s => s.status.toLowerCase() === "pending" || s.status.toLowerCase() === "in progress")?.count || 0;
  const rejectedCount = stats.byStatus?.find(s => s.status.toLowerCase() === "rejected")?.count || 0;

  // Calculate percentage changes
  const resolvedPercentage = stats.resolvedPercentage || "0%";

  return (
    <div className="app-root">
      <h1 className="title">City Issue Reporting Statistics</h1>

      {/* STAT CARDS */}
      <div className="cards">
        <StatCard 
          title="Total Reports Submitted" 
          value={stats.totalPosts?.toLocaleString() || "0"} 
        />
        <StatCard 
          title="Resolved Issues" 
          value={resolvedCount.toLocaleString()} 
          subtitle={`${resolvedPercentage} resolution rate`}
        />
        <StatCard 
          title="Pending Issues" 
          value={pendingCount.toLocaleString()} 
        />
        <StatCard 
          title="Rejected / Invalid Reports" 
          value={rejectedCount.toLocaleString()} 
        />
      </div>

      {/* CHARTS CONTAINER */}
      <div className="charts-wrapper">
        {/* BAR CHART - Status Breakdown */}
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Reports by Status</h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="status" stroke="#7c8db5" />
              <YAxis stroke="#7c8db5" />
              <Tooltip />
              <Bar dataKey="count" fill="#00B034" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DONUT CHART - Area Breakdown */}
        <div className="donut-container">
          <h2 className="chart-title">Reports by Area</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-legend">
            {donutData.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-dot" style={{background: item.color}}></span>
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEVERITY BREAKDOWN (if available) */}
      {stats.bySeverity && stats.bySeverity.length > 0 && (
        <div className="severity-container">
          <h2 className="chart-title">Reports by Severity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.bySeverity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
              <XAxis dataKey="severity" stroke="#7c8db5" />
              <YAxis stroke="#7c8db5" />
              <Tooltip />
              <Bar dataKey="count" fill="#FE971B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function getAreaColor(index) {
  const colors = [
    "#1B1F50", "#00B034", "#FE971B", "#FA8382",
    "#8E24AA", "#42A5F5", "#7CB342", "#FF6B6B"
  ];
  return colors[index % colors.length];
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <p className="stat-value">{value}</p>
      <p className="stat-title">{title}</p>
      {subtitle && (
        <p className="stat-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}