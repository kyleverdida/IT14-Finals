import React from "react";
import Cards from "../cards.jsx";

const Pending = ({ posts }) => {
  const pendingPosts = posts.filter((p) => p.status === "pending");

  if (pendingPosts.length === 0) {
    return <p className="no-concerns-text">No pending concerns.</p>;
  }

  return (
    <div className="cards-grid">
      {pendingPosts.map((concern) => (
        <Cards key={concern._id} {...concern} />
      ))}
    </div>
  );
};

export default Pending;
