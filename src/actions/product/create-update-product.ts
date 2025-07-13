'use server'
import { revalidate } from '@/app/(shop)/page';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
    sizes: z.coerce.string().transform(val => val.split(',')),
    categoryId: z.string().uuid(),
    images: z.array(z.string()).optional(),
});

export const createUpdateProduct = async (formData: FormData) => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Not authenticated'
        }
    }

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);
    if (!productParsed.success) {
        return {
            ok: false,
            message: 'Invalid product data',
            errors: productParsed.error.errors,
            product: productParsed.data,
        }
    }
    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '_').trim();

    const { id, ...restProduct } = product;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Product;
            const tagsArray = restProduct.tags.split(',').map(tag => tag.trim());

            // Update existing product
            if (id) {
                product = await tx.product.update({
                    where: { id },
                    data: {
                        ...restProduct,
                        sizes: {
                            set: restProduct.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                });
                // console.log({ updateProduct: product });
            } else { // Create new product
                product = await tx.product.create({
                    data: {
                        ...restProduct,
                        sizes: {
                            set: restProduct.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                });
                // console.log({ createProduct: product });
            }

            return {
                product
            }
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${prismaTx.product.slug}`);
        revalidatePath(`/product/${prismaTx.product.slug}`);
        return {
            ok: true,
            product: prismaTx.product,
            message: 'Product created/updated successfully',
        }
    } catch (error) {
        return {
            ok: false,
            product: null,
            message: 'Error creating/updating product'
        }
    }
}
