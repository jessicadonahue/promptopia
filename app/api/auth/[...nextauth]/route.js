import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database'
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    // callbacks: {
    //     async session({ session }) {
    //         console.log('session callback', session)
    //         const sessionUser = await User.findOne({
    //             email: session.user.email
    //         });
    //         console.log(sessionUser)
    //         session.user.id = sessionUser._id.toString();
    //     },
    //     async signIn({ profile }) {
    //         console.log('signIn callback')
    //         try {
    //             await connectToDB();
    
    //             // check if a user already exists
    //             const userExists = await User.findOne({
    //                 email: profile.email
    //             })
    //             // if not, create a new user and save to db
    //             if(!userExists) {
    //                 await User.create({
    //                     email: profile.email,
    //                     username: profile.name.replace(' ', '').toLowerCase(),
    //                     image: profile.picture
    //                 })
    //             }
    //             return true;
    //         } catch (error) {
    //             console.log(error)
    //             return false;
    //         }
    //     }
    // }
})

export { handler as GET, handler as POST }