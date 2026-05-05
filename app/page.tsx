import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API error:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="home">
      <h1 className="home-title">Bienvenue sur LinkUp</h1>

      <NewPostForm />

      <div className="posts-container">
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author}
            handle={post.handle}
            content={post.content}
            likes={post.likes}
            time="Maintenant"
          />
        ))}
      </div>
    </div>
  );
}