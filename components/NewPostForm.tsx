"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const [content, setContent] = useState("");

  const [isPending, startTransition] =
    useTransition();

  const router = useRouter();

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!content.trim()) return;

    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    setContent("");

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="new-post-form"
    >
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="Quoi de neuf ? ✨"
        className="new-post-textarea"
      />

      <div className="new-post-bottom">
        <button
          type="submit"
          className="publish-btn"
          disabled={isPending}
        >
          {isPending
            ? "Publication..."
            : "Publier"}
        </button>
      </div>
    </form>
  );
}