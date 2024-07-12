import { getServerAuthSession } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { CreateInitialDebtSchema } from "@/schema/debt";
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

  const rawDebt = Object.fromEntries(formData);
  const parseResult = await CreateInitialDebtSchema.safeParseAsync(rawDebt);
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

  const { amount, debtName } = parseResult.data;

  try {
    await prisma.debt.create({
      data: {
        amount,
        debtName,
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
    }
  }

  return NextResponse.json(
    {
      message: "Debt added",
    },
    { status: 201 },
  );
};
