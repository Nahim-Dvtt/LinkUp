import { getUsers } from "@/lib/users";
import Link from "next/link";

type User = {
  id: string | number;
  name: string;
  handle: string;
  bio: string;
  followers: number;
};

export default async function ExplorePage() {
  const users: User[] = await getUsers();

  return (
    <div className="explore">
      <h1 className="explore-title">Explorer</h1>

      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-row">
              <div>
                            <Link href={`/profile/${user.id}`} className="user-name">
  {user.name}
</Link>
                <div className="user-handle">{user.handle}</div>
              </div>

              <button className="follow-btn">Suivre</button>
            </div>



            <p className="user-bio">{user.bio}</p>

            <div className="user-followers">
              {user.followers.toLocaleString()} abonnés
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}