export type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

export async function getPosts(): Promise<Post[]> {
  try {
    const [postsRes, usersRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ]);

    if (!postsRes.ok || !usersRes.ok) {
      return []; // ✅ évite crash
    }

    const posts = await postsRes.json() as { id: number; userId: number; title: string }[];
    const users = await usersRes.json() as { id: number; name: string; username: string }[];

    return posts.slice(0, 6).map((post, index) => {
      const user = users.find((u) => u.id === post.userId);

      return {
        id: post.id,
        author: user?.name || "Utilisateur inconnu",
        handle: `@${user?.username || "unknown"}`,
        content: post.title,
        likes: Math.floor(Math.random() * 100),
        time: `${index + 1}h`,
      };
    });
  } catch (error) {
    console.error("Erreur getPosts:", error);
    return []; // ✅ fallback
  }
}

export async function getPostById(id: number) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erreur getPostById:", error);
    return null;
  }
}

export async function getCommentsByPostId(postId: number) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );

    if (!res.ok) return [];

    const data = await res.json() as { id: number; name: string; body: string }[];

    return data.slice(0, 5).map((c) => ({
      id: c.id,
      name: c.name,
      body: c.body,
    }));
  } catch {
    return [];
  }
}