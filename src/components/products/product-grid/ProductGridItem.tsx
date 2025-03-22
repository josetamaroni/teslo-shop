'use client'

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setdisplayImage] = useState(product.images[0]);

    return (
        <div key={product.slug} className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full object-cover rounded"
                    onMouseEnter={(e)=> setdisplayImage(product.images[1])}
                    onMouseLeave={(e) => setdisplayImage(product.images[0])}
                />
            </Link>

            <div className="flex flex-col p-4">
                <Link href={`/product/${product.slug}`} className="hover:text-primary">
                    {product.title}
                </Link>
                <p className="font-bold">${product.price}</p>
            </div>
        </div>
    )
}
