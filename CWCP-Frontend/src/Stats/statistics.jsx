import React, { useEffect, useState } from "react";
import "./statistics.css";

import TotalPostsSubmitted from "./statistics-totalpostsubmitted";
import ResolvedIssues from "./statistics-resolved";
import PendingIssues from "./statistics-pending";
import RejectedIssues from "./statistics-rejected";
import StatusBarChart from "./statistics-status-barchart";
import AreaDonut from "./statistics-area-donut";
import TodayPosts from "./statistics-todayposts";

export default function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading statistics...</h2>;
  if (!stats) return null;

  const resolved =
    stats.byStatus.find((s) => s.status.toLowerCase() === "resolved")?.count ||
    0;
  const pending =
    stats.byStatus.find((s) =>
      ["pending", "in progress"].includes(s.status.toLowerCase())
    )?.count || 0;
  const rejected =
    stats.byStatus.find((s) => s.status.toLowerCase() === "rejected")?.count ||
    0;

  return (
    <div className="app-root">
      <h1 className="title">City Issue Reporting Statistics</h1>

      <div className="cards">
        <TodayPosts />
        <TotalPostsSubmitted total={stats.totalPosts} />
        <ResolvedIssues/>

        <PendingIssues count={pending} />
        <RejectedIssues count={rejected} />
      </div>

      <div className="charts-wrapper">
        <StatusBarChart data={stats.byStatus} />
        <AreaDonut data={stats.byArea || []} />
      </div>
    </div>
  );
}
