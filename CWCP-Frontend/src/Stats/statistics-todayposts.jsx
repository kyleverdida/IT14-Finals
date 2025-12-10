import React, { useEffect, useState } from "react";
import StatCard from "./statistics-statcard";

export default function TodayPosts() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/posts/today/count`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch today's posts");
        return res.json();
      })
      .then(data => {
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <StatCard
      title="Reports Submitted Today"
      value={loading ? "Loading..." : count.toLocaleString()}
    />
  );
}
