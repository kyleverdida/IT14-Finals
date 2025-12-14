import React from "react";
import Cards from "../cards.jsx";

const AllConcerns = ({ posts }) => {
  const filteredPosts = posts.filter((concern) => concern.status !== "rejected");

  if (filteredPosts.length === 0) {
    return <p className="no-concerns-text">No concerns found.</p>;
  }

  return (
    <div className="cards-grid">
      {filteredPosts.map((concern) => (
        <Cards
          key={concern._id}
          {...concern}
        />
      ))}
    </div>
  );
};
export default AllConcerns;

