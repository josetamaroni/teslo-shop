'use client'

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { authenticate } from '@/actions';
import clsx from 'clsx';


export const LoginForm = () => {

  const searchParams = useSearchParams();
  const params = searchParams.get('origin') || '/';
  const [state, formAction, isPending] = useActionState(authenticate, undefined);

  //* Usar un useEffect para manejar el state y redireccionar a origin
  useEffect(() => {
    if (state === 'Success') {
      toast.success(state);
      if (!!params) return window.location.replace(params);
      window.location.href = '/';
    } else if (state === 'Invalid credentials.' || state === 'Something went wrong.') {
      toast.error(state);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name='email'
      />

      <label htmlFor="password">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name='password'
      />

      {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
      <button type='submit' className={clsx({
        "btn-primary": !isPending,
        "btn-disabled": isPending
      })}
        disabled={isPending}
      >
        Sign In
      </button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Create a new account
      </Link>
    </form>
  )
}
