import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./statistics.css";

export default function App() {
  // Sample data for line chart
  const lineChartData = [
    { month: "Jan", resolved: 2400, pending: 1800, rejected: 1200 },
    { month: "Feb", resolved: 1398, pending: 2100, rejected: 980 },
    { month: "Mar", resolved: 3800, pending: 2400, rejected: 1500 },
    { month: "Apr", resolved: 2780, pending: 1908, rejected: 1100 },
    { month: "May", resolved: 4890, pending: 2800, rejected: 1800 },
    { month: "Jun", resolved: 3390, pending: 2300, rejected: 1400 },
  ];

  // Sample data for donut chart
  const donutData = [
    { name: "Infrastructure", value: 35, color: "#1B1F50" },
    { name: "Safety", value: 25, color: "#00B034" },
    { name: "Environment", value: 20, color: "#FE971B" },
    { name: "Others", value: 20, color: "#FA8382" },
  ];

  return (
    <div className="app-root">
      <h1>City Issue Reporting Statistics</h1>

      {/* ===== STAT CARDS ===== */}
      <div className="cards">
        <StatCard title="Total Reports Submitted" value="89,935" change="+12.5%" positive={true} />
        <StatCard title="Resolved Issues" value="23,283" change="+8.2%" positive={true} />
        <StatCard title="Pending Issues" value="46,827" change="-3.1%" positive={false} />
        <StatCard title="Rejected / Invalid Reports" value="19,825" change="+5.4%" positive={false} />
      </div>

      {/* ===== CHARTS CONTAINER ===== */}
      <div className="charts-wrapper">
        {/* ===== LINE CHART ===== */}
        <div className="chart-container">
          <div className="chart-header">
            <h2>City Issue Reporting Analytics</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#00B034" }}></span>
                <span>Resolved</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#1F2253" }}></span>
                <span>Pending</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot" style={{ background: "#FE971B" }}></span>
                <span>Rejected</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#7c8db5" />
              <YAxis stroke="#7c8db5" />
              <Tooltip />
              <Line type="monotone" dataKey="resolved" stroke="#00B034" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pending" stroke="#1F2253" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rejected" stroke="#FE971B" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ===== DONUT CHART ===== */}
        <div className="donut-container">
          <h2>Issue Breakdown</h2>

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
                <span className="legend-dot" style={{ background: item.color }}></span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== STAT CARD COMPONENT ===== */
function StatCard({ title, value, change, positive }) {
  return (
    <div className="stat-card">
      <p className="stat-value">{value}</p>
      <p className="stat-title">{title}</p>
      {change && (
        <p className={`stat-change ${positive ? 'positive' : 'negative'}`}>
          {change} from last month
        </p>
      )}
    </div>
  );
}