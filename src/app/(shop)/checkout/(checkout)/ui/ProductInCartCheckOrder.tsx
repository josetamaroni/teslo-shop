'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image'
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils/currencyFormat';


export const ProductInCartCheckOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setIsLoading(true);
    }, [])

    if (!isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-3">
                        <Image
                            src={`/products/${product.image}`}
                            // priority={true}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div className="grid grid-cols-2">
                            <p className="w-[230px]">{product.title} - {product.size}</p>
                            <p className="text-right">{currencyFormat(product.price)} x {product.quantity} und</p>
                            {/* <p className="">{product.size}</p> */}
                            <p className="text-left font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
                        </div>

                    </div>
                ))
            }
        </>
    )
}
