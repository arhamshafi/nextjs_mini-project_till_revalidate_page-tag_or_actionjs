import ConnectDB from "@/lib/mongo";
import User from "@/model/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


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
        })
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },

    jwt: { maxAge: 60 * 60 },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.email = user.email;
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