import { getServerAuthSession } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { FullProfileUpdateSchema } from "@/schema/profile";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

// Update profile
export const PUT = async (req: NextRequest) => {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

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

  const parseResult = await FullProfileUpdateSchema.safeParseAsync(rawData);

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

  const {
    birthDate,
    gamblingDuration,
    gamblingStory,
    gender,
    whyStop,
    name,
    password,
  } = parseResult.data;

  let updateData: {
    birthDate: Date;
    gamblingStory: string;
    gamblingDuration: number;
    gender: string;
    whyStop: string;
    name: string;
    password?: string;
  } = {
    birthDate,
    gamblingStory,
    gamblingDuration,
    gender,
    whyStop,
    name,
  };

  if (password !== "") {
    const hashedPassword = await hash(password, 10);
    updateData = {
      ...updateData,
      password: hashedPassword,
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.id,
      },
      data: updateData,
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
    {
      message: "Profil berhasil diupdate",
    },
    { status: 200 },
  );
};
