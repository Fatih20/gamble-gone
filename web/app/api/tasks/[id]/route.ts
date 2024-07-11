import { getServerAuthSession } from "../../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { UpdateTaskSchema } from "@/schema/tasks";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export const PATCH = async (req: NextRequest, context: { params: Params }) => {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  const taskId = context.params.id;
  const formData = await req.formData();
  const taskStatusData = formData.get("taskStatus") === "true";

  const parseResult = UpdateTaskSchema.safeParse({
    id: taskId,
    taskStatus: taskStatusData,
  });

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

  const { id, taskStatus } = parseResult.data;

  try {
    // check if the task is owned by the user

    const task = await prisma.dailyTask.findFirst({
      where: {
        id,
        userId: session.id,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "Task Not Found",
        },
        { status: 404 },
      );
    }

    if (task.taskStatus) {
      return NextResponse.json(
        {
          message: "Task is Done",
        },
        { status: 400 },
      );
    }

    if (task.userId !== session.id) {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        { status: 404 },
      );
    }
    const updateDailyTask = prisma.dailyTask.update({
      where: {
        id,
      },
      data: {
        taskStatus,
      },
    });

    const updateUserPoints = prisma.user.update({
      where: {
        id: session.id,
      },
      data: {
        totalPoints: {
          increment: task.taskPoints,
        },
      },
    });

    await Promise.all([updateDailyTask, updateUserPoints]);
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
      message: "Task updated succsessfully",
    },
    { status: 200 },
  );
};
