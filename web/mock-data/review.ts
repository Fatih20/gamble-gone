import { mockUsers } from "./users";
import { type Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: "1",
    review:
      "Sangat membantu, saya sudah lepas dari judi online setelah 2 tahun",
    rating: 3,
    createdBy: mockUsers[0],
  },
  {
    id: "2",
    review: "Layanan ini sangat bagus dan mudah digunakan",
    rating: 4,
    createdBy: null,
  },
  {
    id: "3",
    review: "Aplikasi ini sangat membantu saya dalam mengelola keuangan",
    rating: 3,
    createdBy: mockUsers[1],
  },
  {
    id: "4",
    review: "Fitur-fiturnya sangat lengkap dan bermanfaat",
    rating: 5,
    createdBy: mockUsers[2],
  },
  {
    id: "5",
    review: "Pengalaman pengguna yang sangat baik",
    rating: 4,
    createdBy: null,
  },
  {
    id: "6",
    review: "Sangat merekomendasikan untuk siapa saja yang membutuhkan",
    rating: 5,
    createdBy: null,
  },
];
