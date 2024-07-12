import {
  CircleUserRound,
  ListTodo,
  MapPin,
  MessageSquareMore,
  NotebookPen,
  Wallet,
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export function WhatWeOffer() {
  const features: Feature[] = [
    {
      id: "1",
      title: "Blog",
      icon: <NotebookPen className="mr-2 text-primary-green" />,
      description:
        "A platform to share your thoughts and experience. Read other’s story to gain motivation and grow together as a positive community",
    },
    {
      id: "2",
      title: "AI-Powered Chat",
      icon: <MessageSquareMore className="mr-2 text-primary-green" />,
      description:
        "Designed to offer personalized resources, coping strategies, and a non-judgmental conversations, aims to empower users on their journey to recovery ",
    },
    {
      id: "3",
      title: "Auto Generated Task",
      icon: <ListTodo className="mr-2 text-primary-green" />,
      description:
        "Provides personalized and specifically tailored tasks to help users manage their daily activities gambling addiction. ",
    },
    {
      id: "4",
      title: "AI-Debt Management",
      icon: <Wallet className="mr-2 text-primary-green" />,
      description:
        "Our debt-manager offers step-by-step plans to manage and reduce debt, alleviating the financial stress associated with gambling addiction.",
    },
    {
      id: "5",
      title: "Rehabilitation Center",
      icon: <MapPin className="mr-2 text-primary-green" />,
      description:
        "The rehabilitation center feature connects users with local and online rehabilitation centers specializing in gambling addiction.",
    },
    {
      id: "6",
      title: "Personalized Dashboard",
      icon: <CircleUserRound className="mr-2 text-primary-green" />,
      description:
        "The personalized dashboard offers users a comprehensive overview of their progress, including completed tasks, status, and recommendations",
    },
  ];

  return (
    <section
      id="features"
      className="flex w-full items-center justify-center p-24"
    >
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        {/* Title */}
        <header className="w-full max-w-2xl">
          <h1 className="text-center text-3xl font-bold text-primary-green">
            Features
          </h1>
          <h2 className="mt-2 text-center text-6xl font-extrabold text-primary-black">
            See What We Offer
          </h2>
        </header>

        {/* Reviews */}
        <ul className="grid grid-cols-2 gap-6">
          {features.map((feat) => {
            return (
              <li key={feat.id} className="flex">
                <FeatureCard feature={feat} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border bg-secondary-white p-7">
      {/* Header */}
      <header className="flex flex-row items-center">
        {feature.icon}
        <h1 className="text-2xl font-bold text-primary-black">
          {feature.title}
        </h1>
      </header>

      {/* Content */}
      <p className="text-lg text-primary-black">{feature.description}</p>
    </article>
  );
}
