import { DebtAnalyser } from "@/lib/ai/debtAnalyser";
import { getZodParsingErrorFields } from "@/lib/zod";
import { DebtAnalysisSchema } from "@/schema/debt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rawData = await req.json();
  const parseResult = await DebtAnalysisSchema.safeParseAsync(rawData);
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

  const { currentDebt, debtTransactions } = parseResult.data;

  // This is a placeholder. Get the gambler's actual background from the session.
  const background =
    "I'm an online gambler who have worked for 50 years as a coal miner. I have always been bad with money with little desire to save my money. Once I got access to online gambling, I immediately become addicted to spend all my money into it.";

  const debtAnalyser = DebtAnalyser.getInstance();
  const analysis = await debtAnalyser.ask(
    currentDebt,
    debtTransactions,
    background,
  );

  return NextResponse.json({ analysis });
};
