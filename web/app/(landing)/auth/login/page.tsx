import LoginForm from "./login-form";
import { H1, P } from "@/components/ui/typography";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log In | GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "Log In | GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "Log In | GambleGone",
  },
};

const signInPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <H1 level={"6xl"} className="mb-5 font-extrabold md:mb-10">
        Log In
      </H1>
      <LoginForm />

      <P level={"sm"}>
        Do not have an Account?{" "}
        <Link href="/auth/register" className="font-bold">
          Register Now!
        </Link>
      </P>
    </div>
  );
};

export default signInPage;
