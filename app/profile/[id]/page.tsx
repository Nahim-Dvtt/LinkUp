import { getUserById } from "@/lib/users";

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function ProfileDetailPage({ params }: Props) {
  const user = await getUserById(Number(params.id));

  if (!user) {
    return (
      <div className="profile">
        <p>Utilisateur introuvable 😕</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar">
            {user.name?.charAt(0)}
          </div>

          <div className="profile-info">
            <h2>{user.name}</h2>
            <span className="handle">{user.handle}</span>
          </div>
        </div>

        <p className="profile-bio">{user.bio}</p>

        <div className="profile-stats">
          <span>
            <strong>{user.followers.toLocaleString()}</strong> abonnés
          </span>
        </div>
      </div>
    </div>
  );
}