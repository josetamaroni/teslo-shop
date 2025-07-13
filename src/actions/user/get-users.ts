'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getUsers = async () => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Not authenticated'
        }
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    return {
        ok: true,
        users: users,
    }
}