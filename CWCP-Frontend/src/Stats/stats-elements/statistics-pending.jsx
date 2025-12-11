import React from "react";
import StatCard from "./statistics-statcard";

export default function PendingIssues({ count }) {
  return (
    <StatCard
      title="Pending Issues"
      value={count.toLocaleString()}
    />
  );
}
