import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-secondary-white flex items-center justify-center min-h-screen">
      <section className="w-full max-w-3xl flex flex-col gap-6 items-center bg-primary-black rounded-3xl p-14">
        <header>
          <h1 className="font-extrabold text-primary-green text-6xl text-center">
            ERROR 404
          </h1>
        </header>

        <p className="font-medium text-3xl text-white text-center">
          The page you&apos;re looking is not found, please check again the URL
          you&apos;re trying to visit.
        </p>

        <Link href="/" className="block">
          <Button
            variant="green"
            className="font-bold py-4 px-10 rounded-full text-base h-fit "
          >
            Home Page
          </Button>
        </Link>
      </section>
    </main>
  );
}
