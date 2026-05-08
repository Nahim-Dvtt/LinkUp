import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  // 🔥 protection
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="feed-page">
      <div className="feed-container">
        <div className="profile-card">
          <h1>{session.user?.name}</h1>

          <p>
            Connecté avec GitHub ✅
          </p>
        </div>
      </div>
    </div>
  );
}