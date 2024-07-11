import { getServerAuthSession } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { AddTaskSchema } from "@/schema/tasks";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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
  const rawTask = Object.fromEntries([
    ...Array.from(formData).map(([k, v]) => [
      k,
      k === "taskPoints" ? Number(v) : v,
    ]),
  ]);

  const parseResult = await AddTaskSchema.safeParseAsync(rawTask);
  if (!parseResult.success) {
    const errorFields = getZodParsingErrorFields(parseResult);
    return NextResponse.json(
      {
        message: "Request Body Validation Failed",
        errorFields: errorFields,
      },
      { status: 400 },
    );
  }

  const { taskName, taskPoints, taskDescription } = parseResult.data;

  try {
    await prisma.dailyTask.create({
      data: {
        taskName,
        taskPoints,
        taskDescription,
        userId: session.id,
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

  return NextResponse.json(
    {
      message: "Task added succsessfully",
    },
    { status: 201 },
  );
};
