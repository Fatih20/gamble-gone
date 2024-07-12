"use client";

import { Button } from "@/components/ui/button";
import { H4, P } from "@/components/ui/typography";
import { DebtManager } from "@prisma/client";
import { useChat } from "ai/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface DebtAnalyzerProps {
  currentDebt: number;
  history: DebtManager[];
}

export function DebtAnalyzer({ currentDebt, history }: DebtAnalyzerProps) {
  const [text, setText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    setText("");
    const body = {
      currentDebt,
      debtTransactions: history.map((debt) => ({
        amount: debt.amount,
        type: debt.type,
        date: debt.createdAt,
      })),
    };

    const toastId = toast.loading("Generating AI Analysis...");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/debt-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      toast.dismiss(toastId);

      if (!res.ok) {
        throw new Error("Failed to generate analysis");
      }

      if (!res.body) {
        console.error("ReadableStream not supported in this browser.");
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setText((prev) => prev + chunk);
      }

      toast.success("Analysis generated successfully");
    } catch (error) {
      toast.error("Error generating analysis");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full items-start">
      <Button
        size="lg"
        variant="purple"
        className="font-bold rounded-full"
        disabled={history.length === 0 || isSubmitting}
        onClick={onSubmit}
      >
        Generate AI Analysis
      </Button>

      <div className="mt-6">
        <H4 className="font-bold" level={"4xl"}>
          Analysis Result
        </H4>
        <P className="text-lg mt-3 text-primary-black text-justify">
          {text || "No analysis yet"}
        </P>
      </div>
    </div>
  );
}
