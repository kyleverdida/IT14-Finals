import React from "react";
import StatCard from "./statistics-statcard";

export default function RejectedIssues({ count }) {
  return (
    <StatCard
      title="Rejected / Invalid Reports"
      value={count.toLocaleString()}
    />
  );
}
