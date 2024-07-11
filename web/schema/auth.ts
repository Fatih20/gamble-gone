import { birthDateSchema } from "./profile";
import * as z from "zod";

export const ValidateUsernameSchema = z.object({
  username: z
    .string({ message: "Username harus diisi" })
    .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
    .max(20, { message: "Username harus terdiri dari maksimal 20 karakter" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username hanya boleh mengandung huruf, angka, dan garis bawah (_)",
    }),
});

export const SignUpRequestSchema = z
  .object({
    username: z
      .string({ message: "Username harus diisi" })
      .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
      .max(20, { message: "Username harus terdiri dari maksimal 20 karakter" })
      .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
        message:
          "Username hanya boleh mengandung huruf, angka, dan garis bawah (_)",
      }),
    password: z
      .string({ message: "Password harus diisi" })
      .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
      .max(32, { message: "Password harus terdiri dari maksimal 32 karakter" })
      .regex(new RegExp("^(?=.*[a-z])"), {
        message: "Password harus mengandung huruf kecil",
      })
      .regex(new RegExp("^(?=.*[A-Z])"), {
        message: "Password harus mengandung huruf besar",
      })
      .regex(new RegExp("^(?=.*[0-9])"), {
        message: "Password harus mengandung angka",
      })
      .regex(new RegExp("^(?=.*[!@#$%^&*])"), {
        message: "Password harus mengandung karakter khusus (!@#$%^&*)",
      }),
    confirmPassword: z
      .string({ message: "Konfirmasi password harus diisi" })
      .min(1, { message: "Konfirmasi password harus diisi" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "Konfirmasi password tidak cocok",
        path: ["confirmPassword"],
      });
    }
  });

export const FullProfileSchema = z.object({
  username: z
    .string({ message: "Username harus diisi" })
    .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
    .max(20, { message: "Username harus terdiri dari maksimal 20 karakter" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username hanya boleh mengandung huruf, angka, dan garis bawah (_)",
    }),
  password: z
    .string({ message: "Password harus diisi" })
    .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
    .max(32, { message: "Password harus terdiri dari maksimal 32 karakter" })
    .regex(new RegExp("^(?=.*[a-z])"), {
      message: "Password harus mengandung huruf kecil",
    })
    .regex(new RegExp("^(?=.*[A-Z])"), {
      message: "Password harus mengandung huruf besar",
    })
    .regex(new RegExp("^(?=.*[0-9])"), {
      message: "Password harus mengandung angka",
    })
    .regex(new RegExp("^(?=.*[!@#$%^&*])"), {
      message: "Password harus mengandung karakter khusus (!@#$%^&*)",
    }),
  name: z.string({ message: "Nama harus diisi, Namun dapat anonim" }).min(1, {
    message: "Nama harus diisi, Namun dapat anonim",
  }),
  birthDate: birthDateSchema,
  gender: z
    .string({ message: "Gender harus diisi" })
    .min(1, { message: "Gender harus diisi" }),
  gamblingStory: z
    .string({
      message: "Cerita berjudi harus diisi, cukup secara umum",
    })
    .min(1, { message: "Cerita berjudi harus diisi, cukup secara umum" }),
  gamblingDuration: z
    .number({
      message: "Durasi berjudi harus diisi, cukup secara umum",
    })
    .min(1, { message: "Durasi berjudi harus positif" }),
  whyStop: z
    .string({
      message: "Alasan berhenti harus diisi, cukup secara umum",
    })
    .min(1, { message: "Alasan berhenti harus diisi, cukup secara umum" }),
});

export const SignInRequestSchema = z.object({
  username: z
    .string({ message: "Username harus diisi" })
    .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
    .max(20, { message: "Username harus terdiri dari maksimal 20 karakter" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username hanya boleh mengandung huruf, angka, dan garis bawah (_)",
    }),
  password: z
    .string({ message: "Password harus diisi" })
    .min(8, { message: "Password harus terdiri dari minimal 8 karakter" })
    .max(32, { message: "Password harus terdiri dari maksimal 32 karakter" })
    .regex(new RegExp("^(?=.*[a-z])"), {
      message: "Password harus mengandung huruf kecil",
    })
    .regex(new RegExp("^(?=.*[A-Z])"), {
      message: "Password harus mengandung huruf besar",
    })
    .regex(new RegExp("^(?=.*[0-9])"), {
      message: "Password harus mengandung angka",
    })
    .regex(new RegExp("^(?=.*[!@#$%^&*])"), {
      message: "Password harus mengandung karakter khusus (!@#$%^&*)",
    }),
});
