import { NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(req: Request) {
  const body = await req.json();

  const { content, author, handle } = body;

  if (!content || !author || !handle) {
    return NextResponse.json(
      { error: "Champs manquants" },
      { status: 400 }
    );
  }

  const newPost = createPost({ content, author, handle });

  return NextResponse.json(newPost, { status: 201 });
}