import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    return NextResponse.json(null, { status: 404 });
  }

  const updated = await prisma.post.update({
    where: { id: post.id },
    data: {
      likes: post.likes + 1,
    },
  });

  return NextResponse.json(updated);
}