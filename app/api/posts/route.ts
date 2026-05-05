import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    const formatted = posts.map((p) => ({
      id: p.id,
      content: p.content,
      likes: p.likes,
      createdAt: p.createdAt,
      author: p.author.name,
      handle: p.author.handle,
      authorId: p.author.id,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("API /posts error:", error);

    // 🔥 IMPORTANT : toujours renvoyer du JSON
    return NextResponse.json(
      { error: "Erreur serveur Prisma" },
      { status: 500 }
    );
  }
}