'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getCategories = async () => {

    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Not authenticated',
            categories: []
        }
    }

    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        })

        return {
            ok: true,
            categories,
        }
    } catch (error) {
        return {
            ok: false,
            message: 'get-Categories - Error getting categories',
            categories: []
        }
    }
}