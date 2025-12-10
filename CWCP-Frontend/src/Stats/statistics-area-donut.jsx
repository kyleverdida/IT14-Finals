import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#1B1F50", "#00B034", "#FE971B", "#FA8382",
  "#8E24AA", "#42A5F5", "#7CB342", "#FF6B6B"
];

export default function AreaDonut({ data }) {
  const donutData = data.map((item, index) => ({
    name: item.area,
    value: item.count,
    color: COLORS[index % COLORS.length]
  }));

  return (
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
            dataKey="value"
          >
            {donutData.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-legend">
        {donutData.map((item, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ background: item.color }} />
            {item.name} ({item.value})
          </div>
        ))}
      </div>
    </div>
  );
}
