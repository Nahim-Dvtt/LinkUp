import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;

  const post = await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(post);
}