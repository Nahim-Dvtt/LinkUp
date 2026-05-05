import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 🔥 clean la base
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 👤 créer des users
  const user1 = await prisma.user.create({
    data: {
      name: "Jean Dupont",
      handle: "@jean",
      bio: "Développeur passionné",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Marie Martin",
      handle: "@marie",
      bio: "Frontend lover",
    },
  });

  // 📝 créer des posts
  await prisma.post.createMany({
    data: [
      {
        content: "Premier post sur LinkUp 🚀",
        authorId: user1.id,
      },
      {
        content: "Hello tout le monde 👋",
        authorId: user2.id,
      },
    ],
  });
}

// 🚀 exécution propre
main()
  .then(() => {
    console.log("🌱 Seed terminé");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });