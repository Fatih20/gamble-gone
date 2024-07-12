import * as z from "zod";

export interface Review {
  id: string;
  review: string;
  rating: number;
  isAnonymous: boolean;
}

export const CreateReviewRequestSchema = z.object({
  review: z
    .string({ message: "Review harus diisi" })
    .min(1, { message: "Review harus diisi" })
    .max(256, { message: "Review maksimal 256 karakter" }),
  rating: z.coerce
    .number({ message: "Rating harus diisi" })
    .min(1, { message: "Rating minimal bernilai 1" })
    .max(5, { message: "Rating maksimal bernilai 5" }),
  isAnonymous: z.boolean({ message: "Opsi anonim harus diisi" }),
});

export const UpdateReviewRequestSchema = z.object({
  review: z
    .string({ message: "Review harus diisi" })
    .min(1, { message: "Review harus diisi" })
    .max(256, { message: "Review maksimal 256 karakter" }),
  rating: z.coerce
    .number({ message: "Rating harus diisi" })
    .min(1, { message: "Rating minimal bernilai 1" })
    .max(5, { message: "Rating maksimal bernilai 5" }),
  isAnonymous: z.boolean({ message: "Opsi anonim harus diisi" }),
});
