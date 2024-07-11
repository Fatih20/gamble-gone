import { authOptions } from "./auth-options";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    name: string | null;
    age: number | null;
  }
}

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    name: string | null;
    age: number | null;
  }

  interface User {
    id: string;
    username: string;
    name: string | null;
    birthDate: Date | null;
  }
}
