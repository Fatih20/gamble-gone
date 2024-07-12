"use client";

import { type Message } from "@/types/message";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const templateQuestion = [
  "What are the signs that I'm addicted?",
  "Any book recommendations on online gambling addiction?",
  "How can my spouse play a role in helping me?",
  "Give me tips on handling my financials after my addiction.",
  "Tell me ways to stop my addiction.",
];

export function Chat({ message }: { message: Message[] }) {
  const [messages, setMessages] = useState(message);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);
  const [templateVisible, setTemplateVisible] = useState(false);
  const messageBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function scrollIntoView() {
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
    setTemplateVisible(false);
    setProcessing(true);
    const prevId = getLastMessage()?.id ?? -1;
    const messageToSend = currentMessage;
    setMessages((prev) => [
      ...prev,
      { id: prevId + 1, message: messageToSend, sender: "user" },
    ]);
    setCurrentMessage("");
    try {
      // const result = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: {
      //     type: "application/json",
      //   },
      //   body: JSON.stringify({
      //     question: messageToSend,
      //   }),
      // });

      // const { answer } = (await result.json()) as { answer: string };

      const promise = new Promise((resolve) => {
        setTimeout(() => resolve(true), 500);
      });

      await promise;

      const answer = "Mock answer";

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
      <div className="flex flex-col gap-4 pb-4">
        <div className="bg-white px-16 relative">
          <div
            className={`flex flex-col gap-4 absolute bottom-full ${!templateVisible ? "translate-y-0 opacity-0 pointer-events-none" : "-translate-y-5 opacity-100"} transition-all p-4 bg-primary-white/50 rounded-lg backdrop-blur-sm`}
          >
            <div className="text-primary-purple text-lg font-bold">FAQ</div>
            {templateQuestion.map((question) => {
              return (
                <button
                  key={question}
                  onClick={() => setCurrentMessage(question)}
                  className="rounded-xl w-fit text-sm p-2 bg-primary-purple text-primary-white"
                >
                  {question}
                </button>
              );
            })}
          </div>
          <div className="flex flex-row items-center gap-2 rounded-[40px] border bg-secondary-white pl-8 pr-5">
            <textarea
              ref={textAreaRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Write what you would like to ask"
              className="mb-3 mt-2 h-6 max-h-60 w-full resize-none bg-transparent text-primary-black outline-none"
            />
            <button
              className="my-3 flex size-10 flex-none items-center justify-center rounded-full bg-primary-purple"
              onClick={() => {
                // console.log("Clicking template chevron");
                setTemplateVisible((prev) => !prev);
              }}
            >
              <ChevronUp
                className={`${templateVisible ? "rotate-180" : "rotate-0"} transition-all stroke-primary-white`}
              />
            </button>
            <button
              className={`my-3 flex size-10 flex-none items-center justify-center rounded-full bg-primary-purple ${disabledSend ? "opacity-50" : "opacity-100"}`}
              disabled={disabledSend}
              onClick={handleSend}
            >
              <Send
                className={`relative right-[2px] rotate-12 ${disabledSend ? "stroke-primary-white" : "stroke-primary-white"}`}
              />
            </button>
          </div>
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
