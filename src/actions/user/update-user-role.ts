'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { Role } from '@/interfaces';

export const updateUserRole = async (userId: string, role: Role) => {

    const session = await auth();
    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Not authenticated'
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: role
            }
        });
        revalidatePath('/admin/users');
        return {
            ok: true,
            message: 'User role updated successfully',
        }
    } catch (error) {
        console.log('updateUserRole', error);
        return {
            ok: false,
            message: 'Error updating user role'
        }
    }
}