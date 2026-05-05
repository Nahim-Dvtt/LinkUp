import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { author: true },
  });

  if (!post) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const updated = await prisma.post.update({
    where: { id: Number(params.id) },
    data: { content: body.content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true });
}