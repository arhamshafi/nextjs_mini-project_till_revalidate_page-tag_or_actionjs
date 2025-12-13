import CredentialsProvider from "next-auth/providers/credentials"


const AuthOption = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                try {

                    console.log("on working...");


                } catch (err) {
                    throw new Error(err.message || "Authentication Error")
                }
            }
        })
    ]
}