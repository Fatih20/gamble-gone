import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { PlateRichTextSchema } from "@/schema/plate";
import { UpdatePostsSchema } from "@/schema/posts";
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

  // Validate form data body
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const parseResult = await UpdatePostsSchema.safeParseAsync(body);
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
  const rawRichText = JSON.parse(parseResult.data.content);
  const parseRichTextResult =
    await PlateRichTextSchema.safeParseAsync(rawRichText);
  if (!parseRichTextResult.success) {
    return NextResponse.json(
      {
        message: "Validasi konten struktur konten gagal",
        errorFields: parseRichTextResult.error,
      },
      { status: 400 },
    );
  }

  // Get parsed title, content, and isAnonymous
  const { title, previewText, isAnonymous } = parseResult.data;
  const content = parseRichTextResult.data;
  const userID = session.id;
  const postID = context.params.id;

  // Update post
  let data;
  try {
    // Validate post
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postID,
      },
    });

    // Not found
    if (!existingPost) {
      return NextResponse.json(
        {
          message: "Post tidak ditemukan",
        },
        { status: 404 },
      );
    }

    // Not authorized
    if (existingPost.userId !== userID) {
      return NextResponse.json(
        {
          message: "Bukan post milik Anda",
        },
        { status: 403 },
      );
    }

    data = await prisma.post.update({
      where: {
        id: postID,
      },
      data: {
        title: title,
        previewText: previewText,
        content: content as Prisma.JsonArray,
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
          message: "Terjadi kesalahan",
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "Post berhasil diubah", data: data },
    { status: 200 },
  );
};

export const DELETE = async (req: NextRequest, context: { params: Params }) => {
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

  // Get post ID
  const postID = context.params.id;

  // Validate post
  const existingPost = await prisma.post.findUnique({
    where: {
      id: postID,
    },
  });

  // Not found
  if (!existingPost) {
    return NextResponse.json(
      {
        message: "Post tidak ditemukan",
      },
      { status: 404 },
    );
  }

  // Not authorized
  if (existingPost.userId !== session.id) {
    return NextResponse.json(
      {
        message: "Bukan post milik Anda",
      },
      { status: 403 },
    );
  }

  // Delete post
  try {
    await prisma.post.delete({
      where: {
        id: postID,
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
          message: "Terjadi kesalahan",
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "Post berhasil dihapus" },
    { status: 200 },
  );
};
