"use client";

import { Button } from "./button";
import { cn } from "@/lib/utils";
// import classNames from "classnames";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navData = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Task",
    link: "/task",
  },
  {
    title: "My Blog",
    link: "/my-blog",
  },
  {
    title: "Chat",
    link: "/chat",
  },
  {
    title: "Profile",
    link: "/profile",
  },
];

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <aside className="z-60 fixed bottom-0 left-0 top-0 flex h-full min-h-screen w-60 flex-col items-center bg-primary-black">
      <Image
        src="/logo-bnw.png"
        alt="Logo BersihBet"
        width={170}
        height={40}
        className="pt-10"
      />
      <div className="mt-20 flex flex-col gap-10">
        {navData.map((nav, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-center text-xl font-bold text-neutral-50 transition duration-300 ease-in-out",
              {
                "text-primary-green": currentPath === nav.link,
                "hover:text-primary-green": currentPath !== nav.link,
              },
            )}
          >
            <Link href={nav.link}>{nav.title}</Link>
          </div>
        ))}
      </div>
      <Link href="/" className="mt-auto">
        <Button
          className="mb-5 ml-5 mr-5 items-center justify-center gap-3"
          variant={"black"}
          size="lg"
        >
          <ExternalLinkIcon className="-rotate-90 transform text-white" />
          Home
        </Button>
      </Link>
    </aside>
  );
};

export default Sidebar;
