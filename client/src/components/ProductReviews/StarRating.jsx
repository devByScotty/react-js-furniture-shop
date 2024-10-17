import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={stars.length} />);
    }

    return stars;
  };

  return <div className="starRating">{renderStars()}</div>;
};

export default StarRating;
