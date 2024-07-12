import { Chat } from "./chat";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";
import { Message } from "@/types/message";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  const { id } = session;

  const chatMessageHistoryRaw = await prisma.chatMessage.findMany({
    where: { userId: { equals: id } },
    orderBy: { createdAt: "asc" },
    select: { role: true, content: true, id: true },
  });

  const chatMessageHistory = chatMessageHistoryRaw.map(
    ({ content, role, id }) => {
      return {
        id,
        message: content,
        sender: role,
      } as Message;
    },
  );

  return (
    <main className="flex min-h-screen max-h-screen h-screen">
      <section className="flex w-full flex-col h-full max-h-screen">
        {/* Header */}
        {/* sticky left-0 right-0 top-0 z-40 */}
        <header className="border-b bg-primary-white p-16 pb-8 mb-4">
          <h1 className="text-5xl font-extrabold text-primary-black">
            AI Help Chat
          </h1>
          <p className="mt-1 text-2xl font-semibold text-primary-purple">
            Ask anything that might help with your recovery process using our AI
            assistant who have been informed of your circumstances.
          </p>
        </header>

        {/* Chat Content */}
        <Chat message={chatMessageHistory} />
      </section>
    </main>
  );
}
