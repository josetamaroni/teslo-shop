'use client'

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {

    const router = useRouter();
    const address = useAddressStore(state => state.address);
    const { itemsInCart, subtotal, taxes, shipping, total } = useCartStore(useShallow((state) => state.getSummaryInformation()));
    const cart = useCartStore(state => state.cart);

    const [isLoading, setIsLoading] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    if (!isLoading) {
        return <p>Loading...</p>
    }
    if (itemsInCart === 0) {
        return (
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                <h2 className="text-2xl mb-2">No items in cart</h2>
                <p className="text-sm">Please add items to your cart before placing an order.</p>
            </div>
        )
    }

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);

        // await new Promise(resolve => setTimeout(resolve, 2000));

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }));
        // Server action placeOrder
        const resp = await placeOrder(productsToOrder, address);
        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        //* Todo salio bien!
        clearCart();
        router.replace('/orders/' + resp.order?.id);
    }
    // console.log({ address, itemsInCart, subtotal, taxes, total });

    return (
        <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            <h2 className="text-2xl mb-2">Address</h2>
            <div className="">
                <p className="text-xl">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                {
                    address.address2 && <p>{address.address2}</p>
                }
                <p>{address.city}, {address.country}</p>
                <p>{address.postalCode}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div
                className="w-full h-0.5 rounded bg-primary my-8"
            />

            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
                <span>No. Products</span>
                <span className="text-right">{itemsInCart} articles</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subtotal)}</span>

                <span>Taxes (15%)</span>
                <span className="text-right">{currencyFormat(taxes)}</span>

                <span>Shipping (21%)</span>
                <span className="text-right">{currencyFormat(shipping)}</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right mb-5">{currencyFormat(total)}</span>
            </div>

            {
                (errorMessage !== '') && <span className='text-red-600' role="alert">{errorMessage}</span>
            }

            <button
                // href='/orders/1234'
                className={clsx(
                    "w-full items-center",
                    {
                        "btn-primary": !isPlacingOrder,
                        "btn-disabled": isPlacingOrder
                    }
                )}

                onClick={onPlaceOrder}
                disabled={isPlacingOrder}>
                Place order
            </button>
            <div className="mt-5 mb-2 w-full">

                <p className="mt-5">
                    <span className="text-xs">
                        By clicking &quot;Place order&quot;, you agree to our <a href='#' className="underline hover:text-primary">terms and conditions </a>
                        and <a href="#" className="underline hover:text-primary">privacy policies</a>
                    </span>
                </p>
            </div>
        </div>
    )
}
