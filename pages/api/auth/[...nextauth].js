import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUser } from "../../../lib/user";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await validateUser(credentials.email, credentials.password);
        if (user) {
          return { id: user._id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
