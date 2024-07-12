import { ArticleList } from "./article-list";
import Quotes from "./quotes";
import RehabilitationCenterList from "./rehab-place";
import TaskList from "./task-list";
import TaskProgress from "./task-progress";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import RankBadge from "@/components/ui/rank-badge";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { getUserPoints } from "@/lib/queries/profile";
import { getUserTasksForToday } from "@/lib/queries/tasks";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "Dashboard | GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "Dashboard | GambleGone",
  },
};

const DashboardPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  const DailyTasks = await getUserTasksForToday(session.id);
  const points = await getUserPoints(session.id);

  return (
    <main className="flex w-full flex-col items-center justify-center gap-3 p-24">
      <section className="flex flex-row items-center gap-10 mb-5 w-full max-w-7xl">
        <H1 className="font-extrabold text-black" level={"5xl"}>
          Hi, {session.username}
        </H1>
        <RankBadge
          points={points}
          className="text-xl h-fit py-2 rounded-lg px-6"
        />
      </section>

      {/*Task Points Section */}
      <section className="flex w-full flex-row gap-10 max-w-7xl">
        <div className="flex w-[50%] flex-col gap-3">
          <TaskProgress points={points} />
          <Quotes quotes="There is no such thing as failure, its just a matter of time." />
        </div>

        <TaskList Tasks={DailyTasks} />
      </section>

      <Separator className="my-5 bg-neutral-400 max-w-7xl" />

      <RehabilitationCenterList />

      <Separator className="my-5 bg-neutral-400 max-w-7xl" />

      <ArticleList />
    </main>
  );
};

export default DashboardPage;
