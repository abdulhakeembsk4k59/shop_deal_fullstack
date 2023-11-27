import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index}>
        {index < (rating || 0) ? <FaStar color="#ffc107" /> : <FaRegStar />}
      </span>
    ));
  
    return <div className="star-rating">{stars}</div>;
  };

export default StarRating
