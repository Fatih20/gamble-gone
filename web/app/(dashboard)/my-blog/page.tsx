import { DeleteBlogButton } from "./delete-blog-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPosts } from "@/mock-data/posts";
import { type Posts } from "@/types/posts";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

export default function MyBlog() {
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

        <ul className="grid grid-cols-2 gap-8 2xl:grid-cols-3">
          {mockPosts.map((post) => (
            <li key={post.id} className="flex">
              <MyBlogCard data={post} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function MyBlogCard({ data }: { data: Posts }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border bg-secondary-white p-6">
      {/* Header */}
      <header>
        <time className="text-base font-medium text-secondary-gray">
          {data.createdAt.toDateString()}
        </time>
        <h2 className="text-2xl font-bold italic text-primary-black">
          {data.title}
        </h2>
        <div className="mt-1 flex flex-row items-center gap-2">
          {data.createdBy ? (
            <>
              <p className="text-base font-medium text-primary-black">
                {data.createdBy.name}
              </p>
              <Badge variant="green">{data.createdBy.rank}</Badge>
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
        <div className="flex flex-row items-center gap-3 self-end">
          {/* Delete Blog */}
          <DeleteBlogButton />

          {/* Edit Blog */}
          <Link href={`/my-blog/${data.id}`}>
            <Button variant="purple" className="rounded-full px-5 font-bold">
              <Edit className="mr-2 size-5" />
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
