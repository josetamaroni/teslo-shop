// https://tailwindcomponents.com/component/hoverable-table
import { getPaginationProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';

import Link from 'next/link';
import { IoAddOutline } from 'react-icons/io5';
import { currencyFormat } from '../../../../utils/currencyFormat';

interface Props {
    searchParams: {
        page?: string;
    }
}

export default async function ProductsAdminPage({ searchParams }: Props) {

    const { page } = await searchParams;

    let pageNumber;
    if (page === undefined) {
        pageNumber = 1;
    } else if (typeof page == 'string') {
        pageNumber = parseInt(page);
    }

    const { products, totalPages } = await getPaginationProductsWithImages({ page: pageNumber });

    console.log({ products })
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Has no products</h1>
                <Link href="/" className="mt-4 text-primary hover:underline">
                    Back
                </Link>
            </div>
        )
    }

    return (
        <>
            <Title title="Products Admin" />

            <div className='flex justify-end mb-5'>
                <Link href={`product/new`} className="btn-primary flex rounded">
                    <IoAddOutline size={25} className="text-xl mr-2" />
                    Add Product
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Product #</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Image</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">In Stock</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Price</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Gender</th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Sizes</th>
                            {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Purchase created</th> */}
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products!.map((prod, item) => (
                                <tr key={prod.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{prod.id.split('-').at(-1)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link href={`/product/${prod.slug}`} target='blank'>
                                            <ProductImage src={prod.ProductImage[0]?.url} alt={prod.title} width={90} height={90} className="rounded" />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link href={`/admin/product/${prod.slug}`} className='hover:underline hover:text-primary'>
                                            {prod.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {prod.inStock}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(prod.price)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {prod.gender}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {prod.sizes.join(', ')}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        {/* <Link href={`/orders/${order.id}`} className="hover:underline hover:text-primary">
                                            View order
                                        </Link> */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Pagination totalPages={totalPages} />

            </div>
        </>
    );
}
