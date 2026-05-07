"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
};

export default function NewPostForm() {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [authorId, setAuthorId] = useState<number>(1);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  // 🔥 charger les users
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");

        const data = await res.json();

        setUsers(data);

        if (data.length > 0) {
          setAuthorId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          authorId,
        }),
      });

      // 🔥 debug ultra important
      if (!res.ok) {
const data = await res.json();
console.log(data);
        return;
      }

      setContent("");

      // 🔥 force refresh
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="new-post-form"
    >
      <textarea
        placeholder="Quoi de neuf ? ✨"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="new-post-textarea"
      />

      <div className="new-post-bottom">
        <select
          value={authorId}
          onChange={(e) =>
            setAuthorId(Number(e.target.value))
          }
          className="new-post-select"
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="publish-btn"
          disabled={isPending}
        >
          {isPending ? "Publication..." : "Publier"}
        </button>
      </div>
    </form>
  );
}