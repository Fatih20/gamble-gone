import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

export function HotlineSection() {
  return (
    <section
      id="hotline"
      className="flex w-full flex-col items-center gap-8 bg-primary-black p-24"
    >
      <header>
        <h1 className="text-center text-3xl font-bold text-primary-green">
          Hotline
        </h1>
        <h2 className="mt-1 text-center text-6xl font-extrabold text-primary-white">
          Ready to help you 24/7
        </h2>
      </header>

      <Link href="tel:">
        <Button
          variant="green"
          className="rounded-full px-7 text-base font-bold text-primary-black"
          size="lg"
        >
          <Phone className="mr-3 fill-primary-black" />
          Call Now
        </Button>
      </Link>
    </section>
  );
}
