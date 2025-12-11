import React from "react";
import StatCard from "./statistics-statcard";

export default function TotalPostsSubmitted({ total }) {
  return (
    <StatCard
      title="Total Reports Submitted"
      value={total?.toLocaleString() || "0"}
    />
  );
}
