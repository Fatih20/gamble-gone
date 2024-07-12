import { z } from "zod";

export const birthDateSchema = z
  .date({ message: "Tanggal lahir harus diisi" })
  .refine(
    (date) => {
      const today = new Date();
      const compareDate = new Date(date);
      return compareDate <= today;
    },
    {
      message: "Tanggal lahir tidak boleh di masa depan",
    },
  );

export const FullProfileUpdateSchema = z.object({
  username: z
    .string({ message: "Username harus diisi" })
    .min(3, { message: "Username harus terdiri dari minimal 3 karakter" })
    .max(20, { message: "Username harus terdiri dari maksimal 20 karakter" })
    .regex(new RegExp("^[a-zA-Z0-9_]*$"), {
      message:
        "Username hanya boleh mengandung huruf, angka, dan garis bawah (_)",
    }),
  password: z.union([
    z.string().length(0), // Allow empty string
    z
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
  ]),
  name: z.string({ message: "Nama harus diisi, Namun dapat anonim" }),
  birthDate: birthDateSchema,
  gender: z.string({ message: "Jenis kelamin harus diisi" }),
  gamblingStory: z.string({
    message: "Cerita berjudi harus diisi, cukup secara umum",
  }),
  gamblingDuration: z
    .number({
      message: "Durasi berjudi harus diisi, cukup secara umum",
    })
    .min(1, { message: "Durasi berjudi harus positif" }),
  whyStop: z.string({
    message: "Alasan berhenti harus diisi, cukup secara umum",
  }),
});

export const UpdatePointRequestSchema = z.object({
  totalPoints: z
    .number({ message: "Total poin harus diisi" })
    .min(0, { message: "Total poin tidak boleh negatif" }),
});
