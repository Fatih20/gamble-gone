import { getServerAuthSession } from "../auth/[...nextauth]/auth-options";
import { DebtAnalyser } from "@/lib/ai/debtAnalyser";
import { getZodParsingErrorFields } from "@/lib/zod";
import { DebtAnalysisSchema } from "@/schema/debt";
import { StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rawData = await req.json();
  const parseResult = await DebtAnalysisSchema.safeParseAsync(rawData);
  const session = await getServerAuthSession();

  if (!session) {
    return NextResponse.json(
      {
        message: "You must be logged in to access this resource",
      },
      { status: 401 },
    );
  }

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
  const background = `${session.gamblingStory}. I have been gambling for ${session.gamblingDuration} months. I want to stop because ${session.whyStop}`;

  const debtAnalyser = DebtAnalyser.getInstance();
  const analysis = await debtAnalyser.ask(
    currentDebt,
    debtTransactions,
    background,
  );

  return NextResponse.json(
    {
      analysis,
    },
    { status: 200 },
  );

  // return new StreamingTextResponse(analysis);
};
