import React, { useState } from "react";
import "./searchbar.css";

const Searchbar = ({ setPosts }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    // If empty, load all approved posts again
    if (!value.trim()) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getApproved`);
      const data = await res.json();
      setPosts(data);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/search?query=${encodeURIComponent(value)}`
      );
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        setPosts([]); // clear if no matches
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Searchbar;
