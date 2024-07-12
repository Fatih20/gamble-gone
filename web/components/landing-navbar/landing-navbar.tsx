import { LandingNavbarItem } from "./landing-navbar-item";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const LandingNavbar = () => {
  const mockIsAuthenticated = true;
  const navItems = [
    {
      title: "Blogs",
      href: "/blogs",
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
          {!mockIsAuthenticated ? (
            <ul className="flex flex-row items-center gap-3 place-self-center justify-self-end">
              <li>
                <Link href="/auth/sign-up">
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
                  Jelajahi Fitur Kami
                </Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Login Encouragement */}
      {!mockIsAuthenticated && (
        <div className="flex h-14 items-center justify-center bg-primary-green">
          <p className="text-lg font-medium">
            Lakukan Sign In/Sign Up untuk menikmati fitur-fitur kami
          </p>
        </div>
      )}
    </header>
  );
};
