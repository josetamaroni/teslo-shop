'use client'

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions/product/get-stock-by-slug";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStock = async () => {
            const inStock = await getStockBySlug(slug);
            setStock(inStock);
            setIsLoading(false);
        }
        getStock();
    }, [slug])


    return (
        <>
            {
                (isLoading) 
                ?
                <p className="text-lg mb-2 animated-pulse bg-gray-200">Cargando...</p>
                :
                <p className="text-lg mb-2">Stock: {stock}</p>
            }

        </>
    )
}
