'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/store";
import { currencyFormat } from '@/utils';
import { Title } from "@/components";

export const OrderSummary = () => {

    const { itemsInCart, subtotal, taxes, shipping,total } = useCartStore(useShallow((state) => state.getSummaryInformation()));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    if (!isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2">Order Summary</h2>
                <p className="h-5 w-full rounded-md mb-1 animate-pulse bg-gray-200"></p>
                <p className="h-5 w-full rounded-md mb-1 animate-pulse bg-gray-200"></p>
                <p className="h-5 w-full rounded-md animate-pulse bg-gray-200"></p>
                <p className="h-8 w-full rounded-md mt-5 animate-pulse bg-gray-200"></p>
                <div className="mt-5 mb-2 w-full">
                    <Link href='#' className=" flex btn-primary justify-center">
                        Loading...
                    </Link>
                </div>
            </div>
        )
    }

    if (itemsInCart === 0) {
        return (
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2">No items in cart</h2>
                <p className="text-sm">Please add items to your cart before placing an order.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
                <span>No. Products</span>
                <span className="text-right">{itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subtotal)}</span>

                <span>Taxes (15%)</span>
                <span className="text-right">{currencyFormat(taxes)}</span>

                <span>Shipping (21%)</span>
                <span className="text-right">{currencyFormat(shipping)}</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
                <Link href='/checkout/address' className=" flex btn-primary justify-center">
                    Checkout
                </Link>
            </div>
        </div>
    )
}
