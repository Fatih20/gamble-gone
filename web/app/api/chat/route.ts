import { authOptions } from "../auth/[...nextauth]/auth-options";
import { Chatbot } from "@/lib/ai/chatbot";
import { prisma } from "@/lib/prisma";
import { getZodParsingErrorFields } from "@/lib/zod";
import { ChatSchema } from "@/schema/chat";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

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

  const { id } = session;

  try {
    const chatMessageHistory = await prisma.chatMessage.findMany({
      where: { userId: { equals: id } },
      orderBy: { createdAt: "asc" },
      select: { role: true, content: true },
    });

    const chatMessageHistoryString = chatMessageHistory
      .map(({ content, role }) => {
        return `${role === "ai" ? "You" : "Gambler"}: ${content}`;
      })
      .join("\n\n");

    try {
      await prisma.chatMessage.create({
        data: { userId: id, content: question, role: "user" },
      });
    } catch (e) {
      return NextResponse.json(
        {
          message: "Problem when adding user messages to history",
        },
        { status: 500 },
      );
    }

    const answer = await chatbot.ask({
      chatMessageHistory: chatMessageHistoryString,
      question,
      gamblingDuration: `${session.gamblingDuration}`,
      gamblingStory: session.gamblingStory,
      whyStop: session.whyStop,
    });

    try {
      await prisma.chatMessage.create({
        data: { userId: id, content: answer, role: "ai" },
      });
    } catch (e) {
      return NextResponse.json(
        {
          message: "Problem when adding AI answer to history",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        answer,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Problem when fetching user messages",
      },
      { status: 500 },
    );
  }
};
