import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
      <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
        <h2>Loading statistics...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif", color: "#d32f2f" }}>
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

  // Calculate percentage changes (you can remove these if you don't track historical data)
  const resolvedPercentage = stats.resolvedPercentage || "0%";

  return (
    <div style={styles.appRoot}>
      <h1 style={styles.title}>City Issue Reporting Statistics</h1>

      {/* STAT CARDS */}
      <div style={styles.cards}>
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
      <div style={styles.chartsWrapper}>
        {/* BAR CHART - Status Breakdown */}
        <div style={styles.chartContainer}>
          <div style={styles.chartHeader}>
            <h2 style={styles.chartTitle}>Reports by Status</h2>
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
        <div style={styles.donutContainer}>
          <h2 style={styles.chartTitle}>Reports by Area</h2>

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

          <div style={styles.donutLegend}>
            {donutData.map((item, index) => (
              <div key={index} style={styles.legendItem}>
                <span style={{...styles.legendDot, background: item.color}}></span>
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEVERITY BREAKDOWN (if available) */}
      {stats.bySeverity && stats.bySeverity.length > 0 && (
        <div style={styles.severityContainer}>
          <h2 style={styles.chartTitle}>Reports by Severity</h2>
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
    <div style={styles.statCard}>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statTitle}>{title}</p>
      {subtitle && (
        <p style={styles.statSubtitle}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const styles = {
  appRoot: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "2rem",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1F2253",
    marginBottom: "2rem",
    textAlign: "center",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  statCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1F2253",
    margin: "0 0 0.5rem 0",
  },
  statTitle: {
    fontSize: "0.9rem",
    color: "#7c8db5",
    margin: "0 0 0.5rem 0",
  },
  statSubtitle: {
    fontSize: "0.85rem",
    color: "#00B034",
    margin: 0,
    fontWeight: "500",
  },
  chartsWrapper: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  chartContainer: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  donutContainer: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  severityContainer: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  chartHeader: {
    marginBottom: "1.5rem",
  },
  chartTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1F2253",
    marginBottom: "1rem",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    color: "#7c8db5",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  donutLegend: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginTop: "1rem",
  },
};