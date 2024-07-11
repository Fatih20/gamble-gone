"use client";

import { mockChat } from "@/mock-data/chat";
import { type Message } from "@/types/message";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(mockChat);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elmt = textAreaRef.current;

    elmt!.addEventListener("input", () => {
      elmt!.style.height = "24px";
      elmt!.style.height = elmt!.scrollHeight + "px";
    });

    return () => {
      elmt!.removeEventListener("input", () => {});
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-5xl flex-col px-16 pt-8">
        {/* Chat lists */}
        <div className="flex flex-col gap-3 pb-8">
          {messages.map((chat) => (
            <MessageLine key={chat.id} chat={chat} />
          ))}
        </div>

        {/* Input */}
        <div className="sticky bottom-0 pb-8 bg-white">
          <div className="flex flex-row items-center gap-2 rounded-[40px] border bg-secondary-white pl-8 pr-5">
            <textarea
              ref={textAreaRef}
              placeholder="Tulis yang Anda ingin tanyakan"
              className="mb-3 mt-2 h-6 max-h-60 w-full resize-none bg-transparent text-primary-black outline-none"
            />
            <button className="my-3 flex size-10 flex-none items-center justify-center rounded-full bg-primary-gray">
              <Send className="relative right-[2px] rotate-12 stroke-[#969595]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageLine({ chat }: { chat: Message }) {
  const isAi = chat.sender === "ai";

  // AI chat
  if (isAi) {
    return (
      <div className="mr-80 flex flex-row items-center gap-3 self-start">
        <Image
          className="size-11"
          src="/logo-squared.png"
          alt="AI Logo"
          width={48}
          height={48}
        />
        <p className="text-base">{chat.message}</p>
      </div>
    );
  }

  // User chat
  return (
    <div className="ml-80 self-end rounded-full border bg-secondary-white px-4 py-3">
      <p className="text-base text-primary-black">{chat.message}</p>
    </div>
  );
}
