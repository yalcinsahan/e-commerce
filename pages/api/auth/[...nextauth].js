import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import connectMongo from "../../../utils/connect-mongo";

export const authOptions = {

}

export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            authorize: async (credentials) => {

                await connectMongo()
                    .then(() => {
                    })
                    .catch(() => {
                        return null
                    })

                // database look up
                const user = await User.findOne({ email: credentials.email, password: credentials.password })

                if (user?._id) {

                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }

                return null;

            },
        }),
    ],
    session: {
        //oturumun geçerlilik süresi saniye cinsinden
        maxAge: 86400,
    },
    callbacks: {
        jwt: ({ token, user }) => {
            // first time jwt callback is run, user object is available
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: ({ session, token }) => {

            if (token) {
                session.id = token.id;
            }

            return session;
        },
    },
    secret: process.env.SECRET_KEY,
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
    pages: {
        signIn: "/login",
    },
});