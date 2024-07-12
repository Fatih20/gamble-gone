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
            JSON.stringify({ message: "Wrong username or password!" }),
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
            JSON.stringify({ message: "Wrong username or password!" }),
          );
        }

        // Compare password with hash
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error(
            JSON.stringify({ message: "Wrong username or password!" }),
          );
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // Runs when jwt is created

      if (trigger === "update") {
        const user = await prisma.user.findUnique({
          where: {
            id: token.id,
          },
        });
        if (user) {
          const {
            id,
            birthDate,
            gamblingDuration,
            gamblingStory,
            gender,
            name,
            username,
            whyStop,
          } = user;
          token.id = id;
          token.username = username;
          token.name = name;
          token.age = differenceInYears(new Date(), new Date(birthDate));
          token.whyStop = whyStop;
          token.gamblingDuration = gamblingDuration;
          token.gamblingStory = gamblingStory;
          token.gender = gender;
        }
      }

      if (user) {
        const {
          id,
          birthDate,
          gamblingDuration,
          gamblingStory,
          gender,
          name,
          username,
          whyStop,
        } = user;

        token.id = id;
        token.username = username;
        token.name = name;
        token.age = differenceInYears(new Date(), new Date(birthDate));
        token.whyStop = whyStop;
        token.gamblingDuration = gamblingDuration;
        token.gamblingStory = gamblingStory;
        token.gender = gender;
      }

      return token;
    },
    async session({ session, token }) {
      // Update session object
      session.id = token.id;
      session.username = token.username;
      session.name = token.name;
      session.age = token.age;
      session.whyStop = token.whyStop;
      session.gamblingDuration = token.gamblingDuration;
      session.gamblingStory = token.gamblingStory;
      session.gender = token.gender;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
