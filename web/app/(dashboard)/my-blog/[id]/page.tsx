import { EditBlogForm } from "./edit-blog-form";
import { mockPosts } from "@/mock-data/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export default function EditBlogPage({ params }: { params: Params }) {
  // Get id
  const blogID = params.id;

  // Mock initial value
  const mockInitialValue = mockPosts.find((post) => post.id === blogID);

  if (!mockInitialValue) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-24">
      <section className="flex w-full max-w-7xl flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col gap-2">
          {/* Back */}
          <Link
            href="/my-blog"
            className="flex flex-row items-center gap-2 text-primary-purple"
          >
            <ArrowLeft className="size-5 stroke-[3]" />
            <span className="text-lg font-extrabold uppercase">Back</span>
          </Link>

          {/* Title */}
          <h1 className="text-5xl font-extrabold text-primary-black">
            Edit Blog
          </h1>
        </header>

        {/* Form */}
        <EditBlogForm initialValue={mockInitialValue} />
      </section>
    </main>
  );
}
