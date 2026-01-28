import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "../model/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        //login krna
        CredentialsProvider({
            name: "Credentials",
            //kitne input field hain signin form me
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "text" },
            },
            //credentials se jo aya ab uska use
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    throw new Error("email or password missing");
                }
                await connectDb();
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("User does not exist");
                }
                if (!user.password) {
                    throw new Error("Please login with Google");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Incorrect password");
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
        Google({
            //client Id cant take string|null so by ! sign we are telling ts that this is string
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "google") {
                await connectDb();
                let existUser = await User.findOne({ email: user?.email });
                if (!existUser) {
                    existUser = await User.create({
                        name: user.name,
                        email: user?.email,
                        // image:user?.image,
                    });
                }
                user.id = existUser._id as string;
                // user.image = existUser.image;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },
        session({ token, session }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token?.name;
                session.user.email = token?.email;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXT_AUTH_SECRET,
};
export default authOptions;
