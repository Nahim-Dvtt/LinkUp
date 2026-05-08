import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// 🔹 GET ONE POST
export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        author: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          error: "Post introuvable",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur récupération post",
      },
      {
        status: 500,
      }
    );
  }
}

// 🔹 DELETE POST
export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  try {
    // 🔥 session
    const session = await auth();

    // 🔥 pas connecté
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

    // 🔥 retrouver le post
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        author: true,
      },
    });

    // 🔥 post inexistant
    if (!post) {
      return NextResponse.json(
        {
          error: "Post introuvable",
        },
        {
          status: 404,
        }
      );
    }

    // 🔥 ownership
    if (
      post.author.email !==
      session.user.email
    ) {
      return NextResponse.json(
        {
          error:
            "Vous ne pouvez pas supprimer ce post",
        },
        {
          status: 403,
        }
      );
    }

    // 🔥 suppression
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur suppression",
      },
      {
        status: 500,
      }
    );
  }
}