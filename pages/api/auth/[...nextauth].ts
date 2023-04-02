import { PrismaClient, User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const prismaService = new PrismaClient();

class InvalidCredentialsError extends Error {
  constructor() {
    super("Incorect credentials.");
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<User | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const foundUser = await prismaService.user.findUnique({
          where: { email },
        });

        if (!foundUser) throw new InvalidCredentialsError();

        return foundUser;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
