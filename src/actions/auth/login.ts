'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // await new Promise(resolve => setTimeout(resolve, 4000));

        // console.log('Form Data', formData)
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false, // Deshabilitar redirección automática
        });
        
        return 'Success';
    } catch (error) {
        console.error('Error', error);
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
        // throw error;
    }
}