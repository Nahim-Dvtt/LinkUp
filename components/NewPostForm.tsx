"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) setAuthorId(data[0].id);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content || !authorId) return;

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content, authorId }),
      headers: { "Content-Type": "application/json" },
    });

    setContent("");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "1.2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        marginBottom: "1.5rem",
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf ? "
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <select
          value={authorId ?? ""}
          onChange={(e) => setAuthorId(Number(e.target.value))}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "0.4rem 0.6rem",
          }}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            background: "#6d28d9",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Publier
        </button>
      </div>
    </form>
  );
}