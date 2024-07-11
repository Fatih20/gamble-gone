import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { FullProfileSchema } from "@/schema/auth";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  // Parse request form data

  const formData = await req.formData();

  const rawData = Object.fromEntries(
    Array.from(formData).map(([k, v]) => {
      if (k === "gamblingDuration") {
        return [k, Number(v)];
      } else if (k === "birthDate") {
        // @ts-ignore
        return [k, new Date(v)];
      } else {
        return [k, v];
      }
    }),
  );

  const parseResult = await FullProfileSchema.safeParseAsync(rawData);
  if (!parseResult.success) {
    const errorFields = getZodParsingErrorFields(parseResult);
    return NextResponse.json(
      {
        message: "Failed to parse form data",
        errorFields: errorFields,
      },
      { status: 400 },
    );
  }

  // Get parsed username and password
  const {
    username,
    password,
    birthDate,
    gamblingDuration,
    gamblingStory,
    gender,
    name,
    whyStop,
  } = parseResult.data;

  // Create user
  const hashedPassword = await hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        birthDate,
        gamblingDuration,
        username,
        gamblingStory,
        password: hashedPassword,
        gender,
        name,
        whyStop,
      },
    });
  } catch (e) {
    // Prisma error
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // Username is already taken
      if (e.code === "P2002") {
        return NextResponse.json(
          {
            message: "Username is already taken",
            fields: [
              {
                field: "username",
                message: "Username is already taken",
              },
            ],
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
          message: "An error occurred",
        },
        { status: 500 },
      );
    }
  }

  // Success
  return NextResponse.json(
    { message: "Success Registration" },
    { status: 201 },
  );
};
