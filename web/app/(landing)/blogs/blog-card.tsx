import { Button } from "@/components/ui/button";
import RankBadge from "@/components/ui/rank-badge";
import { type Posts } from "@/types/posts";
import Link from "next/link";

export function BlogCard({ data }: { data: Posts }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border flex-auto bg-secondary-white p-6">
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
            Read More
          </Button>
        </Link>
      </div>
    </article>
  );
}
