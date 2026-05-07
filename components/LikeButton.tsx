"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
  initialLikes: number;
};

export default function LikeButton({
  postId,
  initialLikes,
}: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const router = useRouter();

  async function handleLike() {
    try {
      const res = await fetch(
        `/api/posts/${postId}/likes`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      setLikes(data.likes);

      setLiked(true);

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleLike}
      style={{
        background: liked
          ? "#fce7f3"
          : "transparent",
        color: liked ? "#ec4899" : "#6b7280",
        border: "1px solid #e5e7eb",
        borderRadius: "999px",
        padding: "0.4rem 0.8rem",
        cursor: "pointer",
      }}
    >
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
}