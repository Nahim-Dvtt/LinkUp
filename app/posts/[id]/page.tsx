import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return {
      title: "Post introuvable",
    };
  }

  return {
    title: `${post.author.name} • LinkUp`,
    description: post.content,
  };
}

export default async function PostDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return (
      <div className="feed-page">
        <div className="feed-container">
          <p>Post introuvable 😕</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-page">
      <div className="feed-container">
        <PostCard
          id={post.id}
          author={post.author.name}
          handle={post.author.handle}
          content={post.content}
          likes={post.likes}
          time="Publié récemment"
        />
      </div>
    </div>
  );
}