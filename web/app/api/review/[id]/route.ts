import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { UpdateReviewRequestSchema } from "@/schema/review";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export const PUT = async (req: NextRequest, context: { params: Params }) => {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  // Parse request formdata
  const formData = await req.formData();

  const rawReview = Object.fromEntries([
    ...Array.from(formData).map(([k, v]) => [
      k,
      k === "isAnonymous" ? (v === "true" ? true : false) : v,
    ]),
  ]);

  const parseResult = await UpdateReviewRequestSchema.safeParseAsync(rawReview);
  if (!parseResult.success) {
    const errorFields = getZodParsingErrorFields(parseResult);
    return NextResponse.json(
      {
        message: "Request body not valid",
        errorFields: errorFields,
      },
      { status: 400 },
    );
  }

  // Get parsed review, rating, and isAnonymous
  const { review, rating, isAnonymous } = parseResult.data;
  const userID = session.id;
  const reviewID = context.params.id;

  let data;
  try {
    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: {
        userId: userID,
      },
    });
    if (!existingReview) {
      return NextResponse.json(
        {
          message: "Review not found",
        },
        { status: 404 },
      );
    }

    // Check if review belongs to user
    if (existingReview.id !== reviewID) {
      return NextResponse.json(
        {
          message: "Not your review",
        },
        { status: 403 },
      );
    }

    // Update review
    data = await prisma.review.update({
      where: {
        userId: userID,
      },
      data: {
        review: review,
        rating: rating,
        isAnonymous: isAnonymous,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Prisma error
      return NextResponse.json(
        {
          message: e.message,
        },
        { status: 500 },
      );
    } else if (typeof e === "string") {
      // Other error
      return NextResponse.json(
        {
          message: e,
        },
        { status: 500 },
      );
    } else {
      // Unknown error
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  }

  // TODO:
  // Invalidate cache (ISR)

  // Success
  return NextResponse.json({
    message: "Review updated successfully",
    data: data,
  });
};
