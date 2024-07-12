import { getServerAuthSession } from "../../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { AddDebtManagerDataSchema } from "@/schema/debt";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export const POST = async (req: NextRequest, context: { params: Params }) => {
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

  const rawDebt = Object.fromEntries(formData);
  const parseResult = await AddDebtManagerDataSchema.safeParseAsync(rawDebt);
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

  const { amount, type, note } = parseResult.data;

  const { id } = context.params;

  try {
    const debt = await prisma.debt.findFirst({
      where: {
        id: id,
        userId: session.id,
      },
    });

    if (!debt) {
      return NextResponse.json(
        {
          message: "Debt not found",
        },
        { status: 404 },
      );
    }

    // Create a new DebtManager entry
    await prisma.debtManager.create({
      data: {
        amount,
        type,
        note,
        debtId: id,
        userId: session.id,
      },
    });

    // Calculate the new amount based on the transaction type
    let newAmount = 0;
    if (type === "payment") {
      newAmount = Math.max(0, debt.amount - amount); // Ensure the new amount doesn't go below zero
    } else if (type === "relapse") {
      newAmount = debt.amount + amount;
    }

    await prisma.debt.update({
      where: {
        id: id,
      },
      data: {
        amount: newAmount,
        isFinished: newAmount <= 0,
      },
    });

    return NextResponse.json(
      {
        message: "Debt updated",
      },
      { status: 201 },
    );
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
    }
  }

  return NextResponse.json(
    {
      message: "An unexpected error occurred",
    },
    { status: 500 },
  );
};
