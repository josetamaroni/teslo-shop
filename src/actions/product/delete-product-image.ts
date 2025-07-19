'use server'
import prisma from "@/lib/prisma";
import fs from "fs";
import { revalidatePath } from "next/cache";
import path from "path";

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    try {
        if (!imageUrl) throw new Error('Image URL is required');

        const prismaTx = await prisma.$transaction(async (tx) => {
            if (imageId === undefined || imageId === null) {
                throw new Error('Image ID is required');
            }

            // Elimina la imagen de la base de datos
            const deleteImage = await tx.productImage.delete({
                where: { id: imageId },
                select: {
                    product: {
                        select: {
                            slug: true
                        }
                    }
                }
            });

            // Intenta eliminar el archivo físico
            const filePath = path.join(process.cwd(), 'public', 'products', imageUrl);
            try {
                if (!fs.existsSync(filePath)) {
                    throw new Error('Image file does not exist on server');
                }
                fs.unlinkSync(filePath);
            } catch (fsError) {
                throw new Error('Error deleting image file from server');
            }

            return {
                slug: deleteImage.product.slug
            };
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${prismaTx.slug}`);
        revalidatePath(`/product/${prismaTx.slug}`);

        return {
            ok: true,
            message: 'Product image deleted successfully'
        }
    } catch (error) {
        console.error('Error deleting product image:', error);
        return {
            ok: false,
            message: error instanceof Error ? error.message : 'Error deleting product image'
        }
    }
}
