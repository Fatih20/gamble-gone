"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

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
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-16">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-16">
              <div className="flex aspect-[5/3] w-full items-center justify-center rounded-3xl bg-primary-gray">
                <p className="text-2xl font-bold">Apa hayo</p>
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
