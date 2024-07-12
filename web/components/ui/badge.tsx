import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex h-fit py-2 items-center rounded-lg  border-2 px-5   text-base font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        Supreme:
          "border-2 border-primary-green bg-secondary-green text-primary-black hover:bg-secondary-green/80",
        Newborn:
          "border-2 border-red-500 bg-red-300 text-primary-black hover:border-red-500/80",
        Mid: "border border-orange-500 bg-orange-300 text-primary-black hover:bg-orange-300/80",
        Elite:
          "border-2 border-yellow-400 bg-amber-200 text-primary-black hover:bg-amber-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
