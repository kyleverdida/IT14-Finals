import React, { useEffect, useState } from "react";
import "./statistics.css";

import TotalPostsSubmitted from "./stats-elements/statistics-totalpostsubmitted";
import ResolvedIssues from "./stats-elements/statistics-resolved";
import PendingIssues from "./stats-elements/statistics-pending";
import RejectedIssues from "./stats-elements/statistics-rejected";
import StatusBarChart from "./stats-elements/statistics-status-barchart";
import AreaDonut from "./stats-elements/statistics-area-donut";
import TodayPosts from "./stats-elements/statistics-todayposts";
import GMap2 from "../GMAP/gmap2";
import GMap from "../GMAP/gmap";


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

      <div className="stats-cards">
        {/* <div>
          <GMap2 />
          <GMap/>
        </div> */}

        <div className="stats-sidebar">
          <TotalPostsSubmitted total={stats.totalPosts} />
          <TodayPosts />
          <ResolvedIssues />
          <RejectedIssues count={rejected} />
          {/* <StatusBarChart data={stats.byStatus} /> */}
        {/* <AreaDonut data={stats.byArea || []} /> */}
        
        </div>

      </div>

      
    </div>
  );
}
