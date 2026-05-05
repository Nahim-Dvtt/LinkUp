export type User = {
  id: number;
  name: string;
  handle: string;
  bio: string;
  followers: number;
};

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    return []; // ✅ évite crash
  }
  
  const data: Array<{
    id: number;
    name: string;
    username: string;
    company: { catchPhrase: string };
  }> = await res.json();

  return data.map((user) => ({
    id: user.id,
    name: user.name,
    handle: `@${user.username}`,
    bio: user.company.catchPhrase,
    followers: Math.floor(Math.random() * 10000),
  }));
}

export async function getUserById(id: number): Promise<User | null> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!res.ok) {
    return null; // ✅ important
  }

  const user = await res.json();

  return {
    id: user.id,
    name: user.name,
    handle: `@${user.username}`,
    bio: user.company.catchPhrase,
    followers: Math.floor(Math.random() * 10000),
  };
}