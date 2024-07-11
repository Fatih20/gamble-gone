import { Chat } from "./chat";

export default function ChatPage() {
  return (
    <main className="flex min-h-screen">
      <section className="flex w-full flex-col">
        {/* Header */}
        {/* sticky left-0 right-0 top-0 z-40 */}
        <header className="border-b bg-primary-white p-16 pb-8">
          <h1 className="text-5xl font-extrabold text-primary-black">
            AI Help Chat
          </h1>
          <p className="mt-1 text-2xl font-semibold text-primary-green">
            Tanyakan yang Anda mau dengan asisten AI kami!
          </p>
        </header>

        {/* Chat Content */}
        <Chat />
      </section>
    </main>
  );
}
