export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getUsers } from '@/actions';
import { Pagination, Title } from '@/components';

import Link from 'next/link';
import { UsersTable } from './ui/UsersTable';

export default async function UsersAdminPage() {

    const { ok, users } = await getUsers();
    if (!ok) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Has no Users</h1>
                <Link href="/" className="mt-4 text-primary hover:underline">
                    Back
                </Link>
            </div>
        )
    }

    return (
        <>
            <Title title="Users" />
            <div className="mb-10">
                <UsersTable users={users!} />

                <Pagination totalPages={ 3 } />
            </div>
        </>
    );
}
