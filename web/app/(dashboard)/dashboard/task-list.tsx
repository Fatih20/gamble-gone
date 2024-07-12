import TaskListComp from "@/components/dashboard/task-list";
import { H1 } from "@/components/ui/typography";
import { DailyTask } from "@prisma/client";
import Link from "next/link";
import React from "react";

const TaskList = ({ Tasks }: { Tasks: DailyTask[] }) => {
  return (
    <div className="w-[50%]">
      <div className="mb-4 flex items-center justify-between gap-5">
        <H1 className="font-bold" level={"5xl"}>
          Daily Task
        </H1>
        <Link href="/task" className="text-gray-500">
          See All
        </Link>
      </div>
      <TaskListComp tasks={Tasks} />
    </div>
  );
};

export default TaskList;
