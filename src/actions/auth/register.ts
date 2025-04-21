'use server'

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password.trim())
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });

        return {
            ok: true,
            user,
            message: 'User registered successfully'
        }
    } catch (error) {
        // throw new Error('Registration failed');
        return {
            message: 'Registration failed',
            ok: false
        }
    }
}