'use client'

import { updateUserRole } from "@/actions";
import { User } from "@/interfaces";

interface Props {
    users: User[];
}
export const UsersTable = ({ users }: Props) => {
    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">id</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Role</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users!.map((user, item) => (
                        <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {user.name}
                            </td>
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <select
                                    className="text-sm text-primary p-1 rounded"
                                    name="role"
                                    value={user.role}
                                    onChange={e => {
                                        const newRole = e.target.value as 'admin' | 'user';
                                        updateUserRole(user.id, newRole)
                                    }}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 ">
                                Editar Role
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
