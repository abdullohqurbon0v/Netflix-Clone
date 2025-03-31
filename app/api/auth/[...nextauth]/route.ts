import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

// Extend the default Session type to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null; // Default property
      email?: string | null; // Default property
      image?: string | null; // Default property
      username?: string; // Custom property
      uid?: string; // Custom property
    };
  }
}

// Define auth options
const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.username = session.user.name
          ?.split(" ")
          .join("")
          .toLowerCase();
        session.user.uid = token.sub;
      }
      return session;
    },
  },
  secret: process.env.SECRET_KEY,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
