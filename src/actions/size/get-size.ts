'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getSizes = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Not authenticated',
            categories: []
        }
    }

    try {
        // const sizes = await prisma.size.findMany({
        //     orderBy: {
        //         name: 'asc'
        //     }
        // })

        // return {
        //     ok: true,
        //     sizes,
        // }
    } catch (error) {
        return {
            ok: false,
            message: 'get-Sizes - Error getting sizes',
            sizes: []
        }
    }
}