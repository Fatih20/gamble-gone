import { AboutUs } from "./about-us";
import { CarouselHome } from "./carousel-home";
import { HotlineSection } from "./hotline";
import { WhatTheySay } from "./what-they-say";
import { WhatWeOffer } from "./what-we-offer";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "GambleGone",
  },
};

export const revalidate = 86400;

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {/* Carousel */}
      <CarouselHome />

      {/* About Us */}
      <AboutUs />

      {/* Features */}
      <WhatWeOffer />

      {/* What they say */}
      <WhatTheySay />

      {/* Hotline */}
      <HotlineSection />
    </main>
  );
}
