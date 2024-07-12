import { EditBlogForm } from "./edit-blog-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { Value } from "@udecode/plate";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Params {
  id: string;
}

export default async function EditBlogPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  // Get id
  const blogID = params.id;

  // Mock initial value
  const blog = await prisma.post.findUnique({
    where: {
      id: blogID,
    },
  });

  if (!blog) {
    return notFound();
  }

  const initialValue = {
    title: blog.title,
    previewText: blog.previewText,
    isAnonymous: blog.isAnonymous,
    content: blog.content as Value,
  };

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
        <EditBlogForm blogID={blogID} initialValue={initialValue} />
      </section>
    </main>
  );
}
