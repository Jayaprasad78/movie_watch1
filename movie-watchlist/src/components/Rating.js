import React, { useState } from 'react';

const Rating = ({ rating, onRate }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (newRating) => {
    setCurrentRating(newRating);
    onRate(newRating);
  };

  return (
    <div className="rating">
      <span className={currentRating >= 1 ? 'filled' : 'empty'} onClick={() => handleClick(1)}>★</span>
      <span className={currentRating >= 2 ? 'filled' : 'empty'} onClick={() => handleClick(2)}>★</span>
      <span className={currentRating >= 3 ? 'filled' : 'empty'} onClick={() => handleClick(3)}>★</span>
      <span className={currentRating >= 4 ? 'filled' : 'empty'} onClick={() => handleClick(4)}>★</span>
      <span className={currentRating >= 5 ? 'filled' : 'empty'} onClick={() => handleClick(5)}>★</span>
    </div>
  );
};

export default Rating;
