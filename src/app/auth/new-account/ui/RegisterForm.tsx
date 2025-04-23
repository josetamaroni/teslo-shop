'use client'

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login, registerUser } from '@/actions';
import { useState } from 'react';

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {
        setErrorMessage('');
        const { name, email, password } = data;

        // Server action
        const resp = await registerUser(name, email.toLowerCase(), password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }
        await login(email.toLowerCase(), password);

        window.location.replace('/');
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Name</label>
            {errors.name && <span className='text-red-600'>This field is required</span>}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        { "border-red-600": errors.name }
                    )
                }
                type="text"
                autoFocus
                {...register("name", { required: true })}
                placeholder="Name"
            />

            <label htmlFor="email">Email</label>
            {errors.email && <span className='text-red-600'>This field is required</span>}

            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        { "border-red-600": errors.email }
                    )
                }
                type="email"
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                placeholder="Email"
            />

            <label htmlFor="password">Password</label>
            {errors.password && <span className='text-red-600'>This field is required</span>}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        { "border-red-600": errors.password }
                    )
                }
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
            />


            {errorMessage && <span className='text-red-600'>{errorMessage}</span>}

            <button type="submit" className="btn-primary">
                Registrarse
            </button>

            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>
        </form>
    )
}
