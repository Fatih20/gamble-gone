import { PlateRender } from "@/components/plate-ui/plate-render";
import RankBadge from "@/components/ui/rank-badge";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
// import { mockPosts } from "@/mock-data/posts";
import { Posts } from "@/types/posts";
import { ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export async function generateStaticParams() {
  // Get blogs data
  const posts = await prisma.post.findMany({ select: { id: true } });

  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  // Get blogs data
  const blogID = params.id;
  const posts = await prisma.post.findUnique({
    where: { id: blogID },
  });

  if (!posts) {
    return notFound();
  }

  const title = `${posts.title} | GambleGone`;

  return {
    title: title,
    openGraph: {
      ...openGraphTemplate,
      title: title,
    },
    twitter: {
      ...twitterTemplate,
      title: title,
    },
  };
}

export default async function BlogsDetail({ params }: { params: Params }) {
  // Get blog data
  const blogID = params.id;

  const blog = await prisma.post.findUnique({
    where: { id: blogID },
    include: { user: true },
  });

  // Not found
  if (!blog) {
    return notFound();
  }

  const data: Posts = {
    id: blog.id,
    title: blog.title,
    previewText: blog.previewText,
    content: blog.content as any,
    createdAt: blog.createdAt,
    createdBy: blog.isAnonymous
      ? null
      : {
          id: blog.user.id,
          name: blog.user.name,
          username: blog.user.username,
          totalPoints: blog.user.totalPoints,
        },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24">
      <article className="w-full max-w-7xl">
        {/* Header */}
        <header className="rounded-2xl bg-primary-black p-8">
          {/* Back */}
          <Link
            href="/blogs"
            className="flex flex-row items-center gap-2 text-primary-green"
          >
            <ArrowLeft className="size-5 stroke-[3]" />
            <span className="text-lg font-extrabold uppercase">Blog Post</span>
          </Link>

          {/* Title */}
          <h1 className="mt-3 text-5xl font-extrabold text-secondary-white">
            {data.title}
          </h1>

          {/* Metadata */}
          <div className="mt-6 flex flex-row justify-between">
            <time className="text-base font-medium text-secondary-white">
              {data.createdAt.toDateString()}
            </time>

            <div className="flex flex-row items-center gap-3">
              {data.createdBy ? (
                <>
                  <p className="text-base font-extrabold text-primary-green">
                    {data.createdBy.username}
                  </p>
                  <RankBadge points={data.createdBy.totalPoints} />
                </>
              ) : (
                <>
                  <p className="text-base font-extrabold text-primary-green">
                    Anonymous
                  </p>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-8 mt-8 text-lg text-primary-black">
          <PlateRender initialValue={data.content} />
        </div>
      </article>
    </main>
  );
}
