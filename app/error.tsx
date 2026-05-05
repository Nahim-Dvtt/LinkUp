"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="home">
      <h1 className="home-title">Oups 😬</h1>

      <p style={{ marginBottom: "1rem", color: "#374151" }}>
        Impossible de charger les données. Vérifie ta connexion ou réessaie.
      </p>

      <button
        onClick={() => reset()}
        style={{
          background: "#6d28d9",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Réessayer
      </button>
    </div>
  );
}