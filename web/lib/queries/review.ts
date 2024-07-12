import { prisma } from "../prisma";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";

async function getUserReview() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }
  const res = await prisma.review.findUnique({
    where: {
      userId: session.id,
    },
    select: {
      review: true,
      rating: true,
      isAnonymous: true,
      id: true,
    },
  });

  return res;
}

type UserReview = NonNullable<Awaited<ReturnType<typeof getUserReview>>>;

export { getUserReview, type UserReview };
