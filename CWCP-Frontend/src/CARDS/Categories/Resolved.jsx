import React from "react";
import Cards from "../cards.jsx";

const Resolved = ({ posts }) => {
  const resolvedPosts = posts.filter((p) => p.status === "resolved");

  if (resolvedPosts.length === 0) {
    return <p className="no-concerns-text">No resolved concerns.</p>;
  }

  return (
    <div className="cards-grid">
      {resolvedPosts.map((concern) => (
        <Cards key={concern._id} {...concern} />
      ))}
    </div>
  );
};
export default Resolved;
