"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface LandingNavbarItemProps {
  title: string;
  href: string;
}

export const LandingNavbarItem = ({ title, href }: LandingNavbarItemProps) => {
  // Get current URL
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <li
      className={cn(
        "pointer-events-none flex h-full items-center",
        isActive
          ? "bg-secondary-purple"
          : "bg-custom-light-gray transition-all duration-150 ease-in-out hover:bg-secondary-purple",
      )}
    >
      <a
        href={href}
        className={cn(
          "pointer-events-auto px-4 py-2 text-lg font-medium",
          isActive
            ? "text-primary-purple underline underline-offset-4"
            : "text-primary-black transition-all duration-150 hover:text-primary-purple hover:underline hover:underline-offset-4",
        )}
      >
        {title}
      </a>
    </li>
  );
};
