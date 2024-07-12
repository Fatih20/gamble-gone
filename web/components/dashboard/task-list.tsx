"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DailyTask } from "@prisma/client";
import { CircleCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface TaskListProps {
  tasks: DailyTask[];
}

const TaskListComp: React.FC<TaskListProps> = ({ tasks }) => {
  const router = useRouter();
  const onSubmit = async (id: string) => {
    const toastId = toast.loading("Submitting task...");
    const formData = new FormData();
    formData.append("taskStatus", "true");

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: formData,
      });
      toast.dismiss(toastId);
      if (!res.ok) {
        const json = await res.json();
        if (json.errorFields) {
          let message = "";
          json.errorFields.forEach((field: any) => {
            message += field.message + "\n";
          });
          toast.error("An Error Occured.", {
            description: message,
          });
        } else {
          toast.error("An Error Occured.", {
            description: json.message,
          });
        }
      } else {
        toast.success("Task Done", {
          description: "Task finished succsessfully",
        });
      }
    } catch (error) {
      toast.error("An Error Occured.", {
        description: "Failed to finish task",
      });
    }
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-5">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg bg-lime-400 p-4"
        >
          <div>
            <div className="font-bold">{task.taskPoints} poin</div>
            <div>{task.taskName}</div>
          </div>
          {!task.taskStatus ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" type="button" size={"lg"}>
                  Finish Task
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Do you want to finish this task?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can not be undone, please make sure you have
                    done the task succsessfully.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onSubmit(task.id)}>
                    Finish
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <CircleCheckIcon size={48} className="mr-5 text-primary-purple" />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskListComp;
