"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { revalidatePath } from "next/cache";

import { z } from "zod";

// ✅ schéma validation
const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "Le post ne peut pas être vide")
    .max(280, "280 caractères maximum"),
});

export async function createPostAction(
  prevState: any,
  formData: FormData
) {
  try {
    // ✅ session
    const session = await auth();

    if (!session?.user?.email) {
      return {
        error: "Vous devez être connecté",
      };
    }

    // ✅ contenu
    const content = formData.get("content");

    // ✅ validation Zod
    const validated =
      createPostSchema.safeParse({
        content,
      });

    // ✅ erreur validation
    if (!validated.success) {
      return {
        error:
          validated.error.flatten()
            .fieldErrors.content?.[0],
      };
    }

    // ✅ retrouver user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return {
        error: "Utilisateur introuvable",
      };
    }

    // ✅ création post
    await prisma.post.create({
      data: {
        content: validated.data.content,
        authorId: user.id,
      },
    });

    // ✅ invalider cache homepage
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      error: "Erreur serveur",
    };
  }
}