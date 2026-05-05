import { NextResponse } from "next/server";
import { toggleLike } from "@/lib/store";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const post = toggleLike(Number(params.id));

  if (!post) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(post);
}