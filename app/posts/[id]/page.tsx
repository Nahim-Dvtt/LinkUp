import { getPostById, getCommentsByPostId } from "@/lib/posts";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostById(Number(params.id));

  return {
    title: post ? `${post.title} | LinkUp` : "Post introuvable",
    description: post?.content?.slice(0, 100),
  };
}

export default async function PostDetailPage({ params }: Props) {
  const post = await getPostById(Number(params.id));
  const comments = await getCommentsByPostId(Number(params.id));

  if (!post) {
    return <p>Post introuvable 😕</p>;
  }

  return (
    <div className="home">
      <div className="post-card">
        <div className="post-header">
          <div>
            <span className="author">{post.author}</span>{" "}
            <span className="handle">{post.handle}</span>
          </div>
        </div>

        <h2 style={{ margin: "0.5rem 0" }}>{post.title}</h2>

        <p className="post-content">{post.content}</p>
      </div>

      {/* COMMENTAIRES */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Commentaires</h3>

        <div className="posts-container">
          {comments.map((c: { id: number; name: string; body: string }) => (
            <div key={c.id} className="post-card">
              <strong>{c.name}</strong>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}