import { Badge } from "@/components/ui/badge";
import Ratings from "@/components/ui/rating";
import { mockReviews } from "@/mock-data/review";
import { type Review } from "@/types/review";
import Image from "next/image";

export function WhatTheySay() {
  // Get reviews
  const reviews = mockReviews;

  return (
    <section className="flex w-full items-center justify-center p-24">
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        {/* Title */}
        <header className="w-full max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-primary-green">
            What they say
          </h1>
          <h2 className="mt-2 text-center text-6xl font-extrabold text-primary-black">
            Cerita dari pengguna setia BersihBet
          </h2>
        </header>

        {/* Reviews */}
        <ul className="grid grid-cols-2 gap-6">
          {reviews.map((review) => {
            return (
              <li key={review.id} className="flex">
                <ReviewCard review={review} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-auto flex-col justify-between rounded-2xl border border-border bg-secondary-white p-7 gap-2">
      <div className="flex flex-col items-start gap-3">
        {/* Stars */}
        <Ratings value={review.rating} variant="yellow" size={28} />

        {/* Review */}
        <p className="text-lg font-medium text-primary-black">
          {review.review}
        </p>
      </div>

      {/* User */}
      <div className="flex flex-row items-center gap-2">
        {review.createdBy ? (
          <>
            <p className="text-base font-bold text-primary-purple">
              {review.createdBy.name}
            </p>
            <Badge variant="green">{review.createdBy.rank}</Badge>
          </>
        ) : (
          <p className="text-base font-bold text-primary-purple">Anonymous</p>
        )}
      </div>
    </article>
  );
}
