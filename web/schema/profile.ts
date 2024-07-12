import { z } from "zod";

export const birthDateSchema = z
  .date({ message: "Birthdate is required" })
  .refine(
    (date) => {
      const today = new Date();
      const compareDate = new Date(date);
      return compareDate <= today;
    },
    {
      message: "Birthdate cannot be in the future",
    },
  );

export const FullProfileUpdateSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username can only contain letters, numbers, and underscores (_)",
    }),
  password: z.union([
    z.string().length(0), // Allow empty string
    z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" })
      .regex(new RegExp("^(?=.*[a-z])"), {
        message: "Password must contain a lowercase letter",
      })
      .regex(new RegExp("^(?=.*[A-Z])"), {
        message: "Password must contain an uppercase letter",
      })
      .regex(new RegExp("^(?=.*[0-9])"), {
        message: "Password must contain a number",
      })
      .regex(new RegExp("^(?=.*[!@#$%^&*])"), {
        message: "Password must contain a special character (!@#$%^&*)",
      }),
  ]),
  name: z.string({ message: "Name is required, but can be anonymous" }),
  birthDate: birthDateSchema,
  gender: z.string({ message: "Gender is required" }),
  gamblingStory: z.string({
    message: "Gambling story is required, just in general",
  }),
  gamblingDuration: z
    .number({
      message: "Gambling duration is required, just in general",
    })
    .min(1, { message: "Gambling duration must be positive" }),
  whyStop: z.string({
    message: "Reason for stopping is required, just in general",
  }),
});

export const UpdatePointRequestSchema = z.object({
  totalPoints: z
    .number({ message: "Total points are required" })
    .min(0, { message: "Total points cannot be negative" }),
});
