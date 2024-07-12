import "../../globals.css";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="grid h-full min-h-[calc(100vh-80px)] grid-cols-2 items-center justify-center md:flex-row">
      <div className="hidden h-full w-full bg-black md:block"></div>
      {children}
    </main>
  );
}
