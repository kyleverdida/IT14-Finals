import React from "react";
import Cards from "../cards.jsx";

const AllConcerns = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="no-concerns-text">No concerns found.</p>;
  }

  return (
    <div className="cards">
      {posts.map((concern) => (
        <Cards
          key={concern._id}
          {...concern}
        />
      ))}
    </div>
  );
};
export default AllConcerns;

