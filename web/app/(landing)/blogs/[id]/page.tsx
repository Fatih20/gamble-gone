import { Badge } from "@/components/ui/badge";
import { mockPosts } from "@/mock-data/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export async function generateStaticParams() {
  // Mock data
  const posts = mockPosts;

  return posts.map((post) => ({
    id: post.id,
  }));
}

export default function BlogsDetail({ params }: { params: Params }) {
  // Get blog data
  const blogID = params.id;
  const blog = mockPosts.find((post) => post.id === blogID);

  // Not found
  if (!blog) {
    return notFound();
  }

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
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="mt-6 flex flex-row justify-between">
            <time className="text-base font-medium text-secondary-white">
              {blog.createdAt.toDateString()}
            </time>

            <div className="flex flex-row items-center gap-3">
              {blog.createdBy ? (
                <>
                  <p className="text-base font-extrabold text-primary-green">
                    {blog.createdBy.username}
                  </p>
                  <Badge variant="green">{blog.createdBy.rank}</Badge>
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
          <p>{blog.content}</p>
        </div>
      </article>
    </main>
  );
}
