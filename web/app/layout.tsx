import { getServerAuthSession } from "./api/auth/[...nextauth]/auth-options";
import { DeviceSelection } from "./device-selection";
import "./globals.css";
import { QueryProvider } from "./query-provider";
import SessionProviderClientComponent from "./session-provider";
import { TooltipProvider } from "@/components/plate-ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

// Shared metadata config
export const metadata: Metadata = {
  description:
    "GambleGone aims to bridge this gap by providing comprehensive support and guidance through advanced AI-generated tools and personalized resources. GambleGone is dedicated to making a meaningful difference in the lives of those affected by gambling addiction, offering a lifeline to recovery and a brighter, addiction-free future.",
  generator: "Next.js",
  applicationName: "GambleGone",
  keywords: ["GambleGone"],
  category: "Self Help",
  metadataBase: new URL("https://gamble-gone.vercel.app/"),
  manifest: "https://gamble-gone.vercel.app/manifest.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body className={raleway.className}>
        <SessionProviderClientComponent session={session}>
          <QueryProvider>
            <DeviceSelection>
              <TooltipProvider
                disableHoverableContent
                delayDuration={500}
                skipDelayDuration={0}
              >
                {children}
              </TooltipProvider>
              <Toaster richColors />
            </DeviceSelection>
          </QueryProvider>
        </SessionProviderClientComponent>
      </body>
    </html>
  );
}
