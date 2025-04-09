import NextAut, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
        // signOut: '/auth/logout',
        // error: '/auth/error',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token, user }) {
            session.user = token.data as any;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                // Search for the user in the database
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
                if (!user) return null;

                // Verify the password
                if (!bcryptjs.compareSync(password, user.password)) return null;

                // Extract user's password
                const { password: _, ...userWithoutPassword } = user;

                // Return the user
                return userWithoutPassword;
            },
        }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAut(authConfig);