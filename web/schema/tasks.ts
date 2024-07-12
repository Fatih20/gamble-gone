import { z } from "zod";

export const AddTaskSchema = z.object({
  taskName: z.string({ message: "Task Name is required" }),
  taskPoints: z.coerce
    .number({ message: "Task Points are required" })
    .min(1, { message: "Task Points must be at least 1" }),
  taskDescription: z.string({ message: "Task Description is required" }),
});

export const UpdateTaskSchema = z.object({
  id: z.string({ message: "Task ID is required" }),
  taskStatus: z.boolean({ message: "Task Status is required" }),
});
