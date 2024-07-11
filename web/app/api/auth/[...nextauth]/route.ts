import { authOptions } from "./auth-options";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string;
    age: number;
    gender: string;
    gamblingStory: string;
    gamblingDuration: number;
    whyStop: string;
  }
}

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    name: string;
    age: number;
    gender: string;
    gamblingStory: string;
    gamblingDuration: number;
    whyStop: string;
  }

  interface User {
    id: string;
    username: string;
    name: string;
    birthDate: Date;
    gender: string;
    gamblingStory: string;
    gamblingDuration: number;
    whyStop: string;
  }
}
