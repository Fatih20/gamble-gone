import { LandingNavbar } from "@/components/landing-navbar/landing-navbar";

export default function EntryLayout({
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
