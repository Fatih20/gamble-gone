"use client";

import { Button } from "@/components/ui/button";
import Ratings from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";

const RehabilitationCenterList = () => {
  // Fetch nearest data
  // const rehabPlaces: RehabPlace[] = [
  //   {
  //     placeID: "1",
  //     name: "Hope Rehabilitation Center",
  //     formattedAddress: "123 Main St, Springfield, IL 62701, USA",
  //     rating: 4.7,
  //     userRatingTotal: 150,
  //     imageURL:
  //       "https://lh3.googleusercontent.com/places/ANXAkqFlGR6ZO6daQMITes1NY2HdNZAK1UNVlDp8UUW15FVd6jjCwywXoYautFDziWqQ5AypNH1ETpsAgYl_rcPMk6psKuGBQTvna6g=s1600-w400",
  //   },
  //   {
  //     placeID: "2",
  //     name: "Renew Wellness Clinic",
  //     formattedAddress:
  //       "456 Elm St, Madison, WI 53703, USA dansjda n aksdna jksdn an sd",
  //     rating: 4.5,
  //     userRatingTotal: 98,
  //     imageURL:
  //       "https://lh3.googleusercontent.com/places/ANXAkqFlGR6ZO6daQMITes1NY2HdNZAK1UNVlDp8UUW15FVd6jjCwywXoYautFDziWqQ5AypNH1ETpsAgYl_rcPMk6psKuGBQTvna6g=s1600-w400",
  //   },
  //   {
  //     placeID: "3",
  //     name: "Healing Hands Rehab",
  //     formattedAddress: "789 Oak St, Boulder, CO 80302, USA",
  //     rating: 4.8,
  //     userRatingTotal: 120,
  //     imageURL:
  //       "https://lh3.googleusercontent.com/places/ANXAkqFlGR6ZO6daQMITes1NY2HdNZAK1UNVlDp8UUW15FVd6jjCwywXoYautFDziWqQ5AypNH1ETpsAgYl_rcPMk6psKuGBQTvna6g=s1600-w400",
  //   },
  // ];

  // GET request to get nearest rehab place
  const getNearestRehab = async () => {
    const response = await fetch("/api/rehab?limit=3", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const resJSON = (await response.json()).data as RehabPlace[];

    return resJSON;
  };

  const { data, isLoading, error, isError } = useQuery(
    "rehab-places",
    getNearestRehab,
  );

  console.log(data);

  return (
    <section className="flex flex-col gap-8 w-full max-w-7xl">
      <header>
        <h1 className="font-extrabold text-3xl text-primary-black">
          Rehabilition Places Near You!
        </h1>
      </header>

      {isLoading ? (
        <ul className="grid grid-cols-3 gap-8 rounded-2xl">
          <li>
            <Skeleton className="h-[420px]" />
          </li>
          <li>
            <Skeleton className="h-[420px]" />
          </li>
          <li>
            <Skeleton className="h-[420px]" />
          </li>
        </ul>
      ) : isError ? (
        <p className="font-medium text-lg text-center">
          Error: {String(error)}
        </p>
      ) : !data ? (
        <p className="text-lg font-medium text-center">
          No rehabilitation center found near you.
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-8">
          {data.map((place) => (
            <li key={place.placeID} className="flex">
              <RehabilitationCard rehabPlace={place} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

function RehabilitationCard({ rehabPlace }: { rehabPlace: RehabPlace }) {
  const mapURL = `https://www.google.com/maps/place/?q=place_id:${rehabPlace.placeID}`;

  return (
    <article className="bg-secondary-white border p-6 gap-2 justify-between rounded-2xl flex-auto flex flex-col ">
      <header className="flex flex-col gap-2">
        <Image
          src={rehabPlace.imageURL}
          alt={rehabPlace.name}
          width={400}
          height={200}
          sizes="400px"
          className="w-full aspect-video rounded- object-cover object-center"
        />

        <h4 className="text-2xl font-bold italic text-primary-black">
          {rehabPlace.name}
        </h4>

        <div className="self-start">
          <Ratings value={rehabPlace.rating} variant="yellow" />
        </div>

        <p className="line-clamp-5 text-lg text-primary-black">
          {rehabPlace.formattedAddress}
        </p>
      </header>

      <Link href={mapURL}>
        <Button
          className="w-full font-bold rounded-full"
          variant="purple"
          size="lg"
        >
          Lihat di Peta
        </Button>
      </Link>
    </article>
  );
}

export default RehabilitationCenterList;
