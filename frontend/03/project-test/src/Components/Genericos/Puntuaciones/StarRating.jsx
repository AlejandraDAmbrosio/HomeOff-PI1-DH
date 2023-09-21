import { Input } from "@mui/material";
import React, { useState, useContext } from "react";
import "./StarRating.css";
import { FaStar } from "react-icons/fa";
import { ContextGlobal } from "../../utils/global.context";

const StarRating = () => {
  const { rating, setRating } = useContext(ContextGlobal);

  //   const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label>
            <Input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />{" "}
            <FaStar
              className="star"
              size={50}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            ></FaStar>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
