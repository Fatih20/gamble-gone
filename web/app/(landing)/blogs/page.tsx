import { BlogCard } from "./blog-card";
import { prisma } from "@/lib/prisma";
import { Value } from "@udecode/plate";

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
            Read stories from the user of GambleGone
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
