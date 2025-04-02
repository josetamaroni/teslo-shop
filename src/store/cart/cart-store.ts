import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";
import { Product } from '../../interfaces/product.interface';

interface State {
    cart: CartProduct[];
    addProductToCart: (product: CartProduct) => void;
    getTotalItems: () => number;
    updateProductQuantity: (Product: CartProduct, quantity: number) => void;
    removeProduct: (Product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // methods
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                //* 1. verificar si el producto ya existe en el carrito
                const productInCart = cart.some((p) => p.id === product.id && p.size === product.size);
                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //* 2. si el producto ya existe por talla, actualizar la cantidad
                const updatedCart = cart.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return { ...p, quantity: p.quantity + product.quantity };
                    }
                    return p;
                });
                set({ cart: updatedCart });
            },
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, product) => total + product.quantity, 0);
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCart = cart.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return { ...p, quantity };
                    }
                    return p;
                });
                set({ cart: updatedCart });
            },
            removeProduct: (Product: CartProduct) => {
                const { cart } = get();
                const updatedCart = cart.filter((p) => !(p.id === Product.id && p.size === Product.size));
                set({ cart: updatedCart });
            },
        })
        ,
        {
            name: "shopping-cart", // name of the item in the storage (must be unique)
        }
    )
)