'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
        return {
            ok: false,
            message: 'No user found'
        }
    }
    // console.log({ productIds, address, userId })

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(product => product.productId)
            }
        }
    });

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    const { subtotal, taxes, shipping, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) throw new Error(`${item.productId} not found - 500`);

        const subtotal = product.price * productQuantity;

        totals.subtotal += subtotal;
        totals.taxes += subtotal * 0.15;
        totals.shipping += subtotal * 0.21;
        totals.total = totals.subtotal + totals.taxes + totals.shipping;

        return totals;
    }, { subtotal: 0, taxes: 0, shipping: 0, total: 0 });


    // console.log({ subtotal, taxes, shipping, total })


    // Transaction DB
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            //? 1. Actualizar el stock de los productos
            const updatedProductsPromises = products.map((product) => {
                // Acumular los productos por cantidad
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => acc + item.quantity, 0);

                if (productQuantity === 0) throw new Error(`Product quantity is zero prod: ${product.id}`);


                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            // Revisar valor negativos en la existencia = no hay Stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`Product out of stock: ${product.title}`);
                }
            });
            console.log({ updatedProducts })

            //? 2. Crear la orden - Encabezado - Detalles
            const order = await tx.order.create({
                data: {
                    userId,
                    subtotal,
                    tax: taxes,
                    shipping,
                    total,
                    itemsInOrder,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                productId: p.productId,
                                quantity: p.quantity,
                                size: p.size,
                                price: products.find(prod => prod.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            })
            //! Validar itemsInOrder
            if (order.itemsInOrder === 0) {
                throw new Error('No items in order');
            }
            //! Validar si el price es cero, entonces lanzar un error
            const zeroPrice = await tx.orderItem.findFirst({
                where: {
                    orderId: order.id,
                    price: 0
                }
            })
            if (zeroPrice) {
                throw new Error('Product with zero price found');
            }
            //? 3. Crear la dirección de la orden
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    postalCode: address.postalCode,
                    city: address.city,
                    phone: address.phone,

                    countryId: address.country,
                    orderId: order.id
                }
            })

            return {
                order,
                updatedProducts,
                orderAddress
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
            message: 'Order created successfully'
        }
    } catch (error: any) {
        // console.log(error)
        return {
            ok: false,
            message: `Error creating order - ${error?.message}`
        }
    }
}
