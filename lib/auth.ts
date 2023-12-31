import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     redirect_uri: `${getBaseUrl()}/api/auth/callback/google`,
      //   }
      // }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};