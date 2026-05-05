"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);

  const handleClick = () => {
    setLiked((prev) => !prev);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        border: "1px solid",
        borderColor: liked ? "#ec4899" : "#e5e7eb",
        background: liked ? "#fce7f3" : "transparent",
        color: liked ? "#ec4899" : "#6b7280",
        borderRadius: "999px",
        padding: "0.3rem 0.7rem",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}