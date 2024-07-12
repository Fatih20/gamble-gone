import { type Metadata } from "next";

export const openGraphTemplate: Metadata["openGraph"] = {
  description:
    "GambleGone aims to bridge this gap by providing comprehensive support and guidance through advanced AI-generated tools and personalized resources. GambleGone is dedicated to making a meaningful difference in the lives of those affected by gambling addiction, offering a lifeline to recovery and a brighter, addiction-free future.",
  url: "https://gamble-gone.vercel.app/",
  siteName: "GambleGone",
  locale: "en-US",
  type: "website",
  images: {
    url: "https://gamble-gone.vercel.app/link-preview.jpg",
    width: "1200",
    height: "630",
    alt: "GambleGone Logo",
  },
};

export const twitterTemplate: Metadata["twitter"] = {
  card: "summary_large_image",
  description:
    "GambleGone aims to bridge this gap by providing comprehensive support and guidance through advanced AI-generated tools and personalized resources. GambleGone is dedicated to making a meaningful difference in the lives of those affected by gambling addiction, offering a lifeline to recovery and a brighter, addiction-free future.",
  images: {
    url: "https://gamble-gone.vercel.app/link-preview.jpg",
    alt: "GambleGone Logo",
  },
};
