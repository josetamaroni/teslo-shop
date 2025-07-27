'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false, //* Deshabilitar redirección automática
        });

        return 'Success';
    } catch (error) {
        //? Falta un log de errores
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        } else {
            return 'Something went wrong.';
        }
    }
}

export async function login(email: string, password: string) {
    try {
        await signIn('credentials', {
            email,
            password
        });
        return {
            ok: true
        }
    } catch (error) {
        //? Falta un log de errores
        return {
            ok: false
        }
    }
}