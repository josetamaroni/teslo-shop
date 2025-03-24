'use server'

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginationProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
    try {

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;
        if (isNaN(Number(take))) take = 12;

        //* 1. Obtener los productos con sus imágenes
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2, // solo tomar 2 imagenes
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender
            }
        });

        //* 2. Obtenere el total de paginas
        const totalProducts = await prisma.product.count({
            where: {
                gender: gender
            }
        });

        //* Retornar los productos con sus imágenes
        return {
            currentPage: page,
            totalPages: Math.ceil(totalProducts / take),
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error(`Error al obtener los productos ${error}`);

    }
}