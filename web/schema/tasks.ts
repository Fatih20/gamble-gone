import { z } from "zod";

export const AddTaskSchema = z.object({
  taskName: z.string({ message: "Task Name harus diisi" }),
  taskPoints: z.coerce
    .number({ message: "Task Points harus diisi" })
    .min(1, { message: "Task Points Minimal 1" }),
  taskDescription: z.string({ message: "Task Description harus diisi" }),
});

export const UpdateTaskSchema = z.object({
  id: z.string({ message: "Task ID harus diisi" }),
  taskStatus: z.boolean({ message: "Task Status harus diisi" }),
});
