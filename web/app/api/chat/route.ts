import { Chatbot } from "@/lib/ai/chatbot";
import { getZodParsingErrorFields } from "@/lib/zod";
import { ChatSchema } from "@/schema/chat";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rawData = await req.json();
  const parseResult = await ChatSchema.safeParseAsync(rawData);
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

  const { question } = parseResult.data;

  const chatbot = Chatbot.getInstance();

  const answer = await chatbot.ask(question, "42");

  return NextResponse.json(
    {
      answer,
    },
    { status: 200 },
  );
};
