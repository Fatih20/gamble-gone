"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DebtAnalyzer() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    // Generate
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  return (
    <div>
      <Button size="lg" variant="purple" className="font-bold rounded-full">
        Generate AI Analysis
      </Button>

      <div className="mt-6">
        <h4 className="text-4xl font-bold">Analysis Result</h4>
        <p className="text-lg mt-3 text-primary-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
