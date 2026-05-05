export type Post = {
  id: number;
  content: string;
  author: string;
  handle: string;
  likes: number;
  createdAt?: string;
};

// 🔹 Récupérer tous les posts depuis TON API
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erreur fetch posts");
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur getPosts:", error);
    return [];
  }
}

// 🔹 Récupérer un post par ID
export async function getPostById(id: number): Promise<Post | null> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Post introuvable");
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur getPostById:", error);
    return null;
  }
}

// 🔹 Créer un post (utilisé côté client)
export async function createPost(data: {
  content: string;
  author: string;
  handle: string;
}) {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erreur création post");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Like / Unlike un post
export async function toggleLike(postId: number) {
  try {
    const res = await fetch(`/api/posts/${postId}/likes`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Erreur like");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Récupérer les commentaires d’un post
export async function getCommentsByPostId(postId: number) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Erreur fetch commentaires");
      return [];
    }

    const data = await res.json();

    return data.slice(0, 5).map((c: { id: number; name: string; body: string }) => ({
      id: c.id,
      name: c.name,
      body: c.body,
    }));
  } catch (error) {
    console.error("Erreur getCommentsByPostId:", error);
    return [];
  }
}