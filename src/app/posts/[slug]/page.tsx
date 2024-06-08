import Link from "next/link";
import React from "react";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

type Props = {
  params: {
    slug: string;
  };
};

const getCachedPost = (slug: string) =>
  unstable_cache(
    () => {
      return prisma.post.findUnique({
        where: { slug },
      });
    },
    ["post", "bySlug", slug],
    {
      tags: ["posts"],
    }
  );

const PostPage = async ({ params: { slug } }: Props) => {
  const post = await getCachedPost(slug)();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <Link href={"/posts"} className="underline">
        {post?.content}
      </Link>
    </main>
  );
};

export default PostPage;
