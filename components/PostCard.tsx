import Link from "next/link";

type PostCardProps = {
  author?: string;
  handle?: string;
  content: string;
  likes: number;
  time: string;
  id: string;
};

import LikeButton from "@/components/LikeButton";

export default function PostCard({
  author,
  handle,
  content,
  likes,
  id,
  time,
}: PostCardProps) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <Link href={`/posts/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <span>{author ?? "Anonymous"}</span>
          </Link>
          {handle && <span className="handle">{handle}</span>}
        </div>
        <span className="time">{time}</span>
      </div>

      <Link href={`/posts/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="post-content">{content}</div>
      </Link>

      <div className="post-footer">
        <LikeButton initialLikes={likes} />
      </div>
    </div>
  );
}