import RegisterForm from "./register-form";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "Register | GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "Register | GambleGone",
  },
};

const RegisterPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
