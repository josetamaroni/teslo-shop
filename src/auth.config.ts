import NextAut, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

const protectedRoutes = [
    '/checkout/address',
    '/checkout',
    '/profile',
    '/orders'
];
const authRoutes = [
    '/auth/login',
    '/auth/new-account',
];
// const authRoutes = ['/prueba']
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
        // signOut: '/auth/logout',
        // error: '/auth/error',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);
            const isLoggedIn = !!auth?.user;

            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL(`/auth/login?origin=${nextUrl.pathname}`, nextUrl));
            }
            return true;
        },
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