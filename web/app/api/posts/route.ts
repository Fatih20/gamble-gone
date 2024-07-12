import { authOptions } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { PlateRichTextSchema } from "@/schema/plate";
import { CreatePostsSchema } from "@/schema/posts";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
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

  // Validate form data body
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const parseResult = await CreatePostsSchema.safeParseAsync(body);
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

  // Valdate rich text content
  const rawRichContent = JSON.parse(parseResult.data.content);
  const parseRichContentResult =
    await PlateRichTextSchema.safeParseAsync(rawRichContent);
  if (!parseRichContentResult.success) {
    return NextResponse.json(
      {
        message: "Validasi konten struktur konten gagal",
        errorFields: parseRichContentResult.error,
      },
      { status: 400 },
    );
  }

  // Get parsed title, previewText, content, and isAnonymous
  const { title, previewText, isAnonymous } = parseResult.data;
  const content = parseRichContentResult.data;
  const userID = session.id;

  console.log(title, previewText, isAnonymous, content);

  // Create post
  let data;
  try {
    data = await prisma.post.create({
      data: {
        title: title,
        previewText: previewText,
        content: content as Prisma.JsonArray,
        isAnonymous: isAnonymous,
        userId: userID,
      },
    });
  } catch (e) {
    console.log(e);
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
          message: "Terjadi kesalahan",
        },
        { status: 500 },
      );
    }
  }

  // Revalidate path
  revalidatePath("/posts");
  revalidatePath(`/posts/${data.id}`);

  return NextResponse.json(
    { message: "Post berhasil dibuat", data: data },
    { status: 201 },
  );
};
