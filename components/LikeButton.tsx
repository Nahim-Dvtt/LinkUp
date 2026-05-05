"use client";

import { useState } from "react";

export default function LikeButton({
  postId,
  initialLikes,
}: {
  postId: number;
  initialLikes: number;
}) {
  const [count, setCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  async function handleClick() {
    setLiked(!liked);
    setCount((prev) => prev + (liked ? -1 : 1));

    await fetch(`/api/posts/${postId}/likes`, {
      method: "POST",
    });
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: liked ? "#fce7f3" : "transparent",
        border: "1px solid #e5e7eb",
        borderRadius: "999px",
        padding: "0.3rem 0.7rem",
        cursor: "pointer",
        color: liked ? "#ec4899" : "#6b7280",
      }}
    >
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}