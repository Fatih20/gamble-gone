import * as z from "zod";

export interface Review {
  id: string;
  review: string;
  rating: number;
  isAnonymous: boolean;
}

export const CreateReviewRequestSchema = z.object({
  review: z
    .string({ message: "Review is required" })
    .min(1, { message: "Review is required" })
    .max(256, { message: "Review can be at most 256 characters long" }),
  rating: z.coerce
    .number({ message: "Rating is required" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating can be at most 5" }),
  isAnonymous: z.boolean({ message: "Anonymous option is required" }),
});

export const UpdateReviewRequestSchema = z.object({
  review: z
    .string({ message: "Review is required" })
    .min(1, { message: "Review is required" })
    .max(256, { message: "Review can be at most 256 characters long" }),
  rating: z.coerce
    .number({ message: "Rating is required" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating can be at most 5" }),
  isAnonymous: z.boolean({ message: "Anonymous option is required" }),
});
