import React, { useState } from 'react';
import './rating.css';
import { FaStar } from 'react-icons/fa';
export const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue= i + 1
                // return <i className="fa fa-star"></i>
                return (
                    <label>
                        <input
                         type="radio"
                          name="rating"
                          value={ratingValue}
                        onClick={() => setRating(ratingValue)} />
                        <FaStar
                         className="star"
                         color={ratingValue <= (hover || rating)  ? '#ffc107' : '#e4e5e9'}
                          size={100} 
                          onMouseEnter={() => setHover(ratingValue)}
                        onmouseleave ={() => setHover(null)}
                          />
                    </label>
                )
            })}
            
        </div>
    )
}
