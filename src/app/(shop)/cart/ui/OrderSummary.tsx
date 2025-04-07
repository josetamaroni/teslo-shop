'use client'

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/store";
import { currencyFormat } from '@/utils';

export const OrderSummary = () => {

    const { itemsInCart, subtotal, taxes, total } = useCartStore(useShallow((state) => state.getSummaryInformation()));
    // const { itemsInCart, subtotal, taxes, total } = getSummaryInformation;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    if (!isLoading) {
        return (
            <>
                <p className="h-5 w-full rounded-md mb-1 animate-pulse bg-gray-200"></p>
                <p className="h-5 w-full rounded-md mb-1 animate-pulse bg-gray-200"></p>
                <p className="h-5 w-full rounded-md animate-pulse bg-gray-200"></p>
                <p className="h-8 w-full rounded-md mt-5 animate-pulse bg-gray-200"></p>
            </>
        )
    }

    return (
        <div className="grid grid-cols-2">
            <span>No. Products</span>
            <span className="text-right">{itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subtotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(taxes)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}
