import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur récupération posts",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const { content, authorId } = body;

    // 🔥 validation
    if (!content || !authorId) {
      return NextResponse.json(
        {
          error: "content et authorId requis",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId: Number(authorId),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}