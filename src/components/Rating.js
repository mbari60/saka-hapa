import React from "react";
import "../rating.css";

const Rating = ({ ratings }) => {
  return (
    <div className="rating-container">
      {ratings.map((rating, index) => (
        <div key={index} className="rating-item">
          <p>{rating.comment}</p>
          <p>{rating.stars} stars</p>
          <p>- {rating.user}</p>
        </div>
      ))}
    </div>
  );
};

export default Rating;
