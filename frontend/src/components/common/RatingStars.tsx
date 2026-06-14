import starFull from "/star-full.png";
import starHalf from "/star-half.png";
import starEmpty from "/star-empty.png";

import { type FC } from "react";
import "./RaitingStars.scss";

interface RatingStarsProps {
  rating: number | string | null;
  showValue?: boolean;
}

const RatingStars: FC<RatingStarsProps> = ({ rating, showValue = true }) => {
  const numericRating =
    typeof rating === "number" ? rating : parseFloat(String(rating)) || 0;

  const roundedRating = Math.round(numericRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <img key={i} src={starFull} alt="★" className="star-img" />
      ))}
      {hasHalfStar && <img src={starHalf} alt="½" className="star-img" />}
      {[...Array(emptyStars)].map((_, i) => (
        <img key={i} src={starEmpty} alt="☆" className="star-img" />
      ))}
      {showValue && (
        <span className="rating-value">{numericRating.toFixed(1)} / 5</span>
      )}
    </div>
  );
};

export default RatingStars;
