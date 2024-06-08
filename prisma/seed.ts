import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// retrieve the schema type
const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    slug: "post-1",
    content: "Hello world",
    published: true,
    author: {
      connectOrCreate: {
        where: {
          email: "xunruan@icloud.com",
        },
        create: {
          email: "xunruan@icloud.com",
          hashedPassword: "asodifn",
        },
      },
    },
  },
];

// have a main function to make it easier to use async/await
async function main() {
  console.log("Start seeding ...");
  await prisma.post.deleteMany();
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect(); // disconnect the client
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
