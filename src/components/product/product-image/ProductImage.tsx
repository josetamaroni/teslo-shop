import Image from "next/image"
import React from "react";

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width?: number;
    height?: number;
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
}
export const ProductImage = ({ src, alt, width, height, className, style }: Props) => {

    const localSrc = (src)
        ? src.startsWith('http') // https://url.completo.de.la.imagen.jpg
            ? src
            : `/products/${src}`
        : '/imgs/no-image.jpg';

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            priority={true} // For better performance, especially for product images
        />
    )
}
