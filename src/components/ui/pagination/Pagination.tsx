'use client'

import { generatePaginationNumbers } from "@/utils";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get("page") || '1';
    const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString);

    if (currentPage < 1 || isNaN(currentPage)) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    console.log({ totalPages, currentPage, pathname, searchParams, allPages });

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`;
        }

        if (Number(pageNumber) <= 0) {
            return `${pathname}`;
        }

        if (Number(pageNumber) > totalPages) {
            return `${pathname}?${params.toString()}`;
        }

        params.set("page", String(pageNumber));

        return `${pathname}?${params.toString()}`;
    }

    return (

        <div className="flex text-center justify-center mt-10 mb-32">
            <nav aria-label="Page navigation">
                <ul className="flex list-style-none">
                    <li className="page-item">
                        <Link className="page-link relative block py-1.5 px-2.5 rounded border-0 bg-transparent outline-none transition-all duration-300 text-primary hover:text-primary hover:bg-gray-200 hover:shadow-md"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={25} className="text-xl" />
                        </Link>
                    </li>

                    {
                        allPages.map((page, index) => (
                            <li key={index} className={`page-item`}>
                                <Link className={`page-link relative block py-1.5 px-3 rounded border-0 ${page === currentPage ? 'bg-primary text-white' : 'bg-transparent text-gray-800'} outline-none transition-all duration-300  hover:text-primary hover:bg-gray-200 hover:shadow-md`}
                                    href={createPageUrl(page)}>
                                    {page}
                                </Link>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        <Link className="page-link relative block py-1.5 px-2.5 rounded border-0 bg-transparent outline-none transition-all duration-300 text-primary hover:text-primary hover:bg-gray-200 hover:shadow-md"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={25} className="text-xl" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
