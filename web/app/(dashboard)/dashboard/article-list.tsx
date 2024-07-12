import { BlogCard } from "@/app/(landing)/blogs/blog-card";
import { prisma } from "@/lib/prisma";
import { Value } from "@udecode/plate";

export async function ArticleList() {
  // Get 3 latest articles from DB
  const articles = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          totalPoints: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const data = articles.map((post) => {
    return {
      id: post.id,
      title: post.title,
      previewText: post.previewText,
      content: post.content as Value,
      createdAt: post.createdAt,
      createdBy: post.isAnonymous ? null : post.user,
    };
  });

  // If articles exist
  return (
    <section className="flex flex-col items-start w-full gap-8 max-w-7xl">
      <header>
        <h1 className="font-extrabold text-3xl text-primary-black">
          Articles For You!
        </h1>
      </header>

      {articles.length === 0 ? (
        <div className="text-xl font-medium self-center">
          Article recommendation is empty.
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-8">
          {data.map((article) => (
            <li key={article.id} className="flex">
              <BlogCard data={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
