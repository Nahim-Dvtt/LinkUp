import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProfilePage({
  params,
}: Props) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <div className="feed-page">
        <div className="feed-container">
          <p>Utilisateur introuvable 😕</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-page">
      <div className="feed-container">
        <div className="profile-card">
          <div className="profile-top">
            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <div>
              <h2>{user.name}</h2>
              <p className="handle">
                {user.handle}
              </p>
            </div>
          </div>

          <p className="profile-bio">
            {user.bio}
          </p>
        </div>

        <div className="posts-container">
          {user.posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              author={user.name}
              handle={user.handle}
              content={post.content}
              likes={post.likes}
              time={new Date(
                post.createdAt
              ).toLocaleDateString("fr-FR")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}