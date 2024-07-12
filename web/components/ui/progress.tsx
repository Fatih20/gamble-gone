"use client";

import { cn } from "@/lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import Image from "next/image";
import * as React from "react";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    checkpoints?: number[];
    maxValue: number;
    value: number;
  }
>(({ className, value, checkpoints = [], maxValue, ...props }, ref) => {
  let progressValue = 0;
  if (value) {
    progressValue = Math.min(100, (value / maxValue) * 100);
  }

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-neutral-400",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary-purple transition-all"
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </ProgressPrimitive.Root>
      {checkpoints.map((checkpoint, index) => (
        <div
          key={index}
          className="absolute top-[12px] -translate-y-1/2 transform"
          style={{ left: `calc(${(checkpoint / maxValue) * 100}% - 20px)` }}
        >
          <div className="flex w-[40px] flex-col items-center justify-center">
            <div
              className={`h-5 w-5 rounded-full ${value >= checkpoint ? "bg-primary-purple" : "bg-neutral-400"}`}
            >
              {" "}
            </div>
            <div className="text-xs text-primary-purple">{checkpoint}pt</div>
          </div>
        </div>
      ))}

      <Image
        src="/indicator.svg"
        alt="User"
        height={88}
        width={88}
        className="absolute -top-[90px]"
        style={{ left: `calc(${progressValue}% - 43px)` }}
      />
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
