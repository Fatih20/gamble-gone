import HistoryList from "./history-list";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/auth-options";
import TaskListComp from "@/components/dashboard/task-list";
import { Separator } from "@/components/ui/separator";
import { H1, H2 } from "@/components/ui/typography";
import { openGraphTemplate, twitterTemplate } from "@/lib/metadata";
import { getUserTasksForToday, getWeeklyHistory } from "@/lib/queries/tasks";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Task | GambleGone",
  openGraph: {
    ...openGraphTemplate,
    title: "Task | GambleGone",
  },
  twitter: {
    ...twitterTemplate,
    title: "Task | GambleGone",
  },
};

const TaskPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  const DailyTasks = await getUserTasksForToday(session.id);
  const { res, taskCompleted, taskFailed, pointsMade } = await getWeeklyHistory(
    session.id,
  );

  return (
    <main className="flex w-full flex-col items-start justify-center gap-3 p-24">
      <H1 className="mb-5 font-extrabold text-black" level={"5xl"}>
        Your Tasks
      </H1>
      {/* Task Summary  */}
      <section className="flex w-full flex-row gap-10">
        <div className="w-[50%] rounded-lg border border-neutral-400 bg-[#FAFAFA]">
          <div className="grid grid-cols-2 p-8 h-full gap-5">
            {/* Left */}
            <div className="h-full bg-[#E5F8A3] border-2 border-[#9AC800] rounded-lg flex flex-col items-center justify-center gap-10">
              <H1 className="font-bold text-center" level={"2xl"}>
                <span>Weekly</span>
                <br />
                <span>Point</span>
                <br />
                <span>Count</span>
              </H1>
              <H1 className="font-bold" level={"6xl"}>
                {pointsMade}pt
              </H1>
            </div>
            {/* Right */}
            <div className="flex flex-col h-full bg-[#D9C8FF] border border-primary-purple rounded-lg items-center justify-center gap-10">
              <H1 className="font-bold text-center" level={"2xl"}>
                <span>Completed</span>
                <br />
                <span>Task</span>
                <br />
                <br />
              </H1>
              <H1 className="font-bold" level={"6xl"}>
                {taskCompleted}/{taskCompleted + taskFailed}
              </H1>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="mb-4 flex items-center justify-between gap-5">
            <H1 className="font-bold" level={"5xl"}>
              Daily Task
            </H1>
          </div>

          <TaskListComp tasks={DailyTasks} />
        </div>
      </section>
      <Separator className="my-5 bg-neutral-400" />
      <H2 className="mb-5 font-extrabold text-black" level={"3xl"}>
        Weekly History
      </H2>
      <HistoryList tasks={res} />
    </main>
  );
};

export default TaskPage;
