import { NextAuthOptions, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "@/services/login";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const data = await loginService(credentials);

          if (data && data.access_token) {
            return {
              id: data.id,
              role: data.role,
              // email: data.email,
              token: data.access_token,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User & { token?: string; role?: string; id?: string };
    }) {
      if (user) {
        token.token = user.token;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token as string;
        session.user.role = token.role as string;
        // session.user.email = token.email as string;
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }) {
      if (!user) {
        return false;
      }
      return true;
    },
  },
};
