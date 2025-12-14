import React from "react";
import Cards from "../cards.jsx";

const Rejected = ({ posts }) => {
  const rejectedPosts = posts.filter((p) => p.status === "rejected");

  if (rejectedPosts.length === 0) {
    return <p className="no-concerns-text">No rejected concerns.</p>;
  }

  return (
    <div className="cards-grid">
      {rejectedPosts.map((concern) => (
        <Cards key={concern._id} {...concern} />
      ))}
    </div>
  );
};
export default Rejected;
