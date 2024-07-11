import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import React from "react";

// Define the Article type
interface Article {
  id: string;
  title: string;
  content: string;
  isAnonymous: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
}

// Props for ArticleCard component
interface ArticleCardProps {
  Article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ Article }) => {
  return (
    <div className="rounded-lg border p-4 shadow-md">
      <div className="text-sm text-gray-500">
        {new Date(Article.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="mb-4 mt-2 text-lg font-bold">{Article.title}</div>
      <div className="mb-2 text-gray-700">
        {Article.isAnonymous ? "Anonymous" : Article.user.name}
      </div>
      <div className="mb-4 text-sm text-gray-600">{Article.content}</div>
      <Button variant={"purple"} size={"lg"}>
        Baca Selengkapnya
      </Button>
    </div>
  );
};

const ArticleList = () => {
  const Articles: Article[] = [
    {
      id: "1",
      title: "Dulu Ku Tak Punya Uang Sekarang Ku Bahagia",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus. Interdum velit laoreet",
      isAnonymous: false,
      userId: "1",
      createdAt: "2024-01-13T00:00:00Z",
      updatedAt: "2024-01-13T00:00:00Z",
      user: {
        name: "b3b4sJsIxx",
      },
    },
    {
      id: "2",
      title: "Dulu Ku Tak Punya Uang Sekarang Ku Bahagia",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus. Interdum velit laoreet",
      isAnonymous: false,
      userId: "1",
      createdAt: "2024-01-13T00:00:00Z",
      updatedAt: "2024-01-13T00:00:00Z",
      user: {
        name: "b3b4sJsIxx",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <H1 className="mb-4 font-bold" level={"3xl"}>
        Articles just for You
      </H1>
      <div className="flex flex-row gap-10">
        {Articles.map((Article) => (
          <ArticleCard key={Article.id} Article={Article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
