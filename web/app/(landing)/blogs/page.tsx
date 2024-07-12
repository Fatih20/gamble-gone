import { Button } from "@/components/ui/button";
import RankBadge from "@/components/ui/rank-badge";
import { prisma } from "@/lib/prisma";
import { type Posts } from "@/types/posts";
import { Value } from "@udecode/plate";
import Link from "next/link";

export default async function Blogs() {
  // Get blogs data
  const posts = await prisma.post.findMany({
    include: { user: true },
  });

  const data = posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      previewText: post.previewText,
      content: post.content as Value,
      createdAt: post.createdAt,
      createdBy: post.isAnonymous
        ? null
        : {
            id: post.user.id,
            name: post.user.name,
            username: post.user.username,
            totalPoints: post.user.totalPoints,
          },
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24">
      <section className="flex w-full max-w-7xl flex-col items-center gap-12">
        {/* Title */}
        <div className="w-full max-w-4xl">
          <h1 className="text-center text-6xl font-extrabold text-primary-black">
            Blog
          </h1>
          <p className="mt-3 text-center text-3xl font-medium text-primary-purple">
            Baca cerita dari pengalaman para pengguna BersihBet
          </p>
        </div>

        {/*  */}
        <ul className="grid grid-cols-2 gap-8 2xl:grid-cols-3">
          {data.map((dt) => {
            return (
              <li key={dt.id} className="flex">
                <BlogCard data={dt} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export function BlogCard({ data }: { data: Posts }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border bg-secondary-white p-6">
      {/* Header */}
      <header>
        <time className="text-base font-medium text-secondary-gray">
          {data.createdAt.toDateString()}
        </time>
        <h2 className="text-2xl font-bold italic text-primary-black line-clamp-3">
          {data.title}
        </h2>
        <div className="mt-1 flex flex-row items-center gap-2">
          {data.createdBy ? (
            <>
              <p className="text-base font-medium text-primary-black">
                {data.createdBy.username}
              </p>
              <RankBadge points={data.createdBy.totalPoints} />
            </>
          ) : (
            <p className="text-base font-medium text-primary-black">
              Anonymous
            </p>
          )}
        </div>
      </header>

      {/* Preview */}
      <div className="flex flex-auto flex-col justify-between gap-4">
        <p className="line-clamp-5 text-base text-primary-black">
          {data.previewText}
        </p>

        {/* Detail Button */}
        <Link href={`/blogs/${data.id}`} className="self-end">
          <Button
            variant="purple"
            className="rounded-full px-5 font-bold"
            size="lg"
          >
            Baca Selengkapnya
          </Button>
        </Link>
      </div>
    </article>
  );
}
