import { type User } from "./user";

export interface Posts {
  id: string;
  title: string;
  content: string;
  createdBy: User | null;
  createdAt: Date;
}
