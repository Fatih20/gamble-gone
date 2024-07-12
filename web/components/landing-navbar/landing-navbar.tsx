import { LandingNavbarItem } from "./landing-navbar-item";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = async () => {
  let isAuthenticated = false;
  const res = await getServerAuthSession();

  if (res) {
    isAuthenticated = true;
  }
  const navItems = [
    {
      title: "Blogs",
      href: "/blogs",
    },
    {
      title: "features",
      href: "/#features",
    },
    {
      title: "hotline",
      href: "/#hotline",
    },
  ];

  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex w-full flex-col bg-secondary-white">
      {/* Navbar */}
      <nav className="h-20 border-b px-16">
        <ul className="grid h-full grid-cols-3">
          {/* Nav Items */}
          <ul className="flex flex-row items-center place-self-stretch justify-self-start">
            {navItems.map((item, idx) => (
              <LandingNavbarItem {...item} key={idx} />
            ))}
          </ul>

          {/* Icon (Home) */}
          <li className="place-self-center justify-self-center">
            <Link href="/">
              <Image
                width={175}
                height={43}
                src="/logo-colored.png"
                alt="BersihBet. Logo"
                className="h-10 w-auto"
                sizes="180px"
              />
            </Link>
          </li>

          {/* Auth */}
          {!isAuthenticated ? (
            <ul className="flex flex-row items-center gap-3 place-self-center justify-self-end">
              <li>
                <Link href="/auth/login">
                  <Button
                    variant="green"
                    // size="lg"
                    className="rounded-full px-7 font-bold"
                  >
                    Sign Up
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/auth/login">
                  <Button
                    variant="white"
                    className="rounded-full px-7 font-bold"
                  >
                    Sign In
                  </Button>
                </Link>
              </li>
            </ul>
          ) : (
            <li className="place-self-center justify-self-end">
              <Link href="/dashboard">
                <Button variant="green" className="rounded-full px-7 font-bold">
                  Explore Our Features
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Login Encouragement */}
      {!isAuthenticated && (
        <div className="flex h-14 items-center justify-center bg-primary-green">
          <p className="text-lg font-medium">
            Log In/ Sign Up to enjoy our amazing features !
          </p>
        </div>
      )}
    </header>
  );
};
