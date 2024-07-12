import { z } from "zod";

export const ChatSchema = z.object({
  question: z.string({ message: "Pertanyaan ada wajib!" }),
});
