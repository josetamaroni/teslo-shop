'use server'
import { revalidate } from '@/app/(shop)/page';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import fs from 'fs';
import path from 'path';

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
    images: z.any().optional(),
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

    const { id, images, ...restProduct } = product;
    console.log({restProduct});

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

            // Handle Images
            console.log('Handling images...');
            console.log(formData.getAll('images'));
            if (formData.getAll('images')) {
                // En caso que se guarde en Cloudinary recibimos un array de archivos EJ: [https:urll.jpg, https:urll2.jpg]
                // En este caso lo estoy guardando en el servidor en la carpeta public/products
                const images = await updateImages(formData.getAll('images') as File[]);
                console.log({ images });
                if (!images || images.length === 0) {
                    throw new Error('No images provided');
                }

                await prisma.productImage.createMany({
                    data: images.map((image) => ({
                        url: image!,
                        productId: product.id,
                    })),
                });
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
        // console.log(error);
        return {
            ok: false,
            product: null,
            message: 'Error creating/updating product'
        }
    }
}

const updateImages = async (images: File[]) => {
    try {
        const uploadDir = path.join(process.cwd(), 'public', 'products');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const urls: string[] = [];

        for (const f of images) {
            if (typeof f.arrayBuffer === 'function') {
                const buffer = Buffer.from(await f.arrayBuffer());
                const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${f.name}`;
                const filePath = path.join(uploadDir, uniqueName);
                fs.writeFileSync(filePath, buffer);
                urls.push(`${uniqueName}`);
            } else {
                console.error('El archivo no tiene método arrayBuffer:', f);
            }
        }
        return urls;
    } catch (error) {
        // console.error('Error updating product image:', error);
        throw new Error('Failed to update product image');
    }
}