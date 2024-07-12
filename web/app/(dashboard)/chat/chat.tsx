"use client";

import { mockChat } from "@/mock-data/chat";
import { type Message } from "@/types/message";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);
  const messageBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function scrollIntoView() {
    console.log("Scrolling");
    if (!messageBottomRef.current) {
      return;
    }

    messageBottomRef.current.scrollIntoView({
      block: "end",
    });
  }

  useEffect(() => {
    scrollIntoView();
  }, [messages]);

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

  function getLastMessage() {
    return messages[messages.length - 1];
  }

  async function handleSend() {
    setProcessing(true);
    const prevId = getLastMessage()?.id ?? -1;
    const messageToSend = currentMessage;
    setMessages((prev) => [
      ...prev,
      { id: prevId + 1, message: messageToSend, sender: "user" },
    ]);
    setCurrentMessage("");
    try {
      const result = await fetch("/api/chat", {
        method: "POST",
        headers: {
          type: "application/json",
        },
        body: JSON.stringify({
          question: messageToSend,
        }),
      });
      // const promise = new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(true);
      //   }, 1000);
      // });
      // await promise;
      // const answer = "Mock answer";

      const { answer } = (await result.json()) as { answer: string };
      setMessages((prev) => [
        ...prev,
        { id: prevId + 2, message: answer, sender: "ai" },
      ]);
    } catch (e) {
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    setDisabledInput(processing);
    setDisabledSend(currentMessage.length === 0 || processing);
  }, [currentMessage, processing]);

  return (
    <>
      <div className="flex flex-col gap-3 flex-grow h-full overflow-y-auto px-16">
        {messages.map((chat) => (
          <MessageLine key={chat.id} chat={chat} />
        ))}
        {processing ? (
          <div className="rounded-full bg-slate-500 w-4 h-4 animate-pulse my-2"></div>
        ) : null}
        <div className="w-full h-0 mt-4" ref={messageBottomRef}></div>
      </div>
      {/* Input */}
      <div className="pb-8 bg-white px-16">
        <div className="flex flex-row items-center gap-2 rounded-[40px] border bg-secondary-white pl-8 pr-5">
          <textarea
            ref={textAreaRef}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Write what you would like to ask"
            className="mb-3 mt-2 h-6 max-h-60 w-full resize-none bg-transparent text-primary-black outline-none"
          />
          <button
            className="my-3 flex size-10 flex-none items-center justify-center rounded-full bg-primary-gray"
            disabled={disabledSend}
            onClick={handleSend}
          >
            <Send className="relative right-[2px] rotate-12 stroke-[#969595]" />
          </button>
        </div>
      </div>
    </>
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
          src="/indicator.svg"
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
