"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-destructive",
    emptyStar: "text-destructive/70",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-muted-foreground",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  asinput?: string;
  value: number;
  onValueChange?: (value: number) => void;
}

const Ratings = ({ ...props }: RatingsProps) => {
  const {
    totalStars = 5,
    size = 20,
    fill = true,
    Icon = <Star />,
    variant = "default",
    asinput = "false",
    onValueChange,
    value,
  } = props;

  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleStarClick = (event: React.MouseEvent, starIndex: number) => {
    if (!onValueChange) return;

    const { left, width } = (
      event.target as HTMLDivElement
    ).getBoundingClientRect();
    const clickX = event.clientX - left;
    const fillPercentage = clickX / width;
    const newRating = starIndex + fillPercentage;
    const roundedRating = Math.round(newRating * 2) / 2; // Round to the nearest 0.5

    onValueChange(roundedRating);
  };

  const handleMouseMove = (event: React.MouseEvent, starIndex: number) => {
    const { left, width } = (
      event.target as HTMLDivElement
    ).getBoundingClientRect();
    const hoverX = event.clientX - left;
    const fillPercentage = hoverX / width;
    const newHoverValue = starIndex + fillPercentage;
    const roundedHoverValue = Math.round(newHoverValue * 2) / 2; // Round to the nearest 0.5

    setHoverValue(roundedHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue ?? value;

  return (
    <div
      className={cn("flex items-center justify-center gap-2")}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {[...Array(totalStars)].map((_, i) => {
        const isFullStar = i < Math.floor(displayValue);
        const isPartialStar =
          i === Math.floor(displayValue) && displayValue % 1 !== 0;

        return (
          <div
            key={i}
            className={cn(
              "group relative",
              asinput == "true" && "cursor-pointer",
            )}
            onClick={
              asinput == "true"
                ? (event) => handleStarClick(event, i)
                : undefined
            }
            onMouseMove={
              asinput == "true"
                ? (event) => handleMouseMove(event, i)
                : undefined
            }
            style={{ width: size, height: size }}
          >
            <div
              className={cn(
                "absolute inset-0 flex transform items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-125",
              )}
            >
              {React.cloneElement(Icon, {
                size,
                className: cn(
                  fill ? "fill-current" : "fill-transparent",
                  isFullStar
                    ? ratingVariants[variant].star
                    : ratingVariants[variant].emptyStar,
                ),
                role: asinput == "true" ? "input" : undefined,
              })}
              {isPartialStar && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${(displayValue % 1) * 100}%`,
                    overflow: "hidden",
                    height: "100%",
                  }}
                >
                  {React.cloneElement(Icon, {
                    size,
                    className: cn("fill-current", ratingVariants[variant].star),
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;
