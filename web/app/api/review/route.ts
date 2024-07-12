import { authOptions } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { CreateReviewRequestSchema } from "@/schema/review";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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

  const parseResult = await CreateReviewRequestSchema.safeParseAsync(rawReview);

  if (!parseResult.success) {
    const errorFields = getZodParsingErrorFields(parseResult);
    return NextResponse.json(
      {
        message: "Validasi request body gagal",
        errorFields: errorFields,
      },
      { status: 400 },
    );
  }

  // Get parsed review, rating, and isAnonymous
  const { review, rating, isAnonymous } = parseResult.data;

  // Create review
  try {
    await prisma.review.create({
      data: {
        review: review,
        rating: rating,
        isAnonymous: isAnonymous,
        userId: session.id,
      },
    });
  } catch (e) {
    // Prisma error
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint error (user already reviewed)
      if (e.code === "P2002") {
        return NextResponse.json(
          {
            message: "Anda sudah memberikan review",
          },
          { status: 400 },
        );
      }
      // Other Prisma error
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
          message: "Terjadi kesalahan",
        },
        { status: 500 },
      );
    }
  }

  // TODO: Invalidate cache
  // Revalidate home page (ISR strategy)

  // Return success response
  return NextResponse.json(
    {
      message: "Review added successfully",
    },
    { status: 200 },
  );
};
