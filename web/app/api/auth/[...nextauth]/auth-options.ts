import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { differenceInYears } from "date-fns";
import { getServerSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import "server-only";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // Check credential validity

        if (!credentials) {
          throw new Error(
            JSON.stringify({ message: "Username atau password salah!" }),
          );
        }

        // Find user by credentials
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        // User not found
        if (!user) {
          throw new Error(
            JSON.stringify({ message: "Username atau password salah!" }),
          );
        }

        // Compare password with hash
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error(
            JSON.stringify({ message: "Username atau password salah!" }),
          );
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Runs when jwt is created
      if (user) {
        token.id = user.id;
        token.username = user.username;
        if (user.name) {
          token.name = user.name;
        }

        if (user.birthDate) {
          const age = differenceInYears(new Date(), user.birthDate);
          token.age = age;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Update session object
      session.id = token.id;
      session.username = token.username;
      session.name = token.name;
      session.age = token.age;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
