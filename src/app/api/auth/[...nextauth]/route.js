import ConnectDB from "@/lib/mongo";
import User from "@/model/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react";


export const AuthOption = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                try {
                    await ConnectDB()

                    if (!credentials?.email || !credentials?.password) throw new Error("Both Field Must Be Required")
                    const user = await User.findOne({ email: credentials.email }).select("+password")
                    if (!user) throw new Error("Invalid E-Mail or Password")
                    const passMatch = await user.comparePassword(credentials.password);
                    if (!passMatch) throw new Error("Invalid E-Mail or Password")

                    return { id: user._id.toString(), name: user.name, email: user.email, role: user.role }

                } catch (err) {
                    throw new Error(err.message || "Authentication Error")
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })

    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },

    jwt: { maxAge: 60 * 60 },

    callbacks: {

        async signIn({ user, account, profile }) {
            console.log(user, '/// user');

            await ConnectDB();
            // console.log("profile detilas////" , profile);

            if (account.provider === "google") {
                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: profile?.picture || "",
                        provider: account.provider,
                        providerId: account.providerAccountId
                    });
                }
            }
            return true;
        },

        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role

                if (!user.role) {
                    await ConnectDB()
                    const dbUser = await User.findOne({ email: user.email })
                    token.id = dbUser._id;
                    token.role = dbUser.role
                }
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.name = token.name;
                session.user.email = token.email;
            }


            return session
        }
    },

    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(AuthOption)
export { handler as POST, handler as GET }