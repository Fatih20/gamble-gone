import { P } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const LoadingPulse: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-pulse">
        <Image
          src="/logo-colored.png"
          alt="Loading Logo"
          width={480}
          height={300}
        />
      </div>
      <P
        className="mt-4 text-lg  text-primary-green  font-bold animate-pulse"
        level={"4xl"}
      >
        Loading...
      </P>
    </div>
  );
};

export default LoadingPulse;
