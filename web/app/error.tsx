"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-secondary-white flex items-center justify-center min-h-screen">
      <section className="w-full max-w-3xl flex flex-col gap-6 items-center bg-primary-black rounded-3xl p-14">
        <header>
          <h1 className="font-extrabold text-primary-green text-6xl text-center">
            CLIENT ERROR
          </h1>
        </header>

        <p className="font-medium text-3xl text-white text-center">
          An error occurred while rendering the page. Please try again later.
        </p>

        <Button
          variant="green"
          className="font-bold py-4 px-10 rounded-full text-base h-fit"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
      </section>
    </main>
  );
}
