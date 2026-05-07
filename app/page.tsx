import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="feed-page">
      <div className="feed-container">
        <h1 className="home-title">Bienvenue sur LinkUp </h1>

        <NewPostForm />

        <div className="posts-container">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              author={post.author.name}
              handle={post.author.handle}
              content={post.content}
              likes={post.likes}
              time="À l’instant"
            />
          ))}
        </div>
      </div>
    </div>
  );
}