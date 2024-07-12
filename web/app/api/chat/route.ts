import { Chatbot } from "@/lib/ai/chatbot";
import { getZodParsingErrorFields } from "@/lib/zod";
import { ChatSchema } from "@/schema/chat";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
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

  const chatbot = await Chatbot.getInstance();

  const answer = await chatbot.ask({
    question,
    gamblingDuration: `${5}`,
    gamblingStory:
      "I got into gambling because after I lost my job working in the factory for 8 years. When I was down and out back at that time, I was intrigued by an ad for a gambling app acessible by my phone. I was instantly hooked and couldn't stop. I quickly blew through my savings and gambled it all away. When it has ran out, I borrowed as much money as possible.",
    whyStop:
      "I've incurred so much debt to finance my gambling thus far and I want to stop before I dig this hole even further.",
  });

  return NextResponse.json(
    {
      answer,
    },
    { status: 200 },
  );
};
