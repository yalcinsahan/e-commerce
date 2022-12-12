import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "../../../models/user";
import connectMongo from "../../../utils/connect-mongo";

export const authOptions = {

    providers: [
        CredentialProvider({
            name: "credentials",
            authorize: async (credentials) => {

                await connectMongo()
                    .catch(() => null)

                // database look up
                const user = await User.findOne({ email: credentials.email, password: credentials.password })

                if (user?._id) return { _id: user._id, name: user.name, role: user.role }
                else return null;

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
                token.role = user.role;
                token._id = user._id
            };
            return token;
        },
        session: ({ session, token }) => {

            if (token) {
                session.role = token.role
                session._id = token._id
            };
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
}


export default NextAuth(authOptions);