// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
});

export { handler as GET, handler as POST };
