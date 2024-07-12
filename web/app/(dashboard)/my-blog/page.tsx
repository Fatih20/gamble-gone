import { EditDeleteButton } from "./edit-delete-button";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { type Posts } from "@/types/posts";
import { Value } from "@udecode/plate";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyBlog() {
  // Get session data
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  // Get my blog data
  const posts = await prisma.post.findMany({
    where: {
      user: {
        id: session.id,
      },
    },
    include: {
      user: true,
    },
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
    <main className="flex min-h-screen flex-col items-center bg-white p-24">
      <section className="flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-row justify-between">
          <h1 className="text-5xl font-extrabold text-primary-black">
            My Blog
          </h1>

          <Link href="/my-blog/create">
            <Button
              className="rounded-full px-5 font-bold"
              size="lg"
              variant="green"
            >
              <Plus className="mr-2 text-primary-black" />
              Tambah Blog
            </Button>
          </Link>
        </header>

        {data.length === 0 ? (
          <p className="font-medium text-lg text-center text-primary-black">
            You have no posts
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-8 2xl:grid-cols-3">
            {data.map((dt) => (
              <li key={dt.id} className="flex">
                <MyBlogCard data={dt} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function MyBlogCard({ data }: { data: Posts }) {
  return (
    <article className="flex flex-auto flex-col gap-2 rounded-2xl border bg-secondary-white p-6">
      {/* Header */}
      <header>
        <div className="flex flex-row justify-between">
          <time className="text-base font-medium text-secondary-gray">
            {data.createdAt.toDateString()}
          </time>

          {data.createdBy && <Badge variant="Newborn">Anonymous</Badge>}
        </div>
        <h2 className="text-2xl font-bold italic text-primary-black">
          {data.title}
        </h2>
      </header>

      {/* Preview */}
      <div className="flex flex-auto flex-col justify-between gap-4">
        <p className="line-clamp-5 text-base text-primary-black">
          {data.previewText}
        </p>

        {/* Detail Button */}
        <EditDeleteButton blogID={data.id} />
      </div>
    </article>
  );
}
