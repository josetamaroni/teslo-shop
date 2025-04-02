'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store';
import { IoTrashOutline } from 'react-icons/io5';


export const ProductInCart = () => {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
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
                            <Link className="w-[230px] hover:text-primary underline" href={`/product/${product.slug}`}>{product.title} - {product.size}</Link>
                            {/* <p className="">{product.size}</p> */}
                            <p className="text-right">${product.price}</p>

                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />

                            <button
                                className="mt-3 text-red-600"
                                onClick={() => removeProduct(product)}>
                                <IoTrashOutline size={20} />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
