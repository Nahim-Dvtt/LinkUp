import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// 🔹 GET ALL POSTS
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

// 🔹 CREATE POST
export async function POST(req: Request) {
  try {
    // 🔥 session utilisateur
    const session = await auth();

    // 🔥 non connecté
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Non autorisé",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const { content } = body;

    if (!content) {
      return NextResponse.json(
        {
          error: "Contenu requis",
        },
        {
          status: 400,
        }
      );
    }

    // 🔥 retrouver le user Prisma
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Utilisateur introuvable",
        },
        {
          status: 404,
        }
      );
    }

    // 🔥 création post
    const post = await prisma.post.create({
      data: {
        content,
        authorId: user.id,
      },

      include: {
        author: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur création post",
      },
      {
        status: 500,
      }
    );
  }
}