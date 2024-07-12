import * as z from "zod";

export const CreatePostsSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title can be at most 255 characters long" }),
  previewText: z
    .string({ message: "Preview text is required" })
    .min(1, { message: "Preview text is required" }),
  content: z
    .string({ message: "Content is required" })
    .min(1, { message: "Content is required" }),
  isAnonymous: z.coerce.boolean({ message: "Anonymous option is required" }),
});

export const UpdatePostsSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title can be at most 255 characters long" }),
  previewText: z
    .string({ message: "Preview text is required" })
    .min(1, { message: "Preview text is required" }),
  content: z
    .string({ message: "Content is required" })
    .min(1, { message: "Content is required" }),
  isAnonymous: z.coerce.boolean({ message: "Anonymous option is required" }),
});

export const DeletePostsSchema = z.object({});
