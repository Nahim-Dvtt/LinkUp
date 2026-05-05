export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem",
          marginBottom: "1rem",
          background: "white",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <h2 style={{ maxWidth: "600px", margin: "0 auto" }}>
          Profil utilisateur
        </h2>
      </div>

      {children}
    </div>
  );
}