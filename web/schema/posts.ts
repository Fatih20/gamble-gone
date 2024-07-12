import * as z from "zod";

export const CreatePostsSchema = z.object({
  title: z
    .string({ message: "Judul harus diisi" })
    .min(1, { message: "Judul harus diisi" })
    .max(255, { message: "Judul maksimal 255 karakter" }),
  previewText: z
    .string({ message: "Teks preview harus diisi" })
    .min(1, { message: "Teks preview harus diisi" }),
  content: z
    .string({ message: "Konten harus diisi" })
    .min(1, { message: "Konten harus diisi" }),
  isAnonymous: z.coerce.boolean({ message: "Opsi anonim harus diisi" }),
});

export const UpdatePostsSchema = z.object({
  title: z
    .string({ message: "Judul harus diisi" })
    .min(1, { message: "Judul harus diisi" })
    .max(255, { message: "Judul maksimal 255 karakter" }),
  previewText: z
    .string({ message: "Teks preview harus diisi" })
    .min(1, { message: "Teks preview harus diisi" }),
  content: z
    .string({ message: "Konten harus diisi" })
    .min(1, { message: "Konten harus diisi" }),
  isAnonymous: z.coerce.boolean({ message: "Opsi anonim harus diisi" }),
});

export const DeletePostsSchema = z.object({});
