
import { LandingNavbar } from "@/components/landing-navbar/landing-navbar";

export default async function EntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
}
