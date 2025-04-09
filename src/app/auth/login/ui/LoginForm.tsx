'use client'

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { IoInformationCircleOutline } from 'react-icons/io5';

import { authenticate } from '@/actions';
import clsx from 'clsx';


export const LoginForm = () => {

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';
  // const router = useRouter();
  const [state, formAction, isPending] = useActionState(authenticate, undefined);

  // Usar un useEffect para manejar el state y redireccionar a callbackUrl
  useEffect(() => {
    if (state === 'Success') {
      // router.replace('/');
      window.location.href = '/';
    }
  }, [state]);


  return (
    <form action={formAction} className="flex flex-col">

      {state && (
        <div className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true">
          <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state}</p>
        </div>
      )}

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
