import { NextResponse } from "next/server";
import {
  getPostById,
  updatePost,
  deletePost,
} from "@/lib/store";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = getPostById(Number(params.id));

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
  const updated = updatePost(Number(params.id), body.content);

  if (!updated) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  deletePost(Number(params.id));
  return NextResponse.json({ success: true });
}