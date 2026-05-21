import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "E-posta",
          type: "email"
        },
        password: {
          label: "Sifre",
          type: "password"
        }
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const passwordMatches = await verifyPassword(password, user.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          tenantId: user.tenantId
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id ?? token.sub ?? "";
        token.tenantId = user.tenantId;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId ?? token.sub ?? "";
        session.user.tenantId = token.tenantId;
        session.user.role = token.role;
      }

      return session;
    }
  }
});
