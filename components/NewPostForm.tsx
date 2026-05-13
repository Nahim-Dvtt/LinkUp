"use client";

import { useActionState } from "react";

import { createPostAction } from "@/app/actions/posts";

const initialState = {
  error: "",
  success: false,
};

export default function NewPostForm() {
  const [state, formAction, pending] =
    useActionState(
      createPostAction,
      initialState
    );

  return (
    <form
      action={formAction}
      className="new-post-form"
    >
      <textarea
        name="content"
        placeholder="Quoi de neuf ? ✨"
        className="new-post-textarea"
      />

      {/* ✅ erreurs */}
      {state?.error && (
        <p className="form-error">
          {state.error}
        </p>
      )}

      <div className="new-post-footer">
        <button
          type="submit"
          disabled={pending}
          className="publish-btn"
        >
          {pending
            ? "Publication..."
            : "Publier"}
        </button>
      </div>
    </form>
  );
}