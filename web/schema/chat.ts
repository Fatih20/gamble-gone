import { z } from "zod";

export const ChatSchema = z.object({
  question: z.string({ message: "Question is nessecary" }),
});
