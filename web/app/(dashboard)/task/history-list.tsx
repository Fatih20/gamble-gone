import { H2, P } from "@/components/ui/typography";
import { DailyTask } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

// Group tasks by date
interface HistoryListProps {
  tasks: DailyTask[];
}

const HistoryList: React.FC<HistoryListProps> = ({ tasks }) => {
  const groupedTasks: { [key: string]: DailyTask[] } = tasks.reduce(
    (acc, task) => {
      const dateKey = format(task.createdAt, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    },
    {} as { [key: string]: DailyTask[] },
  );
  return (
    <div className="flex w-full flex-col gap-5">
      {Object.keys(groupedTasks).map((date) => (
        <div key={date} className="flex flex-col gap-1">
          <H2 className="mb-3 font-bold" level={"2xl"}>
            {format(new Date(date), "dd MMMM yyyy")}
          </H2>
          {groupedTasks[date].map((task) => (
            <div
              key={task.id}
              className="mb-4 flex w-full flex-row rounded-lg border-2 border-[#93BE00] p-4 shadow-sm"
            >
              <P level={"xl"}>{task.taskName}</P>
              <P
                level={"2xl"}
                className={`font-extrabold ${task.taskStatus ? "text-[#93BE00]" : "text-red-400"} ml-auto`}
              >
                {task.taskStatus
                  ? `+${task.taskPoints} points`
                  : "Not completed"}
              </P>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
