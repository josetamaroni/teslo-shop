// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {

    const { ok, orders } = await getOrdersByUser();
    if (!ok) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Has no order</h1>
                <Link href="/" className="mt-4 text-primary hover:underline">
                    Back
                </Link>
            </div>
        )
    }
    console.log({ orders })
    return (
        <>
            <Title title="Orders" />
            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Order #</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Full name</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Status</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Date purchased</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders!.map((order, item) => (
                                <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item + 1}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {
                                            (order.isPaid) ?
                                                (<>
                                                    <IoCardOutline className="text-green-800" />
                                                    <span className='mx-2 text-green-800'>Paid</span>
                                                </>)
                                                :
                                                (<>
                                                    <IoCardOutline className="text-red-800" />
                                                    <span className='mx-2 text-red-800'>Not Paid</span>
                                                </>)
                                        }
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {
                                            order.createdAt.toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit'
                                            })
                                        }
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.id}`} className="hover:underline hover:text-primary">
                                            View order
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}