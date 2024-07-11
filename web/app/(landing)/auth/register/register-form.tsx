"use client";

import FirstStep from "./first-step";
import SecondStep from "./second-step";
import { H1 } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TwoStepForm = () => {
  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  const handleRegisterSuccess = (data: {
    username: string;
    password: string;
  }) => {
    setUserData(data);
    setStep(2);
  };

  const router = useRouter();

  const handleProfileSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("name", data.name);
    formData.append("birthDate", data.birthDate.toISOString());
    formData.append("gender", data.gender);
    formData.append("gamblingStory", data.gamblingStory);
    formData.append("gamblingDuration", data.gamblingDuration.toString());
    formData.append("whyStop", data.whyStop);

    try {
      // Here, you can send the data to your server
      const res = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json();

        if (json.errorFields) {
          let message = "";
          json.errorFields.forEach((field: any) => {
            message += field.message + "\n";
          });
          toast.error("Error", {
            description: message,
          });
        } else
          toast.error("Error", {
            description: json.message,
          });
      } else {
        toast.success("Success", {
          description: "Registration successful!",
        });
        router.push("/auth/login");
      }
    } catch (error: any) {
      toast.error("Error", {
        description: "Internal server error!",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-10">
      <H1
        level={`${step === 1 ? "6xl" : "4xl"}`}
        className="mb-5 font-extrabold md:mb-10"
      >
        {step === 1 ? "Register" : "Profile Setup"}
      </H1>
      {step === 1 ? (
        <>
          <FirstStep onSuccess={handleRegisterSuccess} />
        </>
      ) : (
        <SecondStep
          username={userData?.username || ""}
          password={userData?.password || ""}
          onSubmit={handleProfileSubmit}
        />
      )}
    </div>
  );
};

export default TwoStepForm;
