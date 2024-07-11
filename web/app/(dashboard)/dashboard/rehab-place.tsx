"use client";

import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

interface RehabilitationCenterProps {
  name: string;
  address: string;
  image: string;
}

const RehabilitationCenter: React.FC<RehabilitationCenterProps> = ({
  name,
  address,
  image,
}) => {
  const openInGoogleMaps = () => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  return (
    <div className="basis-1/3 rounded-lg border p-4 shadow-md">
      <Image
        src={image}
        alt={name}
        className="mb-4 rounded-md"
        width={320}
        height={180}
      />
      <div className="mb-2 text-lg font-bold">{name}</div>
      <div className="mb-4 text-gray-600">{address}</div>
      <Button variant={"purple"} size={"lg"} onClick={openInGoogleMaps}>
        Lihat di Peta
      </Button>
    </div>
  );
};

interface RehabilitationCenterListProps {
  centers: {
    name: string;
    address: string;
    image: string;
  }[];
}
const RehabilitationCenterList = ({}) => {
  const centers = [
    {
      name: "LKS Daru Iman",
      address:
        "kp kawaron girang Rt 04/04, Wana Kerta, Kec. Sindang Jaya, Kabupaten Tangerang, Banten 15560",
      image: "/logo-colored.png",
    },
    {
      name: "LKS Daru Iman",
      address:
        "kp kawaron girang Rt 04/04, Wana Kerta, Kec. Sindang Jaya, Kabupaten Tangerang, Banten 15560",
      image: "/logo-colored.png",
    },
    {
      name: "LKS Daru Iman",
      address:
        "kp kawaron girang Rt 04/04, Wana Kerta, Kec. Sindang Jaya, Kabupaten Tangerang, Banten 15560",
      image: "/logo-colored.png",
    },
    {
      name: "LKS Daru Iman",
      address:
        "kp kawaron girang Rt 04/04, Wana Kerta, Kec. Sindang Jaya, Kabupaten Tangerang, Banten 15560",
      image: "/logo-colored.png",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <H1 className="mb-4 font-bold" level={"3xl"}>
        Rehabilition Places Near You!
      </H1>
      <div className="grid grid-cols-3 gap-10">
        {centers.map((center, index) => (
          <RehabilitationCenter
            key={index}
            name={center.name}
            address={center.address}
            image={center.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RehabilitationCenterList;
