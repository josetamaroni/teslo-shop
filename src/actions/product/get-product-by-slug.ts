'use server'

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        //* Obtener el producto por su slug
        const product = await prisma.product.findUnique({
            include: {
                ProductImage: true
            },
            where: {
                slug: slug
            }
        });

        if (!product) return null;

        //? Si se quisiera excluir la propiedad ProductImage del objeto product
        // const { ProductImage, ...rest } = product; 

        //* Retornar los productos con sus imágenes
        return {
            ...product,
            images: product.ProductImage.map(image => image.url)
        }

    } catch (error) {
        throw new Error(`Error al obtener los productos ${error}`);
    }
}