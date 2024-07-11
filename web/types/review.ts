import { type User } from "./user";

export interface Review {
  id: string;
  review: string;
  rating: number;
  createdBy: User | null;
}
