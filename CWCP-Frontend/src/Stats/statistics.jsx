import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./statistics.css";

const Statistics = () => {
  const [stats, setStats] = useState(null);

  // Color palettes per chart
  const STATUS_COLORS = ["#7CB342", "#9CCC65", "#AED581"];  // greens
  const SEVERITY_COLORS = ["#42A5F5", "#64B5F6", "#90CAF9"]; // blues
  const AREA_COLORS = [
    "#8E24AA", "#AB47BC", "#BA68C8", "#CE93D8",
    "#7B1FA2", "#9C27B0", "#E1BEE7"
  ]; // purples

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div className="dashboard-section">
      <div className="stats-header">
        <img src="CWCP-LOGO.svg" alt="Citywide Concern Logo" className="stats-logo" />
        <h2>Citywide Concern Analytics</h2>
        <div className="stats-summary">
          <div className="summary-card">
            <h4>Total Posts</h4>
            <p>{stats.totalPosts}</p>
          </div>
          <div className="summary-card">
            <h4>Resolved Percentage</h4>
            <p>{stats.resolvedPercentage}</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {/* Posts by Status */}
        <div className="stats-card">
          <h3>By Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.byStatus}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              {stats.byStatus.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="count"
                  fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Posts by Severity */}
        <div className="stats-card">
          <h3>By Severity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.bySeverity}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Legend />
              {stats.bySeverity.map((entry, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey="count"
                  fill={SEVERITY_COLORS[index % SEVERITY_COLORS.length]}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Posts by Area (Pie Chart) */}
        <div className="stats-card">
          <h3>By Area</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={stats.byArea}
                dataKey="count"
                nameKey="area"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
              >
                {stats.byArea.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={AREA_COLORS[index % AREA_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
