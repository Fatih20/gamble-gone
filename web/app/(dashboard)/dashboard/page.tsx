import ArticleList from "./article-list";
import Quotes from "./quotes";
import RehabilitationCenterList from "./rehab-place";
import TaskList from "./task-list";
import TaskProgress from "./task-progress";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { getUserPoints } from "@/lib/queries/profile";
import { getUserTasksForToday } from "@/lib/queries/tasks";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  const DailyTasks = await getUserTasksForToday(session.id);
  const points = await getUserPoints(session.id);

  return (
    <main className="flex w-full flex-col items-start justify-center gap-3 p-24">
      <H1 className="mb-5 font-extrabold text-black" level={"5xl"}>
        Hi, {session.username}
      </H1>
      {/*Task Points Section */}
      <div className="flex w-full flex-row gap-10">
        <div className="flex w-[50%] flex-col gap-3">
          <TaskProgress points={points} />
          <Quotes quotes="Tidak ada istilah gagal dalam hidup, yang ada hanya sukses dan belum berhasil. Jangan menyerah!" />
        </div>

        <TaskList Tasks={DailyTasks} />
      </div>
      <Separator className="my-5 bg-neutral-400" />
      <RehabilitationCenterList />
      <Separator className="my-5 bg-neutral-400" />
      <ArticleList />
    </main>
  );
};

export default DashboardPage;
