"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="auth-container">
        <span className="auth-user">
          {session.user.name}
        </span>

        <button
          onClick={() => signOut()}
          className="nav-auth-btn logout-btn"
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="nav-auth-btn"
    >
      Connexion
    </button>
  );
}