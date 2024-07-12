import { type User } from "./user";
import { type Value } from "@udecode/plate-common";

export interface Posts {
  id: string;
  title: string;
  previewText: string;
  content: Value;
  createdBy: User | null;
  createdAt: Date;
}
