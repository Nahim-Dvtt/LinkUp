type Post = {
  id: number;
  content: string;
  author: string;
  handle: string;
  likes: number;
  createdAt: string;
  liked?: boolean;
};

let posts: Post[] = [
  {
    id: 1,
    content: "Premier post sur LinkUp 🚀",
    author: "Jean Dupont",
    handle: "@jean",
    likes: 5,
    createdAt: new Date().toISOString(),
    liked: false,
  },
  {
    id: 2,
    content: "Hello tout le monde 👋",
    author: "Marie Martin",
    handle: "@marie",
    likes: 12,
    createdAt: new Date().toISOString(),
    liked: false,
  },
];

let nextId = 3;

// 📌 CRUD helpers

export function getPosts() {
  return posts;
}

export function getPostById(id: number) {
  return posts.find((p) => p.id === id);
}

export function createPost(data: Omit<Post, "id" | "createdAt" | "likes">) {
  const newPost: Post = {
    id: nextId++,
    content: data.content,
    author: data.author,
    handle: data.handle,
    likes: 0,
    createdAt: new Date().toISOString(),
    liked: false,
  };

  posts.unshift(newPost);
  return newPost;
}

export function updatePost(id: number, content: string) {
  const post = getPostById(id);
  if (!post) return null;

  post.content = content;
  return post;
}

export function deletePost(id: number) {
  posts = posts.filter((p) => p.id !== id);
}

export function toggleLike(id: number) {
  const post = getPostById(id);
  if (!post) return null;

  if (post.liked) {
    post.likes--;
    post.liked = false;
  } else {
    post.likes++;
    post.liked = true;
  }

  return post;
}