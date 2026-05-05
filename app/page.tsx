import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="home">
      <h1 className="home-title">Bienvenue sur LinkUp</h1>

      {posts.length === 0 ? (
        <p>Aucun post disponible 😕</p>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <PostCard
  key={post.id}
  id={String(post.id)}
  author={post.author}
  handle={post.handle}
  content={post.content}
  likes={post.likes}
  time={post.time}
/>
          ))}
        </div>
      )}
    </div>
  );
}