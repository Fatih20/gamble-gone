"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

const items = [
  {
    src: "/CAROUSEL 1.png",
    alt: "Image 1 description",
  },
  {
    src: "/CAROUSEL 2.png",
    alt: "Image 2 description",
  },
  {
    src: "/CAROUSEL 3.png",
    alt: "Image 3 description",
  },
  {
    src: "/CAROUSEL 4.png",
    alt: "Image 4 description",
  },
  {
    src: "/CAROUSEL 5.png",
    alt: "Image 5 description",
  },
  {
    src: "/CAROUSEL 6.png",
    alt: "Image 6 description",
  },
];

export function CarouselHome() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-24">
      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full max-w-7xl"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-16">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-16">
              <div className="relative aspect-[5/3] w-full items-center justify-center rounded-3xl bg-primary-gray flex">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="rounded-3xl object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
