import React, { FC } from "react";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  const num = Math.floor(rating);

  const stars = Array.from({ length: 5 }, (_, index) => (
    <AiFillStar
      key={index}
      size={20}
      style={{
        color: index < num ? "gold" : "gray", // Color stars based on the num value
      }}
    />
  ));

  return <div className="flex gap-1">{stars}</div>;
};

export default Rating;
