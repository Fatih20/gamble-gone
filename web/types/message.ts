export interface Message {
  id: string;
  message: string;
  sender: "user" | "ai";
}
