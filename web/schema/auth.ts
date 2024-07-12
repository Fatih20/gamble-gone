import { birthDateSchema } from "./profile";
import * as z from "zod";

export const ValidateUsernameSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username can only contain letters, numbers, and underscores (_)",
    }),
});

export const SignUpRequestSchema = z
  .object({
    username: z
      .string({ message: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" })
      .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
        message:
          "Username can only contain letters, numbers, and underscores (_)",
      }),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(32, { message: "Password must be at most 32 characters" })
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
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(1, { message: "Confirm password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "Confirm password does not match",
        path: ["confirmPassword"],
      });
    }
  });

export const FullProfileSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username can only contain letters, numbers, and underscores (_)",
    }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" })
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
  name: z.string({ message: "Name is required but can be anonymous" }).min(1, {
    message: "Name is required but can be anonymous",
  }),
  birthDate: birthDateSchema,
  gender: z
    .string({ message: "Gender is required" })
    .min(1, { message: "Gender is required" }),
  gamblingStory: z
    .string({
      message: "Gambling story is required, a brief description is sufficient",
    })
    .min(1, {
      message: "Gambling story is required, a brief description is sufficient",
    }),
  gamblingDuration: z
    .number({
      message:
        "Gambling duration is required, a brief description is sufficient",
    })
    .min(1, { message: "Gambling duration must be positive" }),
  whyStop: z
    .string({
      message:
        "Reason for stopping is required, a brief description is sufficient",
    })
    .min(1, {
      message:
        "Reason for stopping is required, a brief description is sufficient",
    }),
});

export const SignInRequestSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(1, { message: "Username must be at least 3 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
});
